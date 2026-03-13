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
      "Built abuse detection, intelligent routing, and policy decision features for a customer contact abuse prevention service processing 1B+ events per month across 22+ Amazon marketplaces using Java and TypeScript.",
      "Designed and implemented language-aware routing across voice, email, and chat channels, preventing 1.56M misrouted contacts (8.79% of total traffic) per year across 22+ marketplaces and 40+ language pairs with per-channel fallback logic, improving customer satisfaction and agent efficiency.",
      "Led incident response and root cause analysis for a critical outage that caused 10,700+ failed authentication attempts across 3 regions; drove 4 corrective actions including alarm strategy redesign and a canary monitoring architecture to prevent recurrence.",
      "Led architectural planning for a mandatory multi-region migration, evaluated traffic-shifting strategies, quantified cross-regional latency penalties (~180ms P50), and coordinated migration of a service spanning 3 AWS regions across 5 independent caller services to meet an org-wide compliance deadline.",
      "Simplified data warehousing architecture by eliminating a legacy intermediary service and migrating 14 tables to a direct SQS → Data Loader → Data Lake flow, decommissioning 3 AWS accounts and 16 code packages, resolving a security compliance requirement, and preventing data loss that previously affected 10K+ records.",
      "Architected AWS infrastructure using CDK, deploying containerized microservices on ECS and Lambda with CI/CD automation.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Intel Corporation",
    period: "May 2018 – November 2021",
    bullets: [
      "Developed full-stack application (ReactJS, .NET Core, PostgreSQL) that automated NIC performance test reporting, eliminating manual CSV-to-Excel workflows and enabling organization-wide access to performance data.",
      "Built Python test automation framework for Intel Ethernet products, validating performance, scalability, and reliability requirements across 100 Gbps networking hardware.",
      "Conducted performance analysis, benchmarking, and optimization for high-bandwidth networking, with results used by principal engineers and VPs, and featured in external Intel publications.",
      "Mentored interns on software engineering best practices; two converted to full-time hires.",
      "Promoted within first year; received Divisional Recognition Award for contributions to ADQ enablement in Intel 800 series networking.",
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
