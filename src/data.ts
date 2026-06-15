import { Skill, Project, TimelineItem, StatItem, ContactChannel } from "./types";

export const PERSONAL_INFO = {
  name: "WanMa2",
  fullName: "WanMa2 - Digital Architect & Automotive Specialist",
  nickname: "WanMa2",
  age: 21,
  birthYear: 2005,
  location: "Desa Sukamaju, Kecamatan Balek, Provinsi DKI Jakarta, Indonesia",
  major: "Teknik Kendaraan Ringan Otomotif (TKRO)",
  hobby: "Bermain Game (Digital Esports & Competitive Simulation)",
  status: "Punya Pacar (Devoted & In a Relationship ❤️)",
  vision: "Bridging the mechanics of high-performance vehicles with the clean design of modern full-stack web applications. Engineering pixel-perfect layouts with mechanical precision.",
  bio: "A highly driven 21-year-old creative developer and automotive engine specialist from Desa Sukamaju, Jakarta. By day, I study high-precision automotive engineering (Teknik Kendaraan Ringan Otomotif), and by night, I craft immersive cyber-minimalist interfaces. A passionate competitive gamer, I channel the lightning-fast reflexes and tactical focus of eSports into writing highly performant, flawless client-side React apps.",
  avatarPath: "/src/assets/images/wanma2_avatar_1781504124072.jpg"
};

export const SKILLS_DATA: Skill[] = [
  // Frontend
  {
    id: "fe-1",
    name: "React & TypeScript",
    category: "frontend",
    iconName: "Code2",
    percentage: 92,
    description: "Developing responsive and modular SPAs using state-of-the-art hook architecture and Tailwind CSS v4."
  },
  {
    id: "fe-2",
    name: "Tailwind CSS & Framer Motion",
    category: "frontend",
    iconName: "Palette",
    percentage: 95,
    description: "Designing luxury cinematic animations, micro-interactions, dark fluid gradients, and responsive typography."
  },
  {
    id: "fe-3",
    name: "Next.js & Vite",
    category: "frontend",
    iconName: "Cpu",
    percentage: 88,
    description: "Configuring lightning-fast dev pipelines, optimized bundle states, and server-side components."
  },
  // Automotive / Mech-Sys
  {
    id: "auto-1",
    name: "Vehicle Diagnostics & ECU Tuning",
    category: "automotive",
    iconName: "Gauge",
    percentage: 94,
    description: "Interpreting OBD-II scanner codes, telemetry logs, and fine-tuning electronic control unit patterns."
  },
  {
    id: "auto-2",
    name: "Electrical Systems",
    category: "automotive",
    iconName: "Zap",
    percentage: 90,
    description: "Wiring layout optimization, automotive relays, sensor networks, and digital instrumentation controls."
  },
  // Database & Backend
  {
    id: "be-1",
    name: "Express.js & Node",
    category: "backend",
    iconName: "Server",
    percentage: 85,
    description: "Building reliable REST APIs, custom logging, telemetry pipes, and secure authentication layers."
  },
  {
    id: "be-2",
    name: "SQL & Firebase",
    category: "tools",
    iconName: "Database",
    percentage: 80,
    description: "Designing query schemas, managing persistent client-side states, and configuring real-time databases."
  },
  // Gaming
  {
    id: "game-1",
    name: "Competive Esports Mastery",
    category: "gaming",
    iconName: "Gamepad2",
    percentage: 96,
    description: "High-reaction competitive play, strategic map coordination, hardware optimization, and high-FPS tuning."
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj-1",
    name: "Project RPM: Digital Dashboard",
    description: "An advanced, real-time vehicle telematics dashboard app simulating speed, engine temperature, and throttle response. Styled with high-contrast racing tachometer rings and glassmorphic telemetry readouts.",
    category: "Automotive Tech & Web Interface",
    tags: ["React", "Framer Motion", "Tailwind CSS", "ECU Telemetry"],
    status: "Completed",
    imagePattern: "telematics",
    imageName: "project_rpm.jpg",
    demoUrl: "#projects",
    repoUrl: "https://github.com/wanma2/project-rpm"
  },
  {
    id: "proj-2",
    name: "Zero-G Esports Companion",
    description: "A premier gamer stats platform featuring live team status tracking, match scheduler, and performance rating widgets. Inspired by cutting-edge cybernetic interface aesthetics.",
    category: "Gaming Platform UI",
    tags: ["TypeScript", "Interactive Widgets", "Lustre Red Theme", "Lucide Icons"],
    status: "Beta Live",
    imagePattern: "esports",
    imageName: "zerog_esports.jpg",
    demoUrl: "#projects",
    repoUrl: "https://github.com/wanma2/zero-g-esports"
  },
  {
    id: "proj-3",
    name: "Tachometer Widget Premium",
    description: "An interactive, beautiful tachometer gauge tool that updates dynamically with keys or cursor drags, simulating virtual engine revving with real physical sound synthesis.",
    category: "Interactive Component Canvas",
    tags: ["SVG Rendering", "Framer Motion", "Audio Web API", "Friction Math"],
    status: "Completed",
    imagePattern: "tachometer",
    imageName: "tachometer_widget.jpg",
    demoUrl: "#projects"
  },
  {
    id: "proj-4",
    name: "Sukamaju Grid Matrix",
    description: "An eco-sensitive traffic flow visualizer simulating autonomous automotive congestion patterns. Built to analyze traffic bottlenecks in DKI Jakarta's dense suburban roads.",
    category: "Simulation & Data Viz",
    tags: ["React 19", "Automotive Algorithmic Engine", "D3-inspired Vector Canvas"],
    status: "Active Development",
    imagePattern: "map",
    imageName: "sukamaju_grid.jpg",
    demoUrl: "#projects",
    repoUrl: "https://github.com/wanma2/sukamaju-grid"
  },
  {
    id: "proj-5",
    name: "Volt-Check ECU Analyzer",
    description: "A customized web-based serial diagnostic logger interface that interprets live error codes and translates hex sensor messages into clean responsive warning cards.",
    category: "Hardware Diagnostics UI",
    tags: ["HTML5 Serial API", "Responsive CSS", "OBD-II Translation"],
    status: "Completed",
    imagePattern: "diagnostics",
    imageName: "voltcheck_ecu.jpg",
    demoUrl: "#projects"
  }
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: "time-1",
    year: "2021",
    title: "The Automotive Revelation",
    subtitle: "Enrolled in Teknik Kendaraan Ringan Otomotif (TKRO)",
    description: "Developed a deep fascination with internal combustion, diagnostic logic, and computerized control loops. Discovered engine ECU telemetry, sparking a passion for software.",
    category: "automotive",
    iconName: "Wrench"
  },
  {
    id: "time-2",
    year: "2023",
    title: "Bridging Mechanics & Code",
    subtitle: "Self-Initiated Coding Practice",
    description: "Started learning JavaScript, CSS, and modern web frameworks during gamer clan breaks. Combined mechanical precision with micro-interactions, treating software styling like fine engine tuning.",
    category: "coding",
    iconName: "Braces"
  },
  {
    id: "time-3",
    year: "2024",
    title: "Esports & Telemetry Portals",
    subtitle: "Web UI Experiments in Desa Sukamaju",
    description: "Created customized guild platforms and responsive dashboard mockups for local diagnostic scanners. Balanced competitive gameplay with rigorous React development.",
    category: "coding",
    iconName: "Gamepad2"
  },
  {
    id: "time-4",
    year: "2026",
    title: "The Cyber-Luxury Paradigm",
    subtitle: "Senior World-Class Personal Portfolio",
    description: "Crafted this masterfully engineered, red-accented desktop-and-mobile showcase. Established a strong personal identity merging automotive engine expertise with high-end frontend craftsmanship.",
    category: "education",
    iconName: "Sparkles"
  }
];

