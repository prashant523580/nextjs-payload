"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className: string;
  autoplay?: boolean; // Optional prop to enable/disable autoplay
  autoplayInterval?: number; // Optional prop to set autoplay interval
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  className,
  autoplay = true,
  autoplayInterval = 3000, // Default to 3 seconds
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isEnd, setIsEnd] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  // Horizontal scroll using wheel
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY !== 0) {
        scrollContainer.scrollLeft += event.deltaY;
    // scrollContainer.scrollBy({ left: +event.deltaY, behavior: "smooth" });

        event.preventDefault(); // Prevent vertical scroll
        checkIsEnd(scrollContainer);
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel);

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Handle next scroll
  const handleClickNext = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    scrollContainer.scrollBy({ left: 200, behavior: "smooth" });
    checkIsEnd(scrollContainer);
  };

  // Handle previous scroll
  const handleClickPrevious = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    scrollContainer.scrollBy({ left: -200, behavior: "smooth" });
    checkIsEnd(scrollContainer);
  };

  // Check if at the end of the scroll
  const checkIsEnd = (scrollContainer: HTMLDivElement) => {
    const atEnd =
      scrollContainer.scrollLeft + scrollContainer.clientWidth >=
      scrollContainer.scrollWidth;
    setIsEnd(atEnd);
  };

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || isHovered) return;

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const intervalId = setInterval(() => {
      if (
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth
      ) {
        // Reset to the beginning
        scrollContainer.scrollBy({ left: -scrollContainer.scrollWidth, behavior: "smooth" });
      } else {
        scrollContainer.scrollBy({ left: 200, behavior: "smooth" });
      }
    }, autoplayInterval);

    return () => {
      clearInterval(intervalId); // Cleanup interval on unmount or hover
    };
  }, [autoplay, autoplayInterval, isHovered]);

  // Event handlers for hover
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
    >
      {/* Previous Button */}
      <button
        className="p-2 hidden md:block  rounded-full absolute left-1 top-[50%] translate-y-[-50%] transform bg-gray-200 z-10"
        onClick={handleClickPrevious}
      >
        <ChevronLeft size={28} strokeWidth={1.5} />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className={`${className} relative overflow-x-auto`}
      >
        {children}
      </div>

      {/* Next Button */}
      <button
        className="p-2 hidden md:block rounded-full absolute right-1 top-[50%] translate-y-[-50%] transform bg-gray-200 z-10"
        onClick={handleClickNext}
      >
        <ChevronRight size={28} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default HorizontalScroll;
