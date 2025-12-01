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

export const aboutMe: AboutMe = {
  name: "Byeonghyun Pak",
  title: "Research Officer",
  institution: "Agency for Defense Development",
  // Note that links work in the description
  description:
    "I am a Research Officer at the <a href='https://www.add.re.kr/eps'>Agency for Defense Development</a>, Korea's national defense R&D agency (akin to DARPA),\
    and a First Lieutenant in the <a href='https://www.army.mil.kr/english/index..do'>Republic of Korea Army</a>.\
    I received my B.S. from <a href='https://www.dgist.ac.kr/'>DGIST</a>'s interdisciplinary program, concentrating in Computer Science & Engineering. \
    ",
    researchInterests:  
      "\
      <div style='margin-bottom: 0.5rem;'>\
      My research lies at the intersection of computer vision and robotics, \
      aiming to enable agents to generalize to novel scenarios and execute long-horizon tasks. \
      I am currently developing unified representations that integrate dynamic 3D geometry with open-world semantics. \
      </div>\
      \
      <div style='margin-bottom: 0.5rem;'>\
        My research encompasses three key areas:\
      </div>\
      \
      <div style='margin-left: 0.3rem; margin-bottom: 0.1rem;'>\
        <strong>1. Spatiotemporal Scene Representations (Ongoing)</strong>\
      </div>\
      <div style='margin-left: 0.6rem; margin-bottom: 0.3rem;'>\
        : Modeling scene dynamics from online observations \
      </div>\
      \
      <div style='margin-left: 0.3rem; margin-bottom: 0.1rem;'>\
        <strong>2. Vision-Language Representations [ECCV 2024]</strong>\
      </div>\
      <div style='margin-left: 0.6rem; margin-bottom: 0.3rem;'>\
        : Learning open-world semantic representations that enable generalization \
      </div>\
      \
      <div style='margin-left: 0.3rem; margin-bottom: 0.1rem;'>\
        <strong>3. Implicit Neural Representations [CVPR 2023]</strong>\
      </div>\
      <div style='margin-left: 0.6rem; margin-bottom: 0.3rem;'>\
        : Reconstructing continuous scene representations from sensor data \
      </div>\
      <div style='margin-left: 0.6rem; margin-bottom: 0.5rem;'>\
      </div>\
          ",
    
  email: "byeonghyun.pak@gmail.com",
  imageUrl: "/images/me_v3_2.png",
  googleScholarUrl: "https://scholar.google.com/citations?user=2dyH0ZQAAAAJ",
  githubUsername: "ByeongHyunPak",
  linkedinUsername: "byeonghyun-pak",
  twitterUsername: "Byeonghyun_Pak",
  cvUrl: "/cv_BHPak_main.pdf",
  institutionUrl: "https://www.add.re.kr/eps",
  // secretDescription: "I like dogs.",
  addressOffice:"Daejeon, Republic of Korea",
  addressURL:"https://maps.app.goo.gl/UDcczVBM8Kp2APpm8",
};
