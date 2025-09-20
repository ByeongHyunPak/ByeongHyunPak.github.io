import React from "react";
import { Experience } from "@/data/experience";

export function ExperienceEntry({ experience }: { experience: Experience }) {
  const formattedDate = experience.date.replace(' - ', ' – ');

  return (
    <div className="mb-6">
      {/* First line: title left, date right */}
      <div className="flex justify-between items-baseline">
        <h3 className="text-lg font-serif text-zinc-900">{experience.title}</h3>
        <span className="text-sm text-zinc-500">{formattedDate}</span>
      </div>

      {/* Company */}
      <p className="text-sm text-zinc-600 mb-1">
        {experience.companyUrl ? (
          <a
            href={experience.companyUrl}
            className="hover:text-zinc-800 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {experience.company}
          </a>
        ) : (
          experience.company
        )}
      </p>

      {/* Manager & Advisor inline */}
      {(experience.manager || experience.advisor) && (
        <div className="flex flex-wrap items-center gap-x-2 text-sm text-zinc-600 mb-1">
          {experience.manager && (
            <>
              <span>
                <strong>Manager:</strong> {experience.manager}
              </span>
              {experience.advisor && <span>/</span>}
            </>
          )}

          {experience.advisor && (
            <span>
              <strong>Advisor:</strong> {experience.advisor}
            </span>
          )}
        </div>
      )}
      


      {/* Key Achievements */}
      {experience.points && experience.points.length > 0 ? (
        <ul className="list-disc pl-5 text-sm text-zinc-600 space-y-1.2">
          {experience.points.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      ) : (
        experience.description && (
          <p className="text-sm italic text-zinc-600">{experience.description}</p>
        )
      )}
    </div>
  );
}
