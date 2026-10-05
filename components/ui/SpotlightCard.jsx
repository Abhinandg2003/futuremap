"use client";
// ReactBits-style "Spotlight Card": a soft brand glow follows the cursor.
// TODO: swap with the official ReactBits version if you prefer (https://reactbits.dev).
import { useRef } from "react";
import { cn } from "@/lib/utils";
export default function SpotlightCard({ children, className }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={move} className={cn("card group relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(320px circle at var(--x) var(--y), rgba(0,105,255,.10), transparent 70%)" }} />
      <div className="relative">{children}</div>
    </div>
  );
}
