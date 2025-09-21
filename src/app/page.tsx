import { EducationEntry } from "@/components/education-entry";
import { educationData } from "@/data/education";
import { PublicationEntry } from "@/components/publication-entry";
import { publicationData } from "@/data/publication";
import { ProfileSection } from "@/components/profile-section";
import { aboutMe } from "@/data/aboutme";
import { NewsEntry } from "@/components/news-entry";
import { newsData } from "@/data/news";
import { ExperienceEntry } from "@/components/experience-entry";
import { experienceData } from "@/data/experience";
import { PortfolioEntry } from "@/components/portfolio-entry";
import { portfolioData } from "@/data/portfolio";
import { sectionOrder, Section } from "@/data/section-order";
import { OngoingEntry } from "@/components/ongoing-entry";
import { OngoingData } from "@/data/ongoing";

export default function Home() {
  return (
    // <div className="min-h-screen bg-[#FFFCF8]">
      <div className="min-h-screen bg-[#FFFFFF]">
      {/* Don't have a great call on whether max-w-screen-xl is better */}
      {/* <div className="max-w-screen-lg mx-auto px-8 py-24"> */}
      <div className="max-w-screen-lg mx-auto px-8 py-16">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-1">
          {/* Left Column - Fixed Info */}
          <div className="col-span-12 md:col-span-4 space-y-12 mb-8 md:mb-0">
            {/* Profile */}
            <div className="md:sticky top-12 space-y-8">
              <ProfileSection aboutMe={aboutMe} />
            </div>
          </div>

          {/* Right Column - Scrolling Content */}
          {/* <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-12"> */}
            <div className="col-span-12 md:col-span-9 md:col-start-6 space-y-12">
            {/* About section is typically first */}
            {aboutMe.description && (
              <section>
                <p
                  className="font-serif text-md leading-relaxed text-zinc-700 [&_a]:underline [&_a]:text-zinc-900 [&_a:hover]:text-zinc-600 mb-5"
                  dangerouslySetInnerHTML={{ __html: aboutMe.description }}
                />
                {/* Research Interests - collapsible with <details> */}
                {aboutMe.researchInterests && (
                  <details className="mb-4">
                    <summary className="cursor-pointer select-none font-serif text-md text-zinc-700 mb-1 tracking-wide font-bold uppercase">
                      Research Interests
                    </summary>
                    <div className="mt-2 font-serif text-md leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: aboutMe.researchInterests }} />
                  </details>
                )}
                
              </section>
            )}

            {/* Map through sectionOrder to render sections in correct order */}
            {sectionOrder.map((sectionName) => {
              switch (sectionName) {
                case Section.News:
                  return (
                    newsData.length > 0 && (
                      <section key={sectionName}>
                        <h2 className="font-serif text-l mb-6 tracking-wide uppercase">
                          News
                        </h2>
                        <div className="space-y-12">
                          {newsData.map((news, index) => (
                            <div key={index}>
                              <NewsEntry news={news} />
                            </div>
                          ))}
                        </div>
                      </section>
                    )
                  );
                case Section.Education:
                  return (
                    educationData.length > 0 && (
                      <section key={sectionName}>
                        <h2 className="font-serif text-xl text-zinc-700 mb-4 tracking-wide font-bold uppercase border-b border-zinc-200 dark:border-zinc-800">
                          Education
                        </h2>
                        <div className="space-y-6">
                          {educationData.map((education, index) => (
                            <EducationEntry key={index} education={education} />
                          ))}
                        </div>
                      </section>
                    )
                  );
                case Section.Publication:
                  return (
                    publicationData.length > 0 && (
                      <section key={sectionName}>
                        <h2 className="font-serif text-xl mb-6 tracking-wide font-bold uppercase border-b border-zinc-200 dark:border-zinc-800">
                          Publications
                        </h2>
                        <div className="space-y-6">
                          {publicationData.map((publication, index) => (
                            <div key={index}>
                              <PublicationEntry publication={publication} />
                              {index < publicationData.length - 1 && (
                                <div className="h-px bg-zinc-200 my-8" />
                              )}
                            </div>
                          ))}
                        </div>
                      </section>
                    )
                  );
                case Section.Ongoing:
                  return (
                    OngoingData.length > 0 && (
                      <section key={sectionName}>
                        <h2 className="font-serif text-xl mb-6 tracking-wide font-bold uppercase border-b border-zinc-200 dark:border-zinc-800">
                          Ongoing Projects
                        </h2>
                        <div className="space-y-6">
                          {OngoingData.map((ongoing, index) => (
                            <div key={index}>
                              <OngoingEntry ongoing={ongoing} />
                              {index < OngoingData.length - 1 && (
                                <div className="h-px bg-zinc-200 my-8" />
                              )}
                            </div>
                          ))}
                        </div>
                      </section>
                    )
                  );
                case Section.Experience:
                  return (
                    experienceData.length > 0 && (
                      <section key={sectionName}>
                        <h2 className="font-serif text-xl mb-4 tracking-wide font-bold uppercase border-b border-zinc-200 dark:border-zinc-800">
                          Experience
                        </h2>
                        <div className="space-y-4">
                          {experienceData.map((experience, index) => (
                            <ExperienceEntry
                              key={index}
                              experience={experience}
                            />
                          ))}
                        </div>
                      </section>
                    )
                  );
                case Section.Portfolio:
                  return (
                    portfolioData.length > 0 && (
                      <section key={sectionName}>
                        <h2 className="font-serif text-xl mb-6 tracking-wide uppercase">
                          Portfolio
                        </h2>
                        <div className="space-y-12">
                          {portfolioData.map((portfolio, index) => (
                            <PortfolioEntry key={index} portfolio={portfolio} />
                          ))}
                        </div>
                      </section>
                    )
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
