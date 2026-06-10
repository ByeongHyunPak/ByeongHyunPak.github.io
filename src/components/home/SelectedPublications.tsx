'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';
import {
    PublicationAuthors,
    PublicationLinks,
    PublicationMemo,
    PublicationPreview,
    PublicationTitle,
    PublicationVenue,
} from '@/components/publications/PublicationItemParts';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
}

export default function SelectedPublications({ publications, title }: SelectedPublicationsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.selectedPublications;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="block-section"
        >
            <div className="block-head">
                <h2>{resolvedTitle}</h2>
                <Link
                    href="/publications"
                    prefetch={true}
                    className="rounded-[4px] px-2 py-1 font-mono text-xs text-neutral-500 transition-colors hover:bg-link-soft hover:text-primary"
                >
                    view all
                </Link>
            </div>

            <div className="space-y-11 sm:space-y-12">
                {publications.map((pub, index) => {
                    return (
                        <motion.article
                            key={pub.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.08 * index }}
                            className="grid gap-4 sm:grid-cols-[230px_1fr] sm:gap-7 md:grid-cols-[260px_1fr]"
                        >
                            <PublicationPreview
                                publication={pub}
                                className="w-full max-w-[340px] flex-shrink-0 sm:w-[230px] md:w-[260px]"
                                imageClassName="mx-auto block max-h-[200px] w-auto max-w-full object-contain"
                            />
                            <div className="min-w-0">
                                <PublicationTitle
                                    publication={pub}
                                    className="mb-2 text-[1.35rem] font-semibold leading-tight text-primary"
                                />
                                <PublicationAuthors publication={pub} />
                                <PublicationVenue publication={pub} />
                                <PublicationMemo publication={pub} />
                                <PublicationLinks publication={pub} />
                            </div>
                        </motion.article>
                    );
                })}
            </div>
        </motion.section>
    );
}
