"use client";
// Preloader: 4 brand-color stripes cover the screen with the logo in the centre.
// When the page has loaded, the logo fades out and the stripes slide UP one after another.
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLoading } from "@/components/PreloaderContext";

const STRIPES = 4;
const MIN_DURATION = 1400; // TODO: minimum time (ms) the logo is shown
const STRIPE_DURATION = 0.5; // seconds each stripe takes to move
const STRIPE_DELAY = 0.1;    // seconds between stripes (the stagger)
const EASE = [0.22, 1, 0.36, 1];

export default function Preloader() {
  const { setReady } = useLoading();
  const [phase, setPhase] = useState("show"); // show -> exit -> gone

  useEffect(() => {
    document.documentElement.style.overflow = "hidden"; // lock scroll while loading
    const start = performance.now();
    let timer;

    const finish = () => {
      const wait = Math.max(MIN_DURATION - (performance.now() - start), 0);
      timer = setTimeout(() => {
        setPhase("exit");
        // Let the stripes get going, then start the hero animations
        setTimeout(() => setReady(true), 300);
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    return () => { clearTimeout(timer); window.removeEventListener("load", finish); };
  }, [setReady]);

  if (phase === "gone") return null;

  return (
    <div className={`fixed inset-0 z-[100] flex ${phase === "exit" ? "pointer-events-none" : ""}`}>
      {/* The stripes */}
      {Array.from({ length: STRIPES }).map((_, i) => (
        <motion.div
          key={i}
          className="h-full bg-brand"
          style={{ width: "calc(25% + 1px)", marginRight: "-1px" }} // +1px overlap avoids hairline gaps
          initial={{ y: 0 }}
          animate={{ y: phase === "exit" ? "-100%" : 0 }}
          transition={{ duration: STRIPE_DURATION, delay: i * STRIPE_DELAY, ease: EASE }}
          onAnimationComplete={() => {
            // Last stripe finished -> remove the loader and unlock scrolling
            if (phase === "exit" && i === STRIPES - 1) {
              document.documentElement.style.overflow = "";
              setPhase("gone");
            }
          }}
        />
      ))}

      {/* Logo in the dead centre. Fades in, then fades out as the stripes move. */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={phase === "exit" ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
        transition={{ duration: phase === "exit" ? 0.3 : 0.6, ease: EASE }}
      >
        {/* TODO: replace with your logo image: <Image src="/logo-white.svg" alt="FutureMap" width={160} height={40} priority /> */}
        <img className="w-[70vw] md:w-[20vw] h-auto" src="/images/logowhite.png" alt="" />
      </motion.div>
    </div>
  );
}