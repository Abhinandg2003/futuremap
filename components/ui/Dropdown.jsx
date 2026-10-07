"use client";
// Custom dropdown: daisyUI menu styling + eased open/close animation.
// Works inside a <form>: the chosen value is sent through a hidden input (name={name}).
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dropdown({ name, options, defaultValue, className }) {
  const [value, setValue] = useState(defaultValue ?? options[0]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <input type="hidden" name={name} value={value} />

      {/* The closed field */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex w-full items-center justify-between rounded-2xl border bg-white px-5 py-4 text-left outline-none",
          "transition-all duration-300 ease-apple",
          open ? "border-brand shadow-[0_0_0_4px_rgba(0,105,255,.12)]" : "border-[var(--line)]"
        )}
      >
        {value}
        <ChevronDown size={18} className={cn("muted transition-transform duration-500 ease-apple", open && "rotate-180")} />
      </button>

      {/* The list (daisyUI d-menu) */}
      <ul
        role="listbox"
        className={cn(
          "d-menu absolute z-20 mt-2 w-full rounded-2xl border border-[var(--line)] bg-white p-2 shadow-xl",
          "origin-top transition-all duration-300 ease-apple",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        {options.map((o) => (
          <li key={o}>
            <button
              type="button"
              role="option"
              aria-selected={o === value}
              onClick={() => { setValue(o); setOpen(false); }}
              className={cn("rounded-xl px-4 py-3", o === value ? "font-medium text-brand" : "hover:bg-[var(--surface)]")}
            >
              {o}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}