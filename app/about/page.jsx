import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";
import WaveText from "@/components/ui/WaveText";
import { Title, CourseCards, WhyList, CourseCardssquare } from "@/components/sections/Blocks";

export const metadata = { title: "About — FutureMap" }; // TODO: SEO title / description

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero (same component as the other inner pages) */}
<PageHero
  dark="Your next step,"
  grey="made clearer."
  text="FutureMap connects students and professionals with trusted opportunities in India and abroad."
/>

      {/* 2. Our story: same two-column layout as the home About section */}
     {/* 2. Our story: the client's full text, unchanged */}
<section className="section">
  <div className="container-x grid gap-10 lg:grid-cols-2">
    <Reveal>
      <h2 className="h-section">Every great future begins with the right opportunity.</h2>
    </Reveal>

    <div className="space-y-6">
      <Reveal delay={0.1}>
        <p className="lead !font-light !text-black">
          FutureMap connects students, professionals, and skilled candidates with
          trusted education and career opportunities in India, the GCC, and
          international markets.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="lead !font-light !text-black">
          From admissions and course selection to global careers and documentation,
          we make every step clearer, simpler, and more reliable.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="lead !font-medium !text-black">
          <WaveText>FutureMap</WaveText>. Guiding ambition towards education,
          careers, and global opportunities.
        </p>
      </Reveal>
      <Reveal delay={0.25}>
        <p className="lead !font-medium !text-black">
          Ready to take your next step? Explore your opportunities with FutureMap.
        </p>
      </Reveal>
    </div>
  </div>
</section>

      {/* 3. What we do: the two offerings, as image cards (hover to read the abstract) */}
      <section className="section">
        <div className="container-x">
          <Title>What we do.</Title>
          {/* TODO: add photos in /public/images/about/ */}
          <CourseCardssquare
            items={[
              {
                title: "Admissions in India & Abroad",
                text: "Course and college guidance across Nursing, Engineering, Aviation, Management and other professional programmes, with clear options, eligibility and fee guidance.",
                image: "/images/about/india.jpg",
              },
              {
                title: "Global Healthcare Careers",
                text: "Connecting qualified healthcare professionals with verified opportunities across the GCC and international markets, including career guidance, documentation and employer connections.",
                image: "/images/about/global.jpg",
              },
            ]}
          />
        </div>
      </section>

      {/* 4. Closing statement, with the rainbow wave on the brand name */}
      <section className="section">
        <div className="container-x max-w-4xl text-center">
          <Reveal>
            <h2 className="h-section">
              <WaveText>FutureMap</WaveText>. Guiding ambition towards education, careers,
              and global opportunities.
            </h2>
          </Reveal>
        </div>
      </section>

      {/* 5. Why FutureMap (reused from the home page) */}
      <section className="section section-grey">
        <div className="container-x">
          <Title>Why FutureMap.</Title>
          <WhyList />
        </div>
      </section>

      {/* 6. CTA with the closing line from the About text */}
      <CTA
        title="Ready to take your next step?"
        text="Explore your opportunities with FutureMap."
      />
    </>
  );
}