"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const advisors = [
  { name: "Rebecca Deller", title: "MedTech Accelerator Program Manager, IGE UCSD", image: "/advisors/becky.jpeg" },
  { name: "Alan Moazzam, MD", title: "Hospitalist at UCSD Medicine", image: "/advisors/alan.jpeg" },
  { name: "Jacques Chirazi", title: "Director of Student Entrepreneurship at UCSD", image: "/advisors/jacques.png" },
  { name: "Murray Reicher, MD", title: "Former CMO of IBM & Serial Entrepreneur", image: "/advisors/murray.jpeg" },
  { name: "Ravi Kumar", title: "MS3 UC, San Diego School of Medicine", image: "/advisors/Ravi.webp" },
  { name: "Noah C. Golestani", title: "MS2, UC San Diego School of Medicine", image: "/advisors/Noah.webp" },
  { name: "Ryan Sindewald", title: "MS2 UC, San Diego School of Medicine", image: "/advisors/Ryan.png" },
  { name: "Zina Patel", title: "Harvard Business School 2+2 Candidate & UCSD alum", image: "/advisors/Zina.jpeg" },
  { name: "Asish Koruprolu", title: "Ph.D Candidate, Electrical Engineering at UCSD", image: "/advisors/Asish.png" },
  { name: "Arshan Ommid", title: "CEO of Dermose & MS Candidate at UCSD", image: "/advisors/Arshan.jpeg" },
  { name: "Kevin Jubbal, MD", title: "CEO of MedSchoolInsiders & Physician Entrepeneur", image: "/advisors/Kevin.png" },
];

const slides = [
  advisors.slice(0, 4),
  advisors.slice(4, 8),
  advisors.slice(8, 11),
];

export default function AdvisorSlider() {
  return (
    <div className="max-w-7xl mx-auto py-7">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={40}
      >
        {slides.map((group, idx) => (
          <SwiperSlide key={idx}>
            <div
              className={`
                grid gap-10 place-items-center
                ${
                  group.length === 3
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                }
              `}
            >
              {group.map((advisor) => (
                <div
                  key={advisor.name}
                  className="rounded-2xl p-6 flex flex-col items-center text-center w-56 h-[340px] bg-[#0b152a]/90 border border-blue-500/30 shadow-[0_0_25px_rgba(0,123,255,0.25)] backdrop-blur-sm transition-all duration-300 hover:scale-[1.07] hover:border-blue-400/70 hover:shadow-[0_0_45px_rgba(0,150,255,0.55)]"
                >
                  <img
                    src={advisor.image}
                    className="w-32 h-32 rounded-full object-cover mb-4"
                    alt={advisor.name}
                  />
                  <h3 className="text-xl font-semibold">{advisor.name}</h3>
                  <p className="text-neutral-400 text-sm mt-2">{advisor.title}</p>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
