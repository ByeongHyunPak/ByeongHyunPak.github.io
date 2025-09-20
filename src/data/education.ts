export interface Education {
  date: string;
  institution: string;
  degree: string;
  advisor?: string;
  thesis?: string;
  thesisUrl?: string;
}

export const educationData: Education[] = [
  // If you don't want to show education, just make the array empty.
  // {
  //   date: "2021—Present",
  //   institution: "Stanford University",
  //   degree: "Ph.D. in Computer Science",
  //   advisor: "Prof. Sarah Johnson",
  // },
  {
    date: "Mar 2019 – Feb 2023",
    institution: "Daegu Gyeongbuk Institute of Science and Technology (DGIST)",
    degree: "B.S. in Engineering (Interdisciplinary Program)",
    // advisor: "Prof. Kyong Hwan Jin",
    // thesis: "Algorithmic Approaches to Causal Discovery",
    // Optional links to thesis
    // thesisUrl: "https://dspace.mit.edu/handle/1721.1/149111"
  },
  {
    date: "Jul 2019 – Aug 2019",
    institution: "University of California, Berkeley (UCB)",
    degree: "Visiting Student (Freshman Global Leadership Program)",
  },
];
