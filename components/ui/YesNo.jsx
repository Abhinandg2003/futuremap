"use client";
// Yes / No toggle. Sends its value through a hidden input, so it works in a normal form.
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function YesNo({ name, label, defaultValue = "" }) {
  const [value, setValue] = useState(defaultValue); // "" = not answered yet

  return (
    <div>
      <p className="mb-2 text-sm">{label}</p>
      <input type="hidden" name={name} value={value} />
      <div className="grid grid-cols-2 gap-3">
        {["Yes", "No"].map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => setValue(o)}
            className={cn(
              "rounded-2xl border px-5 py-4 text-left transition-all duration-300 ease-apple",
              value === o
                ? "border-brand bg-brand/5 font-medium text-brand shadow-[0_0_0_4px_rgba(0,105,255,.12)]"
                : "border-[var(--line)] bg-white hover:border-black/30"
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}