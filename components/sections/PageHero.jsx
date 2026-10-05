import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";
// Shared hero for inner pages: dark + grey headline halves, like reference 1.
export default function PageHero({ dark, grey, text, cta = "Chat on WhatsApp" }) {
  return (
    <section className="section pb-12 text-center">
      <div className="container-x max-w-4xl">
        <Reveal><h1 className="h-display">{dark} <span className="text-[#86868b]">{grey}</span></h1></Reveal>
        <Reveal delay={0.1}><p className="lead mx-auto mt-6 max-w-2xl">{text}</p></Reveal>
        <Reveal delay={0.2}><a href={site.whatsapp} className="btn btn-primary mt-9">{cta}</a></Reveal>
      </div>
    </section>
  );
}
