"use client";
// Shares one flag: "ready" = preloader has started revealing the site.
// Reveal animations wait for this, so hero text animates AFTER the loader.
import { createContext, useContext, useState } from "react";

const Ctx = createContext({ ready: true, setReady: () => {} }); // default true = animations run if no preloader

export function LoadingProvider({ children }) {
  const [ready, setReady] = useState(false);
  return <Ctx.Provider value={{ ready, setReady }}>{children}</Ctx.Provider>;
}
export const useLoading = () => useContext(Ctx);