export const STATS_DATA: StatItem[] = [
  {
    id: "stat-1",
    label: "Total Projects",
    value: 12,
    suffix: "+",
    description: "Dynamic Web Apps & Custom Diagnostics tools built",
    iconName: "FolderGit2"
  },
  {
    id: "stat-2",
    label: "Learning & Dev Hours",
    value: 1400,
    suffix: " hrs",
    description: "Writing React code and reading hardware interface specs",
    iconName: "Clock"
  },
  {
    id: "stat-3",
    label: "Mastered Tech",
    value: 15,
    suffix: "+",
    description: "Frameworks, databases, diagnostics & design tools",
    iconName: "Cpu"
  },
  {
    id: "stat-4",
    label: "Reaction speed",
    value: 142,
    suffix: "ms",
    description: "Fast reflex time key for competitive gaming & rapid debugs",
    iconName: "Activity"
  }
];

export const CHANNELS_DATA: ContactChannel[] = [
  {
    id: "chan-wa",
    name: "WhatsApp Direct",
    value: "+62 812-3456-7890",
    url: "https://wa.me/6281234567890?text=Halo%20WanMa2,%20saya%20tertarik%20dengan%20portfolio%20Anda!",
    iconName: "MessageSquareText",
    primary: true,
    color: "from-red-600 to-rose-700 shadow-red-950/50"
  },
  {
    id: "chan-mail",
    name: "Official Email",
    value: "up077109@gmail.com",
    url: "mailto:up077109@gmail.com?subject=Inquiry%20from%20Portfolio",
    iconName: "Mail",
    primary: false,
    color: "from-zinc-900 to-zinc-950 border border-zinc-800"
  },
  {
    id: "chan-git",
    name: "GitHub Developer",
    value: "github.com/wanma2",
    url: "https://github.com",
    iconName: "Github",
    primary: false,
    color: "from-zinc-900 to-zinc-950 border border-zinc-800"
  },
  {
    id: "chan-ig",
    name: "Instagram Professional",
    value: "@wanma2.dev",
    url: "https://instagram.com",
    iconName: "Instagram",
    primary: false,
    color: "from-zinc-900 to-zinc-950 border border-zinc-800"
  }
];
