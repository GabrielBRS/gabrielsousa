/**
 * Conteúdo do site em PT e EN, tipado de ponta a ponta.
 * Fonte da verdade textual: CV 2026 (EN/PT-BR).
 * Nenhum `any` — o template quebra em build se um campo faltar.
 */

export type Lang = 'pt' | 'en';

export interface NavContent {
  eng: string;
  stack: string;
  projects: string;
  track: string;
  education: string;
}

export interface HeroContent {
  pre: string;
  title: string;
  highlight: string;
  desc: string;
  metrics: { value: string; label: string }[];
  connect: string;
  explore: string;
  consultPrefix: string;
  consultLink: string;
}

export interface TraceContent {
  panelTitle: string;
  colSpan: string;
  colDur: string;
  caption: string;
}

export interface PillarItem {
  n: string;
  t: string;
  d: string;
}

export interface StackColumn {
  title: string;
  tags: string[];
}

export interface ProjectCard {
  name: string;
  status: string;
  desc: string;
  tags: string[];
}

export interface TrackItem {
  chip: string;
  title: string;
  desc: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
}

export interface SiteContent {
  nav: NavContent;
  hero: HeroContent;
  trace: TraceContent;
  eng: { eyebrow: string; lead: string; items: PillarItem[] };
  stack: { eyebrow: string; columns: StackColumn[] };
  projects: {
    eyebrow: string;
    lead: string;
    ctaPrefix: string;
    ctaLink: string;
    cards: ProjectCard[];
  };
  track: { eyebrow: string; lead: string; items: TrackItem[] };
  education: {
    eyebrow: string;
    items: EducationItem[];
    credsTitle: string;
    creds: string[];
    langsTitle: string;
    langs: string;
  };
  footer: { location: string; email: string; legal: string };
  a11y: { skip: string; menu: string; langSwitch: string };
  seo: { title: string; description: string };
}

