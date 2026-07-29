import { Component, DOCUMENT, computed, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Lang,
  SITE_CONTENT,
  SiteContent,
  TRACE_ROWS,
  TraceRow,
} from './translations';

const BASE_URL = 'https://gabrielbrsousa.dev';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly doc = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  /** Idioma vem da rota ('' → pt, 'en' → en); cada rota é prerenderizada com o idioma certo. */
  readonly lang = signal<Lang>((this.route.snapshot.data['lang'] as Lang) ?? 'pt');
  readonly isMenuOpen = signal(false);

  readonly t = computed<SiteContent>(() => SITE_CONTENT[this.lang()]);
  readonly traceRows: TraceRow[] = TRACE_ROWS;
  readonly year = new Date().getFullYear();

  constructor() {
    // Executa também no prerender: cada HTML estático sai com <title>, metas,
    // lang, canonical e hreflang corretos por idioma.
    this.applySeo();
  }

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  /** Troca de idioma navegando entre as rotas prerenderizadas '/' e '/en'. */
  switchLang(): void {
    this.closeMenu();
    void this.router.navigateByUrl(this.lang() === 'pt' ? '/en' : '/');
  }

  private applySeo(): void {
    const lang = this.lang();
    const seo = SITE_CONTENT[lang].seo;
    const canonical = lang === 'pt' ? `${BASE_URL}/` : `${BASE_URL}/en`;

    this.doc.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    this.titleService.setTitle(seo.title);

    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({
      property: 'og:locale',
      content: lang === 'pt' ? 'pt_BR' : 'en_US',
    });

    this.setLink('canonical', canonical, {});
    this.setLink('alternate', `${BASE_URL}/`, { hreflang: 'pt-BR' });
    this.setLink('alternate', `${BASE_URL}/en`, { hreflang: 'en' });
    this.setLink('alternate', `${BASE_URL}/`, { hreflang: 'x-default' });
  }

  /** Cria/atualiza <link> no <head> de forma idempotente — funciona no SSR e no browser. */
  private setLink(
    rel: string,
    href: string,
    attrs: Record<string, string>,
  ): void {
    const hreflang = attrs['hreflang'];
    const selector = hreflang
      ? `link[rel="${rel}"][hreflang="${hreflang}"]`
      : `link[rel="${rel}"]`;

    let el = this.doc.head.querySelector<HTMLLinkElement>(selector);
    if (!el) {
      el = this.doc.createElement('link');
      el.rel = rel;
      if (hreflang) {
        el.setAttribute('hreflang', hreflang);
      }
      this.doc.head.appendChild(el);
    }
    el.href = href;
  }
}
