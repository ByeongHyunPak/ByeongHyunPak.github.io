export interface AboutMe {
  name: string;
  title: string;
  institution: string;
  description: string;
  researchInterests: string;
  email: string;
  imageUrl?: string;
  blogUrl?: string;
  cvUrl?: string;
  rsUrl?: string;
  googleScholarUrl?: string;
  twitterUsername?: string;
  githubUsername?: string;
  linkedinUsername?: string;
  funDescription?: string; // Gets placed in the left sidebar
  secretDescription?: string; // Gets placed in the bottom
  altName?: string;
  institutionUrl?: string;
  addressOffice?: string;
  addressURL?: string;
}

// export const aboutMe: AboutMe = {
//   name: "Jane R. Smith",
//   title: "Ph.D. Candidate",
//   institution: "Stanford University",
//   // Note that links work in the description
//   description:
//     "I'm a final-year <a href='https://www.stanford.edu'>PhD candidate</a> working at the intersection of causal inference and machine learning. My research focuses on developing robust, interpretable systems that can reason about cause and effect in complex environments.",
//   email: "______@stanford.edu",
//   imageUrl:
//     "https://images.unsplash.com/photo-1581481615985-ba4775734a9b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   googleScholarUrl: "https://scholar.google.com/citations?user=bWtMl_MAAAAJ",
//   githubUsername: "janesmith",
//   linkedinUsername: "janesmith",
//   twitterUsername: "janesmith",
//   blogUrl: "https://",
//   cvUrl: "https://",
//   institutionUrl: "https://www.stanford.edu",
//   // altName: "",
//   // secretDescription: "I like dogs.",
// };

export const aboutMe: AboutMe = {
  name: "Byeonghyun Pak",
  title: "Research Officer",
  institution: "Agency for Defense Development",
  // Note that links work in the description
  description:
    // "I'm a final-year <a href='https://www.stanford.edu'>PhD candidate</a> working at the intersection of causal inference and machine learning. My research focuses on developing robust, interpretable systems that can reason about cause and effect in complex environments.",
    // version 1
    // "I am a First Lieutenant in the <a href='https://www.army.mil.kr/english/index..do'>Republic of Korea Army (ROKA)</a> \
    // and currently serve as a Research Officer at the <a href='https://www.add.re.kr/eps'>Agency for Defense Development (ADD)</a>, \
    // which is the Korean counterpart to the U.S. DARPA.\
    // My current work involves robustly detecting data-scarce objects, like fighter jets and mobile launchers, \
    // in infrared imagery by mitigating the synthetic-to-real domain gap and incorporating open-world semantic knowledge.\
    // ",
    // version 2
    // "I am a research officer at the <a href='https://www.add.re.kr/eps'>Agency for Defense Development (ADD)</a>—the nation's DARPA equivalent—while\
    // also serving as a first lieutenant in the <a href='https://www.army.mil.kr/english/index..do'>Republic of Korea Army</a>.\
    // Previously, I received my bachelor's degree from the College of Transdisciplinary Studies at <a href='https://www.dgist.ac.kr/'>DGIST</a>.\
    // ",
    // version 3
    "I am a Research Officer at the <a href='https://www.add.re.kr/eps'>Agency for Defense Development</a>, Korea's national defense R&D agency (akin to DARPA)\
    and a First Lieutenant in the <a href='https://www.army.mil.kr/english/index..do'>Republic of Korea Army</a>.\
    I received my B.S. from <a href='https://www.dgist.ac.kr/'>DGIST</a>'s Interdisciplinary Program, concentrating in Computer Science & Engineering. \
    ",
  researchInterests:  
    "\
    <div style='margin-bottom: 0.5rem;'>\
      My research goal is to develop robots with human-level versatility that can \
      (1) generalize across diverse tasks and environments, \
      (2) adapt to unseen domains via physics-aware reasoning, and \
      (3) deploy in dynamic, real-world settings.\
    </div>\
    <div style='margin-bottom: 0.5rem;'>\
      To this end, my research focuses on three core areas:\
    </div>\
    <div style='margin-left: 0.3rem; margin-bottom: 0.1rem;'>\
        • <strong>Vision–Language Representations (ECCV 2024)</strong>\
    </div>\
    <div style='margin-left: 0.6rem; margin-bottom: 0.3rem;'>\
        for open-world semantics and domain generalization.\
    </div>\
    <div style='margin-left: 0.3rem; margin-bottom: 0.1rem;'>\
      • <strong>Neural Scene Dynamics (ongoing)</strong>\
    </div>\
    <div style='margin-left: 0.6rem; margin-bottom: 0.3rem;'>\
        for learning physics-aware policies.\
    </div>\
    <div style='margin-left: 0.3rem; margin-bottom: 0.1rem;'>\
      • <strong>Implicit Neural Representations (CVPR 2023)</strong>\
    </div>\
    <div style='margin-left: 0.6rem; margin-bottom: 0.5rem;'>\
        for continuous scene representations from sensor observations.\
    </div>\
        ",
    
  email: "byeonghyun.pak@gmail.com",
  imageUrl: "/images/me_v3_2.png",
  googleScholarUrl: "https://scholar.google.com/citations?user=2dyH0ZQAAAAJ",
  githubUsername: "ByeongHyunPak",
  linkedinUsername: "byeonghyun-pak",
  twitterUsername: "Byeonghyun_Pak",
  // blogUrl: "https://",
  // cvUrl: "https://byeonghyunpak.github.io/CV_byeonghyunpak.pdf",
  cvUrl: "/cv_byeonghyun_pak.pdf",
  // rsUrl: "/CV_byeonghyunpak.pdf",
  institutionUrl: "https://www.add.re.kr/eps",
  // altName: "",
  // secretDescription: "I like dogs.",
  addressOffice:"Daejeon, Republic of Korea",
  addressURL:"https://maps.app.goo.gl/UDcczVBM8Kp2APpm8",
};
