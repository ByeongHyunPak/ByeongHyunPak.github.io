"use client";

import React from "react";
import Image from "next/image";
import { Ongoing } from "@/data/ongoing";

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
// OngoingEntry (Client Component)
// ───────────────────────────────────────────────────────────
export function OngoingEntry({
  ongoing,
}: {
  ongoing: Ongoing;
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
      {ongoing.imageUrl && (
        <div className="w-full sm:w-1/4 min-w-[200px] relative">
          {/* Use ZoomableImage for the ongoing image */}
          <ZoomableImage
            src={ongoing.imageUrl}
            alt={ongoing.title}
            thumbWidth={200}
            thumbHeight={250}
            className="transition-all duration-300"
          />
        </div>
      )}

      <div className="flex flex-col flex-1">
        <p className="text-sm text-zinc-500">{ongoing.state}</p>
        <h3 className="font-serif text-md mb-1">{ongoing.title}</h3>

        {ongoing.authors && (
          <p className="text-sm text-zinc-600 mb-1">
            {renderAuthors(ongoing.authors)}
          </p>
        )}

        {ongoing.tldr && (
          <p className="text-sm text-zinc-600 mt-1">{ongoing.tldr}</p>
        )}
      </div>
    </div>
  );
}
