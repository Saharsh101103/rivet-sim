"use client";

import Image from "next/image";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { FooterLayer } from "./footer-layer";
import { ScrollIndicator } from "./scroll-indicator";

const SCREEN = 932;
// Pinned scroll distance for the finale; the reveal fires a little way in.
const PIN_DISTANCE = 480;
const REVEAL_AT = 120;

const motion = "duration-[1600ms] ease-rivet-footer motion-reduce:duration-0";

type Photo = {
  src: string;
  // "Mid" bounding box.
  box: { left: number; top: number; width: number; height: number };
  rotate: number;
  to: { x: number; y: number; rotate: number };
};

const PHOTOS_BEHIND: Photo[] = [
  {
    src: "/figma/cta-photo-3.png",
    box: { left: 314.1, top: 376, width: 124.725, height: 144.981 },
    rotate: -11.35,
    to: { x: 370, y: -103.93, rotate: -11.35 },
  },
  {
    src: "/figma/cta-photo-1.png",
    box: { left: 102.47, top: 107.36, width: 119.738, height: 141.379 },
    rotate: -8.7,
    to: { x: -296.46, y: -322, rotate: 5.16 },
  },
];
const PHOTOS_ON_TOP: Photo[] = [
  {
    src: "/figma/cta-photo-2.png",
    box: { left: 281.29, top: 31.11, width: 127.43, height: 146.883 },
    rotate: 12.85,
    to: { x: 270, y: -220, rotate: 12.85 },
  },
  {
    src: "/figma/cta-photo-4.png",
    box: { left: -0.33, top: 415.62, width: 126.109, height: 145.959 },
    rotate: 12.11,
    to: { x: -420, y: -130.01, rotate: 22.01 },
  },
];

// Vertical shift of each copy block from "Mid" to "Last".
const SHIFT = {
  headline: -134,
  button: -171,
  getIt: -210,
  tagline: -265,
  follow: -320,
  legal: -356,
  scroll: 160,
};

const LEGAL_LINKS = [
  ["Terms & Conditions", "Image Guidelines", "Community guidelines"],
  ["Privacy Policy & Cookies Policy", "News features"],
];

const displayClass =
  "font-display font-extrabold text-ink [font-stretch:85%] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]";

// Copy blocks are horizontally centred with translate -50%, so the vertical shift has to
// carry that offset too .
function shift(active: boolean, y: number, centered = true): CSSProperties {
  return { translate: `${centered ? "-50%" : "0"} ${active ? y : 0}px` };
}

