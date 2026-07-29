"""
Analisador de telemetria de kernel - Windows.

Correcoes sobre a versao anterior:
  1. UTF-8 forcado no lado do PowerShell. Antes, errors='ignore' descartava
     silenciosamente os bytes acentuados do code page OEM (cp850).
  2. Contexto lido na CAUDA DA SESSAO ANTERIOR. O evento 41 e gravado no boot
     SEGUINTE a queda; olhar 10 min antes dele mostra o boot, nao o crash.
  3. Filtro de ruido: Kernel-Processor-Power 55 dispara 32x por boot.
  4. Intervalo entre quedas e janela cega, para nao concluir cedo demais.
  5. Sem f-strings nos blocos PowerShell - PS e cheio de chaves e o escape
     duplo vira fonte de bug. Placeholders trocados com .replace().
"""

import subprocess

PS_QUEDAS = r"""
$codigos = @{
    0   = 'Corte seco (kernel morreu sem gravar nada)'
    10  = 'IRQL_NOT_LESS_OR_EQUAL (driver acessou memoria invalida)'
    30  = 'KMODE_EXCEPTION_NOT_HANDLED'
    59  = 'SYSTEM_SERVICE_EXCEPTION'
    80  = 'PAGE_FAULT_IN_NONPAGED_AREA (RAM suspeita)'
    126 = 'SYSTEM_THREAD_EXCEPTION_NOT_HANDLED'
    159 = 'DRIVER_POWER_STATE_FAILURE'
    239 = 'CRITICAL_PROCESS_DIED'
    257 = 'CLOCK_WATCHDOG_TIMEOUT (nucleo parou - CPU/Curve Optimizer)'
    278 = '0x116 VIDEO_TDR_FAILURE (GPU parou e nao recuperou)'
    292 = '0x124 WHEA_UNCORRECTABLE_ERROR (erro fatal de hardware)'
    307 = 'DPC_WATCHDOG_VIOLATION'
    313 = 'KERNEL_SECURITY_CHECK_FAILURE'
}

$events = @(Get-WinEvent -FilterHashtable @{LogName='System'; Id=41} -MaxEvents __LIMIT__ -ErrorAction SilentlyContinue)
if ($events.Count -eq 0) {
    "  -> Nenhuma queda registrada."
    return
}

$secos = 0
$prev = $null
$linhas = foreach ($e in $events) {
    $xml = [xml]$e.ToXml()
    $node = $xml.Event.EventData.Data | Where-Object Name -eq 'BugcheckCode'
    $bc = if ($node) { [int]$node.'#text' } else { -1 }
    if ($bc -eq 0) { $secos++ }

    $tipo = if ($codigos.ContainsKey($bc)) { $codigos[$bc] } else { "Tela azul (bugcheck $bc)" }
    $gap = if ($prev) { '{0:dd\.hh\:mm}' -f ($prev - $e.TimeCreated) } else { '-' }
    $prev = $e.TimeCreated

    [PSCustomObject]@{
        'Quando'      = $e.TimeCreated.ToString('dd/MM/yyyy HH:mm:ss')
        'Ate proxima' = $gap
        'Diagnostico' = $tipo
    }
}
$linhas | Format-Table -AutoSize | Out-String

$ultima = $events[0].TimeCreated
$boot = (Get-CimInstance Win32_OperatingSystem).LastBootUpTime
$agora = Get-Date
"  Total: $($events.Count)  |  cortes secos: $secos  |  telas azuis: $($events.Count - $secos)"
'  Silencio desde a ultima queda: {0:dd\.hh\:mm}' -f ($agora - $ultima)
'  Uptime atual:                  {0:dd\.hh\:mm}' -f ($agora - $boot)
if ($events.Count -gt 1) {
    $h = ($ultima - $events[-1].TimeCreated).TotalHours / ($events.Count - 1)
    '  Media na janela:               1 queda a cada {0:N1} h' -f $h
}
"""

PS_WHEA = r"""
$events = @(Get-WinEvent -FilterHashtable @{LogName='System'; ProviderName='Microsoft-Windows-WHEA-Logger'} -MaxEvents 50 -ErrorAction SilentlyContinue)
if ($events.Count -gt 0) {
    $events | Select-Object TimeCreated, Id, LevelDisplayName, Message | Format-Table -AutoSize -Wrap | Out-String
} else {
    "  -> Vazio. Descarta machine check na CPU e erro de barramento PCIe."
    "  -> NAO descarta RAM nao-ECC: bit invertido nao e detectado por circuito nenhum."
}
"""

