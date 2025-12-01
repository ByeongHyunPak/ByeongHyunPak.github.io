export interface Ongoing {
  title: string;
  state?: string;
  authors?: string;
  tldr?: string;
  imageUrl?: string;
}

export const OngoingData: Ongoing[] = [
  {
    title: "4D Neural Implicit Mapping",
    state: "Active",
    tldr: "We build dense representations to jointly encode geometric structure and high-level semantics of dynamic environments.",
    imageUrl: "/images/4d_map_v0.gif",
  },
  {
    title: "Aligning Forest and Trees in Images and Long Captions for Cross-Domain Grounding",
    state: "Under review (2025)",
    tldr: "We propose a hierarchical vision-language model that enables fine-grained multimodal understanding without extra annotations.",
    authors: "Byeongju Woo, Zilin Wang, Byeonghyun Pak, Sangwoo Mo, Stella X. Yu",
    imageUrl: "/images/FCAST.gif"
  },
  // {
  //   title: "Hierarchical Vision-Language Pre-training for Fine-grained Multimodal Understanding",
  //   state: "Pre-submission",
  //   tldr: "We hierarchically align part-level descriptions to spatial regions, enabling fine-grained multimodal understanding without segmentation annotations.",
  //   imageUrl: "/images/f-cast.png"
  // },
];

// award: "🏆 Best Paper Award",
