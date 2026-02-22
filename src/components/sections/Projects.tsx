import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  status: "Building" | "Live" | "Stealth";
  tag: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "Genia - AI Website Builder",
    description:
      "An AI-powered website builder that makes professional web development.",
    image: "/COMING.png",
    status: "Building",
    tag: "Coming Soon",
    link: "https://github.com/radityprtama",
  },
  {
    title: "Kalt",
    description: "An Ultimate Open-Source AI Coding Agent",
    image: "/COMING.png",
    status: "Building",
    tag: "Coming Soon",
    link: "https://github.com/radityprtama",
  },
  {
    title: "Trac - Project Management",
    description: "The all-in-one project management platform.",
    image: "/trac.png",
    status: "Live",
    tag: "Home Feed",
    link: "https://github.com/radityprtama/trac_management.git",
  },
  {
    title: "Orbin",
    description:
      "Orbin replaces fragile scripts with a resilient, AI-driven orchestration engine.",
    image: "/COMING.png",
    status: "Stealth",
    tag: "News Screen",
    link: "#",
  },
];

export default function Projects() {
  return (
    <section className="relative z-50 bg-background" aria-label="Projects">
      <div className="relative p-3">
        <h2 className="text-[1.125rem] font-semibold leading-[1.5] text-title select-none">
          What I'm building.
        </h2>
      </div>
      <div className="dashed-separator"></div>
      <div className="relative p-3 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[8px]">
          {projects.map((project, index) => (
            <div key={index} className="flex flex-col">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative aspect-[1.6/1] w-full overflow-hidden border border-border rounded-[9px] bg-muted mb-3 group ${project.link !== "#" ? "cursor-pointer" : "pointer-events-none"}`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {project.link !== "#" && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-[8px] flex items-center gap-1 text-[0.8125rem] font-medium text-foreground">
                      View Project <ArrowUpRight className="size-3" />
                    </div>
                  </div>
                )}
              </a>

              <div className="flex flex-col gap-1 px-0.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-[0.9375rem] font-semibold text-title leading-tight">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        project.status === "Live"
                          ? "bg-[#22c55e]"
                          : project.status === "Stealth"
                            ? "bg-[#000000]"
                            : "bg-[#ef4444]"
                      }`}
                    />
                    <span className="text-[12px] font-medium text-muted-foreground">
                      {project.status}
                    </span>
                  </div>
                </div>

                <p className="text-[0.875rem] text-muted-foreground leading-[1.5] line-clamp-2">
                  {project.description}
                </p>

                {project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 mt-1 text-[0.8125rem] font-medium text-muted-foreground hover:text-foreground transition-colors group/link w-fit"
                  >
                    View Project{" "}
                    <ArrowUpRight className="size-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="dashed-separator"></div>
      <div className="relative p-3">
        <div className="flex justify-center py-2">
          <a
            href="https://github.com/radityprtama"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#404040] hover:bg-[#262626] text-white text-[13px] font-medium rounded-[9px] transition-colors duration-300 group"
          >
            View All
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
      <div className="dashed-separator"></div>
    </section>
  );
}
