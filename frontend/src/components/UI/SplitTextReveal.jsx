import React from 'react';
import { motion } from 'framer-motion';

const SplitTextReveal = ({ text, className = "" }) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const childVariants = {
    hidden: { 
      y: "110%",
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] // Custom luxury cubic-bezier easeOutExpo
      }
    }
  };

  return (
    <motion.span 
      className={`flex flex-wrap overflow-hidden py-1 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-block mr-[0.25em] pb-1">
          <motion.span variants={childVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default SplitTextReveal;
