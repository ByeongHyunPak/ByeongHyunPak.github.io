'use client';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { useEffect, useId, useState } from 'react';
import type { SVGProps } from 'react';
import { FileText, Github, GraduationCap, Linkedin, Mail } from 'lucide-react';
import type { SiteConfig } from '@/lib/config';
import { createNamePronunciationPlugin } from './namePronunciationPlugin';

interface ProfileProps {
    author: SiteConfig['author'];
    social: SiteConfig['social'];
    features: SiteConfig['features'];
    introContent?: string;
}

const OrcidIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
    >
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
    </svg>
);

function formatLocalTime(timeZone: string) {
    return new Intl.DateTimeFormat('en-US', {
        timeZone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).format(new Date());
}

export default function Profile({ author, social, introContent }: ProfileProps) {
    const tooltipId = useId();
    const [localTime, setLocalTime] = useState<string | null>(null);
    const timeZone = social.timezone || 'America/New_York';
    const socialLinks = [
        ...(social.email ? [{
            name: 'email',
            href: `mailto:${social.email}`,
            icon: Mail,
        }] : []),
        ...(social.google_scholar ? [{
            name: 'scholar',
            href: social.google_scholar,
            icon: GraduationCap,
        }] : []),
        ...(social.orcid ? [{
            name: 'orcid',
            href: social.orcid,
            icon: OrcidIcon,
        }] : []),
        ...(social.github ? [{
            name: 'github',
            href: social.github,
            icon: Github,
        }] : []),
        ...(social.linkedin ? [{
            name: 'linkedin',
            href: social.linkedin,
            icon: Linkedin,
        }] : []),
    ];

    useEffect(() => {
        const updateLocalTime = () => {
            setLocalTime(formatLocalTime(timeZone));
        };

        updateLocalTime();
        const intervalId = window.setInterval(updateLocalTime, 60_000);
        return () => window.clearInterval(intervalId);
    }, [timeZone]);

    return (
        <header className="hero-grid">
            <div className="min-w-0">
                <h1 className="text-[2.75rem] leading-[1.04] sm:text-[3.6rem] font-serif font-medium text-primary mb-5">
                    {author.name}
                </h1>

                {introContent ? (
                    <div className="profile-copy text-neutral-700 dark:text-neutral-500">
                        <ReactMarkdown
                            rehypePlugins={[createNamePronunciationPlugin(tooltipId)]}
                            components={{
                                p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                                a: ({ node, ...props }) => {
                                    void node;
                                    return (
                                        <a
                                            {...props}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-link hover:text-link-hover underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
                                        />
                                    );
                                },
                                strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
                            }}
                        >
                            {introContent}
                        </ReactMarkdown>
                    </div>
                ) : (
                    <div className="profile-copy text-neutral-700 dark:text-neutral-500">
                        <p>{author.title}</p>
                        <p>{author.institution}</p>
                    </div>
                )}

                {social.email && (
                    <p className="mt-3 text-neutral-700 dark:text-neutral-500">
                        Please feel free to reach out to me at {' '}
                        <a
                            href={`mailto:${social.email}`}
                            className="text-link hover:text-link-hover underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
                        >
                            {social.email}
                        </a>
                        {localTime && (
                            <span className="text-neutral-500">
                                {' '}({`it's ${localTime} for me right now`})
                            </span>
                        )}
                        .
                    </p>
                )}

                <nav className="mt-5 flex flex-wrap gap-2 font-mono text-xs" aria-label="Profile links">
                    {socialLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                target={link.href === '#' ? undefined : '_blank'}
                                rel={link.href === '#' ? undefined : 'noopener noreferrer'}
                                className="inline-flex items-center gap-1.5 rounded-[4px] px-2 py-1 text-neutral-500 transition-colors hover:bg-link-soft hover:text-primary"
                            >
                                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>{link.name}</span>
                            </a>
                        );
                    })}
                    <a
                        href="/Byeonghyun Pak - cv.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-[4px] px-2 py-1 text-neutral-500 transition-colors hover:bg-link-soft hover:text-primary"
                    >
                        <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>cv</span>
                    </a>
                </nav>
            </div>

            <figure className="order-first sm:order-none">
                <div className="h-[118px] w-[118px] overflow-hidden rounded-full bg-neutral-100 ring-1 ring-neutral-200 sm:h-[200px] sm:w-[200px] dark:bg-neutral-800 dark:ring-neutral-800">
                    <Image
                        src={author.avatar}
                        alt={author.name}
                        width={240}
                        height={240}
                        className="h-full w-full object-cover object-[32%_center]"
                        priority
                    />
                </div>
            </figure>
        </header>
    );
}