export const SITE_CONTENT: Record<Lang, SiteContent> = {
  pt: {
    nav: {
      eng: 'Engenharia',
      stack: 'Stack',
      projects: 'Projetos',
      track: 'Trajetória',
      education: 'Formação',
    },
    hero: {
      pre: 'Engenheiro de IA Sênior & Tech Lead — Brasília, DF · Remoto global',
      title: 'Sistemas agênticos em produção, com',
      highlight: 'cada decisão rastreável.',
      desc:
        'Orquestração multiagente e RAG em Python (LangGraph · CrewAI) para setores regulados — ' +
        'FinTech, GovTech, LegalTech, Telecom e Saúde. Inferência e model serving com Rust, vLLM e ' +
        'NVIDIA Triton sobre Kubernetes e GPU on-premise. Nove anos levando sistemas de missão ' +
        'crítica do protótipo à produção sob escrutínio de auditoria federal.',
      metrics: [
        { value: '9+', label: 'anos em missão crítica' },
        { value: '44M+', label: 'registros · ML federal' },
        { value: '5', label: 'setores regulados' },
      ],
      connect: 'CONECTAR NO LINKEDIN',
      explore: 'EXPLORAR GITHUB',
      consultPrefix: 'Contratação via consultoria (B2B/PJ):',
      consultLink: 'ortzion.com',
    },
    trace: {
      panelTitle: 'trace · decisão de agente',
      colSpan: 'span',
      colDur: 'dur',
      caption:
        'Autonomia delimitada, tool-use tipado e tracing ponta a ponta — Langfuse · OpenTelemetry.',
    },
    eng: {
      eyebrow: 'engenharia · hierarquia de atuação',
      lead:
        'Três camadas, em ordem deliberada de prioridade: a camada agêntica é o produto, ' +
        'a inferência é o motor, a plataforma é o chão de fábrica.',
      items: [
        {
          n: '01',
          t: 'Orquestração Multiagente & RAG',
          d:
            'Sistemas agênticos em Python com LangGraph e CrewAI: roteamento determinístico, ' +
            'contratos de ferramentas tipados, fronteiras explícitas de autonomia e retrieval ' +
            'ancorado em bases corporativas. Plataformas cognitivas auditáveis — sem expor o ' +
            'negócio ao risco de alucinação.',
        },
        {
          n: '02',
          t: 'Inferência & Model Serving',
          d:
            'Serving de modelos com vLLM e NVIDIA Triton, APIs de alta concorrência em Rust ' +
            '(Tokio · Axum) e gRPC, e infraestrutura própria de GPU para latência e custo por ' +
            'token sob controle — inclusive onde a nuvem pública não pode entrar.',
        },
        {
          n: '03',
          t: 'Plataforma de IA & LLMOps',
          d:
            'Kubernetes (k3s · Rancher), CI/CD, MLflow e observabilidade com Langfuse e ' +
            'OpenTelemetry. Esteiras que transformam protótipo em carga de produção com ' +
            'linhagem de dados, avaliação contínua e comportamento defensável em auditoria.',
        },
      ],
    },
    stack: {
      eyebrow: 'stack · ecossistema técnico',
      columns: [
        {
          title: 'Orquestração & Agentes',
          tags: [
            'Python', 'LangGraph', 'CrewAI', 'LangChain', 'AutoGen', 'MCP',
            'Structured Outputs', 'FastAPI',
          ],
        },
        {
          title: 'LLMs, Retrieval & ML',
          tags: [
            'RAG', 'Milvus', 'pgvector', 'Busca híbrida', 'Ollama', 'PyTorch',
            'XGBoost', 'BERTimbau', 'Polars',
          ],
        },
        {
          title: 'Serving & Performance',
          tags: [
            'Rust', 'Tokio', 'Axum', 'vLLM', 'NVIDIA Triton', 'gRPC', 'Protobuf',
            'Redis', 'Kafka',
          ],
        },
        {
          title: 'Plataforma & Compliance',
          tags: [
            'Kubernetes', 'k3s', 'Rancher', 'Docker', 'Terraform', 'MLflow',
            'Langfuse', 'OpenTelemetry', 'Keycloak', 'OAuth 2.0 / OIDC', 'LGPD',
          ],
        },
      ],
    },
    projects: {
      eyebrow: 'projetos · consultoria Ortzion',
      lead:
        'Pela Ortzion — consultoria independente de engenharia de IA, com prática on-premise ' +
        'first: Kubernetes self-hosted (k3s) e GPU em bare metal para cargas que não podem ir ' +
        'à nuvem pública. Contratável como empresa (B2B/PJ) ou diretamente como profissional.',
      ctaPrefix: 'Conhecer a consultoria:',
      ctaLink: 'ortzion.com',
      cards: [
        {
          name: 'SmartFinance',
          status: 'FinTech · em produção ativa',
          desc:
            'Plataforma de agentes de IA para fluxos financeiros: polyrepo Python sobre ' +
            'FastAPI/Granian, orquestração em LangGraph e CrewAI, retrieval em Milvus e ' +
            'pgvector, inferência via cliente gRPC do Triton. Caminhos críticos de ' +
            'performance deslocados para Rust.',
          tags: ['Python', 'LangGraph', 'CrewAI', 'Milvus', 'Triton', 'Rust'],
        },
        {
          name: 'MaisClinical (MedMyia)',
          status: 'HealthTech · alvo SaMD Classe II — ANVISA',
          desc:
            'Backend de apoio à decisão clínica combinando ciência de dados com agentes de ' +
            'LLM e RAG sobre fontes de conhecimento médico. Contratos de tool-use tipados ' +
            'para saídas determinísticas e auditáveis — requisito inegociável em software ' +
            'de saúde regulado.',
          tags: ['Python', 'CrewAI', 'LangGraph', 'RAG', 'LGPD'],
        },
        {
          name: 'A.I.M.I.S.',
          status: 'Pesquisa aplicada · defesa & logística',
          desc:
            'Framework de pesquisa em tomada de decisão autônoma sob alta incerteza: ' +
            'aprendizado por reforço multiagente (MARL), otimização logística just-in-time ' +
            'para cenários táticos, visão computacional e telemetria.',
          tags: ['MARL', 'PyTorch', 'Visão computacional', 'Telemetria'],
        },
      ],
    },
    track: {
      eyebrow: 'trajetória · provas de produção',
      lead:
        'Resultados por domínio — os detalhes completos, com períodos e escopo, estão no ' +
        'CV e no LinkedIn.',
      items: [
        {
          chip: 'TELECOM · IA CONVERSACIONAL',
          title: 'Vivo — plataforma de IA generativa (programa Agent Factory)',
          desc:
            'Liderança técnica do ecossistema multiagente que atende interações com clientes ' +
            'e fluxos comerciais: LangGraph/CrewAI sobre arquitetura hexagonal, memória ' +
            'contextual em dois níveis (Redis + MongoDB), integração A2A/JSON-RPC e tracing ' +
            'com Langfuse como baseline de governança. Template de agente adotado como ' +
            'convenção pelas demais squads.',
        },
        {
          chip: 'GOVTECH · AUDITORIA TCU',
          title: 'Ministério do Trabalho (SINTRA) — classificação em escala nacional',
          desc:
            'Pipeline de ML (XGBoost · BERTimbau · Polars) sobre base federal de 44M+ ' +
            'registros do eSocial, com reconciliação de ~8,79M registros classificados ' +
            'incorretamente e linhagem completa de decisão — cada classificação rastreável ' +
            'e defensável perante o TCU.',
        },
        {
          chip: 'LEGALTECH · LGPD',
          title: 'Tribunal de Justiça da Bahia — plataforma cognitiva',
          desc:
            'PLN sobre processos judiciais não estruturados, núcleo agêntico com roteamento ' +
            'determinístico e RAG seguro cruzando jurisprudência e normativa interna. ' +
            'Deploys com GPU em Kubernetes via Rancher e identidade zero-trust com Keycloak.',
        },
        {
          chip: 'FINTECH · RISCO & FRAUDE',
          title: 'valloo — sistemas de alto throughput',
          desc:
            'Camada de inteligência para classificação de contratos isolada do core ' +
            'transacional; refatoração da detecção de anomalias com redução de 40% no tempo ' +
            'de análise de risco e automação de provisionamento que cortou 90% do overhead ' +
            'operacional na AWS.',
        },
        {
          chip: 'BANKING DIGITAL · BACEN',
          title: 'Banco Inter — plataforma corporativa de IA',
          desc:
            'APIs preditivas de alta performance (FastAPI · gRPC) servindo microsserviços ' +
            'transacionais em pico, gateways seguros internalizando capacidades de LLM e ' +
            'RAG financeiro sobre pgvector/Milvus — isolado, auditado e governado sob ' +
            'exigências do Bacen e da LGPD.',
        },
        {
          chip: 'FISCAL & CONTÁBIL · REFORMA TRIBUTÁRIA',
          title: 'Sicoob — módulo CST-IBS/CBS entregue solo',
          desc:
            'Entrega ponta a ponta e individual do módulo CST-IBS/CBS da reforma tributária ' +
            '— escopo originalmente dimensionado para três engenheiros em ~13 semanas — com ' +
            'go-live em maio de 2026, modelagem bitemporal em IBM DB2 e reconhecimento em ' +
            'nível de diretoria.',
        },
        {
          chip: 'BASE ENTERPRISE · DESDE 2017',
          title: 'Caixa Econômica Federal e consultoria Java/Angular',
          desc:
            'Raiz em sistemas bancários de missão crítica: ciclo de deploy reduzido de ~3 ' +
            'dias para ~2 horas na plataforma SISAM, migração de monólitos MUMPS/Caché para ' +
            'microsserviços Spring Boot/Oracle e quase uma década de Java, Angular e ' +
            'Kubernetes em ambientes regulados.',
        },
      ],
    },
    education: {
      eyebrow: 'formação · credenciais',
      items: [
        {
          degree: 'MBA em Inteligência Artificial Generativa',
          school: 'Universidade Cruzeiro do Sul',
          period: 'em andamento',
        },
        {
          degree: 'MBA em Gestão de Projetos',
          school: 'Universidade Cruzeiro do Sul',
          period: 'em andamento',
        },
        {
          degree: 'MBA em Inteligência Artificial & Analytics',
          school: 'Universidade Cruzeiro do Sul',
          period: '2021 – 2023',
        },
        {
          degree: 'Bacharelado em Engenharia de Software',
          school: 'Universidade Cruzeiro do Sul',
          period: '2020 – 2023',
        },
        {
          degree: 'Bacharelado em Relações Internacionais',
          school: 'UDF Centro Universitário',
          period: '2015 – 2018',
        },
      ],
      credsTitle: 'Registro profissional',
      creds: ['CREA-DF nº 35095/D-DF — título de Engenheiro de Software'],
      langsTitle: 'Idiomas',
      langs: 'Português (nativo) · Espanhol (avançado) · Inglês (avançado)',
    },
    footer: {
      location: 'Brasília, DF (GMT-3) · Remoto global · PJ (Ortzion) ou CLT',
      email: 'gabriel.brs.gsousa@gmail.com',
      legal: 'Angular · SSR & prerender · self-hosted em k3s — por Gabriel Sousa.',
    },
    a11y: {
      skip: 'Pular para o conteúdo',
      menu: 'Abrir menu de navegação',
      langSwitch: 'Switch to English',
    },
    seo: {
      title:
        'Gabriel Barros Sousa — Engenheiro de IA Sênior & Tech Lead | Agentes, RAG & Inferência',
      description:
        'Sistemas multiagentes e RAG em produção (Python · LangGraph · CrewAI), inferência e ' +
        'model serving (Rust · vLLM · Triton) e LLMOps em Kubernetes para setores regulados.',
    },
  },

  en: {
    nav: {
      eng: 'Engineering',
      stack: 'Stack',
      projects: 'Projects',
      track: 'Track record',
      education: 'Education',
    },
    hero: {
      pre: 'Senior AI Engineer & Tech Lead — Brasília, Brazil · Remote worldwide',
      title: 'Agentic systems in production, with',
      highlight: 'every decision traceable.',
      desc:
        'Multi-agent orchestration and RAG in Python (LangGraph · CrewAI) for regulated ' +
        'sectors — FinTech, GovTech, LegalTech, Telecom and Health. Inference and model ' +
        'serving with Rust, vLLM and NVIDIA Triton on Kubernetes and on-premise GPU. ' +
        'Nine years taking mission-critical systems from prototype to production under ' +
        'federal audit scrutiny.',
      metrics: [
        { value: '9+', label: 'years in mission-critical' },
        { value: '44M+', label: 'records · federal ML' },
        { value: '5', label: 'regulated sectors' },
      ],
      connect: 'CONNECT ON LINKEDIN',
      explore: 'EXPLORE GITHUB',
      consultPrefix: 'Hiring through the consultancy (B2B):',
      consultLink: 'ortzion.com',
    },
    trace: {
      panelTitle: 'trace · agent decision',
      colSpan: 'span',
      colDur: 'dur',
      caption:
        'Bounded autonomy, typed tool-use and end-to-end tracing — Langfuse · OpenTelemetry.',
    },
    eng: {
      eyebrow: 'engineering · working hierarchy',
      lead:
        'Three layers, in a deliberate order of priority: the agentic layer is the product, ' +
        'inference is the engine, the platform is the factory floor.',
      items: [
        {
          n: '01',
          t: 'Multi-Agent Orchestration & RAG',
          d:
            'Agentic systems in Python with LangGraph and CrewAI: deterministic routing, ' +
            'typed tool contracts, explicit autonomy boundaries and retrieval grounded in ' +
            'corporate knowledge. Auditable cognitive platforms — without exposing the ' +
            'business to hallucination risk.',
        },
        {
          n: '02',
          t: 'Inference & Model Serving',
          d:
            'Model serving with vLLM and NVIDIA Triton, high-concurrency APIs in Rust ' +
            '(Tokio · Axum) and gRPC, and self-managed GPU infrastructure keeping latency ' +
            'and cost per token under control — including where public cloud is not an option.',
        },
        {
          n: '03',
          t: 'AI Platform & LLMOps',
          d:
            'Kubernetes (k3s · Rancher), CI/CD, MLflow and observability with Langfuse and ' +
            'OpenTelemetry. Delivery paths that turn prototypes into production workloads ' +
            'with data lineage, continuous evaluation and audit-defensible behaviour.',
        },
      ],
    },
    stack: {
      eyebrow: 'stack · technical ecosystem',
      columns: [
        {
          title: 'Orchestration & Agents',
          tags: [
            'Python', 'LangGraph', 'CrewAI', 'LangChain', 'AutoGen', 'MCP',
            'Structured Outputs', 'FastAPI',
          ],
        },
        {
          title: 'LLMs, Retrieval & ML',
          tags: [
            'RAG', 'Milvus', 'pgvector', 'Hybrid search', 'Ollama', 'PyTorch',
            'XGBoost', 'BERTimbau', 'Polars',
          ],
        },
        {
          title: 'Serving & Performance',
          tags: [
            'Rust', 'Tokio', 'Axum', 'vLLM', 'NVIDIA Triton', 'gRPC', 'Protobuf',
            'Redis', 'Kafka',
          ],
        },
        {
          title: 'Platform & Compliance',
          tags: [
            'Kubernetes', 'k3s', 'Rancher', 'Docker', 'Terraform', 'MLflow',
            'Langfuse', 'OpenTelemetry', 'Keycloak', 'OAuth 2.0 / OIDC', 'LGPD',
          ],
        },
      ],
    },
    projects: {
      eyebrow: 'projects · Ortzion consultancy',
      lead:
        'Through Ortzion — an independent AI engineering consultancy with an on-premise-first ' +
        'practice: self-hosted Kubernetes (k3s) and bare-metal GPU for workloads that cannot ' +
        'move to public cloud. Available as a company (B2B) or directly as an individual.',
      ctaPrefix: 'Meet the consultancy:',
      ctaLink: 'ortzion.com',
      cards: [
        {
          name: 'SmartFinance',
          status: 'FinTech · in active production',
          desc:
            'AI-agent platform for financial workflows: Python polyrepo on FastAPI/Granian, ' +
            'orchestration in LangGraph and CrewAI, retrieval on Milvus and pgvector, ' +
            'inference through a Triton gRPC client. Performance-critical paths moved to Rust.',
          tags: ['Python', 'LangGraph', 'CrewAI', 'Milvus', 'Triton', 'Rust'],
        },
        {
          name: 'MaisClinical (MedMyia)',
          status: 'HealthTech · targeting ANVISA Class II SaMD',
          desc:
            'Clinical decision-support backend combining data-science pipelines with LLM ' +
            'agents and RAG over medical knowledge sources. Typed tool-use contracts for ' +
            'deterministic, auditable outputs — non-negotiable in regulated health software.',
          tags: ['Python', 'CrewAI', 'LangGraph', 'RAG', 'LGPD'],
        },
        {
          name: 'A.I.M.I.S.',
          status: 'Applied research · defence & logistics',
          desc:
            'Research framework for autonomous decision-making under high uncertainty: ' +
            'multi-agent reinforcement learning (MARL), just-in-time logistics optimisation ' +
            'for tactical scenarios, computer vision and telemetry.',
          tags: ['MARL', 'PyTorch', 'Computer vision', 'Telemetry'],
        },
      ],
    },
    track: {
      eyebrow: 'track record · production proof',
      lead:
        'Results by domain — full details, periods and scope live in the CV and on LinkedIn.',
      items: [
        {
          chip: 'TELECOM · CONVERSATIONAL AI',
          title: 'Vivo — generative AI platform (Agent Factory programme)',
          desc:
            'Technical lead of the multi-agent ecosystem handling customer interactions and ' +
            'commercial flows: LangGraph/CrewAI over a hexagonal architecture, two-tier ' +
            'contextual memory (Redis + MongoDB), A2A/JSON-RPC integration and Langfuse ' +
            'tracing as the governance baseline. Agent template adopted as the convention ' +
            'across squads.',
        },
        {
          chip: 'GOVTECH · TCU AUDIT',
          title: 'Ministry of Labour (SINTRA) — national-scale classification',
          desc:
            'ML pipeline (XGBoost · BERTimbau · Polars) over a 44M+ record federal eSocial ' +
            'dataset, reconciling ~8.79M misclassified records with full decision lineage — ' +
            'every automated classification traceable and defensible before the federal ' +
            'audit court (TCU).',
        },
        {
          chip: 'LEGALTECH · LGPD',
          title: 'Court of Justice of Bahia — cognitive platform',
          desc:
            'NLP over unstructured court cases, an agentic core with deterministic routing ' +
            'and secure RAG across case law and internal policy. GPU deployments on ' +
            'Kubernetes via Rancher with zero-trust identity on Keycloak.',
        },
        {
          chip: 'FINTECH · RISK & FRAUD',
          title: 'valloo — high-throughput systems',
          desc:
            'Intelligence layer for contract classification isolated from the transactional ' +
            'core; anomaly-detection refactor cutting risk-analysis time by 40% and ' +
            'provisioning automation removing 90% of operational overhead on AWS.',
        },
        {
          chip: 'DIGITAL BANKING · CENTRAL BANK',
          title: 'Banco Inter — corporate AI platform',
          desc:
            'High-performance predictive APIs (FastAPI · gRPC) serving transactional ' +
            'microservices at peak, secure gateways internalising LLM capabilities and ' +
            'financial RAG on pgvector/Milvus — isolated, audited and governed under ' +
            'Central Bank and LGPD requirements.',
        },
        {
          chip: 'TAX & ACCOUNTING · TAX REFORM',
          title: 'Sicoob — CST-IBS/CBS module delivered solo',
          desc:
            'End-to-end individual delivery of the tax-reform CST-IBS/CBS module — scope ' +
            'originally sized for three engineers over ~13 weeks — with production go-live ' +
            'in May 2026, bitemporal modelling on IBM DB2 and director-level recognition.',
        },
        {
          chip: 'ENTERPRISE FOUNDATION · SINCE 2017',
          title: 'Caixa Econômica Federal and Java/Angular consulting',
          desc:
            'Roots in mission-critical banking: deploy cycle cut from ~3 days to ~2 hours ' +
            'on the SISAM platform, migration of MUMPS/Caché monoliths to Spring ' +
            'Boot/Oracle microservices, and nearly a decade of Java, Angular and ' +
            'Kubernetes in regulated environments.',
        },
      ],
    },
    education: {
      eyebrow: 'education · credentials',
      items: [
        {
          degree: 'MBA in Generative Artificial Intelligence',
          school: 'Universidade Cruzeiro do Sul',
          period: 'in progress',
        },
        {
          degree: 'MBA in Project Management',
          school: 'Universidade Cruzeiro do Sul',
          period: 'in progress',
        },
        {
          degree: 'MBA in Artificial Intelligence & Analytics',
          school: 'Universidade Cruzeiro do Sul',
          period: '2021 – 2023',
        },
        {
          degree: 'B.Sc. in Software Engineering',
          school: 'Universidade Cruzeiro do Sul',
          period: '2020 – 2023',
        },
        {
          degree: 'B.A. in International Relations',
          school: 'UDF Centro Universitário',
          period: '2015 – 2018',
        },
      ],
      credsTitle: 'Professional registration',
      creds: ['CREA-DF no. 35095/D-DF — chartered Software Engineer (Brazil)'],
      langsTitle: 'Languages',
      langs: 'Portuguese (native) · Spanish (advanced) · English (advanced)',
    },
    footer: {
      location: 'Brasília, Brazil (GMT-3) · Remote worldwide · B2B (Ortzion) or direct hire',
      email: 'gabriel.brs.gsousa@gmail.com',
      legal: 'Angular · SSR & prerender · self-hosted on k3s — by Gabriel Sousa.',
    },
    a11y: {
      skip: 'Skip to content',
      menu: 'Open navigation menu',
      langSwitch: 'Mudar para português',
    },
    seo: {
      title:
        'Gabriel Barros Sousa — Senior AI Engineer & Tech Lead | Agents, RAG & Inference',
      description:
        'Multi-agent systems and RAG in production (Python · LangGraph · CrewAI), inference ' +
        'and model serving (Rust · vLLM · Triton) and LLMOps on Kubernetes for regulated sectors.',
    },
  },
};

/** Linhas do painel de trace do hero — nomes de span são código, não se traduzem. */
export interface TraceRow {
  name: string;
  ms: number;
  /** largura da barra em %, escala manual quase-log para leitura visual */
  bar: number;
  kind: 'infra' | 'tool' | 'llm';
}

export const TRACE_ROWS: TraceRow[] = [
  { name: 'router.intent', ms: 12, bar: 14, kind: 'infra' },
  { name: 'rag.retrieve', ms: 48, bar: 30, kind: 'tool' },
  { name: 'guardrail.policy', ms: 6, bar: 9, kind: 'infra' },
  { name: 'tool.crm.lookup', ms: 31, bar: 24, kind: 'tool' },
  { name: 'llm.generate', ms: 412, bar: 92, kind: 'llm' },
];
