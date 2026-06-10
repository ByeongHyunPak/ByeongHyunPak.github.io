import type { ComponentType } from 'react';
import { Code2, FileText, Globe2 } from 'lucide-react';
import { getVenueAbbreviation } from '@/lib/publicationVenue';
import type { Publication } from '@/types/publication';
import FormattedBibTeXText from './FormattedBibTeXText';

type PublicationLink = {
    label: string;
    href: string;
    icon: ComponentType<{ className?: string; 'aria-hidden'?: true }>;
};

export function getPublicationLinks(publication: Publication): PublicationLink[] {
    return [
        ...(publication.pdfUrl ? [{ label: 'paper', href: publication.pdfUrl, icon: FileText }] : []),
        ...(publication.projectUrl ? [{ label: 'website', href: publication.projectUrl, icon: Globe2 }] : []),
        ...(publication.code ? [{ label: 'code', href: publication.code, icon: Code2 }] : []),
        ...(!publication.pdfUrl && publication.url ? [{ label: 'link', href: publication.url, icon: Globe2 }] : []),
        ...(publication.doi ? [{ label: 'doi', href: `https://doi.org/${publication.doi}`, icon: Globe2 }] : []),
    ];
}

export function PublicationPreview({
    publication,
    className = 'w-full md:w-48 flex-shrink-0',
    imageClassName = 'block h-auto w-full',
}: {
    publication: Publication;
    className?: string;
    imageClassName?: string;
}) {
    if (!publication.preview) {
        return null;
    }

    const previewPath = `/papers/${publication.preview}`;
    const isVideo = /\.(mp4|webm|ogg)$/i.test(publication.preview);

    return (
        <figure className={className}>
            <div className="overflow-hidden rounded-[6px] border border-rule-soft bg-neutral-100 dark:bg-neutral-800">
                {isVideo ? (
                    <video
                        src={previewPath}
                        className={imageClassName}
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label={`${publication.title} demo video`}
                    />
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={previewPath}
                        alt={`${publication.title} demo`}
                        className={imageClassName}
                    />
                )}
            </div>
        </figure>
    );
}

export function PublicationTitle({
    publication,
    className,
}: {
    publication: Publication;
    className: string;
}) {
    return (
        <h3 className={className}>
            <FormattedBibTeXText nodes={publication.titleNodes} fallback={publication.title} />
        </h3>
    );
}

export function PublicationAuthors({ publication }: { publication: Publication }) {
    return (
        <p className="mb-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">
            {publication.authors.map((author, index) => (
                <span key={`${publication.id}-${author.name}-${index}`}>
                    <span className={author.isHighlighted ? 'font-bold text-primary underline underline-offset-2' : ''}>
                        {author.name}
                    </span>
                    {author.isCoAuthor && <sup className="ml-0.5">*</sup>}
                    {author.isCorresponding && <sup className="ml-0.5">†</sup>}
                    {index < publication.authors.length - 1 && ', '}
                </span>
            ))}
        </p>
    );
}

export function PublicationVenue({ publication }: { publication: Publication }) {
    const venue = publication.journal || publication.conference;
    const venueAbbreviation = publication.venue || getVenueAbbreviation(venue);
    const marginBottom = publication.memo ? 'mb-1' : 'mb-3';

    if (publication.type === 'preprint') {
        return (
            <p className={`${marginBottom} text-sm text-neutral-600 dark:text-neutral-500`}>
                <span>{publication.statusLabel || 'Preprint'}</span>
                {publication.year && <> ({publication.year})</>}
            </p>
        );
    }

    if (publication.type === 'workshop') {
        const venues = publication.venueItems?.length
            ? publication.venueItems
            : [{ name: venue || '', year: publication.year }];

        return (
            <div className={`${marginBottom} space-y-0.5 text-sm text-neutral-600 dark:text-neutral-500`}>
                {venues.map((item, index) => (
                    <p key={`${publication.id}-venue-${index}`}>
                        {item.name && <span className="italic">{item.name}</span>}
                        {item.abbreviation && (
                            <>
                                {' ('}
                                <strong className="font-bold text-primary">{item.abbreviation}</strong>
                                {')'}
                            </>
                        )}
                        {item.note && (
                            <>
                                {item.name && ', '}
                                <span className="font-medium text-primary">
                                    <FormattedBibTeXText nodes={item.noteNodes} fallback={item.note} />
                                </span>
                            </>
                        )}
                        {(item.name || item.note) && ', '}
                        <span>{item.year || publication.year}</span>
                    </p>
                ))}
            </div>
        );
    }

    return (
        <p className={`${marginBottom} text-sm text-neutral-600 dark:text-neutral-500`}>
            {venue && <span className="italic">{venue}</span>}
            {venueAbbreviation && (
                <>
                    {' ('}
                    <strong className="font-bold text-primary">{venueAbbreviation}</strong>
                    {')'}
                </>
            )}
            {venue && ', '}
            <span>{publication.year}</span>
        </p>
    );
}

export function PublicationMemo({ publication }: { publication: Publication }) {
    if (!publication.memo) {
        return null;
    }

    return (
        <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-500">
            <FormattedBibTeXText nodes={publication.memoNodes} fallback={publication.memo} />
        </p>
    );
}

export function PublicationLinks({ publication }: { publication: Publication }) {
    const links = getPublicationLinks(publication);

    if (links.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-2">
            {links.map((link) => {
                const Icon = link.icon;

                return (
                    <a
                        key={`${publication.id}-${link.label}`}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-[4px] px-2 py-1 font-mono text-xs text-neutral-500 transition-colors hover:bg-link-soft hover:text-primary"
                    >
                        <Icon className="h-3.5 w-3.5" aria-hidden={true} />
                        {link.label}
                    </a>
                );
            })}
        </div>
    );
}
