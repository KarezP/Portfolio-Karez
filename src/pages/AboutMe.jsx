import React from 'react';
import AboutMeBio from '../components/about/AboutMeBio';
import AboutCounter from '../components/about/AboutCounter';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto"
      >
        <AboutMeBio />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.4 }}
        className="container mx-auto"
      >
        <AboutCounter />
      </motion.div>
    </>
  );
};

export default About;
