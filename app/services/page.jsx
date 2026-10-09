import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import {
  Title,
  ServiceGrid,
  Steps,
  WhyList,
  Chips,
  Countries,
  Stepslong,
} from "@/components/sections/Blocks";

export const metadata = { title: "Services", description: "Jobs abroad, exam training, documents and admissions. One team, start to finish.", alternates: { canonical: "/services" } };

export default function Page() {
  return (
    <>
      <PageHero
        dark="Everything"
        grey="you need."
        text="Jobs, exam training, documents and admissions. One team, start to finish."
      />
      <section className="section ">
        <div className="container-x">
          <Title>What we do.</Title>
          <ServiceGrid />
        </div>
      </section>
      <section className="section">
        <div className="container-x">
          <Title>How it works.</Title>
          <Stepslong />
        </div>
      </section>
      <CTA />
    </>
  );
}
