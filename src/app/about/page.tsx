
import AdvisorSlider from "@/components/AdvisorSlider";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#071225] via-[#0a1b35] to-[#102647] text-white">

      {/* HERO SECTION */}
<section
  className="
    relative
    py-40 px-6 text-center max-w-full mx-auto
    bg-cover bg-center bg-no-repeat
  "
  style={{ backgroundImage: "url('/home/hero_bg_large.png')" }}
>
  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

  {/* CONTENT */}
  <div className="relative z-10 max-w-4xl mx-auto">
    <h1 className="text-6xl font-extrabold leading-tight mb-4">
      HealthLink
    </h1>

    <p className="text-base uppercase tracking-[0.25em] text-blue-300">
      Accelerating student-led innovation in healthcare
    </p>
  </div>
</section>




      {/* ABOUT / WHAT WE DO */}
<section id="about" className="py-24 px-6 max-w-6xl mx-auto space-y-20">
  {/* WHO WE ARE */}
  <div className="grid md:grid-cols-2 gap-12 items-center">
    <div>
      <p className="text-10 uppercase tracking-[0.2em] text-blue-300 mb-3">
        Who we are
      </p>
      <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
        A student-led MedTech accelerator at UCSD.
      </h2>
      <p className="text-lg text-neutral-300 leading-relaxed mb-4">
        HealthLink is a community of engineers, pre-meds, designers, data
        scientists, and entrepreneurs who are passionate about building
        technology that improves health care. We connect students who are
        curious about healthcare innovation with the structure, mentorship, and
        resources to actually ship things—not just talk about them.
      </p>
      <p className="text-neutral-300 leading-relaxed">
        Whether you&apos;re on your first idea or your fifth startup, you&apos;ll find
        teammates, advisors, and an environment that takes your work seriously
        while still being welcoming and collaborative.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-6 text-sm text-neutral-200">
        <div>
          <p className="text-2xl font-bold text-blue-300">Interdisciplinary</p>
          <p>Teams from medicine, engineering, business, and design working together.</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-300">Student-driven</p>
          <p>Projects led by students with guidance from world-class advisors.</p>
        </div>
      </div>
    </div>

    <div className="relative">
      <div className="rounded-3xl overflow-hidden border border-blue-500/40 shadow-xl shadow-blue-900/40">
        <img
          src="/home/who_we_are.jpg"
          alt="HealthLink members collaborating"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="hidden md:block absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-3xl blur-3xl" />
    </div>
  </div>

  {/* WHAT WE DO */}
  <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
    <div className="order-2 md:order-1">
      <p className="text-10 uppercase tracking-[0.2em] text-blue-300 mb-3">
        What we do
      </p>
      <h3 className="text-4xl font-extrabold mb-4 tracking-tight">
        Turn early-stage ideas into real healthcare ventures.
      </h3>
      <p className="text-lg text-neutral-300 leading-relaxed mb-4">
        Each year, HealthLink supports student teams through a structured
        sprint: opportunity discovery, problem validation, prototyping, and
        pitching. Along the way, you&apos;ll get feedback from physicians,
        founders, and investors who understand the MedTech landscape.
      </p>

      <ul className="space-y-3 text-neutral-200">
        <li className="flex gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
          <span>
            <strong>Workshops:</strong> Ideation, clinical need finding, regulatory
            basics, business models, and storytelling for pitches.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
          <span>
            <strong>Mentorship:</strong> 1:1 advising from physicians, founders, and
            domain experts aligned with your project.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
          <span>
            <strong>Opportunities:</strong> On-ramps into accelerators, pitch
            competitions, and research or venture pathways at UCSD and beyond.
          </span>
        </li>
      </ul>

      <p className="mt-6 text-neutral-300">
        You don&apos;t need a fully formed startup to join—just curiosity about
        healthcare and a willingness to build with others.
      </p>
    </div>

    <div className="order-1 md:order-2 relative">
      <div className="rounded-3xl overflow-hidden border border-blue-500/40 shadow-xl shadow-blue-900/40">
        <img
          src="/home/what_we_do1.jpg"
          alt="HealthLink workshop or pitch event"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="hidden md:block absolute -top-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-3xl blur-3xl" />
    </div>
  </div>
</section>


      {/* ADVISORS */}
      <section className="py-5 px-6 bg-neutral-900/40 backdrop-blur-sm relative z-0 overflow-visible">
        <h2 className="text-6xl font-bold text-center mb-14">
          World Class Advisors
        </h2>
        <AdvisorSlider />
      </section>

      {/* PORTFOLIO */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-14">Portfolio</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Dermose",
              description:
                "A pre-seed company optimizing hair growth therapeutics using big data + ML.",
              image: "/portfolio/dermose.png",
              link: "https://www.dermose.com",
            },
            {
              title: "Epinoma",
              description:
                "Early cancer detection using epigenetic signals. YC 2022 • $3M seed.",
              image: "/portfolio/epinoma.png",
              link: "https://www.epinoma.com",
            },
            {
              title: "Stasis",
              description:
                "A smart insole analyzing gait and balance with real-time AI feedback.",
              image: "/portfolio/stasis.png",
              link: "",
            },
          ].map((startup) => (
            <a
              key={startup.title}
              href={startup.link}
              className="bg-neutral-900/40 border border-neutral-700 rounded-xl overflow-hidden hover:scale-[1.02] transition block"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={startup.image}
                alt={startup.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold">{startup.title}</h3>
                <p className="text-neutral-300 mt-3">{startup.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

    </main>
  );
}
