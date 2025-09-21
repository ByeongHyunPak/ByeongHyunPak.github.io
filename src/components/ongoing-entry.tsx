import React from "react";
import Image from "next/image";
import { Ongoing } from "@/data/ongoing";

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
          <Image
            src={ongoing.imageUrl}
            alt={ongoing.title}
            width={200}
            height={250}
            className="rounded-lg transition-all duration-300"
          />
        </div>
      )}
      <div className="flex flex-col flex-1">
        <p className="text-sm text-zinc-500">
            {ongoing.state}
          </p>
        <h3 className="font-serif text-md mb-1">{ongoing.title}</h3>
        {ongoing.authors && (
          <p className="text-sm text-zinc-600 mb-1">{renderAuthors(ongoing.authors)}</p>
        )}
        {ongoing.tldr && (
          <p className="text-sm text-zinc-600 mt-1">
            {ongoing.tldr}
          </p>
        )}
      </div>
    </div>
  );
}