import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "venkateshwara",
    title: "Venkateshwara Infrastructure",
    category: "Control & Automation System",
    description:
      "A full-stack web platform for Venkateshwara Infrastructure — showcasing control and automation system capabilities with a modern, responsive interface.",
    role: "Frontend + Backend Developer",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    deployment: "Netlify",
    liveUrl: "https://admirable-bubblegum-4b6635.netlify.app/",
    status: "live",
    featured: true,
    caseStudy: {
      overview:
        "Venkateshwara Infrastructure is a control and automation system web platform built to present industrial automation services and capabilities through a modern digital interface.",
      role: "Frontend + Backend Developer — responsible for designing and building the complete web application including UI, routing, content structure, and deployment.",
      technology:
        "Built with Next.js for server-side rendering and optimal performance, deployed on Netlify for reliable hosting and continuous delivery.",
      built:
        "A responsive, professional web platform with structured sections for services, capabilities, and contact — designed for the control and automation industry.",
      process:
        "Requirements gathering → UI/UX design → Next.js development → responsive testing → Netlify deployment.",
      features: [
        "Responsive modern web interface",
        "Control & automation focused content structure",
        "Professional service presentation",
        "Optimized performance with Next.js",
        "Deployed on Netlify",
      ],
      result:
        "A live, functional web platform accessible at admirable-bubblegum-4b6635.netlify.app — serving as the primary showcase project.",
    },
  },
  {
    id: "control-automation-website",
    title: "Control & Automation System Website",
    category: "Control & Automation System",
    description:
      "A dedicated web platform for control and automation system services — designed to showcase industrial automation capabilities and project portfolio.",
    role: "Frontend + Backend Developer",
    technologies: ["Next.js", "React", "TypeScript"],
    status: "coming-soon",
    caseStudy: {
      overview:
        "A professional website for control and automation system services — currently in development with live deployment planned.",
      role: "Frontend + Backend Developer — building the complete web platform for automation services presentation.",
      technology: "Next.js-based architecture for modern, performant web delivery.",
      built:
        "Web platform architecture and design for industrial automation service presentation.",
    },
  },
];
