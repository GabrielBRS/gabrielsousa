# Site pessoal v2 — gabrielbrsousa.dev

Reformulação completa do site pessoal de desenvolvedor, alinhada ao posicionamento do
CV 2026: **Engenheiro de IA Sênior & Tech Lead** — orquestração multiagente & RAG
(Python · LangGraph · CrewAI), inferência & model serving (Rust · vLLM · Triton) e
LLMOps sobre Kubernetes. Stack mantida: **Angular zoneless + SSR com prerender**,
igual ao site da Ortzion.

## O que mudou e por quê

**Posicionamento.** O site anterior vendia "C++/CUDA + Java/Spring enterprise" com
8+ anos. Esta versão espelha o CV 2026 e o LinkedIn atuais: camada agêntica como
prioridade primária, inferência/serving como secundária, plataforma/LLMOps como
terciária — e 9+ anos. Java/Go saíram do posicionamento (aparecem apenas como "base
enterprise" na trajetória, que é onde geram credibilidade sem diluir o sinal de IA).

**Trajetória sem datas.** A seção de trajetória é organizada por domínio e
resultado (Vivo, MTE/TCU, TJBA, valloo, Banco Inter, Sicoob, Caixa), com os números
reais do CV — 44M+ registros, ~8,79M reconciliados, −40% análise de risco, −90%
overhead, deploy 3d→2h, CST-IBS/CBS solo com go-live mai/2026 — e remete
explicitamente ao CV/LinkedIn para períodos. Um site pessoal é peça de
posicionamento, não um terceiro currículo público para manter sincronizado.

**i18n por rota (`/` = PT, `/en` = EN).** No modelo anterior (toggle por signal), o
inglês só existia após a hidratação — o Google nunca via a versão EN. Agora as duas
rotas são prerenderizadas com `<title>`, meta description, `og:*`, `canonical`,
`hreflang` e `<html lang>` corretos por idioma, mais `sitemap.xml` com alternates e
JSON-LD de `Person`. O toggle PT/EN continua existindo — ele navega entre as rotas.

**Identidade visual.** Saiu o verde-neon/scanline genérico; entrou a direção
"auditoria noturna": azul-noite da mesma família do navy da Ortzion (parentesco
visual entre os dois sites, sem se confundirem), acento âmbar e teal com semântica
de trace. A assinatura da página é o **painel de trace de decisão de agente** no
hero (spans `router.intent` → `llm.generate` com barras de duração) — literalmente
o que você constrói com Langfuse/OTel. Tipografia com história: **Archivo**
(display — família desenhada para arquivos/documentos oficiais), **Public Sans**
(texto — a fonte do design system do governo dos EUA; combina com quem prova valor
em auditoria federal) e **IBM Plex Mono** (dados/chips — herança enterprise).

**Fontes self-hosted.** O site anterior declarava `'JetBrains Mono'` e `'Inter'`
sem nunca carregá-las (caía no fallback do sistema). Agora as três famílias vêm por
`@fontsource` via npm — zero requisição a CDN externo, coerente com a prática
on-premise.

**Acessibilidade e higiene.** Skip-link, `aria-expanded`/`aria-label` no menu,
`focus-visible` visível, landmarks semânticos, contraste AA no texto secundário,
`prefers-reduced-motion` desligando todas as animações, `rel="noopener"` nos links
externos, `scroll-padding-top` para âncoras sob a navbar fixa.

**Tipos de verdade.** `home.ts` saiu de `public lang: any` para
`signal<Lang>`/`computed<SiteContent>` com interface completa em
`translations.ts` — campo faltando quebra o build, não a página.

## Arquivos do pacote → onde colar no projeto

| Arquivo do pacote                      | Destino no projeto                          |
| -------------------------------------- | ------------------------------------------- |
| `src/index.html`                       | `src/index.html`                            |
| `src/styles.scss`                      | `src/styles.scss`                           |
| `src/app/app.routes.ts`                | `src/app/app.routes.ts`                     |
| `src/app/app.routes.server.ts`         | `src/app/app.routes.server.ts` (inalterado) |
| `src/app/home/home.ts`                 | `src/app/home/home.ts`                      |
| `src/app/home/home.html`               | `src/app/home/home.html`                    |
| `src/app/home/home.scss`               | `src/app/home/home.scss`                    |
| `src/app/home/translations.ts`         | `src/app/home/translations.ts` (**novo**)   |
| `public/robots.txt`, `public/sitemap.xml` | `public/`                                |
| `deploy/Dockerfile`, `deploy/nginx.conf`  | `deploy/` (**novo**)                     |

`app.config.ts`, `app.html`, `app.ts`, `main.ts`, `main.server.ts` e `server.ts`
**não mudam**. O `home.spec.ts` atual continua passando (o componente ainda se
chama `Home`); se o teste reclamar de rota, adicione `provideRouter([])` no
`TestBed`.

## Passos para aplicar

```bash
# 1. Fontes self-hosted
npm i @fontsource-variable/archivo @fontsource-variable/public-sans @fontsource/ibm-plex-mono

# 2. Copiar os arquivos do pacote por cima (tabela acima)
#    Obs.: se o build reclamar do @import do Sass (deprecação), troque os
#    @import do styles.scss por estas entradas no array "styles" do angular.json:
#      node_modules/@fontsource-variable/archivo/index.css
#      node_modules/@fontsource-variable/public-sans/index.css
#      node_modules/@fontsource/ibm-plex-mono/400.css (e 500.css, 600.css)

# 3. Dev
npm start

# 4. Build com prerender (gera browser/, server/ e prerendered-routes.json;
#    / e /en saem como HTML estático)
npm run build
```

## Deploy no k3s (modo artifact, como no site da Ortzion)

```bash
npm run build
docker build -f deploy/Dockerfile -t registry.gitlab.com/gabriel-sousa-group/site-pessoal:v2 .
docker push registry.gitlab.com/gabriel-sousa-group/site-pessoal:v2
# ...ou importe via k3s ctr como no fluxo do iac.py da Ortzion/Pizza Amore
```

O Deployment `site-pessoal` já existe no cluster — basta apontar para a imagem
nova. **Confira o caminho do `dist/` no Dockerfile** (nome real do projeto no
`angular.json`): foi exatamente esse detalhe que quebrou o primeiro build do site
da Ortzion. Como `/` é rota prerenderizada, aqui não existe o problema da página
default do nginx na raiz.

## Pendências deliberadas

- **og:image** — não referenciei imagem OG para não apontar para um arquivo
  inexistente. Quando quiser, gere um card 1200×630 e adicione
  `<meta property="og:image" ...>` no `index.html`.
- **Favicon** — o `favicon.ico` atual do projeto é mantido; vale trocar por um
  ícone próprio (ex.: monograma "GS" no âmbar #F0A03C sobre #0A0E17), distinto do
  sol da Ortzion.
- **GitHub** — o site aponta para `github.com/GabrielBRS`; fixar (pin) os repositórios
  de agentes/inferência que você quer que recrutador veja primeiro multiplica o
  valor do botão "Explorar GitHub".