function TiltedPhoto({ photo, last }: { photo: Photo; last: boolean }) {
  return (
    <div
      aria-hidden
      className={`absolute flex items-center justify-center transition-[translate] ${motion}`}
      style={{
        ...photo.box,
        translate: last ? `${photo.to.x}px ${photo.to.y}px` : "0 0",
      }}
    >
      <div
        className={`relative h-[127.474px] w-[101.624px] flex-none overflow-hidden rounded-[6.836px] transition-[rotate] ${motion}`}
        style={{ rotate: `${last ? photo.to.rotate : photo.rotate}deg` }}
      >
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="102px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

/**
 * Closing call to action + footer. The white panel ("Mid") is pinned; a short scroll
 * plays the prototype transition that lifts it into a rounded card and reveals the
 * dark footer underneath ("Last").
 */
export function FinaleSection() {
  const ref = useRef<HTMLElement>(null);
  const [last, setLast] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setLast(-el.getBoundingClientRect().top >= REVEAL_AT);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="footer"
      className="relative w-full"
      style={{ height: SCREEN + PIN_DISTANCE }}
    >
      <div className="sticky top-0 h-[932px] w-full overflow-clip">
        <FooterLayer revealed={last} />

        {/* White closing panel: full screen in "Mid", a rounded card ending at 506px in "Last" */}
        <div
          className={`absolute inset-0 bg-white transition-[clip-path] ${motion}`}
          style={{
            clipPath: last
              ? "inset(0 0 426px 0 round 0 0 30px 30px)"
              : "inset(0 0 0 0 round 0 0 0 0)",
          }}
        >
          {PHOTOS_BEHIND.map((p) => (
            <TiltedPhoto key={p.src} photo={p} last={last} />
          ))}

          <h2
            className={`absolute left-[calc(50%-0.5px)] top-[261px] w-[357px] text-center text-[60px] leading-[0.9] tracking-[-1.2px] transition-[translate] ${motion} ${displayClass}`}
            style={shift(last, SHIFT.headline)}
          >
            Let people find
            <br />
            your person.
          </h2>

          <p
            className={`absolute left-1/2 top-[594px] w-[330px] text-center font-sans text-[14px] font-medium leading-[1.36] text-[rgba(10,14,18,0.5)] transition-[translate] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] ${motion}`}
            style={shift(last, SHIFT.tagline)}
          >
            Only people can spot chemistry. That’s why Matchers on Rivet vet
            your matches before you do
          </p>

          <a
            href="https://www.instagram.com/rivet.dating"
            className={`absolute left-1/2 top-[718px] h-[15px] w-[204px] transition-[translate] ${motion}`}
            style={shift(last, SHIFT.follow)}
          >
            <img
              src="/figma/cta-instagram.svg"
              alt=""
              className="absolute left-[10px] top-[-0.75px] block size-[14.553px] max-w-none"
            />
            <span className="absolute left-[26.96px] top-[1.52px] whitespace-nowrap font-sans text-[14px] font-medium leading-[1.2] text-ink [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
              Follow us on @rivet.dating
            </span>
          </a>

          <p
            className={`absolute left-[calc(50%-0.5px)] top-[474px] whitespace-nowrap text-center text-[60px] leading-[0.95] tracking-[-1.2px] transition-[translate] ${motion} ${displayClass}`}
            // Measured against the Figma render: opsz 72 matches its 224px width.
            style={{
              fontVariationSettings: '"opsz" 72',
              ...shift(last, SHIFT.getIt),
            }}
          >
            Get it now
          </p>

          {/* Glossy pink download button */}
          <a
            href="#download"
            className={`absolute left-[calc(50%-0.5px)] top-[383px] flex h-[63px] items-center justify-center rounded-[22px] border border-[rgba(0,0,0,0.7)] px-[34px] drop-shadow-[0px_10px_22px_rgba(255,57,204,0.6)] transition-[translate] ${motion}`}
            style={shift(last, SHIFT.button)}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[22px]"
              style={{
                backgroundImage:
                  "linear-gradient(113.43deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 43.053%), linear-gradient(90deg, #ff1bb8 0%, #ff1bb8 100%)",
              }}
            />
            <span className="relative whitespace-nowrap font-sans text-[16px] font-medium leading-normal tracking-[-0.32px] text-white [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
              Download Rivet Dating
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_-5px_-5px_14px_0px_rgba(55,238,216,0.31),inset_5px_5px_12px_0px_rgba(255,255,255,0.75)]"
            />
          </a>

          <nav
            aria-label="Legal"
            className={`absolute left-1/2 top-[808px] flex flex-col items-center gap-[9px] transition-[translate,opacity] ${motion} ${
              last ? "opacity-40" : "opacity-60"
            }`}
            style={shift(last, SHIFT.legal)}
          >
            {LEGAL_LINKS.map((row, r) => (
              <div key={r} className="flex items-center gap-[9px]">
                {row.map((label, i) => (
                  <Fragment key={label}>
                    {i > 0 && (
                      <img
                        src="/figma/cta-bullet.svg"
                        alt=""
                        className="block size-[5px] shrink-0"
                      />
                    )}
                    <a
                      href="#"
                      className="whitespace-nowrap font-sans text-[12px] font-medium leading-[1.2] text-ink [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]"
                    >
                      {label}
                    </a>
                  </Fragment>
                ))}
              </div>
            ))}
          </nav>

          {PHOTOS_ON_TOP.map((p) => (
            <TiltedPhoto key={p.src} photo={p} last={last} />
          ))}
        </div>

        <div
          className={`absolute inset-0 transition-[translate] ${motion} pointer-events-none`}
          style={shift(last, SHIFT.scroll, false)}
        >
          <div className="pointer-events-auto">
            <ScrollIndicator href="#footer" variant="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
