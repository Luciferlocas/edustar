import React from "react";
import { motion } from "framer-motion";

const page = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  return <motion.div variants={variants}>Hello</motion.div>;
};

export default page;
