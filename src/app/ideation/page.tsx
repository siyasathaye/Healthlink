/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useRef, useState } from "react";

type Phase = {
  name: string;
  season: string;
  steps: { title: string; detail: string }[];
  accentBorder: string;
  accentGlow: string;
  accentText: string;
  accentGradient: string;
  accentLine: string;
  accentBackground: string;
};

const phases: Phase[] = [
  {
    name: "Ideate",
    season: "Fall",
    accentBorder: "border-orange-400/60",
    accentGlow: "bg-orange-400",
    accentText: "text-orange-200",
    accentGradient: "from-orange-400/30",
    accentLine: "bg-orange-400/50",
    accentBackground: "from-orange-500/35 via-orange-500/20 to-[#0a1b35]",
    steps: [
      {
        title: "Ideathon",
        detail: "Discover unmet clinical needs and form project teams around them.",
      },
      {
        title: "Ideation Workshops",
        detail: "Explore, research, and validate ideas with structured frameworks.",
      },
      {
        title: "Customer Discovery Workshops",
        detail: "Learn discovery tactics and sharpen the problem definition.",
      },
    ],
  },
  {
    name: "Innovate",
    season: "Winter",
    accentBorder: "border-teal-300/80",
    accentGlow: "bg-teal-300",
    accentText: "text-teal-100",
    accentGradient: "from-teal-300/35",
    accentLine: "bg-teal-300/50",
    accentBackground: "from-teal-400/35 via-teal-400/20 to-[#0a1b35]",
    steps: [
      {
        title: "Innovation Workshops",
        detail: "Analyze customer needs and hone the problem-solution fit.",
      },
      {
        title: "Prototyping",
        detail: "Build fast prototypes to test your chosen unmet need.",
      },
      {
        title: "Business Workshops",
        detail: "Model the business, understand regulatory pathways, and plan validation.",
      },
    ],
  },
  {
    name: "Implement",
    season: "Spring",
    accentBorder: "border-pink-400/80",
    accentGlow: "bg-pink-300",
    accentText: "text-pink-100",
    accentGradient: "from-pink-300/35",
    accentLine: "bg-pink-300/50",
    accentBackground: "from-pink-400/35 via-pink-400/20 to-[#0a1b35]",
    steps: [
      {
        title: "Pitch Workshops",
        detail: "Develop a compelling deck and presentation for investors and advisors.",
      },
      {
        title: "Innovation Convention",
        detail: "Present your project to the UCSD entrepreneurial ecosystem.",
      },
      {
        title: "Acceleration",
        detail: "Work with advisors to apply to accelerators and funding programs.",
      },
    ],
  },
];

const benefits = [
  "Clinical mentors from UCSD to sanity-check every iteration.",
  "Weekly build cadence so teams leave each term with artifacts, not slides.",
  "Regulatory and business guidance tailored to early MedTech teams.",
  "Peer accountability pods to keep momentum between workshops.",
];

const faqs = [
  {
    question: "Who can apply?",
    answer:
      "All current UCSD undergraduate and graduate students of any discipline or background are welcome to apply. While there are no formal application criteria, technical/research backgrounds in business, biomedicine, or engineering are preferred.",
  },
  {
    question: "What is the time commitment for participants?",
    answer:
      "Active participation and attendance in all parts of our programming are vital to the success of the project you will pursue. Participants will be expected to commit 3-5 hours per week, including guided workshops and additional team meetings.",
  },
  {
    question: "What if I don’t have any ideas or experience in entrepreneurship?",
    answer:
      "That’s completely fine! The Ideation program is designed to guide participants through every step of the startup journey, with or without ideas. You will be able to learn a variety of concepts in entrepreneurship and immediately apply them to your project. For those with ideas, our program can provide opportunities to form teams and develop your idea. For those without ideas, we will propose a wide array of projects to choose / form teams.",
  },
  {
    question: "Can I make my idea into a company?",
    answer:
      "Yes! The Ideation program will provide you with many tools, resources, and mentors needed to develop an idea into a real startup. In collaboration with our ecosystem partners, we will support teams beyond the Ideation programming to accelerate your idea into the further stages of startup development.",
  },
  {
    question: "What do we expect from participants?",
    answer:
      "Participation in the Ideation program requires a full-year commitment with attendance at weekly workshops and team meetings throughout the year. We expect participants to actively participate in their projects and teams for the entirety of the program.",
  },
];

