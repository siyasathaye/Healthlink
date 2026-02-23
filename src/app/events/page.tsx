/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";

const events = [
  {
    title: "Speaker Series: Ronald Swanson",
    date: "2026-01-22",
    time: "6:00 – 7:30 PM",
    location: "tbd",
    description:
      "Chief Scientific Officer of Tyra Biosciences on building translational pipelines.",
    tag: "Speaker",
  },
  {
    title: "Speaker Series Workshop: Emily Chen",
    date: "2026-01-29",
    time: "6:00 – 7:30 PM",
    location: "tbd",
    description:
      "Consultant at ECI Lifescience Consulting leads a hands-on strategy workshop.",
    tag: "Workshop",
  },
  {
    title: "Speaker Series: Gregory Peters",
    date: "2026-02-05",
    time: "6:00 – 7:30 PM",
    location: "tbd",
    description:
      "CTO and Cofounder of BrilliantBiome on bioengineering at startup speed.",
    tag: "Speaker",
  },
];

const parseDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatDateLabel = (dateString: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(parseDate(dateString));

type CalendarDay = {
  label: number | null;
  dateKey: string | null;
  isCurrentMonth: boolean;
  hasEvent: boolean;
};

const buildCalendarDays = (
  year: number,
  month: number,
  eventDates: Set<string>,
): CalendarDay[] => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - firstDay + 1;
    const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
    const dateKey = isCurrentMonth
      ? `${year}-${String(month + 1).padStart(2, "0")}-${String(
          dayNumber,
        ).padStart(2, "0")}`
      : null;

    return {
      label: isCurrentMonth ? dayNumber : null,
      dateKey,
      isCurrentMonth,
      hasEvent: Boolean(dateKey && eventDates.has(dateKey)),
    };
  });
};

const UpcomingCalendar = () => {
  const [viewDate, setViewDate] = useState(() => {
    if (events.length === 0) return new Date();
    const earliest = new Date(
      Math.min(...events.map((event) => parseDate(event.date).getTime())),
    );
    return new Date(earliest.getFullYear(), earliest.getMonth(), 1);
  });

  const goMonth = (delta: number) => {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  };

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const eventDates = new Set(events.map((event) => event.date));
  const eventsByDate = events.reduce<Record<string, typeof events[number][]>>(
    (acc, event) => {
      acc[event.date] = acc[event.date] || [];
      acc[event.date].push(event);
      return acc;
    },
    {},
  );
  const days = buildCalendarDays(viewYear, viewMonth, eventDates);
  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(viewDate);

  return (
    <div className="bg-neutral-900/50 border border-blue-500/30 rounded-3xl p-8 shadow-2xl shadow-blue-900/30">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <p className="text-blue-300 uppercase tracking-[0.2em] text-xs">
            Calendar
          </p>
          <div className="flex items-center gap-3">
            <button
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:border-blue-400/60 transition"
              onClick={() => goMonth(-1)}
              aria-label="Previous month"
            >
              ←
            </button>
            <h3 className="text-3xl font-extrabold">{monthLabel}</h3>
            <button
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:border-blue-400/60 transition"
              onClick={() => goMonth(1)}
              aria-label="Next month"
            >
              →
            </button>
          </div>
          <p className="text-neutral-300">
            All HealthLink workshops, mentor hours, and build nights at a glance.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-neutral-300">
          <span className="inline-flex h-3 w-3 rounded-full bg-blue-400" />
          Event day
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm text-neutral-300 mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-2 font-semibold text-blue-100/90">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`min-h-28 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm flex flex-col items-start justify-start p-3 text-left ${
              day.hasEvent
                ? "border-blue-400/60 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent shadow-lg shadow-blue-900/40"
                : ""
            } ${day.isCurrentMonth ? "text-white" : "text-neutral-500"}`}
          >
            <span className="text-xs uppercase tracking-wide">
              {day.label ?? ""}
            </span>
            {day.dateKey &&
              (eventsByDate[day.dateKey]?.length ?? 0) > 0 &&
              eventsByDate[day.dateKey].map((ev) => (
                <div key={ev.title} className="mt-2 text-xs text-blue-100 space-y-1">
                  <p className="font-semibold leading-tight">{ev.title}</p>
                  <p className="text-[11px] text-neutral-200">{ev.time}</p>
                </div>
              ))}
          </div>
        ))}
      </div>

    </div>
  );
};

export default function EventsPage() {
  const sortedEvents = [...events].sort(
    (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime(),
  );
  const nextEvent = sortedEvents[0];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#071225] via-[#0a1b35] to-[#102647] text-white">
      {/* HERO */}
      <section
        className="relative py-36 px-6 text-center max-w-full mx-auto bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/hero_bg_large.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <h1 className="text-5xl font-extrabold leading-tight">
            Events & Workshops
          </h1>
          <p className="text-base uppercase tracking-[0.25em] text-blue-300">
            Build together every week
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-6 py-3 rounded-full bg-blue-500 text-white font-semibold shadow-lg shadow-blue-900/50 hover:scale-[1.02] transition">
              RSVP for the next event
            </button>
            <div className="px-4 py-3 rounded-full bg-white/10 border border-white/10 text-sm text-neutral-200">
              Next up: {nextEvent.title} • {formatDateLabel(nextEvent.date)} at{" "}
              {nextEvent.time}
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-12 px-6 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-blue-300 uppercase tracking-[0.2em] text-xs">
              Upcoming
            </p>
            <h2 className="text-4xl font-extrabold">Upcoming Events</h2>
            <p className="text-neutral-300 max-w-2xl">
              Show up to any session—even if you&apos;re early in your idea. Each
              event stacks skills so you can progress.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {sortedEvents.map((event) => (
            <div
              key={event.title}
              className="rounded-3xl border border-blue-500/40 bg-neutral-900/50 p-6 shadow-xl shadow-blue-900/30 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/25 border border-blue-400/40 flex flex-col items-center justify-center">
                    <span className="text-xs text-blue-100">
                      {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                      }).format(parseDate(event.date))}
                    </span>
                    <span className="text-xl font-extrabold text-white">
                      {parseDate(event.date).getDate()}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-blue-200">
                      {event.tag}
                    </p>
                    <h3 className="text-2xl font-bold leading-tight">
                      {event.title}
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/10 text-sm text-neutral-200 border border-white/10">
                  {event.time}
                </span>
              </div>
              <p className="text-neutral-200">{event.description}</p>
              <div className="flex items-center justify-between text-sm text-neutral-300">
                <span>{event.location}</span>
                <button className="text-blue-200 hover:text-white transition underline underline-offset-4">
                  Add to calendar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALENDAR */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <UpcomingCalendar />
      </section>
    </main>
  );
}
