import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import {
  Title,
  ServiceGrid,
  Steps,
  WhyList,
  Chips,
  Countries,
} from "@/components/sections/Blocks";
import RoleCarousel2 from "@/components/sections/RoleCarousel2";

export const metadata = { title: "Jobs Abroad", description: "Hospital and healthcare jobs in the Gulf through licensed recruitment partners. We never charge for a job offer.", alternates: { canonical: "/jobs-abroad" } };

export default function Page() {
  return (
    <>
      <PageHero
        dark="Hospital jobs"
        grey="in the Gulf."
        text="Safe, legal placements through licensed recruitment partners. We never charge for a job offer."
      />
      <RoleCarousel2/>
      <section className="section">
        <div className="container-x">
          <Title>Where you can go.</Title>
          <Countries />
        </div>
      </section>
      {/* TODO: add live job listings / CMS feed here */}
      <section className="section">
        <div className="container-x">
          <Title>Why FutureMap.</Title>
          <WhyList />
        </div>
      </section>
      <CTA />
    </>
  );
}
