import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import WaveText from "../ui/WaveText";
import ArrowButton from "../ui/ArrowButton";
// Shared hero for inner pages: dark + grey headline halves, like reference 1.
export default function PageHero({ dark, grey, text, cta = "Chat on WhatsApp" }) {
  return (
    <section className="section pb-0 !h-[80vh] md:!pb-12 text-center !flex !items-center">
      <div className="container-x max-w-4xl ">
        <Reveal><h1 className="h-display overflow-visible pb-6">{dark} <WaveText>{grey}</WaveText></h1></Reveal>
        <Reveal delay={0.1}><p className="lead mx-auto  max-w-2xl">{text}</p></Reveal>
        <Reveal delay={0.2}><ArrowButton className="bg-brand text-white mt-4 !font-medium" href={site.whatsapp} variant="ghost">{cta}</ArrowButton></Reveal>
      </div>
    </section>
  );
}
