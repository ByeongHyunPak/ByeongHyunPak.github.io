import { Education } from "@/data/education";

export function EducationEntry({ education }: { education: Education }) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-x-2 mb-2">
        <div className="col-span-4">
          <h3 className="text-lg mb-1 font-serif">{education.institution}</h3>
          <div className="flex flex-row gap-2 justify-between text-sm text-zinc-500 mb-1">
            <span>{education.degree}</span>
            <span>{education.date}</span>
          </div>
          {education.advisor && (
            <p className="text-sm text-zinc-500 mt-2 italic">
              Advisor: {education.advisor}
            </p>
          )}
          {education.thesis && (
            <p className="text-sm text-zinc-500 mt-2 italic">
              Thesis:{" "}
              {education.thesisUrl ? (
                <a
                  href={education.thesisUrl}
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {education.thesis}
                </a>
              ) : (
                education.thesis
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}