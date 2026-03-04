export interface Project {
  title: string;
  description: string;
  tech: string[];
  url?: string;
  github?: string;
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
    title: "NIC Performance Dashboard",
    description:
      "Full-stack application built at Intel that automated NIC performance test reporting, eliminating manual CSV-to-Excel workflows and enabling organization-wide access to performance data.",
    tech: ["React", ".NET Core", "PostgreSQL", "Python"],
  },
];
