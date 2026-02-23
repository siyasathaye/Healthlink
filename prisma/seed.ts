import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data (optional)
  await prisma.attendance.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.user.deleteMany({});

  // Create events
  const event1 = await prisma.event.create({
    data: {
      title: "General Meeting #1",
      description: "Welcome to HealthLink! Learn about our mission and upcoming projects.",
      date: new Date("2026-01-25T18:00:00"),
      location: "Warren Lecture Hall 2005",
      accessCode: "HLK2026",
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: "General Meeting #2",
      description: "Project showcase and team formation.",
      date: new Date("2026-02-01T18:00:00"),
      location: "Zoom Link: zoom.us/j/...",
      accessCode: "SHOW2026",
    },
  });

  const event3 = await prisma.event.create({
    data: {
      title: "Workshop: Health & Wellness Tech",
      description: "Learn about the latest innovations in health technology.",
      date: new Date("2026-02-08T19:00:00"),
      location: "Engineering Building Room 301",
      accessCode: "WORKSHOP",
    },
  });

  console.log(`✅ Created ${3} events`);

  // Create officer
  const officer = await prisma.user.create({
    data: {
      email: "officer@healthlink.org",
      name: "Officer One",
      role: "OFFICER",
    },
  });

  console.log(`✅ Created officer: ${officer.email}`);

  // Create members
  const member1 = await prisma.user.create({
    data: {
      email: "member1@ucsd.edu",
      name: "Alice Johnson",
      role: "MEMBER",
    },
  });

  const member2 = await prisma.user.create({
    data: {
      email: "member2@ucsd.edu",
      name: "Bob Smith",
      role: "MEMBER",
    },
  });

  const member3 = await prisma.user.create({
    data: {
      email: "member3@ucsd.edu",
      name: "Charlie Davis",
      role: "MEMBER",
    },
  });

  const member4 = await prisma.user.create({
    data: {
      email: "member4@ucsd.edu",
      name: "Diana Wilson",
      role: "MEMBER",
    },
  });

  console.log(`✅ Created ${4} members`);

  // Create attendance records
  // Member1: attended 2 events (active)
  await prisma.attendance.create({
    data: { userId: member1.id, eventId: event1.id },
  });
  await prisma.attendance.create({
    data: { userId: member1.id, eventId: event2.id },
  });

  // Member2: attended 3 events (active)
  await prisma.attendance.create({
    data: { userId: member2.id, eventId: event1.id },
  });
  await prisma.attendance.create({
    data: { userId: member2.id, eventId: event2.id },
  });
  await prisma.attendance.create({
    data: { userId: member2.id, eventId: event3.id },
  });

  // Member3: attended 1 event (inactive)
  await prisma.attendance.create({
    data: { userId: member3.id, eventId: event1.id },
  });

  // Member4: attended 0 events (inactive)

  console.log(`✅ Created attendance records`);
  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
