"use client";
// Brand-colored word with two effects:
//  1) Once, after the heading has faded in: a rainbow wave sweeps through the letters, then returns to brand blue.
//  2) After that, on hover: a soft cyan glow follows the cursor, clipped to the letters.
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useLoading } from "@/components/PreloaderContext";

const WAIT_AFTER_REVEAL = 200; // ms. TODO: should be a bit longer than the Reveal fade (0.8s + its delay)
const WAVE_DURATION = 1800;    // ms. Must match the animation duration in globals.css (.wave-text--run)

export default function WaveText({ children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { ready } = useLoading();
  const [phase, setPhase] = useState("wait"); // wait -> run -> idle

  useEffect(() => {
    if (!inView || !ready) return;
    const t1 = setTimeout(() => setPhase("run"), WAIT_AFTER_REVEAL);
    const t2 = setTimeout(() => setPhase("idle"), WAIT_AFTER_REVEAL + WAVE_DURATION);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [inView, ready]);

  // Cursor position inside the word, used by the glow in CSS (--x / --y)
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <span
      ref={ref}
      onMouseMove={phase === "idle" ? move : undefined}
      className={`wave-text py-3 overflow-visible  ${phase === "run" ? "wave-text--run" : ""} ${phase === "idle" ? "wave-text--idle" : ""}`}
    >
      {children}
    </span>
  );
}