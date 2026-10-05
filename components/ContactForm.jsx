"use client";
// Contact form (brief: Name · Phone · Interested in · Upload CV). TODO: connect to an API route / email / CRM.
import { useState } from "react";
import { motion } from "framer-motion";
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const field = "w-full rounded-2xl border border-[var(--line)] bg-white px-5 py-4 outline-none transition-all duration-300 ease-apple focus:border-brand focus:shadow-[0_0_0_4px_rgba(0,105,255,.12)]";
  if (sent) return <motion.p initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card text-center text-xl font-medium">Thanks! We&apos;ll call you soon.</motion.p>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); /* TODO: send data */ setSent(true); }} className="space-y-4">
      <input required placeholder="Name" className={field} />
      <input required type="tel" placeholder="Phone" className={field} />
      <select className={field} defaultValue="Job">{["Job", "Exam", "Admission"].map((o) => <option key={o}>{o}</option>)}</select>
      <input type="file" className={field} />
      <button className="btn btn-primary w-full">Send CV</button>
    </form>
  );
}
