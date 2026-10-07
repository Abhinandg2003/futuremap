import Reveal from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";
import CTA from "@/components/sections/CTA";
import {
  Title,
  ServiceGrid,
  Steps,
  WhyList,
  Chips,
  Countries,
} from "@/components/sections/Blocks";
import { highlights, faqs } from "@/lib/site";
import Hero from "@/components/sections/Hero";
import WaveText from "@/components/ui/WaveText";
import { FaGlobeAsia } from "react-icons/fa";
import RoleCarousel from "@/components/sections/RoleCarousel";
import CountriesMap from "@/components/sections/CountriesMap";

// HOME — section order follows the PDF brief.
export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      {/* 1. Hero (scroll-expand logic lives in the component) */}
      <Hero />
      {/* 2. Quick highlights */}

      {/* 3. About */}
      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <Reveal>
            <h2 className="h-section ">
              Hi, we&apos;re <WaveText>FutureMap</WaveText>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead !text-black pb-30 !font-light">
              A career team from Kochi. We help students and professionals find
              the right course or job, in India and abroad. Simple advice, no
              confusion.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="flex !h-[70vh] md:!h-[40vh] items-center">
        <section className="container-x grid gap-4   pb-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ title, icon: Icon }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="card2 !flex h-full !flex-col hover: !border-none !p-6 text-center font-medium">
                <div className="flex justify-center">
                  <Icon className="mb-3 text-5xl text-brand" />
                </div>
                {title}
              </div>
            </Reveal>
          ))}
        </section>
      </div>

      {/* 4. What we do */}
      <section className="section ">
        <div className="container-x">
          <Title>What we do.</Title>
          <ServiceGrid />
        </div>
      </section>

      {/* 5. Who we help */}
      <RoleCarousel />

      {/* 6. Where you can go */}
      <section className="section ">
        <div className="container-x">
          <Title>6 countries. <br /> One team to guide you.</Title>
          <CountriesMap />
        </div>
      </section>

      {/* 7. Exam training teaser (only brand-filled block on the page) */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="grid gap-8 rounded-[2rem] bg-[#F5F5F7] p-8 text-black sm:p-14 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="h-section !font-normal">
                  Prometric stress? We&apos;ve got you.
                </h2>
                <a
                  href="/exam-training"
                  className="btn mt-8 bg-brand  text-white !font-light hover:scale-105"
                >
                  Join Next Batch
                </a>
              </div>
              <ul className="space-y-3 text-lg text-black/90">
                {[
                  "Live + recorded classes",
                  "100+ mock tests",
                  "Exam booking help",
                ].map((x) => (
                  <li key={x}>✓ {x}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. How it works */}
      <section className="section section-grey">
        <div className="container-x">
          <Title>4 easy steps.</Title>
          <Steps />
        </div>
      </section>

      {/* 9. Why FutureMap */}
      <section className="section">
        <div className="container-x">
          <Title>Why <WaveText>FutureMap</WaveText></Title>
          <WhyList />
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="section section-grey">
        <div className="container-x max-w-3xl">
          <Title>Questions, answered.</Title>
          <Accordion items={faqs} />
        </div>
      </section>

      {/* 11. Contact CTA */}
      <CTA />
    </>
  );
}
