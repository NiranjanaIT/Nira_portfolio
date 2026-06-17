export interface PortfolioCardData {
  id: number;
  number: string;
  title: string;
  subtitle?: string;
  category: string;
  theme: "dark" | "light";
  bgColor: string;
  textColor: string;
  accentColor: string;
  description: string;
  details?: string[];
  layoutType: string;
  liveLink?: string;
  cardDescription?: string;
}

export const portfolioCards: PortfolioCardData[] = [
  {
    id: 1,
    number: "01",
    title: "NIRANJANA M R",
    subtitle: "IT ENGINEER & BACKEND DEVELOPER",
    category: "Cover",
    theme: "light",
    bgColor: "#FCFAF6", // clean soft warm white
    textColor: "#1C1917", // stone 900
    accentColor: "#7C2D12", // warm terracotta
    description: "B.Tech Information Technology student with a strong foundation in Java, Data Structures, OOP, and Backend Development. Experienced in national-level hackathons and technical leadership roles.",
    layoutType: "cover",
  },
  {
    id: 2,
    number: "02",
    title: "ABOUT ME",
    subtitle: "Junior Backend Developer",
    category: "Biography",
    theme: "light",
    bgColor: "#F5F2EB", // warm beige
    textColor: "#1C1917",
    accentColor: "#2563EB", // premium blue
    description: "An undergraduate Information Technology student with innovative thinking, passionate about backend services, database design, and developer community leadership. Demonstrated ability to build robust tools.",
    details: [
      "B.Tech Information Technology (CGPA: 8.53)",
      "PSNA College of Engineering and Technology",
      "Focused on Java, OOP, DBMS, and REST APIs"
    ],
    layoutType: "about",
  },
  {
    id: 3,
    number: "03",
    title: "TECHNICAL SKILLS",
    subtitle: "Technical & Visual Arsenal",
    category: "Expertise",
    theme: "light",
    bgColor: "#FCFAF6",
    textColor: "#1C1917",
    accentColor: "#D97706", // warm amber
    description: "Combining strong core programming languages with modern web development frameworks, databases, and cloud platforms.",
    details: [
      "Languages: Java, C, C++, SQL",
      "Backend & Web: Node.js, REST APIs, HTML, CSS",
      "Core Concepts: Data Structures, OOP, DBMS",
      "Tools: Git, MongoDB, AWS (Basics), Google Cloud, Flutter"
    ],
    layoutType: "skills",
  },
  {
    id: 4,
    number: "04",
    title: "FEATURED WORK",
    subtitle: "HACKATHONS & DEVELOPMENTS",
    category: "Projects",
    theme: "light",
    bgColor: "#F5F2EB",
    textColor: "#1C1917",
    accentColor: "#059669", // emerald
    description: "A showcase of technical creations built to solve real-world problems and optimize resource allocations.",
    details: [
      "DevCollab: Live at devfusion2-0.vercel.app (2026)",
      "Women Safety: Alert mechanisms & environment monitoring system (2026)",
      "Intelligent Scheduling: Automated timetable conflicts reducer (2025)"
    ],
    layoutType: "contents",
    liveLink: "http://devfusion2-0.vercel.app/",
  },
  {
    id: 5,
    number: "05",
    title: "LEADERSHIP Roles",
    subtitle: "GDG & CLUB MANAGEMENT",
    category: "Leadership",
    theme: "light",
    bgColor: "#F5F2EB",
    textColor: "#1C1917",
    accentColor: "#3B82F6",
    description: "🚀 𝘼 𝙅𝙤𝙪𝙧𝙣𝙚𝙮 𝙤𝙛 𝙜𝙧𝙤𝙬𝙩𝙝 :\n\n🥳 I'm deeply honored to share a significant milestone from the recent Google Developer Groups - GDG on Campus PSNA College of Engineering and Technology Inauguration Ceremony.\n\n💥 Grateful to announce that I will be stepping into the role of 𝐅𝐋𝐔𝐓𝐓𝐄𝐑 𝐋𝐄𝐀𝐃 for the upcoming 2025-2026 term.\n\n🏆 And also received a memento in recognition of my contributions as the 𝐏𝐎𝐈𝐍𝐓 𝐎𝐅 𝐂𝐎𝐍𝐓𝐀𝐂𝐓 for the year 2024-2025 was a truly humbling experience.\n\n⚡ The moment was made even more memorable by receiving the award from our esteemed Chief Guest, Mr. Deepak Kumar sir, Software Engineer at Microsoft and a proud alumnus of the IT department of our institution.\n\n🎉 My sincere gratitude extends to the management of PSNA College of Engineering and Technology, our Head of the Department Dr.A.Vincent A., Club advisor KARTHIKA B ma'am, Club organiser Mr. Aswath kannan and the entire GDG core team for their unwavering support and for entrusting me with this responsibility.\n\n👥 Acknowledgements: IT PSNACET, Karthihadevi Ganesh, Sudha Raju, Deepak Paramesh\n\n#ProfessionalDevelopment #Leadership #GoogleDeveloperGroups #GDG #Flutter #PSNACET #CommunityBuilding #TechLeadership #Microsoft #StudentLeadership #Gratitude",
    cardDescription: "Deeply honored to step into the role of Flutter Lead for GDG on Campus PSNACET (2025-2026) and recognized with a memento for contributions as Point of Contact (2024-2025).",
    details: [
      "Flutter Lead – GDG: Appointed Lead for the upcoming 2025-2026 Term",
      "Point of Contact – GDG: Received memento for 2024-2025 contributions",
      "Secretary – Math Club: Managed inter-departmental math events",
      "Coordinator – Tamil Club: Directed planning and logistics of 10+ events"
    ],
    layoutType: "brand-identity",
  },
  {
    id: 6,
    number: "06",
    title: "TIMELINE & EXPERIENCE",
    subtitle: "INTERNSHIPS & MILESTONES",
    category: "Timeline",
    theme: "light",
    bgColor: "#FCFAF6",
    textColor: "#1C1917",
    accentColor: "#EF4444", // red
    description: "Gaining practical industry experience and achieving recognition at national-level coding platforms and paper presentations.",
    details: [
      "CodSoft (Jul-Aug 2024): UI/UX Design Intern (Designed responsive prototypes)",
      "Octanet (Apr-May 2024): Web Development Intern (Backend integration)",
      "RAGEX'25: First Prize in Paper Presentation (ECE Dept, Nov 2025)",
      "AI Prompt Comp: Won INR 4,000 Cash Prize (Gov of TN, Apr 2025)",
      "Smart India Hackathon: Led project selection rounds (2024 & 2025)"
    ],
    layoutType: "experience",
  },
  {
    id: 7,
    number: "07",
    title: "CODING PROFILES",
    subtitle: "ALGORITHMS & PROBLEM SOLVING",
    category: "Algorithms",
    theme: "light",
    bgColor: "#FCFAF6",
    textColor: "#1C1917",
    accentColor: "#8B5CF6", // purple
    description: "Actively practicing competitive programming and building open-source projects on major developer networks.",
    details: [
      "LeetCode: Solved various algorithmic challenges (250+ overall)",
      "CodeChef: Participated in multiple competitive contests",
      "GitHub: Open source projects and system architectures"
    ],
    layoutType: "testimonials",
  },
  {
    id: 8,
    number: "08",
    title: "GET IN TOUCH",
    subtitle: "CONTACT DETAILS",
    category: "Contact",
    theme: "light",
    bgColor: "#F5F2EB",
    textColor: "#1C1917",
    accentColor: "#7C2D12",
    description: "Let's connect! I am looking for opportunities in junior backend development. Reach out via my official contact points.",
    details: [
      "Email: mrniranjana.it@gmail.com",
      "Phone: 9363641657",
      "Location: Dindigul, Tamil Nadu",
      "GitHub: github.com/NiranjanaIT",
      "LinkedIn: linkedin.com/in/niranjana-m-r-791936294"
    ],
    layoutType: "contact",
  }
];
