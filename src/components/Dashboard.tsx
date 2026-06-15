import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Skill, Project } from "../types";
import { loadSkills, saveSkills, loadProjects, saveProjects, resetAllData } from "../lib/storage";
import LucideIcon from "./LucideIcon";

// Scan available images from /src/assets/images at module load level
const imageModules = (import.meta as any).glob("/src/assets/images/*.{jpg,jpeg,png,svg,webp,gif,JPG,JPEG,PNG,SVG,WEBP,GIF}", { eager: true });
const scannedImages = Object.keys(imageModules).map((key) => key.split("/").pop() || "");

const defaultImages = [
  "project_rpm.jpg",
  "zerog_esports.jpg",
  "tachometer_widget.jpg",
  "sukamaju_grid.jpg",
  "voltcheck_ecu.jpg",
  "wanma2_avatar_1781504124072.jpg"
];

// Deduplicate available options
const allAvailableImages = Array.from(new Set([...scannedImages, ...defaultImages])).filter(Boolean);

interface DashboardProps {
  onDataChange: () => void;
}

export default function Dashboard({ onDataChange }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"skills" | "projects">("skills");
  const [skills, setSkills] = useState<Skill[]>(() => loadSkills());
  const [projects, setProjects] = useState<Project[]>(() => loadProjects());

  // Non-blocking iframe confirmation state overlays
  const [deleteConfirmInfo, setDeleteConfirmInfo] = useState<{ id: string; type: "skill" | "project"; name: string } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Form states for Skill
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [skillForm, setSkillForm] = useState<Partial<Skill>>({
    name: "",
    category: "frontend",
    iconName: "Code2",
    percentage: 80,
    description: ""
  });

  // Form states for Project
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    name: "",
    category: "",
    description: "",
    tags: [],
    status: "Completed",
    imagePattern: "telematics",
    imageName: "project_rpm.jpg",
    demoUrl: "",
    repoUrl: ""
  });

  const [projectTagsInput, setProjectTagsInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notification, setNotification] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showNotification = (text: string, type: "success" | "error" = "success") => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Skill Handlers
  const handleEditSkill = (skill: Skill) => {
    setEditingSkillId(skill.id);
    setSkillForm(skill);
  };

  const handleAddNewSkill = () => {
    const newId = `skill-${Date.now()}`;
    const newSkill: Skill = {
      id: newId,
      name: "New Custom Skill",
      category: "frontend",
      iconName: "Code2",
      percentage: 75,
      description: "Brief description of your new custom skill."
    };
    const updated = [...skills, newSkill];
    setSkills(updated);
    saveSkills(updated);
    onDataChange();
    handleEditSkill(newSkill);
    showNotification("Created new custom skill placeholder!");
  };

  const handleSaveSkill = () => {
    if (!editingSkillId) return;
    const updated = skills.map((s) => {
      if (s.id === editingSkillId) {
        return {
          ...s,
          ...skillForm,
          percentage: Number(skillForm.percentage || 0)
        } as Skill;
      }
      return s;
    });
    setSkills(updated);
    saveSkills(updated);
    onDataChange();
    setEditingSkillId(null);
    showNotification("Skill saved successfully!");
  };

  const handleDeleteSkill = (id: string) => {
    setDeleteConfirmInfo({
      id,
      type: "skill",
      name: skills.find((s) => s.id === id)?.name || "selected skill"
    });
  };

  // Project Handlers
  const handleEditProject = (proj: Project) => {
    setEditingProjectId(proj.id);
    setProjectForm(proj);
    setProjectTagsInput(proj.tags.join(", "));
  };

  const handleAddNewProject = () => {
    const newId = `proj-${Date.now()}`;
    const newProj: Project = {
      id: newId,
      name: "New Custom Project",
      description: "A description of the project.",
      category: "Custom Category",
      tags: ["React", "Tailwind CSS"],
      status: "Completed",
      imagePattern: "telematics",
      imageName: "project_rpm.jpg",
      demoUrl: "#projects",
      repoUrl: ""
    };
    const updated = [...projects, newProj];
    setProjects(updated);
    saveProjects(updated);
    onDataChange();
    handleEditProject(newProj);
    showNotification("Created new custom project placeholder!");
  };

  const handleSaveProject = () => {
    if (!editingProjectId) return;
    const tagsArray = projectTagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const updated = projects.map((p) => {
      if (p.id === editingProjectId) {
        return {
          ...p,
          ...projectForm,
          tags: tagsArray
        } as Project;
      }
      return p;
    });
    setProjects(updated);
    saveProjects(updated);
    onDataChange();
    setEditingProjectId(null);
    showNotification("Project saved successfully!");
  };

  const handleDeleteProject = (id: string) => {
    setDeleteConfirmInfo({
      id,
      type: "project",
      name: projects.find((p) => p.id === id)?.name || "selected project"
    });
  };

  // Global actions
  const handleResetToDefaults = () => {
    setShowResetConfirm(true);
  };

  const confirmDeleteAction = () => {
    if (!deleteConfirmInfo) return;
    const { id, type } = deleteConfirmInfo;
    if (type === "skill") {
      const updated = skills.filter((s) => s.id !== id);
      setSkills(updated);
      saveSkills(updated);
      onDataChange();
      if (editingSkillId === id) {
        setEditingSkillId(null);
      }
      showNotification("Skill deleted successfully.", "error");
    } else {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      saveProjects(updated);
      onDataChange();
      if (editingProjectId === id) {
        setEditingProjectId(null);
      }
      showNotification("Project deleted successfully.", "error");
    }
    setDeleteConfirmInfo(null);
  };

  const confirmResetAction = () => {
    resetAllData();
    const defaultSkills = loadSkills();
    const defaultProjects = loadProjects();
    setSkills(defaultSkills);
    setProjects(defaultProjects);
    onDataChange();
    setEditingSkillId(null);
    setEditingProjectId(null);
    setShowResetConfirm(false);
    showNotification("All data reset to initial showcase defaults.");
  };

  const handleExportJSON = () => {
    const data = {
      skills,
      projects
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `wanma2_custom_data_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification("Configuration file exported successfully.");
  };

  const handleImportJSONClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (parsed.skills && Array.isArray(parsed.skills) && parsed.projects && Array.isArray(parsed.projects)) {
          setSkills(parsed.skills);
          setProjects(parsed.projects);
          saveSkills(parsed.skills);
          saveProjects(parsed.projects);
          onDataChange();
          setEditingSkillId(null);
          setEditingProjectId(null);
          showNotification("Imported configurations applied successfully!");
        } else {
          showNotification("Error: JSON format invalid (must contain skills and projects arrays).", "error");
        }
      } catch (err) {
        showNotification("Error parsing uploaded configuration JSON file.", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = ""; // Clear input
  };

  const exitDashboard = () => {
    window.location.hash = "home";
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Laser-red neon atmospheric lines */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-950/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-900/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Dynamic Pop notification toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl border text-sm font-bold shadow-lg flex items-center gap-3 backdrop-blur-xl ${
              notification.type === "success"
                ? "bg-zinc-950/90 border-red-500/30 text-white"
                : "bg-red-950/90 border-red-800 text-red-200"
            }`}
          >
            <LucideIcon name={notification.type === "success" ? "Check" : "X"} className={notification.type === "success" ? "text-red-500 w-5 h-5" : "text-red-400 w-5 h-5"} />
            <span>{notification.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto position-relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-900 pb-8 mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/35 border border-red-900/40 rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[9px] uppercase font-mono tracking-widest text-red-400 font-bold">WANMA2 ADMIN DEV_ENVIRONMENT</span>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-wider font-display">
              Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-650 to-rose-500">Dashboard</span>
            </h1>
            <p className="text-zinc-500 text-xs mt-1">
              Add, remove, or modify items shown in My Skills and Featured Projects without editing code files.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleImportJSONClick}
              className="px-4 py-2 bg-zinc-900/80 hover:bg-zinc-850 border border-zinc-800 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-300 transition-all flex items-center gap-2 cursor-pointer"
            >
              <LucideIcon name="X" className="w-3.5 h-3.5 text-zinc-400" />
              <span>Import Config</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportJSON}
              accept=".json"
              className="hidden"
            />

            <button
              onClick={handleExportJSON}
              className="px-4 py-2 bg-zinc-900/80 hover:bg-zinc-850 border border-zinc-800 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-300 transition-all flex items-center gap-2 cursor-pointer"
            >
              <LucideIcon name="Code2" className="w-3.5 h-3.5 text-zinc-400" />
              <span>Export config</span>
            </button>

            <button
              onClick={handleResetToDefaults}
              className="px-4 py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 hover:border-red-500/40 rounded-xl text-xs font-bold uppercase tracking-wider text-red-400 transition-all flex items-center gap-2 cursor-pointer"
              title="Reset configuration to defaults"
            >
              <LucideIcon name="X" className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={exitDashboard}
              className="px-5 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-950/30 transition-all flex items-center gap-2 cursor-pointer ml-2"
            >
              <LucideIcon name="ChevronRight" className="w-3.5 h-3.5 rotate-180" />
              <span>Exit Settings</span>
            </button>
          </div>
        </div>

        {/* Tab Control */}
        <div className="flex border-b border-zinc-900 mb-8 max-w-md">
          <button
            onClick={() => setActiveTab("skills")}
            className={`flex-1 py-3 text-sm font-black uppercase tracking-wider transition-all relative cursor-pointer ${
              activeTab === "skills" ? "text-red-550" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <LucideIcon name="Cpu" className="w-4 h-4" />
              Skills ({skills.length})
            </span>
            {activeTab === "skills" && (
              <motion.div layoutId="activeDashboardTab" className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex-1 py-3 text-sm font-black uppercase tracking-wider transition-all relative cursor-pointer ${
              activeTab === "projects" ? "text-red-550" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <LucideIcon name="FolderGit2" className="w-4 h-4" />
              Projects ({projects.length})
            </span>
            {activeTab === "projects" && (
              <motion.div layoutId="activeDashboardTab" className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />
            )}
          </button>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main List Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold uppercase tracking-wide text-zinc-300">
                Current {activeTab === "skills" ? "Skills List" : "Featured Projects"}
              </h2>
              <button
                onClick={activeTab === "skills" ? handleAddNewSkill : handleAddNewProject}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <LucideIcon name="X" className="w-4 h-4 text-red-500 rotate-45" />
                <span>Add New Item</span>
              </button>
            </div>

            <div className="space-y-3 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
              {activeTab === "skills" ? (
                skills.map((skill) => (
                  <div
                    key={skill.id}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      editingSkillId === skill.id
                        ? "bg-zinc-950 border-red-500/55 shadow-md shadow-red-950/20"
                        : "bg-zinc-950/40 hover:bg-zinc-950 border-zinc-900/85 hover:border-zinc-800"
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-red-950/20 border border-red-900/35 text-red-500 flex items-center justify-center shrink-0">
                        <LucideIcon name={skill.iconName} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm truncate">{skill.name}</h4>
                          <span className="text-[9px] font-mono uppercase bg-zinc-900 px-2 py-0.5 rounded text-zinc-500">
                            {skill.category}
                          </span>
                        </div>
                        <p className="text-zinc-500 text-xs font-mono mt-0.5">Rating: {skill.percentage}%</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleEditSkill(skill)}
                        className="p-2 bg-zinc-905 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-all cursor-pointer"
                        title="Edit Skill"
                      >
                        <LucideIcon name="Code2" className="w-3.5 h-3.5 text-zinc-300" />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="p-2 bg-red-950/15 hover:bg-red-950/40 border border-red-900/20 hover:border-red-900/60 text-red-400 rounded-lg transition-all cursor-pointer"
                        title="Delete Skill"
                      >
                        <LucideIcon name="X" className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                projects.map((proj) => (
                  <div
                    key={proj.id}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      editingProjectId === proj.id
                        ? "bg-zinc-950 border-red-500/55 shadow-md shadow-red-950/20"
                        : "bg-zinc-950/40 hover:bg-zinc-950 border-zinc-900/85 hover:border-zinc-800"
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-red-950/20 border border-red-900/35 text-red-500 flex items-center justify-center shrink-0 font-bold font-mono text-xs">
                        {proj.status === "Completed" ? "CP" : proj.status === "Beta Live" ? "BA" : "DV"}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-end gap-2">
                          <h4 className="font-bold text-white text-sm truncate">{proj.name}</h4>
                          <span className="text-[8px] tracking-wide font-mono uppercase bg-red-950/30 border border-red-900/30 text-red-400 px-1.5 rounded truncate">
                            {proj.status}
                          </span>
                        </div>
                        <p className="text-zinc-500 text-xs truncate mt-0.5">Pattern: {proj.imagePattern}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleEditProject(proj)}
                        className="p-2 bg-zinc-905 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-all cursor-pointer"
                        title="Edit Project Details"
                      >
                        <LucideIcon name="Code2" className="w-3.5 h-3.5 text-zinc-300" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 bg-red-950/15 hover:bg-red-950/40 border border-red-900/20 hover:border-red-900/60 text-red-400 rounded-lg transition-all cursor-pointer"
                        title="Delete Project"
                      >
                        <LucideIcon name="X" className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Editor Sidebar Form Column */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 relative">
              
              {activeTab === "skills" ? (
                editingSkillId ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                      <h3 className="font-bold text-lg uppercase tracking-wide text-red-400">
                        Edit Skill Details
                      </h3>
                      <button
                        onClick={() => setEditingSkillId(null)}
                        className="text-zinc-500 hover:text-white text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
                          Skill Name
                        </label>
                        <input
                          type="text"
                          value={skillForm.name || ""}
                          onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                          placeholder="e.g. Next.js & Svelte"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
                            Category
                          </label>
                          <select
                            value={skillForm.category || "frontend"}
                            onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value as any })}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                          >
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="automotive">Automotive</option>
                            <option value="tools">Tools & Database</option>
                            <option value="gaming">Gaming & Others</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
                            Lucide Icon Key
                          </label>
                          <select
                            value={skillForm.iconName || "Code2"}
                            onChange={(e) => setSkillForm({ ...skillForm, iconName: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                          >
                            <option value="Code2">Code2</option>
                            <option value="Palette">Palette</option>
                            <option value="Cpu">Cpu</option>
                            <option value="Gauge">Gauge</option>
                            <option value="Zap">Zap</option>
                            <option value="Server">Server</option>
                            <option value="Database">Database</option>
                            <option value="Gamepad2">Gamepad2</option>
                            <option value="Wrench">Wrench</option>
                            <option value="Braces">Braces</option>
                            <option value="Sparkles">Sparkles</option>
                            <option value="FolderGit2">FolderGit2</option>
                            <option value="Clock">Clock</option>
                            <option value="Activity">Activity</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-[10px] font-mono uppercase text-zinc-500">
                            Tuning Level (Percentage)
                          </label>
                          <span className="text-xs font-mono text-red-400 font-bold">{skillForm.percentage}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={skillForm.percentage || 0}
                          onChange={(e) => setSkillForm({ ...skillForm, percentage: Number(e.target.value) })}
                          className="w-full accent-red-500 bg-zinc-900 border border-transparent rounded-lg h-1.5"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
                          Description
                        </label>
                        <textarea
                          rows={3}
                          value={skillForm.description || ""}
                          onChange={(e) => setSkillForm({ ...skillForm, description: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 resize-none"
                          placeholder="Provide a description matching mechanical precision..."
                        />
                      </div>

                      <button
                        onClick={handleSaveSkill}
                        className="w-full mt-2 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-xs font-bold uppercase tracking-wider text-white rounded-xl transition-all cursor-pointer"
                      >
                        Save Skill Configuration
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-zinc-500 space-y-2">
                    <LucideIcon name="Cpu" className="w-10 h-10 mx-auto text-zinc-700 mb-2" />
                    <p className="text-sm font-bold text-zinc-400">Settings Form Lock</p>
                    <p className="text-xs px-4">
                      Select a skill on the left using the console check button to enable structural diagnostics and edit options here.
                    </p>
                  </div>
                )
              ) : (
                editingProjectId ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                      <h3 className="font-bold text-lg uppercase tracking-wide text-red-400">
                        Edit Project Details
                      </h3>
                      <button
                        onClick={() => setEditingProjectId(null)}
                        className="text-zinc-500 hover:text-white text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
                          Project Title
                        </label>
                        <input
                          type="text"
                          value={projectForm.name || ""}
                          onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                          placeholder="e.g. Project RPM: Telemetry Suite"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
                            Status Badge
                          </label>
                          <select
                            value={projectForm.status || "Completed"}
                            onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value as any })}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                          >
                            <option value="Completed">Completed</option>
                            <option value="Active Development">Active Development</option>
                            <option value="Beta Live">Beta Live</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
                            Project Image Name
                          </label>
                          <select
                            value={allAvailableImages.includes(projectForm.imageName || "") ? (projectForm.imageName || "") : "custom_input"}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val !== "custom_input") {
                                setProjectForm({ ...projectForm, imageName: val });
                              }
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                          >
                            {allAvailableImages.map((img) => (
                              <option key={img} value={img}>
                                {img}
                              </option>
                            ))}
                            <option value="custom_input">Type Custom File Name...</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
                          Filename Override (src/assets/images/)
                        </label>
                        <input
                          type="text"
                          value={projectForm.imageName || ""}
                          onChange={(e) => setProjectForm({ ...projectForm, imageName: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                          placeholder="e.g. my_image_name.jpg"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
                          Category/Tech Label
                        </label>
                        <input
                          type="text"
                          value={projectForm.category || ""}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                          placeholder="e.g. Interactive Component Canvas"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
                          Tags (comma-separated list)
                        </label>
                        <input
                          type="text"
                          value={projectTagsInput}
                          onChange={(e) => setProjectTagsInput(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                          placeholder="e.g. React, Web Audio API, SVG"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
                            Demo Link (optional)
                          </label>
                          <input
                            type="text"
                            value={projectForm.demoUrl || ""}
                            onChange={(e) => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                            placeholder="#projects"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
                            GitHub Repository URI
                          </label>
                          <input
                            type="text"
                            value={projectForm.repoUrl || ""}
                            onChange={(e) => setProjectForm({ ...projectForm, repoUrl: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                            placeholder="https://github.com/..."
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
                          Project Description
                        </label>
                        <textarea
                          rows={4}
                          value={projectForm.description || ""}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 resize-none"
                          placeholder="Describe the technical details of the project..."
                        />
                      </div>

                      <button
                        onClick={handleSaveProject}
                        className="w-full mt-2 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-xs font-bold uppercase tracking-wider text-white rounded-xl transition-all cursor-pointer"
                      >
                        Save Project Details
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-zinc-500 space-y-2">
                    <LucideIcon name="FolderGit2" className="w-10 h-10 mx-auto text-zinc-700 mb-2" />
                    <p className="text-sm font-bold text-zinc-400">Settings Form Lock</p>
                    <p className="text-xs px-4">
                      Select a project on the left using the console check button to enable structural diagnostics and edit options here.
                    </p>
                  </div>
                )
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Dynamic Non-blocking Confirmation Overlays */}
      <AnimatePresence>
        {deleteConfirmInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600" />
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-950/20 border border-red-900/35 text-red-500 rounded-2xl shrink-0">
                  <LucideIcon name="X" className="w-5 h-5 animate-pulse text-red-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-display text-white uppercase tracking-wide">
                    Confirm Deletion
                  </h3>
                  <p className="text-[9px] text-zinc-500 font-mono mt-0.5 uppercase tracking-wider">
                    {deleteConfirmInfo.type === "skill" ? "MODULE: SKILL_DESTRUCT" : "MODULE: PROJECT_DESTRUCT"}
                  </p>
                  <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                    Are you absolutely sure you want to remove <b className="text-white">"{deleteConfirmInfo.name}"</b>? This action is irreversible.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 justify-end">
                <button
                  onClick={() => setDeleteConfirmInfo(null)}
                  className="px-4 py-2 text-xs font-mono uppercase bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteAction}
                  className="px-4 py-2 text-xs font-mono uppercase bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600" />
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-950/20 border border-red-900/35 text-red-500 rounded-2xl shrink-0">
                  <LucideIcon name="History" className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-display text-white uppercase tracking-wide">
                    Reset Portfolio Data
                  </h3>
                  <p className="text-[9px] text-zinc-500 font-mono mt-0.5 uppercase tracking-wider">
                    MODULE: DATABASE_PURGE_RESET
                  </p>
                  <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                    This will discard all your customized edits, newly added skills, and projects, resetting them to the initial defaults.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 justify-end">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 text-xs font-mono uppercase bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmResetAction}
                  className="px-4 py-2 text-xs font-mono uppercase bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all cursor-pointer"
                >
                  Confirm Reset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
