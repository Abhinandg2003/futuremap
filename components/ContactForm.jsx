"use client";
// Contact form -> POST /api/contact (emails the team, with the CV attached).
import { useState } from "react";
import { motion } from "framer-motion";
import Dropdown from "@/components/ui/Dropdown";
import { site } from "@/lib/site";
import YesNo from "@/components/ui/YesNo";

const MAX_MB = 4; // keep in sync with the API route

const EXPERIENCE = ["Fresher (no experience)", "Less than 1 year", "1-2 years", "3-5 years", "5+ years"];
const QUALIFICATIONS = ["12th / Plus Two", "Diploma", "GNM", "B.Sc Nursing", "Bachelor's degree", "Master's degree", "Other"];




export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [error, setError] = useState("");
  const field = "w-full rounded-2xl border border-[var(--line)] bg-white px-5 py-4 outline-none transition-all duration-300 ease-apple focus:border-brand focus:shadow-[0_0_0_4px_rgba(0,105,255,.12)]";

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);

    // Quick checks in the browser (the server checks again)
    const file = data.get("cv");
    if (file && file.size > MAX_MB * 1024 * 1024) return setError(`The file is too large (max ${MAX_MB} MB).`);
    if (!data.get("passport")) return setError("Please tell us if you have a valid passport.");

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setError(err.message || "Network error. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "sent")
    return (
      <motion.p initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card text-center text-xl font-medium">
        Thanks! We&apos;ll call you soon.
      </motion.p>
    );

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Honeypot: hidden from people, bots fill it in. Do not remove. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <input required name="name" placeholder="Name" maxLength={100} className={field} />
      <input required name="phone" type="tel" placeholder="Phone" className={field} />
<Dropdown name="interest" options={["Career opportunities ", "College or course Admissons", "Ielts / oet / Prometric preparations"]} />

{/* New fields */}
<input required name="age" type="number" inputMode="numeric" min={16} max={70} placeholder="Age" className={field} />
<Dropdown name="qualification" options={QUALIFICATIONS} />
<Dropdown name="experience" options={EXPERIENCE} />
<YesNo name="passport" label="Do you have a valid passport?" />
      <input
        type="file"
        name="cv"
        accept=".pdf,.doc,.docx"
        className="d-file-input d-file-input-bordered h-auto w-full rounded-2xl border-[var(--line)] bg-white py-2 pl-2
                   file:mr-4 file:rounded-full file:border-0 file:bg-brand file:px-5 file:py-2 file:text-white
                   hover:border-brand focus:border-brand"
      />
      <p className="muted -mt-2 text-xs">PDF or Word, up to {MAX_MB} MB.</p>

      {/* Error message */}
      {error && (
        <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}{" "}
          <a href={site.whatsapp} className="underline">Chat on WhatsApp instead</a>
        </p>
      )}

      <button disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}