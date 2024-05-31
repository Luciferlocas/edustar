"use client";

import React from "react";
import { motion } from "framer-motion";

const page = () => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      Hello
    </motion.div>
  );
};

export default page;
