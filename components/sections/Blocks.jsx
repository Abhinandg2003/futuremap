"use client";
// Reusable content blocks used by several pages.
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { services, steps, why, roles, countries } from "@/lib/site";

export const Title = ({ children, sub }) => (
  <Reveal className="mb-12 max-w-2xl">
    <h2 className="h-section">{children}</h2>
    {sub && <p className="lead mt-4">{sub}</p>}
  </Reveal>
);

export const ServiceGrid = ({ items = services }) => (
  <div className="grid gap-5 sm:grid-cols-2">
    {items.map((s, i) => (
      <Reveal key={s.title} delay={i * 0.07}>
        <Link href={s.href || "#"}>
          <SpotlightCard className="h-full min-h-[200px]">
            <ArrowUpRight className="muted absolute right-0 top-0 transition-all duration-500 ease-apple group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand" />
            <h3 className="text-2xl font-semibold tracking-tight">{s.title}</h3>
            <p className="muted mt-3 max-w-xs">{s.text}</p>
          </SpotlightCard>
        </Link>
      </Reveal>
    ))}
  </div>
);

export const Steps = () => (
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
    {steps.map((s, i) => (
      <Reveal key={s.t} delay={i * 0.08}>
        <div className="card h-full">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-sm font-semibold text-white">{i + 1}</span>
          <h3 className="mt-6 text-xl font-semibold">{s.t}</h3>
          <p className="muted mt-1">{s.d}</p>
        </div>
      </Reveal>
    ))}
  </div>
);

export const WhyList = () => (
  <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
    {why.map((w, i) => (
      <Reveal key={w.t} delay={i * 0.06}>
        <Check className="text-brand" size={22} />
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
      <div key={c.name} className="card group !p-6 text-center">
        <div className="text-4xl transition-transform duration-500 ease-apple group-hover:-rotate-6 group-hover:scale-125">{c.flag}</div>
        <p className="mt-3 text-sm font-medium">{c.name}</p>
      </div>
    ))}
  </div>
);
