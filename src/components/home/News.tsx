'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import FormattedBibTeXText from '@/components/publications/FormattedBibTeXText';
import { useMessages } from '@/lib/i18n/useMessages';
import { parseBibTeXInline } from '@/lib/bibtexInline';

export interface NewsItem {
    date: string;
    content: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
    standalone?: boolean;
}

export default function News({ items, title, standalone = false }: NewsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.news;
    const visibleItems = standalone ? items : items.slice(0, 4);
    const dateColumnClass = standalone ? 'grid-cols-[116px_1fr]' : 'grid-cols-[86px_1fr]';
    const textSizeClass = standalone ? 'text-base' : 'text-sm';

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={standalone ? undefined : 'block-section'}
        >
            {standalone ? (
                <div className="mb-8">
                    <h1 className="mb-4 font-serif text-4xl font-bold text-primary">{resolvedTitle}</h1>
                </div>
            ) : (
                <div className="block-head">
                    <h2>{resolvedTitle}</h2>
                    <Link
                        href="/news"
                        prefetch={true}
                        className="rounded-[4px] px-2 py-1 font-mono text-xs text-neutral-500 transition-colors hover:bg-link-soft hover:text-primary"
                    >
                        view all
                    </Link>
                </div>
            )}
            <ul className="space-y-2">
                {visibleItems.map((item, index) => (
                    <li key={`${item.date}-${index}`} className={`grid ${dateColumnClass} gap-2 ${textSizeClass} leading-relaxed max-[420px]:grid-cols-1 max-[420px]:gap-0`}>
                        <span className={`font-mono ${textSizeClass} tracking-normal text-neutral-500`}>[{item.date}]</span>
                        <span className="text-neutral-700 dark:text-neutral-500">
                            <FormattedBibTeXText
                                fallback={item.content}
                                nodes={parseBibTeXInline(item.content).nodes}
                            />
                        </span>
                    </li>
                ))}
            </ul>
        </motion.section>
    );
}
