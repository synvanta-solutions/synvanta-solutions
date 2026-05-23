import AboutScroll from "./AboutScroll";

export const sections = [
  {
    id: "mission",
    badge: "Our Mission",
    heading: "We build what\ncomes next.",
    body: "Synvanta exists to collapse the gap between ambition and execution. We deliver pre-built systems that slot straight into your workflow and bespoke solutions engineered around your exact constraints — so you spend less time building infrastructure and more time changing your industry.",
    cta: { label: "Work With Us", href: "/contact" },
    icon: "Zap",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=500&fit=crop",
    accent: "hsl(var(--primary))",
  },
  {
    id: "team",
    badge: "The Team",
    heading: "Builders who\nship fast.",
    body: "Behind every Synvanta product is a tight crew of engineers, designers, and strategists obsessed with craft. No committees, no bloat — just focused people who care deeply about the quality of what they hand you.",
    cta: { label: "Check the Process", href: "/process" },
    icon: "Users",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=500&fit=crop",
    accent: "hsl(var(--primary) / 0.75)",
  },
  {
    id: "reach",
    badge: "Our Reach",
    heading: "Local roots,\nglobal scale.",
    body: "Synvanta partners with startups and enterprises across Southeast Asia and beyond. Our systems are built to scale — cloud-native from day one, localisation-ready, and wired for the markets that matter to you.",
    cta: { label: "See Case Studies", href: "/work" },
    icon: "Globe",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=500&fit=crop",
    accent: "hsl(var(--primary) / 0.55)",
  },
  {
    id: "trust",
    badge: "Our Promise",
    heading: "Reliable systems,\nreal ownership.",
    body: "Every system we deliver is yours — fully documented, thoroughly tested, and handed over with the knowledge transfer your team needs to own it. We don't create dependency; we create capability.",
    cta: { label: "See Pricing", href: "/pricing" },
    icon: "ShieldCheck",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=500&fit=crop",
    accent: "hsl(var(--primary) / 0.4)",
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/*
        Hidden but indexable content for crawlers that don't execute JS.
        Screen readers also benefit from this linear reading order.
        AboutScroll renders the same content visually with animations.
      */}
      <div className="sr-only">
        {sections.map((s) => (
          <article key={s.id}>
            <h2>{s.heading.replace("\n", " ")}</h2>
            <p>{s.body}</p>
          </article>
        ))}
      </div>

      {/* Full interactive sticky-scroll experience */}
      <AboutScroll sections={sections} />
    </main>
  );
}
