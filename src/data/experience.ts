export interface Experience {
  date: string;
  title: string;
  company: string;
  description?: string;
  advisor?: string;
  manager?: string;
  companyUrl?: string;
  points?: string[];  // 주요 성과를 불릿 형태로 추가
}

export const experienceData: Experience[] = [
  {
    date: "Mar 2023 – Present",
    title: "First Lieutenant",
    company: "Republic of Korea Army (ROKA)",
    companyUrl: "https://www.army.mil.kr/english/index..do",
    points: [
      "Selected as one of 20 research officers nationwide dedicated to science-and-technology R&D for national defense",
    ]
  },
  {
    date: "Mar 2023 – Present",
    title: "Research Officer for National Defense",
    company: "Agency for Defense Development (ADD)",
    manager: "Dr. Eunjin Koh",
    advisor: "Dr. Hoseong Kim",
    companyUrl: "https://www.add.re.kr/eps",
    points: [
      // "Selected as one of 20 research officers nationwide dedicated to science-and-technology R&D for national defense.",
      // "Published a first-author paper at ECCV'24, proposing a novel framework for Domain Generalized Semantic Segmentation that achieved state-of-the-art results on public benchmarks.",
      // "Developed deep learning models for robustly detecting data-scarce military assets (e.g., fighter jets) in real-world infrared (IR) imagery.",
      "Investigated and improved domain generalization for reliable infrared imagery object detection in data-scarce settings (1 publication in ECCV 2024).",
      "Constructed synthetic datasets for rare/low-visibility targets via diffusion models and accelerated the generation process (1 publication in NeurIPS 2025).",
    ]
  },
  {
    date: "Dec 2021 – Feb 2023",
    title: "Undergraduate Research Intern",
    company: "Image Processing Laboratory @ DGIST",
    advisor: "Prof. Kyong Hwan Jin",
    companyUrl: "https://ipa.korea.ac.kr/index.html",
    points: [
      "Researched implicit neural representations (INRs) for solving inverse problems and proposed a B-Spline INR super-resolution algorithm (1 publication in CVPR 2023).",
      // "Researched implicit neural representations (INRs) for image processing tasks, such as super-resolution and image warping.",
      // "Published a first-author paper to CVPR'23, proposing a novel super-resolution algorithm for screen-content images using Implicit Neural Representations (INRs).",
      // "Led the entire research cycle from problem formulation and model design to implementation and experimental validation, achieving state-of-the-art results on benchmark datasets.",
      // "Developed a novel super-resolution algorithm for screen-content images using Implicit Neural Representations (INRs).",
      // "Conducted extensive experiments to validate the model's effectiveness in preserving sharp edges and text clarity.",
      // "Implemented image warping modules and evaluated reconstruction fidelity"
    ]
  },
];
