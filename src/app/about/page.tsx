import type { Metadata } from "next";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About — Daniel Maida",
};

const experience = [
  {
    title: "Software Development Engineer",
    company: "Amazon.com, Inc.",
    period: "November 2021 – Present",
    bullets: [
      "Built abuse detection and intelligent routing features for a high-throughput contact routing service processing 1B+ events per month across 22+ Amazon marketplaces using Java and TypeScript.",
      "Designed language-aware routing that prevents 1.56M misrouted contacts (8.79% of total traffic) per year across 40+ language pairs, improving customer satisfaction and agent efficiency.",
      "Architected AWS infrastructure with CDK, deploying containerized microservices on ECS and Lambda with full CI/CD automation.",
      "Simplified data warehousing pipeline by decommissioning a legacy service and migrating 14 tables to a direct 3-system flow, eliminating 5+ failure points and preventing data loss that previously affected 10K+ records.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Intel Corporation",
    period: "May 2018 – November 2021",
    bullets: [
      "Developed full-stack application (React, .NET Core, PostgreSQL) that automated NIC performance test reporting, eliminating manual workflows and enabling organization-wide access to performance data.",
      "Built Python test automation framework for Intel Ethernet products, validating performance and reliability across 100 Gbps networking hardware.",
      "Conducted performance analysis and benchmarking with results featured in external Intel publications.",
      "Promoted within first year; received Divisional Recognition Award for contributions to ADQ enablement in the Intel 800 series.",
    ],
  },
];

const education = [
  {
    degree: "B.S. Computer Science",
    school: "Washington State University",
    period: "2014 – 2018",
    notes: "Graduated with honors · 3.7 GPA · Minors: Business Administration, Mathematics",
  },
  {
    degree: "A.A. General Arts",
    school: "Clark College",
    period: "2012 – 2014",
    notes: "Graduated with honors · 3.6 GPA · Running Start program",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-14">
      <div>
        <h1 className="mb-4 text-4xl font-bold">About Me</h1>
        <p className="max-w-2xl text-lg text-zinc-400">{profile.bio}</p>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold">Experience</h2>
        <div className="flex flex-col gap-8">
          {experience.map((job) => (
            <div key={job.company}>
              <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                <span className="text-zinc-400">{job.company}</span>
                <span className="ml-auto text-sm text-zinc-500">{job.period}</span>
              </div>
              <ul className="mt-3 space-y-2">
                {job.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="mt-1 shrink-0 text-zinc-600">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold">Education</h2>
        <div className="flex flex-col gap-4">
          {education.map((ed) => (
            <div key={ed.school}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <h3 className="font-semibold text-white">{ed.degree}</h3>
                <span className="text-zinc-400">{ed.school}</span>
                <span className="ml-auto text-sm text-zinc-500">{ed.period}</span>
              </div>
              <p className="mt-1 text-sm text-zinc-500">{ed.notes}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-1.5 text-sm text-zinc-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
