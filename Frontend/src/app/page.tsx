"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import NavBar from "@/components/navbar";
import Earth3D from "@/components/earth";
import Mars3D from "@/components/mars";
import Jupiter3D from "@/components/jupiter";
import Mercury3D from "@/components/mercury";
import Saturn3D from "@/components/saturn";
import Uranus3D from "@/components/uranus";
import Neptune3D from "@/components/neptune";
import Venus3D from "@/components/venus";
import Sun3D from "@/components/sun";
import FootBar from "@/components/footbar";
import StarsBg from "@/components/stars_bg";


const planets = [
  {
    name: "Sun",
    component: Sun3D,
    title: "Sun",
    desc: "Explore the Sun, the blazing heart of our solar system and the source of all its energy.",
  },
  {
    name: "Mercury",
    component: Mercury3D,
    title: "Mercury",
    desc: "Discover Mercury, the smallest and fastest planet, closest to the Sun with extreme temperatures.",
  },
  {
    name: "Venus",
    component: Venus3D,
    title: "Venus",
    desc: "Visit Venus, Earth's 'sister planet', shrouded in thick clouds and known for its scorching surface.",
  },
  {
    name: "Earth",
    component: Earth3D,
    title: "Earth",
    desc: "Experience Earth, the vibrant blue planet teeming with life and unique in the solar system.",
  },
  {
    name: "Mars",
    component: Mars3D,
    title: "Mars",
    desc: "Explore Mars, the red planet, a mysterious world with giant volcanoes and the potential for ancient life.",
  },
  {
    name: "Jupiter",
    component: Jupiter3D,
    title: "Jupiter",
    desc: "Discover Jupiter, the largest planet, famous for its Great Red Spot and swirling storms.",
  },
  {
    name: "Saturn",
    component: Saturn3D,
    title: "Saturn",
    desc: "Admire Saturn, renowned for its stunning rings and dozens of fascinating moons.",
  },
  {
    name: "Uranus",
    component: Uranus3D,
    title: "Uranus",
    desc: "Visit Uranus, the icy giant with a blue-green hue and a unique sideways rotation.",
  },
  {
    name: "Neptune",
    component: Neptune3D,
    title: "Neptune",
    desc: "Explore Neptune, the deep blue planet, farthest from the Sun and home to the fastest winds in the solar system.",
  },
];

export default function Home() {
  const [selectedPlanet, setSelectedPlanet] = useState(0);

  const PlanetComponent = planets[selectedPlanet].component;
  const desc = planets[selectedPlanet].desc;

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 sm:p-8 md:p-16 lg:p-20 gap-8 sm:gap-12 md:gap-16 font-[family-name:var(--font-geist-sans)]">
      <NavBar />
      <StarsBg />

      <main className="flex flex-col md:flex-row items-center justify-center w-full h-full z-10 gap-8 px-4 md:px-8 lg:px-16">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="w-full sm:w-[100px] md:w-[350px] lg:w-[400px] mt-10 aspect-square">
            <PlanetComponent />
          </div>
        </div>
        <div className="w-full md:w-1/2 text-white flex flex-col gap-4 items-center text-center max-w-md mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {planets[selectedPlanet].title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl px-4">{desc}</p>
        </div>
      </main>
      <FootBar selected={selectedPlanet} setSelected={setSelectedPlanet} />
    </div>
  );
}
