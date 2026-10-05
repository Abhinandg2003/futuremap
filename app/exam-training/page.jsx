import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import { Title, ServiceGrid, Steps, WhyList, Chips, Countries } from "@/components/sections/Blocks";

export const metadata = { title: "Exam Training — FutureMap" }; // TODO: SEO

export default function Page() {
  return (
    <>
      <PageHero dark="Prometric stress?" grey="We have you." text="Live and recorded classes, 100+ mock tests and help booking your exam." />
      <section className="section section-grey"><div className="container-x"><Title>What you get.</Title>
        <ServiceGrid items={[{title:"Live + recorded classes",text:"Learn on your schedule."},{title:"100+ mock tests",text:"Practise the real format."},{title:"Exam booking help",text:"We handle the booking steps."},{title:"Next batch",text:"TODO: batch dates and fees."}]} /></div></section>
      <CTA />
    </>
  );
}
