"use client";
// Contact form. TODO: connect to an API route / email / CRM.
import { useState } from "react";
import { motion } from "framer-motion";
import Dropdown from "@/components/ui/Dropdown";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const field = "w-full rounded-2xl border border-[var(--line)] bg-white px-5 py-4 outline-none transition-all duration-300 ease-apple focus:border-brand focus:shadow-[0_0_0_4px_rgba(0,105,255,.12)]";

  if (sent)
    return (
      <motion.p initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card text-center text-xl font-medium">
        Thanks! We&apos;ll call you soon.
      </motion.p>
    );

  return (
    <form onSubmit={(e) => { e.preventDefault(); /* TODO: send data */ setSent(true); }} className="space-y-4">
      <input required name="name" placeholder="Name" className={field} />
      <input required name="phone" type="tel" placeholder="Phone" className={field} />

      {/* daisyUI-styled dropdown */}
      <Dropdown name="interest" options={["Job", "Exam", "Admission"]} />

      {/* daisyUI file input. The "Choose file" button is recolored to our brand with Tailwind file: variants */}
      <input
        type="file"
        name="cv"
        className="d-file-input d-file-input-bordered h-auto w-full rounded-2xl border-[var(--line)] bg-white py-2 pl-2
                   file:mr-4 file:rounded-full file:border-0 file:bg-brand file:px-5 file:py-2 file:text-white
                   hover:border-brand focus:border-brand"
      />

      <button className="btn btn-primary w-full">Send CV</button>
    </form>
  );
}