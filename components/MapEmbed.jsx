// Google Map embed. No API key needed for this URL form.
import { site } from "@/lib/site";

export default function MapEmbed({ className = "" }) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;
  return (
    <div className={`overflow-hidden rounded-2xl border border-[var(--line)] ${className}`}>
      <iframe
        src={src}
        title="FutureMap office location"
        className="h-[320px] w-full sm:h-[380px]"  // TODO: map height
        loading="lazy"                              // loads only when scrolled near
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}