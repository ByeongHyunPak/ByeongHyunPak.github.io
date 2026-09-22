'use client';

import PublicationsList from '@/components/publications/PublicationsList';
import TextPage from '@/components/pages/TextPage';
import CardPage from '@/components/pages/CardPage';
import News from '@/components/home/News';
import { Publication } from '@/types/publication';
import {
  PublicationPageConfig,
  TextPageConfig,
  CardPageConfig,
  NewsPageConfig,
} from '@/types/page';
import { useLocaleStore } from '@/lib/stores/localeStore';

export type DynamicPageLocaleData =
  | { type: 'publication'; config: PublicationPageConfig; publications: Publication[] }
  | { type: 'text'; config: TextPageConfig; content: string }
  | { type: 'card'; config: CardPageConfig }
  | { type: 'news'; config: NewsPageConfig };

interface DynamicPageClientProps {
  dataByLocale: Record<string, DynamicPageLocaleData>;
  defaultLocale: string;
}

export default function DynamicPageClient({ dataByLocale, defaultLocale }: DynamicPageClientProps) {
  const locale = useLocaleStore((state) => state.locale);
  const fallback = dataByLocale[defaultLocale] || Object.values(dataByLocale)[0];
  const pageData = dataByLocale[locale] || fallback;

  if (!pageData) {
    return null;
  }

  const pageWidth = pageData.type === 'publication' ? 'max-w-5xl' : 'max-w-4xl';

  return (
    <div className={`${pageWidth} mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16`}>
      {pageData.type === 'publication' && (
        <PublicationsList config={pageData.config} publications={pageData.publications} />
      )}
      {pageData.type === 'text' && (
        <TextPage config={pageData.config} content={pageData.content} />
      )}
      {pageData.type === 'card' && (
        <CardPage config={pageData.config} />
      )}
      {pageData.type === 'news' && (
        <News items={pageData.config.news} title={pageData.config.title} standalone={true} />
      )}
    </div>
  );
}
