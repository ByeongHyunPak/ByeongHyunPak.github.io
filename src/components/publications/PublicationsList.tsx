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

    const renderPublication = (pub: Publication) => (
        <div
            key={pub.id}
            className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
            <div className="flex flex-col gap-6 md:flex-row">
                <PublicationPreview publication={pub} />
                <div className="flex-grow">
                    <PublicationTitle
                        publication={pub}
                        className={`${embedded ? 'text-lg' : 'text-xl'} mb-2 font-semibold leading-tight text-primary`}
                    />
                    <PublicationAuthors publication={pub} />
                    <PublicationVenue publication={pub} />
                    <PublicationMemo publication={pub} />
                    <PublicationLinks publication={pub} />
                </div>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className={`${!embedded && sections.length > 1 ? 'pt-12' : ''} mb-8`}>
                <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-4`}>{config.title}</h1>
            </div>

            {/* Publications Grid */}
            <div className="space-y-10">
                {publications.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500">
                        {messages.publications.noResults}
                    </div>
                ) : embedded ? (
                    <div className="space-y-6">
                        {publications.map((pub) => renderPublication(pub))}
                    </div>
                ) : (
                    sections.map((section) => (
                        <section key={section.id} id={section.id} className="scroll-mt-40">
                            <div className="mb-4 flex items-baseline gap-3">
                                <h2 className="font-serif text-2xl font-bold text-primary">{section.title}</h2>
                                <span className="text-sm text-neutral-500">
                                    {section.publications.length}
                                </span>
                            </div>
                            <div className="space-y-6">
                                {section.publications.map((pub) => renderPublication(pub))}
                            </div>
                        </section>
                    ))
                )}
            </div>
        </motion.div>
    );
}
