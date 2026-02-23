const teams = [
  {
    title: "Executive Board",
    people: [
      {
        name: "Vinu Maradana",
        role: "President",
        major: "CS · Bioinformatics",
        image: "/professional_photos/68db4d229e84b6fea67b946e_Screenshot 2025-09-29 at 8.23.07 PM-p-130x130q80.png",
      },
      {
        name: "Julia Nguyen",
        role: "VP External",
        major: "Bio · Bioinformatics",
        image: "/professional_photos/68de2e4f10fcfa8980b59c92_Screenshot 2025-10-02 at 12.48.08 AM-p-130x130q80.png",
      },
      {
        name: "Prachi Heda",
        role: "VP Operations",
        major: "Math · CS",
        image: "/professional_photos/6619e00fcd2040ad660de1df_prachihs-p-130x130q80.jpg",
      },
      {
        name: "Parvathy Jayaram",
        role: "Director of Marketing",
        major: "Human Bio",
        image: "/team/parvathy.jpg",
      },
    ],
  },
  {
    title: "Operations & Events",
    people: [
      {
        name: "Ritu Doshi",
        role: "Event Logistics",
        major: "CS · Bioinformatics",
        image: "/professional_photos/68da2ad48aca948a7b560a3e_DSC_0200-p-130x130q80.jpeg",
      },
      {
        name: "Krushy Acharya",
        role: "Operations Coordinator",
        major: "Human Biology",
        image: "/professional_photos/68da2cdc5b4cad954e5c8497_krushy_headshot-p-130x130q80.png",
      },
      {
        name: "Krystal Chai",
        role: "External Relations",
        major: "Major",
        image: "/team/krystal.jpg",
      },
      {
        name: "Jasmin Rosato",
        role: "External Relations",
        major: "Cognitive & Behavioral Neuroscience",
        image: "/professional_photos/68da2f2e6301716e9afa843d_jasmine rosato-p-130x130q80.png",
      },
    ],
  },
  {
    title: "Tech and Marketing",
    people: [
      {
        name: "Siya Sathaye",
        role: "Software Developer",
        major: "Data Science",
        image: "/professional_photos/68df6e7217a9b284e3791bdf_Screenshot 2025-10-02 at 11.34.22 PM-p-130x130q80.png",
      },
      {
        name: "Laksh Goyal",
        role: "Software Developer",
        major: "Computer Science",
        image: "/professional_photos/68df6f5f1035987ae39eaec7_Screenshot 2025-10-02 at 11.38.17 PM-p-130x130q80.png",
      },
      {
        name: "Kaitlyn Srihavong",
        role: "Design Coordinator",
        major: "Bioengineering",
        image: "/professional_photos/68d593afb67b0c1666378883_Kaitlyn Srihavong_professional photo-p-130x130q80.jpg",
      },
    ],
  },
  {
    title: "Finance & Interns",
    people: [
      {
        name: "Pratyush",
        role: "Finance Coordinator",
        major: "Major",
        image: "/professional_photos/68da2731e172003b419c330a_1743357263004-p-130x130q80.jpeg",
      },
      {
        name: "Samara",
        role: "Finance Coordinator",
        major: "Major",
        image: "/team/samara.jpg",
      },
      {
        name: "Mariya",
        role: "Intern",
        major: "Major",
        image: "/professional_photos/1743357263004.jpeg",
      },
      {
        name: "Shiv",
        role: "Intern",
        major: "Major",
        image: "/team/shiv.jpg",
      },
    ],
  },
];

const avatarPlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='100' fill='%23222'%3E%3C/rect%3E%3Cpath d='M100 95c17 0 30-13 30-30S117 35 100 35 70 48 70 65s13 30 30 30Zm0 15c-26 0-48 15-48 33 0 4 3 7 7 7h82c4 0 7-3 7-7 0-18-22-33-48-33Z' fill='%23666'/%3E%3C/svg%3E";

const PersonCard = ({
  person,
}: {
  person: { name: string; role: string; major: string; image?: string };
}) => (
  <div className="text-center space-y-3">
    <div className="mx-auto h-32 w-32 rounded-full border border-white/15 bg-white/5 overflow-hidden shadow-lg shadow-blue-900/40">
      <img
        src={person.image || avatarPlaceholder}
        alt={person.name}
        className="h-full w-full object-cover"
      />
    </div>
    <div className="space-y-1">
      <p className="text-lg font-semibold text-white">{person.name}</p>
      <p className="text-sm text-blue-200 uppercase tracking-[0.12em]">{person.role}</p>
      <p className="text-sm text-neutral-300">{person.major}</p>
    </div>
  </div>
);

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#071225] via-[#0a1b35] to-[#102647] text-white">
      <section
        className="relative py-36 px-6 text-center max-w-full mx-auto bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/hero_bg_large.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <h1 className="text-5xl font-extrabold leading-tight">
            Team
          </h1>
          <p className="text-base uppercase tracking-[0.25em] text-blue-300">
            Meet the People
          </p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto space-y-12">
        {teams.map((section) => (
          <div key={section.title} className="space-y-6">
            <h2 className="text-3xl font-bold text-center">{section.title}</h2>
            <div
              className={`grid gap-8 ${
                section.people.length === 3
                  ? "grid-cols-3 justify-items-center"
                  : "grid-cols-2 md:grid-cols-4"
              }`}
            >
              {section.people.map((person) => (
                <PersonCard key={person.name} person={person} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
