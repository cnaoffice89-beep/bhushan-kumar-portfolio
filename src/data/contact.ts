export const contact = {
  whatsapp: {
    number: "8889406139",
    message:
      "Hi Bhushan, I visited your portfolio and would like to discuss a project.",
    get url() {
      return `https://wa.me/91${this.number}?text=${encodeURIComponent(this.message)}`;
    },
  },
  email: {
    address: "cnaoffice89@gmail.com",
    subject: "Portfolio Inquiry — Bhushan Kumar",
    get mailto() {
      return `mailto:${this.address}?subject=${encodeURIComponent(this.subject)}`;
    },
  },
  form: {
    projectTypes: [
      "Web Development",
      "Industrial Automation",
      "PLC / Control Systems",
      "UI/UX",
      "Freelance Project",
      "Other",
    ],
  },
} as const;

export const socialLinks: { platform: string; url: string }[] = [];

export const resume = {
  available: false,
  viewUrl: undefined as string | undefined,
  downloadUrl: undefined as string | undefined,
} as const;
