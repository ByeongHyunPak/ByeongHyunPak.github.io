"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Publication } from "@/data/publication";

// ───────────────────────────────────────────────────────────
// Reusable: ZoomableImage (Client)
// ───────────────────────────────────────────────────────────
function ZoomableImage({
  src,
  alt,
  thumbWidth = 200,
  thumbHeight = 250,
  className = "",
}: {
  src: string;
  alt: string;
  thumbWidth?: number;
  thumbHeight?: number;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  // Close on ESC
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock body scroll while overlay is open
  React.useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <>
      {/* Thumbnail button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Expand image"
        className="group relative block w-full cursor-zoom-in focus:outline-none"
      >
        <Image
          src={src}
          alt={alt}
          width={thumbWidth}
          height={thumbHeight}
          className={
            "rounded-lg transition-transform duration-300 group-hover:scale-[1.02] " +
            className
          }
        />
        {/* Focus ring helper */}
        <span className="pointer-events-none absolute inset-0 rounded-lg ring-0 ring-zinc-300/0 group-focus-visible:ring-4 group-focus-visible:ring-zinc-300/60" />
      </button>

      {/* Lightbox overlay */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Expanded image viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-[2px] cursor-zoom-out"
          onClick={() => setOpen(false)}
        >
          {/* Click inside also closes (remove stopPropagation if you want only background click to close) */}
          <div
            className="relative mx-4"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            {open && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Expanded image viewer"
                className="fixed inset-0 z-[100] flex items-center justify-center cursor-zoom-out"
                onClick={() => setOpen(false)}
              >
                <div
                  className="relative mx-4 max-w-[90vw] max-h-[90vh] w-full h-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                  }}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-contain rounded-xl shadow-2xl transition-all duration-300"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ───────────────────────────────────────────────────────────
// PublicationEntry (now a Client Component due to "use client")
// ───────────────────────────────────────────────────────────
export function PublicationEntry({
  publication,
}: {
  publication: Publication;
}) {
  const baseName = "Byeonghyun Pak";

  const renderAuthors = (authors: string) => {
    const names = authors.split(", ");
    return (
      <>
        {names.map((name, i) => {
          const match = name.match(/^(.*?)(\*+)?$/);
          const raw = match?.[1] || name;
          const stars = match?.[2] || "";
          const isHighlighted = raw === baseName;

          return (
            <React.Fragment key={i}>
              {isHighlighted ? (
                <>
                  <u>{raw}</u>
                  {stars}
                </>
              ) : (
                name
              )}
              {i < names.length - 1 ? ", " : ""}
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6">
      {publication.imageUrl && (
        <div className="w-full sm:w-1/4 min-w-[200px] relative">
          <ZoomableImage
            src={publication.imageUrl}
            alt={publication.title}
            thumbWidth={200}
            thumbHeight={250}
            className="transition-all duration-300"
          />
        </div>
      )}

      <div className="flex flex-col flex-1">
        <div className="flex flex-row gap-4 items-center mb-2">
          <p className="text-sm text-zinc-500">
            {publication.conference} {publication.year}
          </p>
          {publication.award && (
            <div className="group flex px-2 py-1 bg-gradient-to-r from-amber-50 to-rose-50 rounded-md items-center shadow-md border border-amber-100/50 relative overflow-hidden hover:rotate-1 transition-all duration-300">
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/90 to-transparent" />
              <p className="text-xs text-amber-700 font-medium relative">
                {publication.award}
              </p>
            </div>
          )}
        </div>

        <h3 className="font-serif text-md mb-3">{publication.title}</h3>
        <p className="text-sm text-zinc-600 mb-4">
          {renderAuthors(publication.authors)}
        </p>

        <div className="flex flex-row gap-6">
          {publication.paperUrl && (
            <a
              href={publication.paperUrl}
              className="group inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
            >
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">Paper</span>
            </a>
          )}
          {publication.pageUrl && (
            <a
              href={publication.pageUrl}
              className="group inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
            >
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">Page</span>
            </a>
          )}
          {publication.codeUrl && (
            <a
              href={publication.codeUrl}
              className="group inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
            >
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">Code</span>
            </a>
          )}
        </div>

        {publication.tldr && (
          <p className="text-sm italic text-zinc-600 mt-4">
            {publication.tldr}
          </p>
        )}
      </div>
    </div>
  );
}
