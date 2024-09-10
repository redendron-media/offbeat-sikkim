'use client';
import React, { useState} from 'react';
import { motion } from 'framer-motion';
import logo from '@/public/logo.svg';
import Image from 'next/image';

const Loader = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleAnimationComplete = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;
    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ opacity: { duration: 1, ease: 'easeOut' } }}
            onAnimationComplete={handleAnimationComplete} 
        >
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ opacity: { duration: 0.8, ease: 'easeOut' } }}
                className="flex items-center justify-center"
            >
                <Image src={logo} alt="Logo" className="size-60 md:size-72" />
            </motion.div>
        </motion.div>
    );
};

export default Loader;
