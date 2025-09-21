export enum Section {
  Education = "education",
  Experience = "experience",
  Portfolio = "portfolio",
  Publication = "publication",
  News = "news",
  Ongoing = "ongoing",
}

export const sectionOrder = [
  Section.News,
  Section.Publication,
  Section.Ongoing,
  Section.Experience,
  Section.Education,
  // Section.Portfolio,
];
