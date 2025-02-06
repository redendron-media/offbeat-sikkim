'use client';

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";


interface SectionConfig {
    id: string;
    label: string;
  }
  
  interface SectionsNavigationProps {
    sections: SectionConfig[];
  }

  export default function SectionsNavigation({ sections }: SectionsNavigationProps) {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      
        const handleScroll = () => {
          if (isScrolling) return;
          let currentActive = null;
    
          sections.forEach((section) => {
            const sectionElement = document.getElementById(section.id);
            if (sectionElement) {
              const { top } = sectionElement.getBoundingClientRect();
              if (top <= window.innerHeight * 0.3) {
                currentActive = section.id;
              }
            }
          });
    
          if (currentActive !== activeSection) {
            setActiveSection(currentActive);
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Run once to set initial state
    
        return () => window.removeEventListener("scroll", handleScroll);
      }, [sections, activeSection, isScrolling]);

      useEffect(() => {
        if (activeSection && navRef.current) {
          const activeTab = navRef.current.querySelector(`[data-id="${activeSection}"]`) as HTMLElement;
          if (activeTab) {
            activeTab.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
          }
        }
      }, [activeSection]);

    const scrollToSection = (sectionName: string) => {
      const sectionElement = document.getElementById(sectionName);
      if (!sectionElement) {
        console.warn(`Section with ID '${sectionName}' not found.`);
        return;
      }
      
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      sectionElement.scrollIntoView({ behavior: "smooth" });
   scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 600);
  };

  
    return (
      <section ref={navRef} className="bg-primary-container titlem md:titlel items-center 2xl:justify-center whitespace-nowrap  hide-scrollbar sticky top-16 lg:top-20 z-10 overflow-x-scroll pt-6 rounded-xl my-6 px-6 flex gap-4 md:gap-6 xl:gap-8 2xl:gap-10">
        {sections.map((section) => (
          <p
            key={section.id}
            data-id={section.id} 
            className={cn(
              "cursor-pointer pb-4",
              activeSection === section.id
                ? "text-primary border-b-4 border-primary"
                : "text-primary-oncontainer"
            )}
            onClick={() => scrollToSection(section.id)}
          >
            {section.label}
          </p>
        ))}
      </section>
    );
  }