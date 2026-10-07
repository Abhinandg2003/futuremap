"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { geoMercator, geoContains, geoBounds } from "d3-geo";
import { feature } from "topojson-client";
import { Countries } from "@/components/sections/Blocks";
import { countries } from "@/lib/site";

const BLUE = "#0069ff";
const W = 1000;
const H = 600;
const EASE = [0.22, 1, 0.36, 1];

// ISO numeric id (world-atlas) + spot position per country.
const META = {
  "Saudi Arabia": { id: "682", pin: [45.0, 24.2], flag:"/images/flags/saudi.jpg" },
  UAE: { id: "784", pin: [54.4, 24.3], flag:"/images/flags/uae.jpg" },
  Qatar: { id: "634", pin: [51.2, 25.3], flag:"/images/flags/qatar.jpg" },
  Kuwait: { id: "414", pin: [47.6, 29.2], flag:"/images/flags/kuwait.jpg" },
  Oman: { id: "512", pin: [57.0, 21.0], flag:"/images/flags/oman.jpg" },
  Bahrain: { id: "048", pin: [50.55, 26.1], flag:"/images/flags/bahrain.jpg" },
};
const ID_TO_NAME = Object.fromEntries(
  Object.entries(META).map(([name, m]) => [m.id, name])
);

// Smooth pseudo-noise so dot sizes vary organically.
const noise = (x, y) =>
  (Math.sin(x * 0.021 + 1.3) * Math.cos(y * 0.027) +
    Math.sin(x * 0.05 + y * 0.043) * 0.6 +
    1.6) /
  3.2;

const BaseDots = memo(function BaseDots({ dots }) {
  return (
    <g fill="#d3dae5">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} />
      ))}
    </g>
  );
});

const CountryDots = memo(function CountryDots({ dots, on }) {
  return (
    <g
      fill={BLUE}
      style={{ opacity: on ? 0.9 : 0.4, transition: "opacity .45s cubic-bezier(.22,1,.36,1)" }}
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} />
      ))}
    </g>
  );
});

