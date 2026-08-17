import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    id: "current-role",
    role: "Junior Automation Engineer",
    field: "Control & Automation Systems",
    isCurrent: true,
    focus: [
      "Industrial Automation",
      "PLC",
      "Siemens",
      "HMI",
      "SCADA",
      "Control Logic",
      "Industrial Communication",
      "Troubleshooting",
      "Commissioning",
    ],
    details:
      "Currently growing as a Junior Automation Engineer in Control & Automation Systems. Working with Siemens PLCs, HMI/SCADA development, industrial communication protocols, control logic design, on-site troubleshooting, and system commissioning.",
  },
];

export const freelanceExperience = {
  title: "Independent Freelance Development",
  duration: "3.5+ YEARS",
  description:
    "Independently delivered web development, industrial automation, and technical solutions for approximately 3.5+ years — managing projects from concept through deployment.",
} as const;
