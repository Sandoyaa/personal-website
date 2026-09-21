'use client';

import { useEffect, useRef } from 'react';

export type BackdropKind = 'stars' | 'orbs' | 'glyphs' | 'wave';

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, ink: string, dark: boolean) => void;

// Web ports of the backdrops the apps ship (BloodSugar/Views/Settings/Components/AppPromoCard.swift,
// BloodSugar/Views/Components/WaveBackdrop.swift), so each card reads as a window into its app.

const stars = Array.from({ length: 55 }, () => ({
  x: Math.random(),
  y: Math.random(),
  size: 0.8 + Math.random() * 1.8,
  brightness: 0.3 + Math.random() * 0.7,
  phase: Math.random(),
  period: 2 + Math.random() * 4
}));

const drawStars: Draw = (ctx, w, h, t, ink) => {
  ctx.fillStyle = ink;
  for (const s of stars) {
    const wave = Math.sin((t / s.period + s.phase) * Math.PI * 2);
    ctx.globalAlpha = 0.1 + (s.brightness - 0.1) * ((wave + 1) / 2);
    ctx.beginPath();
    ctx.arc(s.x * w, s.y * h, s.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
};

const drawOrbs: Draw = (ctx, w, h, t) => {
  // easeInOut over 9 s, autoreversing — the SwiftUI animation the app uses.
  const p = (1 - Math.cos((t / 9) * Math.PI)) / 2;
  const lerp = (a: number, b: number) => a + (b - a) * p;
  const orbs = [
    { rgb: '0,122,255', d: h * 1.6, x: lerp(-0.18, 0.3) * w, y: lerp(0.2, -0.25) * h },
    { rgb: '255,149,0', d: h * 1.4, x: lerp(0.28, -0.24) * w, y: lerp(-0.22, 0.28) * h }
  ];
  for (const o of orbs) {
    const cx = w / 2 + o.x;
    const cy = h / 2 + o.y;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.d / 2);
    g.addColorStop(0, `rgba(${o.rgb},0.75)`);
    g.addColorStop(1, `rgba(${o.rgb},0)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }
};

const glyphs = [
  { symbol: '$', size: 30, x: 0.08, duration: 11, angle: -12 },
  { symbol: '€', size: 22, x: 0.23, duration: 14, angle: 8 },
  { symbol: '£', size: 26, x: 0.38, duration: 12, angle: 16 },
  { symbol: '¥', size: 20, x: 0.52, duration: 15, angle: -6 },
  { symbol: '₴', size: 28, x: 0.67, duration: 13, angle: 11 },
  { symbol: '₿', size: 24, x: 0.81, duration: 16, angle: -14 },
  { symbol: '₹', size: 21, x: 0.93, duration: 12, angle: 5 }
];

const drawGlyphs: Draw = (ctx, w, h, t, ink) => {
  ctx.fillStyle = ink;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  glyphs.forEach((g, i) => {
    // Already mid-flight on arrival: each glyph starts part-way up its path, spread by the golden ratio
    // so no two share a height.
    const travel = (t / g.duration + ((i * 0.382) % 1)) % 1;
    ctx.globalAlpha = 0.4 * Math.min(1, t + 0.3);
    ctx.save();
    ctx.translate(g.x * w, h + g.size - travel * (h + g.size * 2));
    ctx.rotate((g.angle * Math.PI) / 180);
    ctx.font = `bold ${g.size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    ctx.fillText(g.symbol, 0, 0);
    ctx.restore();
  });
};

// WaveColor from BloodSugar's asset catalog, in HSB — the app deepens it by scaling S and B.
const tintHSB = { h: 184, s: 0.224, b: 0.718 };
const shade = (sat: number, bri: number, alpha = 1) => {
  const s = Math.min(1, tintHSB.s * sat);
  const v = Math.min(1, tintHSB.b * bri);
  const f = (n: number) => {
    const k = (n + tintHSB.h / 60) % 6;
    return Math.round(255 * (v - v * s * Math.max(0, Math.min(k, 4 - k, 1))));
  };
  return `rgba(${f(5)},${f(3)},${f(1)},${alpha})`;
};
// groundStops(of:) with intensity 2.0 — the paywall and onboarding sea.
const ground = {
  light: [shade(2.1, 0.35), shade(1.5, 0.92), shade(0.55, 1.22), shade(1.25, 1.02)],
  dark: [shade(1.7, 0.62), shade(1.9, 0.44), shade(2.0, 0.3), shade(2.0, 0.18)]
};
const stops = [0, 0.38, 0.68, 1];
const layers = [
  { rest: 0.5, amplitude: 0.045, wavelength: 1.6, speed: 1, phase: 0, lightness: 0.3 },
  { rest: 0.55, amplitude: 0.04, wavelength: 1.35, speed: -0.55, phase: 2.4, lightness: 0.34 }
];

const drawWave: Draw = (ctx, w, h, t, _ink, dark) => {
  // The whole paywall sheet, scaled into the card: deep at the top, crests across the middle, pale
  // water below. Crests keep the height they have against a phone's width.
  const toCard = (sheetY: number) => sheetY * h;
  const phoneHeight = w * 2.0;

  const page = ctx.createLinearGradient(0, toCard(0), 0, toCard(1));
  (dark ? ground.dark : ground.light).forEach((c, i) => page.addColorStop(stops[i], c));
  ctx.fillStyle = page;
  ctx.fillRect(0, 0, w, h);

  const strength = dark ? 0.45 : 1;
  for (const l of layers) {
    const base = (t / 30) * l.speed * 2 * Math.PI + l.phase;
    const wl = w * l.wavelength;
    const amplitude = l.amplitude * phoneHeight;
    const crestY = (x: number) => {
      const a = Math.sin((x / wl) * 2 * Math.PI + base);
      const b = Math.sin((x / (wl * 1.15)) * 2 * Math.PI - base * 0.63 + l.phase * 1.7);
      const c = Math.sin((x / (wl * 2.6)) * 2 * Math.PI + base * 0.41 + l.phase * 0.6);
      return toCard(l.rest) + ((a + b * 0.22 + c * 0.24) / 1.35) * amplitude;
    };
    const crest = new Path2D();
    for (let x = 0; x <= w + 3; x += 3) (x === 0 ? crest.moveTo : crest.lineTo).call(crest, x, crestY(x));
    const water = new Path2D(crest);
    water.lineTo(w + 3, h);
    water.lineTo(0, h);
    water.closePath();

    const fill = ctx.createLinearGradient(0, toCard(l.rest) - amplitude, 0, h);
    fill.addColorStop(0, `rgba(255,255,255,${l.lightness * strength})`);
    fill.addColorStop(1, `rgba(255,255,255,${l.lightness * strength * 0.15})`);
    ctx.fillStyle = fill;
    ctx.fill(water);
    ctx.strokeStyle = `rgba(255,255,255,${0.5 * strength})`;
    ctx.lineWidth = 1.5;
    ctx.stroke(crest);
  }
};

const draws: Record<BackdropKind, Draw> = { stars: drawStars, orbs: drawOrbs, glyphs: drawGlyphs, wave: drawWave };

/** An app's animated backdrop, filling its positioned parent. Holds still under Reduce Motion. */
export function AppBackdrop({ kind }: { kind: BackdropKind }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    let frame = 0;

    const render = (now: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== Math.round(width * dpr)) canvas.width = Math.round(width * dpr);
      if (canvas.height !== Math.round(height * dpr)) canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 1;
      const dark = document.documentElement.classList.contains('dark');
      const t = reduceMotion ? 8 : (now - start) / 1000;
      draws[kind](ctx, width, height, t, getComputedStyle(canvas).color, dark);
      if (!reduceMotion) frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, [kind]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full text-foreground" />;
}
