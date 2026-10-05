import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="section-grey py-16">
      <div className="container-x grid gap-10 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">Future<span className="text-brand">Map</span></p>
          <p className="muted mt-2 text-sm">{site.name} {site.tagline}<br />{site.address}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          {nav.map((n) => <Link key={n.href} href={n.href} className="muted w-fit transition-colors duration-300 hover:text-black">{n.label}</Link>)}
        </div>
        <div className="muted flex flex-col gap-2 text-sm">
          <a href={`tel:${site.phone}`} className="transition-colors hover:text-black">{site.phone}</a>
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-black">{site.email}</a>
          <a href={site.instagram} className="transition-colors hover:text-black">@futuremapcareer</a>
        </div>
      </div>
      {/* Legal line from the brief. Do NOT add MEA / eMigrate logos as ours. */}
      <p className="container-x muted mt-12 border-t border-[var(--line)] pt-6 text-xs">
        Overseas jobs are processed through our licensed recruitment partners. We never charge for a job offer.
      </p>
    </footer>
  );
}
