"use client";
// Simple animated FAQ accordion (shadcn-like behaviour).
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {items.map((it, i) => (
        <div key={it.q}>
          <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between py-6 text-left text-lg font-medium">
            {it.q}
            <Plus size={20} className={`transition-transform duration-500 ease-apple ${open === i ? "rotate-45 text-brand" : ""}`} />
          </button>
          <motion.div initial={false} animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <p className="muted pb-6">{it.a}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
