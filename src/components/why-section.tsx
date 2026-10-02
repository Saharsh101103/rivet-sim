import Image from "next/image";
import type { CSSProperties } from "react";
import { GlassAvatar } from "./glass-avatar";
import { ScrollIndicator } from "./scroll-indicator";

const STATEMENT =
  "Every love story used to have witnesses. Now the search happens alone, on a screen built for one.";

type Row = {
  words: (string | string[])[];
  left: number;
  top: number;
  // Gap between top-level word groups; nested groups use 8px.
  gap: number;
  size?: number;
  tracking?: number;
  stretch?: boolean;
};

// Each line of the collage is positioned by hand in Figma; list order is paint order.
const ROWS_UNDER_BUBBLE: Row[] = [
  {
    words: ["for", "one."],
    left: 121,
    top: 330.02,
    gap: 8,
    size: 51.758,
    tracking: -1.5527,
  },
];
const ROWS_OVER_BUBBLE: Row[] = [
  { words: ["the", "search"], left: 81.5, top: 165.01, gap: 8 },
  {
    words: ["happens", "alone,", "on"],
    left: 0,
    top: 220.01,
    gap: 8,
    stretch: true,
  },
  { words: ["a", ["screen", "built"]], left: 38.5, top: 275.01, gap: 32 },
];
const ROWS_TOP: Row[] = [
  { words: ["used", "to", "have"], left: 59.5, top: 55, gap: 8 },
  { words: ["witnesses.", "Now"], left: 3, top: 110.01, gap: 50 },
];

const wordClass =
  "relative shrink-0 [font-stretch:85%] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]";
const wordStyle = { fontVariationSettings: '"opsz" 38' };

function Words({ words }: { words: Row["words"] }) {
  return words.map((w, i) =>
    Array.isArray(w) ? (
      <span key={i} className="relative flex shrink-0 items-center gap-[8px]">
        <Words words={w} />
      </span>
    ) : (
      <span key={i} className={wordClass} style={wordStyle}>
        {w}
      </span>
    ),
  );
}

function CollageRow({ row }: { row: Row }) {
  const size = row.size ?? 56;
  return (
    <div
      className={`absolute flex whitespace-nowrap font-display font-extrabold leading-[1.05] text-white ${
        row.stretch ? "right-0 h-[37px] items-end" : "items-center"
      }`}
      style={{
        left: row.left,
        top: row.top,
        gap: row.gap,
        fontSize: size,
        letterSpacing: row.tracking ?? -1.68,
      }}
    >
      <Words words={row.words} />
    </div>
  );
}

/** Small "Swipe left-right, tirelessly" message bubble. */
function SwipeBubble({ variant }: { variant: "light" | "pink" }) {
  const light = variant === "light";
  return (
    <div
      className={`relative h-[34.564px] w-[105.437px] rounded-[13.965px] drop-shadow-[0px_2.953px_16.242px_rgba(0,0,0,0.35)] ${
        light ? "bg-[#f5f6f7]" : "bg-pink"
      }`}
    >
      <img
        src={
          light
            ? "/figma/bubble-sm-tail-light.svg"
            : "/figma/bubble-sm-tail-pink.svg"
        }
        alt=""
        className={`absolute top-[26.18px] block h-[17.111px] w-[15.361px] max-w-none ${
          light ? "left-[22.24px]" : "left-[71.23px] -scale-x-100"
        }`}
      />
      <p
        className={`absolute top-[calc(50%-12.39px)] w-[92.869px] font-tiktok text-[10.125px] font-medium leading-[11.521px] tracking-[-0.2025px] ${
          light ? "left-[12.57px] text-pink" : "left-[12.56px] text-white"
        }`}
      >
        Swipe left-right,
        <br />
        tirelessly
      </p>
    </div>
  );
}

