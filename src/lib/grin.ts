/**
 * The "Rictus" grin, as geometry. Every shape is a polygon with the same
 * number of points so Framer Motion can interpolate between them:
 * a closed slit (a line) -> an open grin (a crescent mouth) -> a full frame.
 */
const N = 18;

const edge = (fn: (t: number) => [number, number]) => Array.from({ length: N }, (_, i) => fn(i / (N - 1)));

const toPolygon = (top: [number, number][], bottom: [number, number][]) =>
  `polygon(${[...top, ...bottom.reverse()].map(([x, y]) => `${x.toFixed(2)}% ${y.toFixed(2)}%`).join(", ")})`;

const sag = (t: number) => Math.sin(Math.PI * t);

type GrinOptions = { y?: number; depth?: number };

/** A closed smile: both lips sit on the same curve. */
export const grinClosed = ({ y = 50, depth = 14 }: GrinOptions = {}) =>
  toPolygon(
    edge((t) => [8 + 84 * t, y + depth * sag(t) - 0.35]),
    edge((t) => [8 + 84 * t, y + depth * sag(t) + 0.35]),
  );

/** An open grin: the lower lip drops deeper than the upper one. */
export const grinOpen = ({ y = 50, depth = 14 }: GrinOptions = {}) =>
  toPolygon(
    edge((t) => [3 + 94 * t, y - 10 + (depth - 4) * sag(t)]),
    edge((t) => [3 + 94 * t, y - 6 + (depth + 22) * sag(t)]),
  );

/** Fully open: the polygon covers the whole frame (slightly overscanned). */
export const grinFull = () =>
  toPolygon(
    edge((t) => [-2 + 104 * t, -2]),
    edge((t) => [-2 + 104 * t, 102]),
  );

/** SVG path of the smile line, in a 0-100 viewBox, matching grinClosed. */
export const smilePath = ({ y = 50, depth = 14 }: GrinOptions = {}) => `M 8 ${y} Q 50 ${y + depth * 2} 92 ${y}`;
