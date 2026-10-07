"use client";
// "Find your role" carousel (Apple style).
// - Cards bleed past the max-width container on both sides, but the first card lines up with the heading.
// - Mobile: swipe (native scroll-snap). Desktop: arrow buttons move ONE card with an eased animation.
import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { roles } from "@/lib/site";
import { cn } from "@/lib/utils";

// TODO: images live in /public/images/roles/<slug>.jpg  e.g. nurses.jpg, male-nurses.jpg, lab-techs.jpg
// A card without an image just shows a light grey block, so nothing breaks while you collect photos.
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function RoleCarousel2() {
  const trackRef = useRef(null);
  const anim = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false }); // used to grey out the arrows

const indexRef = useRef(0); // the card index we are heading to (add next to trackRef / anim)

// Only touch state when something actually changed (avoids re-rendering on every scroll event)
const update = () => {
  const el = trackRef.current;
  if (!el) return;
  const start = el.scrollLeft <= 2;
  const end = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
  setEdge((p) => (p.start === start && p.end === end ? p : { start, end }));
};

// Move exactly one card per click, always landing on a card boundary
const go = (dir) => {
  const el = trackRef.current;
  const card = el.querySelector("[data-card]");
  const gap = parseFloat(getComputedStyle(el).columnGap) || 12;
  const step = card.offsetWidth + gap;
  const max = el.scrollWidth - el.clientWidth;

  // If no animation is running (e.g. the user just swiped), sync the index with the real position
  if (!anim.current || anim.current.state === "finished") {
    indexRef.current = Math.round(el.scrollLeft / step);
  }
  const maxIndex = Math.ceil(max / step);
  indexRef.current = Math.min(Math.max(indexRef.current + dir, 0), maxIndex);
  const target = Math.min(indexRef.current * step, max); // the last card stops at the end of the track

  anim.current?.stop();
  el.style.scrollSnapType = "none"; // snap would fight the animation
  anim.current = animate(el.scrollLeft, target, {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
    onUpdate: (v) => (el.scrollLeft = v),
    onComplete: () => (el.style.scrollSnapType = ""),
  });
};

  const arrow =
    "grid h-10 w-10 place-items-center rounded-full bg-[var(--surface)] transition-all duration-500 ease-apple hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-30";

  return (
    <section className="section">
      {/* Heading row (inside the capped container). Arrows sit at the end, hidden on mobile */}
      <div className="container-x mb-10 flex items-end justify-between gap-6">
        <Reveal>
          <h2 className="h-section">Who we help.</h2>
        </Reveal>
        <div className="hidden gap-2 md:flex">
          <button aria-label="Previous" disabled={edge.start} onClick={() => go(-1)} className={arrow}>
            <ChevronLeft size={20} />
          </button>
          <button aria-label="Next" disabled={edge.end} onClick={() => go(1)} className={arrow}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Track: full screen width (NOT inside the container), so cards overflow on both sides */}
      <Reveal>
        <div
          ref={trackRef}
          onScroll={update}
          className="bleed-pad no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto"
        >
          {roles.map((name) => (
            <div
              key={name}
              data-card
              // Card width per screen: mobile = 1 card, then smaller cards as the screen grows.
              // TODO: tweak these widths to show more or fewer cards.
              className={cn(
                "group relative aspect-[4/5] shrink-0 snap-start overflow-hidden rounded-xl bg-[var(--surface)]",
                "w-[85vw] sm:w-44 md:w-[30vw] lg:w-[25vw] xl:w-[25vw]"
              )}
            >
              <img
                src={`/images/roles/${slug(name)}.jpg`}
                alt=""
                onError={(e) => (e.currentTarget.style.display = "none")} // hide if the photo isn't added yet
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-apple group-hover:scale-105"
              />
              {/* Low-opacity dark gradient for readable text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
              {/* Role name: bottom center */}
              <p className="absolute inset-x-0 bottom-0 break-words px-2 pb-4 text-center text-lg font-medium leading-tight text-white sm:text-xl lg:text-2xl">
                {name}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}