PS_CONTEXTO = r"""
$ruido = @{
    'Microsoft-Windows-Kernel-Processor-Power' = @(55)
    'Microsoft-Windows-HttpService'            = @(112)
    'Microsoft-Windows-DistributedCOM'         = @(10016)
    'Microsoft-Windows-FilterManager'          = @(1, 6)
    'Microsoft-Windows-Dhcp-Client'            = @(50036, 50103)
    'Microsoft-Windows-DHCPv6-Client'          = @(51046)
    'Microsoft-Windows-Directory-Services-SAM' = @(16962, 16977, 16983)
}

$quedas = @(Get-WinEvent -FilterHashtable @{LogName='System'; Id=41} -MaxEvents __QUANTAS__ -ErrorAction SilentlyContinue)
if ($quedas.Count -eq 0) {
    "  -> Nenhuma queda registrada."
    return
}

foreach ($q in $quedas) {
    $t = $q.TimeCreated
    ""
    "  === Boot em " + $t.ToString('dd/MM HH:mm:ss') + " ==="

    $ev = @(Get-WinEvent -FilterHashtable @{LogName='System'; EndTime=$t.AddSeconds(-20)} -MaxEvents 60 -ErrorAction SilentlyContinue |
            Where-Object { -not ($ruido.ContainsKey($_.ProviderName) -and $ruido[$_.ProviderName] -contains $_.Id) } |
            Sort-Object TimeCreated)

    if ($ev.Count -eq 0) {
        "    (nada antes desta queda)"
        continue
    }

    $fim = $ev[-1].TimeCreated
    '    log parou as {0}  |  janela cega ate o boot: {1:N1} min' -f $fim.ToString('HH:mm:ss'), ($t - $fim).TotalMinutes

    $ev | Select-Object -Last 12 | ForEach-Object {
        [PSCustomObject]@{
            'Hora'     = $_.TimeCreated.ToString('HH:mm:ss')
            'Provider' = ($_.ProviderName -replace '^Microsoft-Windows-', '')
            'Id'       = $_.Id
            'Nivel'    = $_.LevelDisplayName
        }
    } | Format-Table -AutoSize | Out-String
}
"""


class WindowsKernelTelemetry:
    """Extrai logs do Event Viewer via subprocesso PowerShell, sem dependencias."""

    def __init__(self):
        self.ps_bin = "powershell"
        self.ps_args = ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command"]

    def _execute(self, query: str) -> str:
        """Executa a query. Forca UTF-8 antes de qualquer saida do PowerShell."""
        query = "[Console]::OutputEncoding = [Text.Encoding]::UTF8\n" + query
        try:
            process = subprocess.run(
                [self.ps_bin] + self.ps_args + [query],
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
            )
            if process.returncode != 0:
                return f"[erro do PowerShell] {process.stderr.strip()}"
            return process.stdout.strip()
        except Exception as e:
            return f"Excecao fatal no subprocesso: {e}"

    def extract_power_failures(self, limit: int = 20) -> None:
        """Quedas com bugcheck decodificado e intervalo entre elas."""
        print(f"\n[>] Extraindo os ultimos {limit} eventos criticos de energia (Kernel-Power 41)...")
        print(self._execute(PS_QUEDAS.replace("__LIMIT__", str(limit))))

    def extract_whea_architecture(self) -> None:
        """Erros reportados pelo silicio (machine check, barramento PCIe)."""
        print("\n[>] Auditando integridade de barramento PCIe e silicio (WHEA-Logger)...")
        print(self._execute(PS_WHEA))

    def extract_crash_context(self, quantas: int = 3) -> None:
        """Ultimos eventos ANTES de cada queda (cauda da sessao que morreu)."""
        print(f"\n[>] Cauda da sessao anterior nas ultimas {quantas} quedas...")
        print(self._execute(PS_CONTEXTO.replace("__QUANTAS__", str(quantas))))


if __name__ == "__main__":
    telemetry = WindowsKernelTelemetry()

    print("-" * 78)
    print(" ANALISADOR DE TELEMETRIA DE KERNEL ".center(78))
    print("-" * 78)

    telemetry.extract_power_failures(20)
    telemetry.extract_whea_architecture()
    telemetry.extract_crash_context(3)

    print("\n[ok] Auditoria concluida.\n")