"use client";

import { useEffect, useRef, useState } from "react";
import {
  CoupleVisual,
  MatchVisual,
  ProfileVisual,
} from "./how-it-works-visuals";
import { ScrollIndicator } from "./scroll-indicator";

const SCREEN = 932;

type Step = {
  title: React.ReactNode;
  body: string;
  dark: boolean;
};

const STEPS: Step[] = [
  {
    title: "Make a profile that feels like you",
    body: "Share the photos, prompts, and little details that give Matchers something real to go on.",
    dark: false,
  },
  {
    title: "Let people spot the chemistry",
    body: "Matchers see you in potential pairs, not alone, and back the connections they can genuinely imagine working.",
    dark: false,
  },
  {
    title: (
      <>
        Promising pairs
        <br />
        become introductions
      </>
    ),
    body: "When enough people see something there, Rivet introduces them to you. Less endless swiping. More people worth meeting.",
    dark: true,
  },
];

// Bottom glow per step.
const GLOWS = [
  { src: "/figma/hiw-glow-1.svg", bottom: -250, width: 745.39, height: 480 },
  { src: "/figma/hiw-glow-2.svg", bottom: -250, width: 745.39, height: 480 },
  { src: "/figma/hiw-glow-3.svg", bottom: -246, width: 737.39, height: 472 },
];

// start → center → end between steps, i.e. the row shifts per step.
const ROW_SHIFT = 466.8;
// Copy blocks .
const COPY_SHIFT = 220;
// Number badges.
const BADGE_SHIFT = 34;

// Matches the prototype's animation.
const motion = "duration-[1900ms] ease-rivet motion-reduce:duration-0";

/**
 * "How it works" carousel. The section's content stays pinned while the user
 * scrolls, and each screen of scroll advances one step.
 */
export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const dark = STEPS[step].dark;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - SCREEN;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const next = Math.min(
        STEPS.length - 1,
        Math.floor(progress * STEPS.length),
      );
      setStep(next);
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
      ref={sectionRef}
      id="how-it-works"
      aria-roledescription="carousel"
      aria-label="How Rivet works"
      className="relative w-full"
      // One extra screen so every step (including the last) gets a full screen of scroll.
      style={{ height: SCREEN * (STEPS.length + 1) }}
    >
      <div
        // Read by HeaderThemeSync: the dark step flips the header logo to white.
        data-header-theme={dark ? "dark" : "light"}
        className={`sticky top-0 h-[932px] w-full overflow-clip transition-colors ${motion} ${
          dark ? "bg-[#110e15]" : "bg-[#fef5ee]"
        }`}
      >
        <p
          aria-hidden
          className="absolute left-[calc(50%+0.5px)] top-[263px] w-[657px] -translate-x-1/2 text-center font-display text-[161.749px] font-extrabold leading-[0.85] tracking-[-3.235px] text-[#1f0012] opacity-10 [font-stretch:85%] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]"
        >
          Dating goes social
        </p>

        {/* Visual carousel row */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[163.8px] w-[240px] -translate-x-1/2"
        >
          <div
            className={`flex items-center gap-[220.8px] transition-[translate] ${motion}`}
            style={{ translate: `${-step * ROW_SHIFT}px 0` }}
          >
            <ProfileVisual />
            <CoupleVisual />
            <MatchVisual />
          </div>
        </div>

        {GLOWS.map((g, i) => (
          <img
            key={g.src}
            src={g.src}
            alt=""
            aria-hidden
            className={`pointer-events-none absolute left-[calc(50%-0.3px)] block max-w-none -translate-x-1/2 transition-opacity ${motion}`}
            style={{
              bottom: g.bottom,
              width: g.width,
              height: g.height,
              opacity: i === step ? 1 : 0,
            }}
          />
        ))}

        {/* Step badges: a row of 1·2·3 sliding behind a window */}
        <div className="absolute left-[201px] top-[534px] h-[28px] w-[28px] overflow-clip rounded-[10px]">
          <div
            className={`flex gap-[6px] transition-[translate] ${motion}`}
            style={{ translate: `${-step * BADGE_SHIFT}px 0` }}
          >
            {STEPS.map((_, i) => (
              <span
                key={i}
                aria-hidden={i !== step}
                className={`flex size-[28px] shrink-0 items-center justify-center rounded-[8px] font-sans text-[14px] font-medium leading-[1.2] transition-colors ${motion} ${
                  i === step ? "bg-pink text-white" : "bg-[#d7d7d7] text-black"
                }`}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>

        {/* Copy column sliding behind the mask */}
        <div className="absolute left-[37px] top-[578px] h-[156px] w-[355px] overflow-clip">
          <div
            className={`flex flex-col gap-[64px] text-center transition-[translate,color] ${motion} ${
              dark ? "text-white" : "text-black"
            }`}
            style={{ translate: `0 ${-step * COPY_SHIFT}px` }}
          >
            {STEPS.map((s, i) => (
              <div
                key={i}
                aria-hidden={i !== step}
                className="relative h-[156px] w-[355px] shrink-0"
              >
                <h3
                  className="absolute inset-x-0 top-[15px] font-display text-[40px] font-extrabold leading-[0.95] tracking-[-0.8px] [font-stretch:85%] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]"
                  style={{ fontVariationSettings: '"opsz" 76' }}
                >
                  {s.title}
                </h3>
                <p className="absolute left-[177.5px] top-[97px] w-[319px] -translate-x-1/2 font-sans text-[14px] font-medium leading-[1.2] opacity-60 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <a
          href="#download"
          className={`absolute left-[144.5px] top-[742px] flex h-[47px] w-[141px] items-center justify-center rounded-[15px] bg-pink px-[36px] transition-[filter] ${motion} ${
            dark ? "drop-shadow-[0px_14px_12px_rgba(0,0,0,0.25)]" : ""
          }`}
        >
          <span className="whitespace-nowrap font-sans text-[16px] font-medium leading-normal tracking-[-0.32px] text-black [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
            Get Riveting
          </span>
        </a>

        <ScrollIndicator href="#stories" variant="light" />
      </div>
    </section>
  );
}
