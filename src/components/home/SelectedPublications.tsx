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
            <div className="mb-5 flex items-baseline justify-between gap-4">
                <h2 className="font-serif text-[1.9rem] font-medium leading-tight text-primary">{resolvedTitle}</h2>
                <Link
                    href="/publications"
                    prefetch={true}
                    className="rounded-[4px] px-2 py-1 font-mono text-xs text-neutral-500 transition-colors hover:bg-link-soft hover:text-primary"
                >
                    view all
                </Link>
            </div>

            <div className="space-y-5 sm:space-y-7">
                {publications.map((pub, index) => {
                    return (
                        <motion.article
                            key={pub.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.08 * index }}
                            className="group relative grid gap-5 py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-7 sm:py-5 md:grid-cols-[15rem_minmax(0,1fr)]"
                        >
                            <span
                                aria-hidden="true"
                                className="absolute left-0 top-4 h-10 w-px origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100 sm:top-5"
                            />
                            <PublicationPreview
                                publication={pub}
                                className="w-full max-w-[24rem] sm:w-52 md:w-60"
                                imageClassName="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.025]"
                            />
                            <div className="min-w-0 self-center">
                                <PublicationTitle
                                    publication={pub}
                                    className="mb-2 font-serif text-lg font-semibold leading-[1.25] text-primary transition-colors duration-200 group-hover:text-link"
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
