"use client"
import React, { useState, useEffect } from "react";
import Earth3D from "@/components/earth";
import Mars3D from "@/components/mars";
import Jupiter3D from "@/components/jupiter";
import Mercury3D from "@/components/mercury";
import Saturn3D from "@/components/saturn";
import Uranus3D from "@/components/uranus";
import Neptune3D from "@/components/neptune";
import Venus3D from "@/components/venus";
import Sun3D from "@/components/sun";
import Footer from "@/components/Footer";

const planets = [
  { name: "Sun", component: Sun3D },
  { name: "Mercury", component: Mercury3D },
  { name: "Venus", component: Venus3D },
  { name: "Earth", component: Earth3D },
  { name: "Mars", component: Mars3D },
  { name: "Jupiter", component: Jupiter3D },
  { name: "Saturn", component: Saturn3D },
  { name: "Uranus", component: Uranus3D },
  { name: "Neptune", component: Neptune3D },
];

type FootBarProps = {
  size?: number;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};

function FootBar({ selected, setSelected }: FootBarProps) {
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Kiểm tra kích thước màn hình và xác định có hiển thị nút cuộn hay không
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setShowScrollButtons(true);
      } else {
        setShowScrollButtons(false);
      }
    };
    
    // Kiểm tra khả năng cuộn
    const checkScrollability = () => {
      const container = scrollContainerRef.current;
      if (container) {
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
          container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );
      }
    };

    checkScreenSize();
    checkScrollability();

    window.addEventListener('resize', () => {
      checkScreenSize();
      checkScrollability();
    });

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
    }

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      if (container) {
        container.removeEventListener('scroll', checkScrollability);
      }
    };
  }, []);

  // Xử lý cuộn sang trái
  const handleScrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  // Xử lý cuộn sang phải
  const handleScrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  // Tự động cuộn đến hành tinh được chọn
  useEffect(() => {
    const container = scrollContainerRef.current;
    const planetElements = container?.querySelectorAll('button');
    
    if (container && planetElements && planetElements[selected]) {
      const planetElement = planetElements[selected];
      const containerWidth = container.clientWidth;
      const scrollPosition = planetElement.offsetLeft - (containerWidth / 2) + (planetElement.clientWidth / 2);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [selected]);

  return (
    <footer className="fixed bottom-14 left-0 w-full flex flex-col items-center z-50 pb-4">
      <div className="relative w-full max-w-2xl flex items-center justify-center h-24">
        {/* Nút cuộn trái - chỉ hiển thị trên thiết bị nhỏ khi có thể cuộn */}
        {showScrollButtons && canScrollLeft && (
          <button 
            onClick={handleScrollLeft}
            className="absolute left-2 z-20 bg-black/50 rounded-full p-1 text-white hover:bg-black/70"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <div
        ref={scrollContainerRef}
        className="flex flex-row overflow-x-auto md:overflow-visible scrollbar-hide px-4 gap-2 md:gap-8 justify-start md:justify-center items-center w-full z-10 relative"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {planets.map((planet, idx) => {
            const PlanetComponent = planet.component;
            return (
              <button
                key={planet.name}
                className="focus:outline-none group relative"
                onClick={() => setSelected(idx)}
                aria-label={planet.name}
                style={{ position: "relative", zIndex: 1 }}
              >
                {/* Tên hành tinh hiện khi hover */}
                <span
                  className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none select-none whitespace-nowrap z-20"
                >
                  {planet.name}
                </span>
                <div
                  className={`rounded-full border-2 transition-all duration-300 flex items-center justify-center
                    ${selected === idx
                      ? "border-pink-400 scale-125 shadow-xl bg-pink-200/20"
                      : "border-white/20 bg-white/10 hover:scale-110"}
                  `}
                  style={{ width: 48, height: 48, overflow: "hidden" }}
                >
                  {/* Render hành tinh Three.js thu nhỏ */}
                  <div style={{ width: 100, height: 100 }}>
                    <PlanetComponent />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {/* Nút cuộn phải - chỉ hiển thị trên thiết bị nhỏ khi có thể cuộn */}
          {showScrollButtons && canScrollRight && (
            <button 
              onClick={handleScrollRight}
              className="absolute right-2 z-20 bg-black/50 rounded-full p-1 text-white hover:bg-black/70"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
      </div>
      <div className="fixed bottom-0 left-0 w-full z-10">
        <Footer />
      </div>
    </footer>
    
  );
}

export default FootBar;