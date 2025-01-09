"use client";

import React, { ReactNode } from "react";
import { motion, animate } from "framer-motion";
interface ScrollToSectionProps {
  targetId: string;
  children: ReactNode;
  className?      
  : string;
}

const ScrollToSection: React.FC<ScrollToSectionProps> = ({
  targetId,
  children,
  className
}) => {
  const handleScroll = () => {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        const sectionPosition = targetSection.getBoundingClientRect().top + window.scrollY;
        const headerHeight = window.innerWidth < 768 ? 80 : 75;
        const extraPadding = -20;
        const finalScrollPosition = sectionPosition - headerHeight - extraPadding;
        animate(window.scrollY, finalScrollPosition, {
            type: "spring",
            stiffness: 50,
            damping: 20,
            duration: 0.8,
            onUpdate: (value) => window.scrollTo(0, value),
          });
        }
  };

  return (
    <motion.div
      onClick={handleScroll}
      className={`cursor-pointer ${className}`}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollToSection;
