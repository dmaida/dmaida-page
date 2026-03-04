import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects — Dom Maida",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="mb-2 text-4xl font-bold">Projects</h1>
        <p className="text-zinc-400">Things I&apos;ve built and worked on.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
