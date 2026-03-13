import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const metadata: Metadata = {
  title: "Projects — Dom Maida",
};

export default function ProjectsPage() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="mb-2 text-4xl font-bold">Projects</h1>
        <p className="text-zinc-400">Things I&apos;ve built and worked on.</p>
      </div>

      {featured && (
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky-400">
            Featured
          </p>
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-8 transition-colors hover:border-zinc-500">
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
              <div className="flex-1">
                <h2 className="mb-3 text-2xl font-bold text-white">
                  {featured.title}
                </h2>
                <p className="leading-relaxed text-zinc-300">
                  {featured.description}
                </p>
              </div>
              <div className="flex flex-col gap-4 lg:w-56 lg:shrink-0 lg:items-end">
                <div className="flex flex-wrap gap-1.5 lg:justify-end">
                  {featured.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {featured.url && (
                    <a
                      href={featured.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
                    >
                      Live Site ↗
                    </a>
                  )}
                  {featured.github && (
                    <a
                      href={featured.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
                    >
                      <FontAwesomeIcon icon={faGithub} className="size-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {rest.length > 0 && (
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            More Projects
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
