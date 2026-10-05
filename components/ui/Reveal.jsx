"use client";
// Scroll-reveal wrapper. Animates once, when (a) it is in view AND (b) the preloader is done.
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLoading } from "@/components/PreloaderContext";

export default function Reveal({ children, delay = 0, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { ready } = useLoading();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView && ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}