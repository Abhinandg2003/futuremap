import Reveal from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";
import CTA from "@/components/sections/CTA";
import { Title, ServiceGrid, Steps, WhyList, Chips, Countries } from "@/components/sections/Blocks";
import {  highlights, faqs } from "@/lib/site";
import Hero from "@/components/sections/Hero";


// HOME — section order follows the PDF brief.
export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      {/* 1. Hero (scroll-expand logic lives in the component) */}
<Hero />
      {/* 2. Quick highlights */}

      <div className="!h-[40vh] flex items-center">
      <section className="container-x  grid gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((h, i) => (
          <Reveal key={h} delay={i * 0.06}><div className="card h-full !p-6 text-center font-medium">{h}</div></Reveal>
        ))}
      </section>
      </div>

      {/* 3. About */}
      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <Reveal><h2 className="h-section">Hi, we&apos;re FutureMap.</h2></Reveal>
          <Reveal delay={0.1}><p className="lead">A career team from Kochi. We help students and professionals find the right course or job, in India and abroad. Simple advice, no confusion.</p></Reveal>
        </div>
      </section>

      {/* 4. What we do */}
      <section className="section section-grey"><div className="container-x"><Title>What we do.</Title><ServiceGrid /></div></section>

      {/* 5. Who we help */}
      <section className="section"><div className="container-x"><Title>Find your role.</Title><Reveal><Chips /></Reveal></div></section>

      {/* 6. Where you can go */}
      <section className="section section-grey"><div className="container-x"><Title>6 countries. One team to guide you.</Title><Countries /></div></section>

      {/* 7. Exam training teaser (only brand-filled block on the page) */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="grid gap-8 rounded-[2rem] bg-brand p-8 text-white sm:p-14 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="h-section">Prometric stress? We&apos;ve got you.</h2>
                <a href="/exam-training" className="btn mt-8 bg-white text-brand hover:scale-105">Join Next Batch</a>
              </div>
              <ul className="space-y-3 text-lg text-white/90">
                {["Live + recorded classes", "100+ mock tests", "Exam booking help"].map((x) => <li key={x}>✓ {x}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. How it works */}
      <section className="section section-grey"><div className="container-x"><Title>4 easy steps.</Title><Steps /></div></section>

      {/* 9. Why FutureMap */}
      <section className="section"><div className="container-x"><Title>Why FutureMap.</Title><WhyList /></div></section>

      {/* 10. FAQ */}
      <section className="section section-grey"><div className="container-x max-w-3xl"><Title>Questions, answered.</Title><Accordion items={faqs} /></div></section>

      {/* 11. Contact CTA */}
      <CTA />
    </>
  );
}
