'use client';
import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface MoveUpProps {
    children: ReactNode;
  }

const MoveUp: React.FC<MoveUpProps> = ({ children }) => {
    const moveUpVariants: Variants = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      };
  return (
    <motion.div
        className= "transition-all duration-1000"
        initial="hidden"
        whileInView={"visible"}
        viewport={{once: true, amount: 0.2}}
        variants={moveUpVariants}
    >
        {children}
    </motion.div>
  )
}

export default MoveUp