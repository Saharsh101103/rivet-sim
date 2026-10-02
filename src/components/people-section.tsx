import type { CSSProperties } from "react";
import { ChatBubble } from "./chat-bubble";
import { GlassAvatar } from "./glass-avatar";
import { ScrollIndicator } from "./scroll-indicator";

const SPRITE = "/figma/people-sprite.png";

/** A head cut out of the shared people sprite, rotated inside its bounding box. */
function SpriteCutout({
  box,
  width,
  height,
  rotate,
  sprite,
}: {
  box: { left: number; top: number; width: number; height: number };
  width: number;
  height: number;
  rotate: number;
  sprite: { left: string; width: string; height: string };
}) {
  return (
    <div className="absolute flex items-center justify-center" style={box}>
      <div className="flex-none" style={{ rotate: `${rotate}deg` }}>
        <div className="relative overflow-hidden" style={{ width, height }}>
          <img
            src={SPRITE}
            alt=""
            className="pointer-events-none absolute top-0 max-w-none"
            style={sprite}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Scroll-linked entrance from the hero frame
 */
function FlyIn({
  x = 0,
  y = 0,
  r = 0,
  opacity,
  origin,
  children,
}: {
  x?: number;
  y?: number;
  r?: number;
  opacity?: number;
  origin: [number, number];
  children: React.ReactNode;
}) {
  return (
    <div
      className="sd-enter-people pointer-events-none absolute inset-0"
      style={
        {
          transformOrigin: `${origin[0]}px ${origin[1]}px`,
          "--ex": `${x}px`,
          "--ey": `${y}px`,
          "--er": `${r}deg`,
          ...(opacity !== undefined && { "--eo": String(opacity) }),
        } as CSSProperties
      }
    >
      <div className="pointer-events-auto">{children}</div>
    </div>
  );
}

export function PeopleSection() {
  return (
    <section className="timeline-people relative h-[932px] w-full overflow-clip bg-[#f5f6f7]">
      {/* People Frame 1: rises in  */}
      <div
        className="sd-enter-people absolute left-[12px] top-[172px] h-[486px] w-[406px]"
        style={{ "--ey": "48px" } as CSSProperties}
      >
        <div
          className="sd-exit-people absolute inset-0"
          style={{ "--xy": "290px" } as CSSProperties}
        >
          {/* Male dude: photo card + head popping out above it  */}
          <FlyIn x={-76.43} y={-14.63} r={-27.25} origin={[127.38, 180.94]}>
            <div className="absolute left-[10.88px] top-0 h-[361.878px] w-[233px]">
              <div className="absolute left-0 top-[70.88px] h-[291px] w-[233px]">
                <img
                  src="/figma/people-card-male.png"
                  alt=""
                  className="absolute left-[-31.6px] top-[-27.7px] block h-[352.348px] w-[297.234px] max-w-none"
                />
              </div>
              <SpriteCutout
                box={{ left: 34.14, top: 0, width: 198.52, height: 244.271 }}
                width={181.599}
                height={231.234}
                rotate={-4.33}
                sprite={{
                  left: "-80.81%",
                  width: "361.63%",
                  height: "158.51%",
                }}
              />
            </div>
          </FlyIn>

          {/* Female */}
          <FlyIn x={38.41} y={-9.39} r={13.33} origin={[292.5, 250.5]}>
            <div className="absolute left-[179px] top-[45px] h-[411px] w-[227px]">
              <div className="absolute left-[-0.37px] top-[82.18px] flex h-[329.058px] w-[228.254px] items-center justify-center">
                <div className="flex-none rotate-[5.43deg]">
                  <div className="relative h-[311.555px] w-[199.653px]">
                    <img
                      src="/figma/people-card-female.png"
                      alt=""
                      className="absolute left-[-67.0px] top-[-65.8px] block h-[373.921px] w-[267.653px] max-w-none"
                    />
                  </div>
                </div>
              </div>
              <SpriteCutout
                box={{ left: 9.21, top: 0.38, width: 255.073, height: 278.775 }}
                width={207.725}
                height={239.056}
                rotate={12.66}
                sprite={{
                  left: "-166.15%",
                  width: "326.84%",
                  height: "158.51%",
                }}
              />
            </div>
          </FlyIn>

          {/* Avatar + bubble slide in from off the left edge */}
          <FlyIn x={-245} y={118} origin={[54.73, 54.85]}>
            <GlassAvatar
              photo="/figma/avatar-1.png"
              box={{ left: -5, top: -4.88, size: 119.45 }}
              rotate={-11.97}
              size={100.749}
              photoSize={101.217}
              photoOffset={-0.23}
              shadow="inset 9.11px 5.359px 23.58px 0px white, inset -4.287px -4.287px 17.149px 0px rgba(0,0,0,0.58)"
              highlights={["/figma/glass1-hl-a.svg", "/figma/glass1-hl-b.svg"]}
              shines={[
                {
                  wrap: {
                    left: -5.74,
                    top: -5.62,
                    width: 101.938,
                    height: 112.897,
                  },
                  width: 92.16,
                  height: 70.288,
                  rotate: -65.75,
                  opacity: 0.5,
                  mask: "/figma/glass1-mask-a.svg",
                  maskPosition: "1.184px -3.869px",
                  maskSize: "141.254px 138.605px",
                  src: "/figma/glass1-shine-a.svg",
                },
                {
                  wrap: {
                    left: 4.83,
                    top: -1.09,
                    width: 101.938,
                    height: 112.897,
                  },
                  width: 92.16,
                  height: 70.288,
                  rotate: 114.25,
                  mask: "/figma/glass1-mask-b.svg",
                  maskPosition: "24.107px 56.382px",
                  maskSize: "175.32px 171.873px",
                  src: "/figma/glass1-shine-b.svg",
                },
              ]}
            />
          </FlyIn>

          <FlyIn x={-328.99} y={-10.59} r={-27.29} origin={[144.59, 20.53]}>
            <div className="absolute left-[77px] top-[-4.88px] flex h-[50.814px] w-[135.187px] items-center justify-center">
              <ChatBubble tail="left" className="flex-none rotate-[3.14deg]">
                Some people just make sense
              </ChatBubble>
            </div>
          </FlyIn>

          {/* Avatar + bubble slide in from off the right edge */}
          <FlyIn x={175} y={-2} origin={[307.97, 432.12]}>
            <GlassAvatar
              photo="/figma/avatar-2.png"
              box={{ left: 252.39, top: 376.54, size: 111.163 }}
              rotate={23.54}
              size={84.457}
              photoSize={84.849}
              photoOffset={-0.2}
              shadow="inset 7.637px 4.492px 19.766px 0px white, inset -3.594px -3.594px 14.376px 0px rgba(0,0,0,0.58)"
              highlights={["/figma/glass2-hl-a.svg", "/figma/glass2-hl-b.svg"]}
              shines={[
                {
                  wrap: {
                    left: -4.03,
                    top: -3.95,
                    width: 85.453,
                    height: 94.64,
                  },
                  width: 77.257,
                  height: 58.921,
                  rotate: -65.75,
                  opacity: 0.5,
                  mask: "/figma/glass2-mask-a.svg",
                  maskPosition: "1.184px -3.869px",
                  maskSize: "141.254px 138.605px",
                  src: "/figma/glass2-shine-a.svg",
                },
                {
                  wrap: {
                    left: 3.39,
                    top: -0.77,
                    width: 85.453,
                    height: 94.64,
                  },
                  width: 77.257,
                  height: 58.921,
                  rotate: 114.25,
                  mask: "/figma/glass2-mask-b.svg",
                  maskPosition: "24.107px 56.382px",
                  maskSize: "175.32px 171.873px",
                  src: "/figma/glass2-shine-b.svg",
                },
              ]}
            />
          </FlyIn>

          {/* Tilted  off the right edge  */}
          <FlyIn x={309.16} y={-37.25} r={25.16} origin={[275.5, 355.92]}>
            <ChatBubble
              tail="right"
              className="!absolute left-[209px] top-[334.12px]"
            >
              Some people just make sense
            </ChatBubble>
          </FlyIn>
        </div>
      </div>

      {/* Peach + pink glow rising from the bottom edge */}
      <img
        src="/figma/bottom-glow.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[calc(50%-0.5px)] top-[681px] block h-[472px] w-[737.391px] max-w-none -translate-x-1/2"
      />

      {/* Copy rises in from below the fold at , then fades out
          as it drifts on the way  */}
      <div
        className="sd-enter-people absolute inset-0"
        style={{ "--ey": "-642px", "--eo": "0" } as CSSProperties}
      >
        <div
          className="sd-exit-people absolute inset-0"
          style={{ "--xy": "532px", "--xo": "0" } as CSSProperties}
        >
          <div className="absolute left-1/2 top-[658px] flex w-[380px] -translate-x-1/2 flex-col items-center gap-[16px] text-center text-ink">
            <h2
              className="w-[274px] font-display text-[40px] font-extrabold leading-[0.95] tracking-[-0.8px] [font-stretch:85%] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]"
              style={{ fontVariationSettings: '"opsz" 69' }}
            >
              Dating just got an major update!
            </h2>
            <p className="w-[330px] font-sans text-[16px] font-medium leading-[1.3] tracking-[-0.16px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
              Rivet is modern dating app that making the dating a social
              activity. Rivet is modern dating app that making the dating a
              social activity.
            </p>
          </div>
        </div>
      </div>

      <ScrollIndicator href="#why-rivet" />
    </section>
  );
}