export default function CountriesMap() {
  const [grid, setGrid] = useState(null);
  const [active, setActive] = useState(null);
  const reduce = useReducedMotion();

  const projection = useMemo(
    () => geoMercator().center([52, 24.5]).scale(1680).translate([W / 2, H / 2]),
    []
  );

  // Build the dot grid only on screens where the map is shown.
  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    let alive = true;
    import("world-atlas/countries-50m.json").then((mod) => {
      const topo = mod.default ?? mod;
      const feats = feature(topo, topo.objects.countries).features.map((f) => {
        const [[w, s], [e, n]] = geoBounds(f);
        return { f, w, s, e, n, id: String(f.id).padStart(3, "0") };
      });

      const base = [];
      const byCountry = {};
      const dx = 11;
      const dy = 9.6;
      for (let j = 0; j * dy < H; j++) {
        for (let x = (j % 2) * (dx / 2); x < W; x += dx) {
          const y = j * dy;
          const ll = projection.invert([x, y]);
          if (!ll) continue;
          const hit = feats.find(
            (c) =>
              c.w <= c.e &&
              ll[0] >= c.w && ll[0] <= c.e && ll[1] >= c.s && ll[1] <= c.n &&
              geoContains(c.f, ll)
          );
          if (!hit) continue;
          const n = noise(x, y);
          const name = ID_TO_NAME[hit.id];
          if (name) {
            (byCountry[name] ||= []).push({ x, y, r: 2 + n * 2.2 });
          } else {
            base.push({ x, y, r: 1 + n * 2.6 });
          }
        }
      }
      if (alive) setGrid({ base, byCountry });
    });
    return () => {
      alive = false;
    };
  }, [projection]);

  const pins = countries.map((c) => {
    const [x, y] = projection(META[c.name].pin);
    return { ...c, flag: META[c.name].flag, x, y };
  });
  const current = pins.find((p) => p.name === active);

  return (
    <>
      {/* Mobile: keep the original list */}
      <div className="md:hidden">
        <Countries />
      </div>

      {/* Tablet / desktop: dot map */}
      <div className="mt-6 hidden md:block">
        <motion.svg
          viewBox={`0 0 ${W} ${H}`}
          className="mx-auto h-auto w-full max-w-5xl select-none"
          role="group"
          aria-label="Map of the six Gulf countries we place candidates in"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: grid ? 1 : 0 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <defs>
            <radialGradient id="fm-fade" cx="50%" cy="50%" r="62%">
              <stop offset="55%" stopColor="#fff" />
              <stop offset="100%" stopColor="#000" />
            </radialGradient>
            <mask id="fm-mask">
              <rect width={W} height={H} fill="url(#fm-fade)" />
            </mask>
            <filter id="fm-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor={BLUE} floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Map dots fade out at the edges so they melt into the white background */}
          {grid && (
            <g mask="url(#fm-mask)">
              <BaseDots dots={grid.base} />
              {Object.entries(grid.byCountry).map(([name, dots]) => (
                <CountryDots key={name} dots={dots} on={active === name} />
              ))}
            </g>
          )}

          {/* Spots */}
          {grid &&
            pins.map((p, i) => {
              const on = active === p.name;
              return (
                <g
                  key={p.name}
                  transform={`translate(${p.x} ${p.y})`}
                  tabIndex={0}
                  role="button"
                  aria-label={p.name}
                  className="cursor-pointer outline-none"
                  onMouseEnter={() => setActive(p.name)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(p.name)}
                  onBlur={() => setActive(null)}
                >
                  {/* invisible larger hit area so the small spot is easy to hover */}
                  <circle r={18} fill="transparent" />
                  {!reduce && (
                    <motion.circle
                      r={6}
                      fill={BLUE}
                      initial={{ scale: 1, opacity: 0.35 }}
                      animate={{ scale: 3, opacity: 0 }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: i * 0.35 }}
                    />
                  )}
                  <motion.circle
                    r={6}
                    fill={BLUE}
                    stroke="#fff"
                    strokeWidth={2}
                    filter="url(#fm-glow)"
                    animate={{ scale: on ? 1.4 : 1 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                </g>
              );
            })}

          {/* Country name on hover */}
          <AnimatePresence>
            {current && (
              // The outer <g> holds the position; framer-motion animates the inner <g>.
              // (Animating `transform` and `y`/`scale` on the same element makes them fight.)
              <g
                key={current.name}
                transform={`translate(${current.x} ${current.y - 18})`}
                pointerEvents="none"
              >
                <motion.g
                  initial={{ opacity: 0, y: 8, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  {(() => {
                    const nameW = current.name.length * 8.4;
                    const w = Math.max(nameW, 64) + 24;
                    const imgW = w - 20;
                    const imgH = Math.round(imgW * 0.62);
                    const h = 10 + imgH + 8 + 16 + 10;
                    const clipId = `fm-clip-${current.name.replace(/\s/g, "")}`;
                    return (
                      <>
                        <rect
                          x={-w / 2}
                          y={-h}
                          width={w}
                          height={h}
                          rx={14}
                          fill="#fff"
                          stroke="#e3e8ef"
                          style={{ filter: "drop-shadow(0 6px 14px rgba(0,40,100,.14))" }}
                        />
                        <clipPath id={clipId}>
                          <rect x={-imgW / 2} y={-h + 10} width={imgW} height={imgH} rx={8}  />
                        </clipPath>
                        <image
  href={current.flag}
  x={-imgW / 2}
  y={-h + 10}
  width={imgW}
  height={imgH}
  preserveAspectRatio="xMidYMid slice"
  clipPath={`url(#${clipId})`}
/>

<rect
  x={-imgW / 2}
  y={-h + 10}
  width={imgW}
  height={imgH}
  rx={8}
  fill="none"
  stroke="#00000010"
  strokeWidth={1}
/>
                        <text
                          x={0}
                          y={-h + 10 + imgH + 8 + 8}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize={14}
                          fontWeight={600}
                          fill="#0b1220"
                        >
                          {current.name}
                        </text>
                      </>
                    );
                  })()}
                </motion.g>
              </g>
            )}
          </AnimatePresence>
        </motion.svg>
      </div>
    </>
  );
}