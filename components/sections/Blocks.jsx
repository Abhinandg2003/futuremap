"use client";
// Reusable content blocks used by several pages.
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { services, steps, why, roles, countries, stepslong } from "@/lib/site";
import Image from "next/image";


// Subtext shown UNDER the card, only on touch screens (devices with no hover).
// On desktop it is hidden, and the in-card hover reveal is used instead.
const TouchText = ({ children }) => (
  <p className="muted mt-3 hidden text-sm [@media(hover:none)]:block sm:text-base">{children}</p>
);



export const Title = ({ children, sub }) => (
  <Reveal className="mb-12 max-w-2xl">
    <h2 className="h-section">{children}</h2>
    {sub && <p className="lead mt-4">{sub}</p>}
  </Reveal>
);

// Image cards: square corners, gradient overlay, heading bottom-left.
// Hover: heading slides up while the subtext opens underneath it.
export const ServiceGrid = ({ items = services }) => (
  <div className="grid gap-5 sm:grid-cols-2">
    {items.map((s, i) => (
      <Reveal key={s.title} delay={i * 0.07}>
        <Link href={s.href || "#"} className="group relative block aspect-[4/3] rounded-2xl  overflow-hidden bg-[var(--surface)]">
          {/* Photo. TODO: add real images in /public/images/services/ and set `image` in lib/site.js */}
          {s.image && <Image src={s.image} fill
    sizes="(min-width: 1152px) 560px, (min-width: 640px) 50vw, 100vw"  alt="" className="absolute inset-0 h-full w-full object-cover" />}

          {/* Low-opacity dark gradient so the white text stays readable. Adjust the /60 for stronger or lighter. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-black/0 to-transparent" />
          <div className=" absolute md:hidden inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />

          {/* Text block, pinned to the bottom left */}
          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{s.title}</h3>

            {/* Subtext: row height animates 0fr -> 1fr, which pushes the heading up smoothly.
                On touch screens (no hover) it is always open. */}
            <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-700 ease-apple group-hover:grid-rows-[1fr] group-hover:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
              <div className="overflow-hidden">
                <p className="max-w-xs pt-2 text-sm text-white sm:text-base">{s.text}</p>
              </div>
            </div>
          </div>
        </Link>
      </Reveal>
    ))}
  </div>
);



// Course cards: flex row on desktop, stacked column on mobile.
// Same look as ServiceGrid: rounded image card, title bottom-left, abstract slides in on hover.
export const CourseCards = ({ items }) => (
  <div className="flex flex-col gap-5 md:flex-row ">
    {items.map((c, i) => (
      <Reveal key={c.title} delay={i * 0.07} className="md:flex-1">
        <div className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--surface)] md:aspect-[4/5]">
          {/* Photo. TODO: add images in /public/images/courses/ */}
          {c.image && <Image src={c.image} alt="" fill
    sizes="(min-width: 1152px) 560px, (min-width: 640px) 50vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />}

          {/* Dark gradient so the white text stays readable. Raise the /30 if your photos are bright */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />
          <div className="absolute md:hidden inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />

          {/* Text block, bottom left */}
          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{c.title}</h3>

            {/* Abstract: opens on hover (0fr -> 1fr pushes the title up). Always open on touch screens. */}
            <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-700 ease-apple group-hover:grid-rows-[1fr] group-hover:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
              <div className="overflow-hidden">
                <p className="pt-2 text-sm text-white sm:text-base">{c.text}</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    ))}
  </div>
);


