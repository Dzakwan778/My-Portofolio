import { Skill, Project } from "../types";
import { SKILLS_DATA, PROJECTS_DATA } from "../data";

const SKILLS_KEY = "wanma2_skills_v1";
const PROJECTS_KEY = "wanma2_projects_v1";

export function loadSkills(): Skill[] {
  const stored = localStorage.getItem(SKILLS_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.error("Error parsing stored skills", e);
    }
  }
  return SKILLS_DATA;
}

export function saveSkills(skills: Skill[]): void {
  localStorage.setItem(SKILLS_KEY, JSON.stringify(skills));
}

export function loadProjects(): Project[] {
  const stored = localStorage.getItem(PROJECTS_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.error("Error parsing stored projects", e);
    }
  }
  return PROJECTS_DATA;
}

export function saveProjects(projects: Project[]): void {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function resetAllData(): void {
  localStorage.removeItem(SKILLS_KEY);
  localStorage.removeItem(PROJECTS_KEY);
}
