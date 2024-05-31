"use client";

import { useAttendance } from "@/context/AttendanceContext";
import { Spinner } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAttendance();
  const pathname = usePathname();
  const isLoginPage = pathname === "/";

  return (
    <>
      {isLoginPage ? (
        <>{children}</>
      ) : loading ? (
        <Spinner />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default PageTransition;