export const CourseCardssquare = ({ items }) => (
  <div className="flex flex-col gap-5 md:flex-row ">
    {items.map((c, i) => (
      <Reveal key={c.title} delay={i * 0.07} className="md:flex-1">
        <div className="group relative block aspect-square overflow-hidden rounded-2xl bg-[var(--surface)] md:aspect-square">
          {/* Photo. TODO: add images in /public/images/courses/ */}
          {c.image && <Image src={c.image} alt={c.image} fill
    sizes="(min-width: 1152px) 560px, (min-width: 640px) 50vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />}

          {/* Dark gradient so the white text stays readable. Raise the /30 if your photos are bright */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />

          {/* Text block, bottom left */}
          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{c.title}</h3>

            {/* Abstract: opens on hover (0fr -> 1fr pushes the title up). Always open on touch screens. */}
            <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-700 ease-apple group-hover:grid-rows-[1fr] group-hover:opacity-100 [@media(hover:none)]:hidden">
              <div className="overflow-hidden">
                <p className="pt-2 text-sm text-white sm:text-base">{c.text}</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    ))}
  </div>
);



export const ServiceGrid2 = ({ items = services }) => (
  <div className="grid gap-5 sm:grid-cols-2">
    {items.map((s, i) => (
      <Reveal key={s.title} delay={i * 0.07}>
        <Link href={s.href || "#"} className="group relative block aspect-[4/3] rounded-2xl  overflow-hidden bg-[var(--surface)]">
          {/* Photo. TODO: add real images in /public/images/services/ and set `image` in lib/site.js */}
          {s.image && <Image src={s.image} alt="" fill
    sizes="(min-width: 1152px) 560px, (min-width: 640px) 50vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />}

          {/* Low-opacity dark gradient so the white text stays readable. Adjust the /60 for stronger or lighter. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />

          {/* Text block, pinned to the bottom left */}
          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{s.title}</h3>

            {/* Subtext: row height animates 0fr -> 1fr, which pushes the heading up smoothly.
                On touch screens (no hover) it is always open. */}
            <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-700 ease-apple group-hover:grid-rows-[1fr] group-hover:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
              <div className="overflow-hidden">
                <p className="max-w-xs pt-2 text-sm text-white sm:text-base">{s.text}</p>
              </div>
            </div>
          </div>
        </Link>
      </Reveal>
    ))}
  </div>
);




export const Steps = () => (
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
    {steps.map((s, i) => {
      const Icon = s.icon;

      return (
        <Reveal key={s.t} delay={i * 0.08}>
          <div className="card2 h-full !border-none shadow-lg shadow-[#777]/5 ">
            <div className="flex justify-start">
              <Icon className="mb-3 text-5xl text-[#3797FF] text-start" />
            </div>

            <h3 className="mt-6 text-xl font-medium">{s.t}</h3>
            <p className="muted !text-brand/70 mt-1">{s.d}</p>
          </div>
        </Reveal>
      );
    })}
  </div>
);


export const Stepslong = () => (
  <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
    {stepslong.map((s, i) => {
      const Icon = s.icon;

      return (
        <Reveal key={s.t} delay={i * 0.08}>
          <div className="card2 h-full  shadow-lg !border !border-[#888]/10 shadow-[#777]/5 ">
            <div className="flex justify-start">
              <Icon className="mb-3 text-5xl text-[#3797FF] text-start" />
            </div>

            <h3 className="mt-6 text-xl font-medium">{s.t}</h3>
            <p className="muted !text-brand/70 mt-1">{s.d}</p>
          </div>
        </Reveal>
      );
    })}
  </div>
);

export const WhyList = () => (
  <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
    {why.map((w, i) => (
      <Reveal key={w.t} delay={i * 0.06}>
        {/* <Check className="text-brand" size={22} /> */}
        <h3 className="mt-3 text-lg font-semibold">{w.t}</h3>
        <p className="muted">{w.d}</p>
      </Reveal>
    ))}
  </div>
);

export const Chips = ({ list = roles }) => (
  <div className="flex flex-wrap gap-3">{list.map((r) => <span key={r} className="chip cursor-default">{r}</span>)}</div>
);

export const Countries = () => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
    {countries.map((c) => (
      <div key={c.name} className="card3 hover:scale-[1.05]  group !p-6 text-center">
        <div className=" transition-transform duration-500 ease-apple rounded-xl border border-black/5 overflow-hidden">
          <img src={c.flag} alt={c.name} />
        </div>
        <p className="mt-3 text-sm font-medium">{c.name}</p>
      </div>
    ))}
  </div>
);
