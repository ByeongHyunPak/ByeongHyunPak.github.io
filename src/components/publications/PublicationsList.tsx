'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Publication } from '@/types/publication';
import { PublicationPageConfig } from '@/types/page';
import { useMessages } from '@/lib/i18n/useMessages';
import {
    PublicationAuthors,
    PublicationLinks,
    PublicationMemo,
    PublicationPreview,
    PublicationTitle,
    PublicationVenue,
} from './PublicationItemParts';

interface PublicationsListProps {
    config: PublicationPageConfig;
    publications: Publication[];
    embedded?: boolean;
}

type PublicationSection = {
    id: string;
    title: string;
    types: Publication['type'][];
};

const publicationSections: PublicationSection[] = [
    { id: 'conference-papers', title: 'Conference Papers', types: ['conference'] },
    { id: 'workshop-papers', title: 'Workshop Papers', types: ['workshop'] },
    { id: 'preprints', title: 'Preprints', types: ['preprint'] },
];

type GroupedPublicationSection = Omit<PublicationSection, 'types'> & {
    publications: Publication[];
};

function groupPublications(publications: Publication[]): GroupedPublicationSection[] {
    const grouped = new Map<Publication['type'], Publication[]>();

    publications.forEach((publication) => {
        const current = grouped.get(publication.type) || [];
        current.push(publication);
        grouped.set(publication.type, current);
    });

    const sections = publicationSections
        .map((section) => ({
            id: section.id,
            title: section.title,
            publications: section.types.flatMap((type) => grouped.get(type) || []),
        }))
        .filter((section) => section.publications.length > 0);

    const groupedTypes = new Set(publicationSections.flatMap((section) => section.types));
    const otherPublications = publications.filter((publication) => !groupedTypes.has(publication.type));

    if (otherPublications.length > 0) {
        sections.push({
            id: 'other-publications',
            title: 'Other Publications',
            publications: otherPublications,
        });
    }

    return sections;
}

export default function PublicationsList({ config, publications, embedded = false }: PublicationsListProps) {
    const messages = useMessages();
    const sections = useMemo(() => groupPublications(publications), [publications]);

    const renderPublication = (pub: Publication, index: number) => (
        <motion.article
            key={pub.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.28) }}
            className="group relative grid gap-5 py-7 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-7 sm:py-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-9"
        >
            <span
                aria-hidden="true"
                className="absolute left-0 top-7 h-10 w-px origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100 sm:top-8"
            />
            <PublicationPreview
                publication={pub}
                className="w-full max-w-[24rem] sm:w-52 lg:w-[17rem]"
                imageClassName="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.025]"
            />
            <div className="min-w-0 self-center">
                <PublicationTitle
                    publication={pub}
                    className={`${embedded ? 'text-lg' : 'text-xl lg:text-[1.35rem]'} mb-2 font-serif font-semibold leading-[1.25] text-primary transition-colors duration-200 group-hover:text-link`}
                />
                <PublicationAuthors publication={pub} />
                <PublicationVenue publication={pub} />
                <PublicationMemo publication={pub} />
                <PublicationLinks publication={pub} />
            </div>
        </motion.article>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className={`${!embedded && sections.length > 1 ? 'pt-8' : ''} mb-12 sm:mb-16`}>
                <div>
                    <h1 className={`${embedded ? 'text-3xl' : 'text-4xl sm:text-5xl'} font-serif font-semibold leading-none text-primary`}>
                        {config.title}
                    </h1>
                </div>
            </div>

            {/* Publications Grid */}
            <div className="space-y-16">
                {publications.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500">
                        {messages.publications.noResults}
                    </div>
                ) : embedded ? (
                    <div className="space-y-6">
                        {publications.map((pub, index) => renderPublication(pub, index))}
                    </div>
                ) : (
                    sections.map((section) => (
                        <section key={section.id} id={section.id} className="scroll-mt-40">
                            <div className="mb-3 flex items-center gap-4">
                                <h2 className="font-serif text-xl font-medium leading-tight text-primary sm:text-[1.4rem]">
                                    {section.title}
                                </h2>
                            </div>
                            <div>
                                {section.publications.map((pub, index) => renderPublication(pub, index))}
                            </div>
                        </section>
                    ))
                )}
            </div>
        </motion.div>
    );
}
