import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import {
  Title,
  ServiceGrid,
  Steps,
  WhyList,
  Chips,
  Countries,
  ServiceGrid2,
  CourseCards,
} from "@/components/sections/Blocks";
import Accordion from "@/components/ui/Accordion";
import { faqs, site } from "@/lib/site";
import ArrowButton from "@/components/ui/ArrowButton";

export const metadata = { title: "Exam Training — FutureMap" }; // TODO: SEO

export default function Page() {
  return (
    <>
      <PageHero
        dark="Prometric stress?"
        grey="We have you."
        text="Live and recorded classes, 100+ mock tests and help booking your exam."
      />
      <section className="section">
        <div className="container-x">
          <Title>What you get.</Title>
          <CourseCards
            items={[
              {
                title: "Live + recorded classes",
                text: "Learn on your schedule.",
                image: "/images/services/live.jpg",
              },
              { title: "100+ mock tests", text: "Practise the real format.",image: "/images/services/test.jpg", },
              {
                title: "Exam booking help",
                text: "We handle the booking steps.",
                image: "/images/services/help.jpg",
              },
            ]}
          />
<div className="flex justify-center mt-10 ">
          <ArrowButton className="bg-brand text-white !font-medium" href={site.whatsapp} variant="ghost">
                        Chat on WhatsApp
                      </ArrowButton>
                      
          </div>
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