export default function IdeationPage() {
  const phaseRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [visiblePhases, setVisiblePhases] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.getAttribute("data-phase-key");
            if (key) {
              setVisiblePhases((prev) => ({ ...prev, [key]: true }));
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" },
    );

    phaseRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#071225] via-[#0a1b35] to-[#102647] text-white">
      {/* HERO */}
      <section
        className="relative py-32 px-6 text-center max-w-full mx-auto bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: "url('/home/hero_bg_large.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#071225]/30 to-[#071225]" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <p className="text-4xl uppercase tracking-[0.05em] text-blue-300">
            Ideation Program
          </p>
          <h1 className="text-5xl font-bold leading-tight">
            From spark to prototype in one academic year.
          </h1>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-6 py-3 rounded-full bg-blue-500 text-white font-semibold shadow-lg shadow-blue-900/50 hover:scale-[1.02] transition">
              Apply to Ideation
            </button>
            <div className="px-4 py-3 rounded-full bg-white/10 border border-white/10 text-sm text-neutral-200">
              Next cohort starts Fall • Ideathon kickoff in September
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-14 px-6 max-w-6xl mx-auto">
        <div className="space-y-6 max-w-4xl">
          <p className="text-blue-300 uppercase tracking-[0.2em] text-l">
            Why this program
          </p>
          <h2 className="text-4xl font-extrabold">
            Shipable progress, not just brainstorming.
          </h2>
          <p className="text-neutral-300 text-lg">
            HealthLink&apos;s ideation track mirrors the Webflow timeline you saw:
            Ideate, Innovate, Implement. Each phase pairs workshops with
            hands-on build time so you leave every quarter with proof of progress.
          </p>
          <p className="text-neutral-100 text-base">
            The Ideation program guides participants through the initial startup journey—from team formation to ideation to business modeling—building high-caliber teams ready to pursue acceleration.
          </p>
          <ul className="text-neutral-200 space-y-2 list-disc list-inside">
            <li>Weekly applied workshops with clinical, product, and regulatory mentors.</li>
            <li>Rapid prototyping and validation cadence so every phase ships something real.</li>
            <li>Pitch coaching and advisor feedback to prepare for demo days and accelerators.</li>
          </ul>
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-blue-500/30 bg-white/5 p-4 text-neutral-100 shadow-lg shadow-blue-900/30"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-16 px-6 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-blue-300 uppercase tracking-[0.2em] text-l">
              Program timeline
            </p>
            <h2 className="text-4xl font-extrabold">Ideate - Innovate -Implement</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {phases.map((phase, idx) => (
            <div
              key={phase.name}
              ref={(el) => {
                phaseRefs.current[idx] = el;
              }}
              data-phase-key={phase.name}
              className={`relative rounded-3xl border bg-gradient-to-br ${phase.accentBackground} p-6 shadow-xl shadow-blue-900/30 overflow-hidden transition-all duration-700 ease-out ${
                visiblePhases[phase.name]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              } ${phase.accentBorder}`}
            >
              <div className="relative z-10 space-y-2">
                <p className={`text-xs uppercase tracking-[0.3em] ${phase.accentText}`}>
                  {phase.season}
                </p>
                <h3 className="text-3xl font-extrabold">{phase.name}</h3>
                <div className="mt-4 space-y-4">
                  {phase.steps.map((step, index) => (
                    <div key={step.title} className="relative pl-6">
                      <span
                        className={`absolute left-0 top-2 h-2 w-2 rounded-full ${phase.accentGlow}`}
                      />
                      {index < phase.steps.length - 1 && (
                        <span
                          className={`absolute left-[3px] top-5 bottom-0 w-[2px] ${phase.accentLine}`}
                        />
                      )}
                      <p className="text-lg font-semibold">{step.title}</p>
                      <p className="text-neutral-300">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 px-6 max-w-6xl mx-auto space-y-6">
        <div className="space-y-2">
          <p className="text-blue-300 uppercase tracking-[0.2em] text-2l">FAQ</p>
          <h2 className="text-4xl font-extrabold">What to know before you apply</h2>
          <p className="text-neutral-300 max-w-2xl">
            The most common questions about who can join, time commitment, and how ideas
            turn into real companies through the program.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-blue-500/30 bg-white/5 px-5 py-4 shadow-lg shadow-blue-900/30"
            >
              <summary className="flex items-center justify-between cursor-pointer text-lg font-semibold text-white">
                <span>{item.question}</span>
                <span className="text-blue-200 text-sm group-open:hidden">▼</span>
                <span className="text-blue-200 text-sm hidden group-open:inline">▲</span>
              </summary>
              <p className="mt-2 text-neutral-200">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="rounded-3xl border border-blue-500/40 bg-gradient-to-r from-blue-600/30 via-blue-500/20 to-indigo-500/20 p-8 shadow-2xl shadow-blue-900/40 text-center space-y-4">
          <h3 className="text-4xl font-extrabold">Join the next ideation cohort</h3>
          <p className="text-neutral-200 max-w-3xl mx-auto">
            Bring a clinical need, or start from zero—we will help you validate it,
            prototype it, and pitch it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-6 py-3 rounded-full bg-white text-blue-900 font-semibold shadow-lg hover:scale-[1.02] transition">
              Submit interest form
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
