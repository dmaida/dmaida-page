import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-600">
      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
      <p className="flex-1 text-sm text-zinc-400">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-300"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-3 pt-1">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-400 underline-offset-2 hover:text-white hover:underline"
          >
            GitHub
          </a>
        )}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-400 underline-offset-2 hover:text-white hover:underline"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
