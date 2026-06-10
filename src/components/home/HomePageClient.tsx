'use client';

import Profile from '@/components/home/Profile';
import About from '@/components/home/About';
import SelectedPublications from '@/components/home/SelectedPublications';
import News, { NewsItem } from '@/components/home/News';
import PublicationsList from '@/components/publications/PublicationsList';
import TextPage from '@/components/pages/TextPage';
import CardPage from '@/components/pages/CardPage';
import type { SiteConfig } from '@/lib/config';
import { Publication } from '@/types/publication';
import { CardPageConfig, NewsPageConfig, PublicationPageConfig, TextPageConfig } from '@/types/page';
import { useLocaleStore } from '@/lib/stores/localeStore';

interface SectionConfig {
  id: string;
  type: 'markdown' | 'publications' | 'list';
  title?: string;
  source?: string;
  filter?: string;
  limit?: number;
  content?: string;
  publications?: Publication[];
  items?: NewsItem[];
}

type PageData =
  | { type: 'about'; id: string; sections: SectionConfig[] }
  | { type: 'publication'; id: string; config: PublicationPageConfig; publications: Publication[] }
  | { type: 'text'; id: string; config: TextPageConfig; content: string }
  | { type: 'card'; id: string; config: CardPageConfig }
  | { type: 'news'; id: string; config: NewsPageConfig };

export interface HomePageLocaleData {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  features: SiteConfig['features'];
  enableOnePageMode?: boolean;
  researchInterests?: string[];
  pagesToShow: PageData[];
}

interface HomePageClientProps {
  dataByLocale: Record<string, HomePageLocaleData>;
  defaultLocale: string;
}

export default function HomePageClient({ dataByLocale, defaultLocale }: HomePageClientProps) {
  const locale = useLocaleStore((state) => state.locale);
  const fallback = dataByLocale[defaultLocale] || Object.values(dataByLocale)[0];
  const data = dataByLocale[locale] || fallback;

  if (!data) {
    return null;
  }

  const heroIntroSection = data.pagesToShow
    .find((page): page is Extract<PageData, { type: 'about' }> => page.type === 'about')
    ?.sections.find((section) => section.type === 'markdown' && section.content);

  return (
    <div className="mx-auto min-h-screen max-w-[950px] bg-background px-5 py-10 sm:px-7 sm:py-16">
      <Profile
        author={data.author}
        social={data.social}
        features={data.features}
        introContent={heroIntroSection?.content}
      />

      <div className="space-y-12 sm:space-y-14">
        {data.pagesToShow.map((page) => (
          <section key={page.id} id={page.id} className="scroll-mt-24 space-y-12 sm:space-y-14">
            {page.type === 'about' && page.sections.map((section: SectionConfig) => {
              if (section.id === heroIntroSection?.id && section.type === 'markdown') {
                return null;
              }

              switch (section.type) {
                case 'markdown':
                  return (
                    <About
                      key={section.id}
                      content={section.content || ''}
                      title={section.title}
                    />
                  );
                case 'publications':
                  return (
                    <SelectedPublications
                      key={section.id}
                      publications={section.publications || []}
                      title={section.title}
                    />
                  );
                case 'list':
                  return (
                    <News
                      key={section.id}
                      items={section.items || []}
                      title={section.title}
                    />
                  );
                default:
                  return null;
              }
            })}
            {page.type === 'publication' && (
              <PublicationsList
                config={page.config}
                publications={page.publications}
                embedded={true}
              />
            )}
            {page.type === 'text' && (
              <TextPage
                config={page.config}
                content={page.content}
                embedded={true}
              />
            )}
            {page.type === 'card' && (
              <CardPage
                config={page.config}
                embedded={true}
              />
            )}
            {page.type === 'news' && (
              <News
                items={page.config.news}
                title={page.config.title}
              />
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
