import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";
export default function CTA() {
  return (
    <section className="section">
      <div className="container-x">
        <Reveal>
          <div className="rounded-[2rem] bg-[var(--ink)] px-6 py-16 text-center text-white sm:py-24">
            <h2 className="h-section !font-medium">Ready? Let&apos;s talk.</h2>
            <p className="mx-auto mt-4 max-w-md text-white/60">Send your CV or just say hi on WhatsApp.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={site.whatsapp} className="btn btn-primary">Chat on WhatsApp</a>
<a
  href="tel:+918089229231"
  className="btn bg-white/10 text-white hover:bg-white/20"
>
  Call +91 80892 29231
</a>            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
