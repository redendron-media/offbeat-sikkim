'use client';
import React, { ReactNode } from 'react';
import { motion, Variants, } from 'framer-motion';

interface MoveUpProps {
    children: ReactNode;
  }

const MoveUp: React.FC<MoveUpProps> = ({ children }) => {
    const moveUpVariants: Variants = {
        initial: { opacity: 0, y: "10%" },
        visible: { opacity: 1, y: 0 },
        
      };
  return (
    <motion.div
        initial="initial"
        whileInView={"visible"}
        transition={{ ease: "easeInOut", duration: 1.5 }}
        viewport={{once: true}}
        variants={moveUpVariants}
    >
        {children}
    </motion.div>
  )
}

export default MoveUp