import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import { Title, ServiceGrid, Steps, WhyList, Chips, Countries } from "@/components/sections/Blocks";

export const metadata = { title: "Admissions — FutureMap" }; // TODO: SEO

export default function Page() {
  return (
    <>
      <PageHero dark="Find the right" grey="college and course." text="Admissions across India, including B.Sc Nursing, aviation and engineering." />
      <section className="section section-grey"><div className="container-x"><Title>Courses.</Title><Chips list={["B.Sc Nursing","Aviation","Engineering"]} /></div></section>
      <section className="section"><div className="container-x"><Title>How it works.</Title><Steps /></div></section>
      <CTA />
    </>
  );
}
