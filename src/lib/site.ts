export const site = {
  name: "KITAMEN",
  url: "https://home.kitamen.my",
  email: "Hello@kitamen.my",
  tagline: "Boutique Esports Agency",
  description:
    "KITAMEN is a boutique esports agency in Malaysia designing structured esports experiences through PlayPod (console & sim setups), PlaySuite (fully managed tournaments), and PlayLab (bespoke co-creations). Trusted by brands, agencies, and institutions seeking precision in play.",
  talkToUs: "https://framer.link/madebythanh",
  nav: [
    { label: "Works", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com/kitamenofficial" },
    { label: "Twitter", href: "https://x.com/kitamenofficial" },
  ],
};

export type TeamMember = { name: string; role: string };

export const team: TeamMember[] = [
  { name: "Hazman", role: "Co-Founder, CEO" },
  { name: "Moshi", role: "Co-Founder, CSO" },
  { name: "Riaz", role: "Chief Experience Officer" },
  { name: "Jani", role: "Chief Brand Officer" },
  { name: "Ziq", role: "Broadcast Lead" },
  { name: "Akmal", role: "Logistics Lead" },
  { name: "Midah", role: "Tournament Lead" },
  { name: "Fiona", role: "Media & Content Lead" },
];

export type Service = {
  title: string;
  features: string[];
};

export const services: Service[] = [
  {
    title: "The Kitamen PlayPod™",
    features: [
      "Modular & Mobile",
      "Plug-and-Play Ready",
      "Adaptive Layouts",
      "Brandable Surfaces",
      "Built for Engagement",
      "Low-Footprint, High-Impact",
    ],
  },
  {
    title: "The KITAMEN PlaySuite™",
    features: [
      "Competitive-Ready Infrastructure",
      "Pro-Level Hardware Setup",
      "Integrated Broadcasting Support",
      "Controlled Player Environment",
      "Data & Insights Engine",
      "Scalable Formats",
    ],
  },
  {
    title: "The KITAMEN PlayLab™",
    features: [
      "Collaborative Design Process",
      "Custom Experience Architecture",
      "Narrative-Driven Interactions",
      "Flexible Technology Stack",
      "Outcome-Oriented Execution",
      "Culturally Tuned Formats",
    ],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// Placeholder testimonials — refine with the real quotes from the Framer file.
export const testimonials: Testimonial[] = [
  {
    quote:
      "KITAMEN didn't just run our tournament—they engineered an experience our audience still talks about. Precision from brief to broadcast.",
    name: "Media Prima",
    role: "Campaign Partner",
  },
  {
    quote:
      "From hardware to hosting, everything was tested and tuned. The KITAMEN team set a standard the rest of the industry is still chasing.",
    name: "UNIFI",
    role: "Brand Partner",
  },
  {
    quote:
      "They understood our audience because they are the audience. Gamers building for gamers—it shows in every detail.",
    name: "Toyota Gazoo Racing",
    role: "Activation Client",
  },
];
