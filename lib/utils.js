// shadcn-style helper: merge Tailwind classes safely
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...i) => twMerge(clsx(i));
