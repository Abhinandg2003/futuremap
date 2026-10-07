"use client";
// Logo made of 2 images, side by side: [ future ][ map ]
// "future" is visible straight away. "map" slides out of its own clipped box.
// animateOn="load" (default) -> plays after the preloader ends (use in the navbar)
// animateOn="view"           -> plays when the logo scrolls into view (use in the footer)
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useLoading } from "@/components/PreloaderContext";


// heightClass = Tailwind height for both images. The default is the navbar size.
export default function Logo({ animateOn = "load", heightClass = "h-[22px]" }) {
  const ref = useRef(null);
  const { ready } = useLoading();
  // once: true = the animation plays one time and does not reset when you scroll away
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const ease = [0.22, 1, 0.36, 1];

  // The single switch that starts the animation
  const play = animateOn === "view" ? inView : ready;

  return (
    <Link ref={ref} href="/" aria-label="FutureMap Career" className="flex w-fit flex-col items-start gap-1">
      <div className="flex items-center gap-[0.05rem]">
        {/* future: navbar = fades in straight away, footer = fades in when it scrolls into view */}
        <motion.img
          src="/images/future.png"
          alt="Future"
          className={`${heightClass} w-auto`}
          initial={{ opacity: 0 }}
          animate={{ opacity: animateOn === "view" ? (inView ? 1 : 0) : 1 }}
          transition={{ duration: 0.6, ease }}
        />

        {/* Clipping box: the map is hidden until it slides out */}
        <div className="overflow-hidden">
          <motion.img
            src="/images/map.png"
            alt="Map"
            className={`${heightClass} w-auto`}
            initial={{ x: "-100%" }}
            animate={{ x: play ? 0 : "-100%" }}
            transition={{ duration: 0.9, delay: 0.5, ease }} // TODO: speed / delay
          />
        </div>
      </div>
    </Link>
  );
}