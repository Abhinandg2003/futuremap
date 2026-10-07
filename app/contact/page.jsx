import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
export const metadata = { title: "Contact — FutureMap" };

import MapEmbed from "@/components/MapEmbed";

export default function Page() {
  return (
    <>
      <PageHero
        dark="Ready?"
        grey="Let's talk."
        text="Send your CV or just say hi on WhatsApp."
      />
      <section className="section">
        <div className="container-x grid max-w-4xl gap-12 lg:grid-cols-2">
          <ContactForm />
          <div className="muted space-y-3">
            <p>{site.address}</p>
            <p>{site.phone}</p>
            <p>{site.email}</p>
            <p>Instagram @futuremapcareer</p>
            {/* TODO: embed Google Map */}
          </div>

          
             </div>   {/* end of the grid */}
      <div className="container-x mt-12 max-w-4xl">
        <MapEmbed />
      </div>
    </section>
    </>
  );
}
