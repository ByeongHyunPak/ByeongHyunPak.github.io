export interface Ongoing {
  title: string;
  state?: string;
  authors?: string;
  tldr?: string;
  imageUrl?: string;
}

export const OngoingData: Ongoing[] = [
  {
    title: "Dynamics-Aware Policy Learning",
    state: "Active",
    tldr: "We learn policies that model the underlying dynamics of an environment to forecast short-horizon. This look-ahead enables anticipatory behavior such as intercepting moving targets.",
    imageUrl: "/images/mvtracker.gif",
  },
  // {
  //   title: "Hierarchical Vision-Language Pre-training for Fine-grained Multimodal Understanding",
  //   state: "Pre-submission",
  //   tldr: "We hierarchically align part-level descriptions to spatial regions, enabling fine-grained multimodal understanding without segmentation annotations.",
  //   imageUrl: "/images/f-cast.png"
  // },
];

// award: "🏆 Best Paper Award",