export function WhySection() {
  return (
    <section
      id="why-rivet"
      className="timeline-why relative h-[932px] w-full overflow-clip bg-[#1f0012]"
    >
      {/* Peach + pink glow bleeding down from the top */}
      <img
        src="/figma/why-glow.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[calc(50%-0.5px)] top-[-286.4px] block h-[1132.941px] w-[1301.28px] max-w-none -translate-x-1/2"
        style={{ marginLeft: -0.7 }}
      />

      {/* Faint watermark */}
      <p
        aria-hidden
        className="absolute left-[calc(50%+0.5px)] top-[787px] w-[411.971px] -translate-x-1/2 text-center font-display text-[101.424px] font-extrabold leading-[0.85] tracking-[-2.0285px] text-white opacity-10 [font-stretch:85%] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]"
      >
        Dating goes social
      </p>

      <h2 className="sr-only">{STATEMENT}</h2>

      {/* "Why Rivet" text collage. blurs away as it leaves. */}
      <div
        className="sd-enter-why pointer-events-none absolute inset-0 origin-[215px_397px]"
        style={
          { "--ey": "108px", "--es": "1.62", "--eb": "50px" } as CSSProperties
        }
      >
        <div
          className="sd-exit-why absolute inset-0 origin-[215px_397px]"
          style={
            {
              "--xy": "-596px",
              "--xs": "1.62",
              "--xb": "50px",
            } as CSSProperties
          }
        >
          <div
            aria-hidden
            className="absolute left-[17px] top-[215px] h-[364.017px] w-[396px]"
          >
            {ROWS_UNDER_BUBBLE.map((row) => (
              <CollageRow key={row.top} row={row} />
            ))}

            <div className="absolute left-[62.13px] top-[299.95px] flex h-[38.885px] w-[106.774px] items-center justify-center">
              <div className="flex-none rotate-[-2.36deg]">
                <SwipeBubble variant="light" />
              </div>
            </div>

            {ROWS_OVER_BUBBLE.map((row) => (
              <CollageRow key={row.top} row={row} />
            ))}

            <div className="absolute left-[8px] top-[246.61px] flex h-[46.343px] w-[108.687px] items-center justify-center">
              <div className="flex-none rotate-[6.54deg]">
                <SwipeBubble variant="pink" />
              </div>
            </div>

            {/* "Every love story" with the foil heart balloon over it */}
            <div className="absolute left-[11.5px] top-0 flex items-center gap-[32px] whitespace-nowrap font-display text-[56px] font-extrabold leading-[1.05] tracking-[-1.68px] text-white">
              <Words words={["Every", ["love", "story"]]} />
              <div className="absolute left-[95.5px] top-[-26.81px] flex h-[88.015px] w-[87.205px] items-center justify-center">
                <div className="relative h-[72.69px] w-[71.572px] flex-none rotate-[-14.19deg]">
                  <Image
                    src="/figma/heart.png"
                    alt=""
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {ROWS_TOP.map((row) => (
              <CollageRow key={row.top} row={row} />
            ))}

            <GlassAvatar
              photo="/figma/avatar-3.png"
              box={{ left: 223.61, top: 85.02, size: 65.971 }}
              rotate={19.1}
              size={51.857}
              photoSize={52.098}
              photoOffset={-0.12}
              photoCrop={{
                left: "-13.13%",
                top: "-18.82%",
                width: "126.54%",
                height: "156.32%",
              }}
              shadow="inset 4.689px 2.758px 12.137px 0px white, inset -2.207px -2.207px 8.827px 0px rgba(0,0,0,0.58)"
              highlights={["/figma/glass3-hl-a.svg", "/figma/glass3-hl-b.svg"]}
              shines={[
                {
                  wrap: {
                    left: -1.52,
                    top: -1.49,
                    width: 52.469,
                    height: 58.109,
                  },
                  width: 47.436,
                  height: 36.178,
                  rotate: -65.75,
                  opacity: 0.5,
                  mask: "/figma/glass3-mask-a.svg",
                  maskPosition: "1.184px -3.869px",
                  maskSize: "141.254px 138.605px",
                  src: "/figma/glass3-shine-a.svg",
                },
                {
                  wrap: {
                    left: 1.28,
                    top: -0.29,
                    width: 52.469,
                    height: 58.109,
                  },
                  width: 47.436,
                  height: 36.178,
                  rotate: 114.25,
                  mask: "/figma/glass3-mask-b.svg",
                  maskPosition: "24.107px 56.382px",
                  maskSize: "175.32px 171.873px",
                  src: "/figma/glass3-shine-b.svg",
                },
              ]}
            />
            <GlassAvatar
              photo="/figma/avatar-4.png"
              box={{ left: 254.76, top: 115.39, size: 71.629 }}
              rotate={15.68}
              size={58.092}
              photoSize={58.362}
              photoOffset={-0.135}
              shadow="inset 5.253px 3.09px 13.596px 0px white, inset -2.472px -2.472px 9.888px 0px rgba(0,0,0,0.58)"
              highlights={["/figma/glass4-hl-a.svg", "/figma/glass4-hl-b.svg"]}
              shines={[
                {
                  wrap: {
                    left: -1.91,
                    top: -1.87,
                    width: 58.777,
                    height: 65.096,
                  },
                  width: 53.14,
                  height: 40.528,
                  rotate: -65.75,
                  opacity: 0.5,
                  mask: "/figma/glass4-mask-a.svg",
                  maskPosition: "1.184px -3.869px",
                  maskSize: "141.254px 138.605px",
                  src: "/figma/glass4-shine-a.svg",
                },
                {
                  wrap: {
                    left: 1.61,
                    top: -0.36,
                    width: 58.777,
                    height: 65.096,
                  },
                  width: 53.14,
                  height: 40.528,
                  rotate: 114.25,
                  mask: "/figma/glass4-mask-b.svg",
                  maskPosition: "24.107px 56.382px",
                  maskSize: "175.32px 171.873px",
                  src: "/figma/glass4-shine-b.svg",
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* CTA shrinks into the small faded pill  */}
      <div
        className="sd-exit-why pointer-events-none absolute inset-0 origin-[215px_686px]"
        style={
          { "--xy": "670px", "--xs": "0.59", "--xo": "0" } as CSSProperties
        }
      >
        <a
          href="#our-story"
          className="pointer-events-auto absolute left-1/2 top-[658px] flex h-[56px] w-[176px] -translate-x-1/2 items-center justify-center rounded-[15px] bg-[rgba(255,27,184,0.2)] px-[36px]"
        >
          <span className="whitespace-nowrap font-sans text-[16px] font-medium leading-normal tracking-[-0.32px] text-pink [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
            Read our story
          </span>
        </a>
      </div>

      <ScrollIndicator />
    </section>
  );
}
