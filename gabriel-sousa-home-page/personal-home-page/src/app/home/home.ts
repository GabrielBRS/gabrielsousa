import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  public lang: any = signal('pt');
  public isMenuOpen: any = signal(false);

  public toggleMenu() { this.isMenuOpen.set(!this.isMenuOpen()); }

  private translations: any = {
    pt: {
      nav: { traj: 'Trajetória', phil: 'Filosofia', stack: 'Ecossistema', aimis: 'A.I.M.I.S' },
      hero: {
        pre: 'High Performance Computing & Software Engineering',
        title: 'Onde a Robustez Enterprise encontra a',
        highlight: 'Fronteira da IA.',
        desc: 'Arquiteto de Soluções Full-Cycle especializado em sistemas de missão crítica. Do refinamento de tensores em C++/CUDA à orquestração de microserviços em Java/Spring sobre Kubernetes.',
        exp: '8+ Anos de Experiência',
        connect: 'CONECTAR NO LINKEDIN',
        explore: 'EXPLORAR GITHUB'
      },
      arch: {
        label: '01. Abordagem Híbrida',
        item1: { t: 'AI Engineering & Model Serving', d: 'Atuação no ciclo de vida de modelos. Uso de Python para treino e C++ para otimização no NVIDIA Triton, garantindo latência mínima e eficiência de GPU.' },
        item2: { t: 'Platform Engineering (HPC)', d: 'Especialista em orquestração com Kubernetes e Rancher, criando ambientes escaláveis para cargas de trabalho intensivas.' },
        item3: { t: 'Enterprise Core Integrity', d: 'Base sólida em Java (Spring Boot) e Bancos Relacionais (Oracle/Postgres) para integrar IAs a sistemas transacionais críticos.' }
      },
      stack: {
        label: '02. Ecossistema Técnico',
        core: 'Engenharia Core',
        ai: 'AI & HPC',
        cloud: 'Cloud & Infra'
      },
      aimis: {
        label: '03. Protocol A.I.M.I.S.',
        tag: 'Research & Defense',
        desc: 'Framework de IA focado em Tomada de Decisão Autônoma em ambientes de alta incerteza. Simulação de integração entre cadeias logísticas industriais e cenários táticos.',
        feature1: 'Multi-Agent Reinforcement Learning (MARL)',
        feature2: 'Otimização Logística Just-in-Time for Defense',
        feature3: 'Visão Computacional e Telemetria'
      },
      traj: {
        label: '04. Trajetória de Impacto',
        bip: 'Consultor de Tecnologia Sênior. Projetos de escala europeia e sistemas de alta complexidade.',
        qintess: 'Modernização do TJBA. Migração estratégica de Oracle Forms para Java 17/Angular sobre K8s/Rancher.',
        valloo: 'Fintech. Redução de latência em 40% na análise de risco e automação de 90% dos processos AWS.',
        pizza: 'Arquiteto de Nuvem. Migração total para AWS e redução de 70% nas perdas de estoque via IA.',
        brb: 'Consolidação Full Stack no Banco BRB. Otimização crítica de queries SQL Server e APIs seguras.'
      },
      footer: {
        location: 'Brasília, DF - Atuação Global (Milão | Remota)',
        legal: 'Desenvolvido com Angular (Zoneless & SSR) por Gabriel Sousa.'
      }
    },
    en: {
      nav: { traj: 'Trajectory', phil: 'Philosophy', stack: 'Ecosystem', aimis: 'A.I.M.I.S' },
      hero: {
        pre: 'High Performance Computing & Software Engineering',
        title: 'Where Enterprise Robustness meets the',
        highlight: 'AI Frontier.',
        desc: 'Full-Cycle Solution Architect specialized in mission-critical systems. From C++/CUDA tensor refinement to Java/Spring microservices orchestration on Kubernetes.',
        exp: '8+ Years of Experience',
        connect: 'CONNECT ON LINKEDIN',
        explore: 'EXPLORE GITHUB'
      },
      arch: {
        label: '01. Hybrid Approach',
        item1: { t: 'AI Engineering & Model Serving', d: 'Acting on the model lifecycle. Python for training and C++ for NVIDIA Triton optimization, ensuring minimum latency.' },
        item2: { t: 'Platform Engineering (HPC)', d: 'Specialist in Kubernetes and Rancher orchestration, creating scalable environments for intensive workloads.' },
        item3: { t: 'Enterprise Core Integrity', d: 'Solid foundation in Java and Relational Databases to integrate AI into critical transactional systems.' }
      },
      stack: {
        label: '02. Technical Ecosystem',
        core: 'Core Engineering',
        ai: 'AI & HPC',
        cloud: 'Cloud & Infra'
      },
      aimis: {
        label: '03. Protocol A.I.M.I.S.',
        tag: 'Research & Defense',
        desc: 'AI Framework focused on Autonomous Decision Making in high uncertainty environments. Simulation of industrial logistics and tactical scenarios.',
        feature1: 'Multi-Agent Reinforcement Learning (MARL)',
        feature2: 'Just-in-Time for Defense Logistics Optimization',
        feature3: 'Computer Vision & Telemetry'
      },
      footer: {
        location: 'Brasília, Brazil - Global Reach (Milan | Remote)',
        legal: 'Developed with Angular (Zoneless & SSR) by Gabriel Sousa.'
      }
    }
  };

  public t: any = computed(() => this.translations[this.lang()]);
  public toggleLang() { this.lang.set(this.lang() === 'pt' ? 'en' : 'pt'); }
}
