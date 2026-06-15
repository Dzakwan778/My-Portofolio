import { motion } from "motion/react";
import { PROJECTS_DATA } from "../data";
import { Project } from "../types";
import ProjectGraphic from "./ProjectGraphic";
import LucideIcon from "./LucideIcon";

interface ProjectsProps {
  projects?: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const currentProjects = projects || PROJECTS_DATA;
  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#050505] scroll-mt-20">
      {/* Background aesthetics */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-red-950/5 blur-[120px] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/20 border border-red-950/50 rounded-full mb-4">
            <LucideIcon name="FolderGit2" className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 font-bold">SPEC: DIGITAL_VAULT_03</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-display text-white uppercase tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-transparent mt-4 rounded-full mx-auto" />
          <p className="text-zinc-500 text-sm mt-4 max-w-lg mx-auto font-light leading-relaxed">
            Examine functional portfolios linking vehicle system calibrations, dynamic SVG dials, and fast-paced game roster components.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              key={project.id}
              className="bg-zinc-950/45 border border-zinc-900 rounded-3xl overflow-hidden backdrop-blur-md hover:border-red-500/30 transition-all duration-300 flex flex-col h-full group"
            >
              
              {/* Graphic Cover Thumbnail Area (Ratio 4:3 is standard for layouts) */}
              <div className="relative aspect-[4/3] w-full border-b border-zinc-900/60 overflow-hidden bg-black shrink-0">
                <ProjectGraphic pattern={project.imagePattern} imageName={project.imageName} />
                
                {/* Active Dynamic Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest backdrop-blur-md ${
                    project.status === "Completed"
                      ? "bg-zinc-950/85 border border-zinc-800 text-zinc-300"
                      : project.status === "Beta Live"
                      ? "bg-red-950/90 border border-red-900/30 text-red-400"
                      : "bg-amber-950/90 border border-amber-900/30 text-amber-500"
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      project.status === "Completed"
                        ? "bg-zinc-400"
                        : project.status === "Beta Live"
                        ? "bg-red-500 animate-pulse"
                        : "bg-amber-500"
                    }`} />
                    {project.status}
                  </span>
                </div>

                {/* Cover Overlay zoom screen indicator on hover */}
                <div className="absolute inset-0 bg-red-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Card Meta Content Area */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                <div>
                  {/* Category Stamp */}
                  <span className="text-[10px] font-mono tracking-widest text-red-500 uppercase font-semibold block mb-2">
                    {project.category}
                  </span>

                  {/* Project Name */}
                  <h3 className="text-xl font-bold font-display text-white mb-3 group-hover:text-red-400 transition-colors">
                    {project.name}
                  </h3>

                  {/* Description text */}
                  <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-zinc-900 px-3 py-1 rounded-md text-[10px] font-mono tracking-wide text-zinc-400 border border-zinc-800/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Redirect Buttons of current project */}
                <div className="flex items-center gap-3 border-t border-zinc-900 pt-5 mt-auto">
                  
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-650/10 hover:bg-gradient-to-r hover:from-red-600 hover:to-rose-600 border border-red-500/20 hover:border-transparent rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all pointer-events-auto"
                    >
                      <LucideIcon name="ExternalLink" className="w-3.5 h-3.5" />
                      <span>Live Sandbox</span>
                    </a>
                  )}

                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-xl transition-all"
                      title="Explore GitHub Repository"
                    >
                      <LucideIcon name="Github" className="w-4 h-4" />
                    </a>
                  ) : (
                    <span
                      className="inline-flex items-center justify-center p-2.5 bg-zinc-950 border border-zinc-950 text-zinc-630 rounded-xl cursor-not-allowed opacity-40"
                      title="Proprietary Source Code"
                    >
                      <LucideIcon name="Github" className="w-4 h-4 text-zinc-600" />
                    </span>
                  )}

                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
