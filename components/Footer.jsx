import Link from "next/link";
import { nav, site } from "@/lib/site";
import Logo from "./Logo";
import { IoCallSharp, IoMailSharp } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";

export default function Footer() {
  return (
    <footer className="section-grey py-16">
      <div className="container-x grid gap-10 sm:grid-cols-3">
        <div>
          <Logo animateOn="view" heightClass="h-[45px]" />{" "}
          {/* TODO: footer logo size */}
          <p className="muted mt-2 text-sm">
            {site.name} {site.tagline}
            <br />
            {site.address}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="muted w-fit transition-colors duration-300 hover:text-black"
            >
              {n.label}
            </Link>
          ))}
        </div>
        <div className="muted flex flex-col gap-2  text-sm">
          <div className="flex gap-1 group items-center group transition-all duration-300">
            <IoCallSharp className="transition-colors group-hover:text-black" />
            <a
              href={`tel:${site.phone}`}
              className="transition-colors group-hover:text-black"
            >
              {site.phone}
            </a>
          </div>
          <div className="flex gap-1 items-center group transition-all duration-300">
            <IoMailSharp className="transition-colors group-hover:text-black"/>

            <a
              href={`mailto:${site.email}`}
              className="transition-colors group-hover:text-black"
            >
              {site.email}
            </a>
          </div>
          <div className="flex gap-1 items-center group transition-all duration-300">
            <TiSocialInstagram  className="transition-colors group-hover:text-black"/>
            <a
              href={site.instagram}
              className="transition-colors group-hover:text-black"
            >
              futuremapcareer
            </a>
          </div>

          <div className="flex gap-1 items-center group transition-all duration-300">
            <FaFacebookF className="group-hover:text-black transition-colors" />

            <a
              href={site.facebook}
              className="transition-colors group-hover:text-black"
            >
              futuremapcareer
            </a>
          </div>
        </div>
      </div>
      {/* Legal line from the brief. Do NOT add MEA / eMigrate logos as ours. */}
      <p className="container-x muted mt-12 border-t border-[var(--line)] pt-6 text-xs">
        Overseas jobs are processed through our licensed recruitment partners.
        We never charge for a job offer.
      </p>
    </footer>
  );
}
