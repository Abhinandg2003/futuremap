// Reusable CTA with the arrow-swap hover. All animation lives in globals.css (.btn-arrow).
// Needs: npm i react-icons   (or swap the icon for lucide's <ArrowRight /> if you prefer)
import { IoIosArrowRoundForward } from "react-icons/io";
import { cn } from "@/lib/utils";

// variant: "primary" | "ghost"
export default function ArrowButton({ href, children, variant = "primary", className }) {
  return (
    <a href={href} className={cn("btn btn-arrow", `btn-${variant}`, className)}>
      {/* Left arrow: appears on hover */}
      <span className="btn-arrow__icon btn-arrow__icon--in" aria-hidden="true">
        <IoIosArrowRoundForward size={22} />
      </span>

      <span>{children}</span>

      {/* Right arrow: disappears on hover */}
      <span className="btn-arrow__icon btn-arrow__icon--out" aria-hidden="true">
        <IoIosArrowRoundForward size={22} />
      </span>
    </a>
  );
}