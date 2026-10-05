"use client";
// Fixed navbar: always visible. Gets a frosted background after a small scroll.
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const path = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  // Adds the frosted background once the page is scrolled a little
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 10));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        solid || open
          ? "border-b border-black/[0.07] bg-white/75 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="container-x !max-w-[98vw] flex h-14 items-center justify-between">
        {/* TODO: replace text logo with <Image src="/logo.svg" /> */}
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Future<span className="text-brand">Map</span>
        </Link>

        {/* Desktop nav: the active page is shown by text color only (no pill) */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "px-4 py-2 text-sm font-light transition-colors duration-300 hover:text-black",
                // Active = full black. Inactive = softer.
                // Want a stronger difference? Change inactive to "text-black/55"
                path === n.href ? "text-black" : "text-black/60"
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* CTA at the right end */}
          <a href={site.whatsapp} className="btn btn-primary hidden !py-2 text-sm font-light sm:inline-flex">
            Connect with us
          </a>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="rounded-full p-2 lg:hidden">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden lg:hidden"
      >
        <div className="container-x flex flex-col gap-1 pb-6">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="py-3 text-2xl font-semibold tracking-tight"
            >
              {n.label}
            </Link>
          ))}
          <a href={site.whatsapp} className="btn btn-primary mt-3">Connect with us</a>
        </div>
      </motion.div>
    </header>
  );
}