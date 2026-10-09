import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import {
  Title,
  ServiceGrid,
  Steps,
  WhyList,
  Chips,
  Countries,
  CourseCards,
} from "@/components/sections/Blocks";
import Accordion from "@/components/ui/Accordion";
import { faqs } from "@/lib/site";

export const metadata = { title: "Admissions", description: "Admissions guidance for B.Sc Nursing, aviation, engineering and more, with clear options and fee guidance.", alternates: { canonical: "/admissions" } };

export default function Page() {
  return (
    <>
      <PageHero
        dark="Find the right"
        grey="college and course."
        text="Admissions across India, including B.Sc Nursing, aviation and engineering."
      />
      <section className="section">
  <div className="container-x">
    <Title>Courses.</Title>
    {/* TODO: replace images and abstracts with the real course details */}
    <CourseCards
      items={[
        { title: "B.Sc Nursing", text: "Gain skills for a rewarding nursing career.", image: "/images/roles/b-sc-nursing-admissions.jpg" },
        { title: "Aviation",     text: "Launch your career in the aviation industry", image: "/images/roles/aviation.jpg" },
        { title: "Engineering",  text: "Build skills for a successful engineering career.", image: "/images/roles/engineering.jpg" },
      ]}
    />
  </div>
</section>
      <section className="section section-grey">
        <div className="container-x">
          <Title>How it works.</Title>
          <Steps />
        </div>
      </section>

      <section className="section section-grey">
        <div className="container-x max-w-3xl">
          <Title>Questions, answered.</Title>
          <Accordion items={faqs} />
        </div>
      </section>

      <CTA />
    </>
  );
}
