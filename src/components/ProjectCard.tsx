import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-600">
      <h3 className="mb-2 text-lg font-semibold text-white">{project.title}</h3>
      <p className="flex-1 text-sm leading-relaxed text-zinc-400">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400"
          >
            {t}
          </span>
        ))}
      </div>
      {(project.github || project.url) && (
        <div className="mt-4 flex items-center gap-4 border-t border-zinc-800 pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-white"
            >
              <FontAwesomeIcon icon={faGithub} className="size-3.5" />
              GitHub
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 transition-colors hover:text-white"
            >
              Live Site ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
}
