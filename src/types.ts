export interface Skill {
  id: string;
  name: string;
  category: "frontend" | "backend" | "automotive" | "tools" | "gaming";
  iconName: string;
  percentage: number;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  status: "Completed" | "Active Development" | "Beta Live";
  imagePattern?: "telematics" | "esports" | "tachometer" | "diagnostics" | "map";
  imageName?: string;
  demoUrl?: string;
  repoUrl?: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  category: "education" | "automotive" | "coding";
  iconName: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
  iconName: string;
}

export interface ContactChannel {
  id: string;
  name: string;
  value: string;
  url: string;
  iconName: string;
  primary: boolean;
  color: string;
}

export interface UserMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
