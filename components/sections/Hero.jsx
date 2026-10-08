"use client";
// Hero with scroll-driven expand: image box grows from inset + rounded to full screen + square.
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import ArrowButton from "@/components/ui/ArrowButton";
import { useLoading } from "@/components/PreloaderContext";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_DISTANCE = "+=50%";


export default function Hero() {
  const sectionRef = useRef(null);
  const boxRef = useRef(null);
  const { ready } = useLoading();

  // ...inside the component:
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(boxRef.current, {
      // X direction only: the side gaps shrink to 0 (top/bottom are not touched)
      left: 0,
      right: 0,
      borderRadius: 0, // corners square off as it widens. Delete this line to keep the rounded corners.
      ease: "none",    // 1:1 with the scrollbar
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",       // starts as soon as you begin scrolling
        end: SCROLL_DISTANCE,
        scrub: 0.6,             // soft smoothing; use true for an exact 1:1 follow
        invalidateOnRefresh: true,
        // no pin: the page scrolls normally
      },
    });
  }, sectionRef);
  return () => ctx.revert();
}, []);

  // The preloader locks scrolling, so recalculate positions once it has finished
  useEffect(() => {
    if (ready) ScrollTrigger.refresh();
  }, [ready]);

  return (
    <section ref={sectionRef} className="relative h-screen pt-14 text-center">
      {/* Image box: this is what expands */}
      <div
        ref={boxRef}
        className="absolute inset-x-6 bottom-6 top-[3.5rem] z-0 overflow-hidden rounded-xl sm:inset-x-8 sm:bottom-8 sm:top-14"
      >
        <div className="absolute inset-0 h-full w-full bg-black/5"></div>
        {/* TODO: replace with your final hero image */}
        <img src="/images/heroimage.jpg" className="h-full w-full object-cover object-bottom" alt="" />
      </div>

      {/* Content */}
      <div className="container-x absolute left-1/2 px-8 md:px-0 md:top-[20vh] top-[18vh] z-10 mx-auto flex max-w-5xl -translate-x-1/2 flex-col items-center justify-center">
        <Reveal>
          <h1 className="h-display  !mb-0 md:!text-[3.4rem] !text-[2.8rem] !font-light !text-white">
            Every great future begins with opportunity{" "}
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="lead mx-auto mt-4 max-w-xl !text-[16px] text-white">
            Jobs, exams, admissions. We help you with all of it.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ArrowButton className="bg-white !font-medium" href={site.whatsapp} variant="ghost">
              Chat on WhatsApp
            </ArrowButton>
            <ArrowButton className="!bg-black font-medium backdrop-blur-md" href="/jobs-abroad">
              See Jobs
            </ArrowButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}