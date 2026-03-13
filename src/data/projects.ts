export interface Project {
  title: string;
  description: string;
  tech: string[];
  url?: string;
  github?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "dmaida-page",
    description:
      "Personal portfolio site built with Next.js and self-hosted via Docker on Unraid.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Docker"],
    github: "https://github.com/dmaida/dmaida-page",
  },
  {
    title: "Home Lab",
    description:
      "Self-hosted Unraid server running media, monitoring, automation, and other services behind Nginx Proxy Manager.",
    tech: ["Unraid", "Docker", "Nginx", "Grafana"],
  },
  {
    title: "J & A Beautiful Events",
    description:
      "Bilingual (English/Spanish) website for a wedding and event planning company, featuring a hero slider, masonry gallery with lightbox, and scroll reveal animations.",
    tech: ["Next.js", "TypeScript", "next-intl", "CSS Modules", "Docker"],
    github: "https://github.com/dmaida/j_a_beautiful_events",
    url: "https://jandabeautifulevents.com/",
    featured: true,
  },
  {
    title: "NIC Performance Dashboard",
    description:
      "Full-stack application built at Intel that automated NIC performance test reporting, eliminating manual CSV-to-Excel workflows and enabling organization-wide access to performance data.",
    tech: ["React", ".NET Core", "PostgreSQL", "Python"],
  },
];
