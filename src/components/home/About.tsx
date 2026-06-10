'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useMessages } from '@/lib/i18n/useMessages';
import { createNamePronunciationPlugin } from './namePronunciationPlugin';

interface AboutProps {
    content: string;
    title?: string;
}

export default function About({ content, title }: AboutProps) {
    const messages = useMessages();
    const tooltipId = useId();
    const resolvedTitle = title || messages.home.about;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="block-section"
        >
            <div className="block-head">
                <h2>{resolvedTitle}</h2>
            </div>
            <div className="text-neutral-700 dark:text-neutral-600 leading-relaxed">
                <ReactMarkdown
                    rehypePlugins={[createNamePronunciationPlugin(tooltipId)]}
                    components={{
                        h1: ({ children }) => <h1 className="text-3xl font-serif font-medium text-primary mt-8 mb-4">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-2xl font-serif font-medium text-primary mt-8 mb-4 border-b border-rule pb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xl font-serif font-medium text-primary mt-6 mb-3">{children}</h3>,
                        p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 ml-4">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 ml-4">{children}</ol>,
                        li: ({ children }) => <li className="mb-1">{children}</li>,
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
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
                                {children}
                            </blockquote>
                        ),
                        strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
                        em: ({ children }) => <em className="italic text-neutral-600 dark:text-neutral-500">{children}</em>,
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </motion.section>
    );
}
