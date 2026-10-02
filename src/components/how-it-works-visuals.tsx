import type { CSSProperties, ReactNode } from "react";
import { ChatBubble } from "./chat-bubble";
import { GlassAvatar } from "./glass-avatar";

type Box = { left: number; top: number; width: number; height: number };

/** Rotated child centred inside its axis-aligned bounding box */
function Rotated({
  box,
  rotate,
  children,
}: {
  box: Box;
  rotate: number;
  children: ReactNode;
}) {
  return (
    <div className="absolute flex items-center justify-center" style={box}>
      <div className="flex-none" style={{ rotate: `${rotate}deg` }}>
        {children}
      </div>
    </div>
  );
}

function Img({
  src,
  style,
  className = "",
}: {
  src: string;
  style: CSSProperties;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt=""
      className={`pointer-events-none absolute block max-w-none ${className}`}
      style={style}
    />
  );
}

/** A balloon / sticker image of a fixed size, rotated in its bounding box. */
function Sticker({
  src,
  box,
  rotate,
  width,
  height,
}: {
  src: string;
  box: Box;
  rotate: number;
  width: number;
  height: number;
}) {
  return (
    <Rotated box={box} rotate={rotate}>
      <div className="relative" style={{ width, height }}>
        <Img src={src} className="inset-0 size-full object-cover" style={{}} />
      </div>
    </Rotated>
  );
}

// Voice-note waveform bars: [inset, bright]. Dim bars are the unplayed part.
const WAVE_BARS: [string, boolean][] = [
  ["39.81% 78.65% 42.04% 18.9%", true],
  ["39.81% 53.97% 42.04% 43.59%", true],
  ["39.81% 42.83% 42.04% 54.72%", false],
  ["39.81% 20.62% 42.04% 76.93%", false],
  ["28.95% 74.92% 25.68% 22.64%", true],
  ["28.95% 50.29% 25.68% 47.26%", true],
  ["28.95% 39.51% 25.68% 58.04%", false],
  ["28.95% 16.64% 25.68% 80.92%", false],
  ["3.62% 70.51% 5.63% 27.04%", true],
  ["3.62% 35.3% 5.63% 62.26%", false],
  ["3.62% 12.35% 5.63% 85.2%", false],
  ["18.09% 93.73% 18.38% 3.82%", true],
  ["36.19% 89.96% 36.59% 7.59%", true],
  ["36.19% 66.09% 36.59% 31.46%", true],
  ["36.19% 46.47% 36.59% 51.08%", false],
  ["36.19% 8.03% 36.59% 89.52%", false],
  ["39.81% 97.55% 42.04% 0", true],
  ["39.81% 82.62% 42.04% 14.94%", true],
  ["39.81% 58.02% 42.04% 39.54%", true],
  ["39.81% 31.79% 42.04% 65.76%", false],
  ["39.81% 24.34% 42.04% 73.21%", false],
  ["39.81% 0 42.04% 97.55%", false],
  ["18.09% 86.29% 18.38% 11.26%", true],
  ["18.09% 61.69% 18.38% 35.86%", true],
  ["18.09% 28.24% 18.38% 69.31%", false],
  ["18.09% 3.83% 18.38% 93.72%", false],
];

function VoiceNote() {
  return (
    <Rotated
      box={{ left: -31.2, top: 214.14, width: 144.664, height: 63.361 }}
      rotate={-7.11}
    >
      <div className="relative h-[46.4px] w-[140px] overflow-clip rounded-[20px] bg-[#1f1f1f]">
        <div className="absolute left-[6.3px] top-[calc(50%+0.36px)] h-[32px] w-[88px] -translate-y-1/2 overflow-clip rounded-[0.752px] mix-blend-plus-lighter">
          <div className="absolute left-[calc(50%+0.16px)] top-[calc(50%-0.15px)] h-[22.107px] w-[81.929px] -translate-x-1/2 -translate-y-1/2">
            {WAVE_BARS.map(([inset, bright], i) => (
              <div
                key={i}
                className={`absolute rounded-[53.413px] shadow-[inset_0px_0.602px_1.204px_0.188px_rgba(0,0,0,0.45)] ${
                  bright ? "bg-[#f5f6f7]" : "bg-[rgba(245,246,247,0.34)]"
                }`}
                style={{ inset }}
              />
            ))}
          </div>
        </div>
        <div className="absolute right-[4.8px] top-1/2 size-[36.8px] -translate-y-1/2 rounded-[14px] bg-pink">
          <div className="absolute left-[calc(50%+0.14px)] top-[calc(50%+0.38px)] size-[24.426px] -translate-x-1/2 -translate-y-1/2 overflow-clip mix-blend-plus-lighter">
            <Img
              src="/figma/hiw-mic.svg"
              className="left-[calc(50%+0.35px)] top-1/2 size-[22.332px] -translate-x-1/2 -translate-y-1/2"
              style={{}}
            />
          </div>
        </div>
      </div>
    </Rotated>
  );
}

/** Prompt bubbles on the profile card (Inter Tight, slightly different from the chat bubbles). */
function PromptBubble({
  variant,
  children,
}: {
  variant: "pink" | "white";
  children: ReactNode;
}) {
  const pink = variant === "pink";
  return (
    <div
      className={`relative rounded-[17.682px] drop-shadow-[0px_2.991px_16.452px_rgba(0,0,0,0.35)] ${
        pink
          ? "h-[28.834px] w-[106.802px] bg-pink"
          : "h-[35.011px] w-[100.943px] bg-white"
      }`}
    >
      {pink ? (
        <Img
          src="/figma/hiw-tail-pink.svg"
          className="right-[19.72px] top-[20.5px] h-[17.93px] w-[15.56px] -scale-x-100"
          style={{}}
        />
      ) : (
        <Img
          src="/figma/hiw-tail-white.svg"
          className="left-[22.53px] top-[25.92px] h-[17.93px] w-[15.56px]"
          style={{}}
        />
      )}
      <p
        className={`absolute font-sans text-[10.26px] font-medium leading-[11.67px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] ${
          pink
            ? "left-[calc(50%-39.37px)] top-[calc(50%-3.68px)] w-[78.07px] text-white"
            : "left-[10.34px] top-[calc(50%-10.37px)] w-[83.433px] text-[#fc1bb6]"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

export function ProfileVisual() {
  return (
    <div className="relative h-[302.4px] w-[244px] shrink-0">
      <Img
        src="/figma/hiw-profile-photo.png"
        style={{ left: 8.6, top: 13.6, width: 229.755, height: 275.544 }}
      />

      {/* Bio card ("Senior Retoucher at DigitalHorizon") with its stacked shadow layer */}
      <div className="absolute left-[133.98px] top-[189.02px] h-[126.979px] w-[137.894px] drop-shadow-[7.065px_10.598px_8.478px_rgba(0,0,0,0.15)]">
        <Img
          src="/figma/hiw-bio-shadow.svg"
          style={{ left: 1.78, top: 4.46, width: 135.01, height: 121.49 }}
        />
        <Img
          src="/figma/hiw-bio-card.png"
          style={{ left: 1.78, top: 0, width: 135.02, height: 121.493 }}
        />
      </div>

      <Rotated
        box={{ left: -6.11, top: 37.14, width: 83.762, height: 30.627 }}
        rotate={0.16}
      >
        <div className="relative flex items-center gap-[3.2px] overflow-clip rounded-[36.436px] bg-pink px-[16px] py-[9.6px] shadow-[0px_0px_3.644px_0px_rgba(255,255,255,0.65)] backdrop-blur-[16.396px]">
          <img
            src="/figma/hiw-verified.svg"
            alt=""
            className="block h-[11.2px] w-[11.68px] shrink-0"
          />
          <span className="whitespace-nowrap font-sans text-[11.2px] font-medium leading-[1.25] text-white [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
            verified
          </span>
        </div>
      </Rotated>

      <VoiceNote />

      <Rotated
        box={{ left: 146.4, top: -17.87, width: 109.39, height: 40.805 }}
        rotate={6.54}
      >
        <PromptBubble variant="pink">Favourite thing...</PromptBubble>
      </Rotated>
      <Rotated
        box={{ left: 165.57, top: 27.33, width: 103.772, height: 44.288 }}
        rotate={-5.36}
      >
        <PromptBubble variant="white">
          Walk with my dog in the morning
        </PromptBubble>
      </Rotated>
    </div>
  );
}

/** The chat bubble from the people section, at the 0.8 scale used in the carousel. */
function SmallChatBubble({
  tail,
  color,
  box,
  rotate,
}: {
  tail: "left" | "right";
  color: "blue" | "pink";
  box: Box;
  rotate: number;
}) {
  return (
    <Rotated box={box} rotate={rotate}>
      <div className="relative h-[34.879px] w-[106.4px]">
        <div className="absolute left-0 top-0 origin-top-left scale-[0.8]">
          <ChatBubble tail={tail} color={color}>
            Some people just make sense
          </ChatBubble>
        </div>
      </div>
    </Rotated>
  );
}

export function CoupleVisual() {
  return (
    <div className="relative h-[302.4px] w-[244px] shrink-0">
      <Img
        src="/figma/hiw-couple-card.png"
        style={{ left: -1.75, top: 1, width: 256.331, height: 302.19 }}
      />

      {/* Heads popping out above the card, cut from the shared sprite */}
      <div className="absolute left-[38.4px] top-[-35.6px] h-[176px] w-[178.739px] overflow-hidden">
        <Img
          src="/figma/hiw-couple-heads.png"
          style={{
            left: "-93.26%",
            top: "-8.95%",
            width: "320.48%",
            height: "181.58%",
          }}
        />
      </div>

      {/* Balloons: silver X (nested rotations as in Figma) and pink heart */}
      <Rotated
        box={{ left: 118.72, top: 182.55, width: 137.36, height: 138.423 }}
        rotate={5.5}
      >
        <div className="relative h-[126.946px] w-[125.764px]">
          <Sticker
            src="/figma/hiw-x.png"
            box={{ left: -63.73, top: 6.14, width: 125.661, height: 127.052 }}
            rotate={9.62}
            width={108.733}
            height={110.432}
          />
        </div>
      </Rotated>
      <Rotated
        box={{ left: -33.22, top: 162.94, width: 145.824, height: 152.364 }}
        rotate={-13.3}
      >
        <div className="relative h-[128.317px] w-[119.518px]">
          <Sticker
            src="/figma/hiw-heart.png"
            box={{ left: 0, top: 0, width: 136.294, height: 137.518 }}
            rotate={-15.03}
            width={110.88}
            height={112.612}
          />
        </div>
      </Rotated>

      <GlassAvatar
        photo="/figma/avatar-2.png"
        box={{ left: 220.18, top: 177.16, size: 81.131 }}
        rotate={-13.11}
        size={67.565}
        photoSize={67.879}
        photoOffset={-0.16}
        shadow="inset 6.11px 3.594px 15.813px 0px white, inset -2.875px -2.875px 11.5px 0px rgba(0,0,0,0.58)"
        highlights={[
          "/figma/hiw-glass-s-hl-a.svg",
          "/figma/hiw-glass-s-hl-b.svg",
        ]}
        shines={[
          {
            wrap: { left: -2.58, top: -2.53, width: 68.363, height: 75.712 },
            width: 61.805,
            height: 47.137,
            rotate: -65.75,
            opacity: 0.5,
            mask: "/figma/hiw-glass-s-mask-a.svg",
            maskPosition: "1.184px -3.869px",
            maskSize: "141.254px 138.605px",
            src: "/figma/hiw-glass-s-shine-a.svg",
          },
          {
            wrap: { left: 2.17, top: -0.49, width: 68.363, height: 75.712 },
            width: 61.805,
            height: 47.137,
            rotate: 114.25,
            mask: "/figma/hiw-glass-s-mask-b.svg",
            maskPosition: "24.107px 56.382px",
            maskSize: "175.32px 171.873px",
            src: "/figma/hiw-glass-s-shine-b.svg",
          },
        ]}
      />
      <SmallChatBubble
        tail="right"
        color="pink"
        box={{ left: 188.27, top: 114.32, width: 111.459, height: 57.366 }}
        rotate={12.67}
      />

      <GlassAvatar
        photo="/figma/avatar-1.png"
        box={{ left: -32, top: -5.5, size: 95.56 }}
        rotate={-11.97}
        size={80.599}
        photoSize={80.974}
        photoOffset={-0.19}
        shadow="inset 7.288px 4.287px 18.864px 0px white, inset -3.43px -3.43px 13.719px 0px rgba(0,0,0,0.58)"
        highlights={[
          "/figma/hiw-glass-l-hl-a.svg",
          "/figma/hiw-glass-l-hl-b.svg",
        ]}
        shines={[
          {
            wrap: { left: -3.67, top: -3.6, width: 81.551, height: 90.318 },
            width: 73.728,
            height: 56.23,
            rotate: -65.75,
            opacity: 0.5,
            mask: "/figma/hiw-glass-l-mask-a.svg",
            maskPosition: "1.184px -3.869px",
            maskSize: "141.254px 138.605px",
            src: "/figma/hiw-glass-l-shine-a.svg",
          },
          {
            wrap: { left: 3.09, top: -0.7, width: 81.551, height: 90.318 },
            width: 73.728,
            height: 56.23,
            rotate: 114.25,
            mask: "/figma/hiw-glass-l-mask-b.svg",
            maskPosition: "24.107px 56.382px",
            maskSize: "175.32px 171.873px",
            src: "/figma/hiw-glass-l-shine-b.svg",
          },
        ]}
      />
      <SmallChatBubble
        tail="left"
        color="blue"
        box={{ left: 22.18, top: -59.61, width: 111.788, height: 61.014 }}
        rotate={-14.87}
      />
    </div>
  );
}

export function MatchVisual() {
  return (
    <div className="relative h-[302.4px] w-[244px] shrink-0">
      <Sticker
        src="/figma/hiw-match-heart-silver.png"
        box={{ left: 181.68, top: 200.37, width: 107.404, height: 108.291 }}
        rotate={17.05}
        width={85.661}
        height={86.999}
      />
      {/* "Its Riveting Match" phone: glow plate behind, card in front */}
      <Img
        src="/figma/hiw-match-back.png"
        style={{ left: 17.57, top: -20.8, width: 208.895, height: 344 }}
      />
      <Img
        src="/figma/hiw-match-front.png"
        style={{ left: -0.86, top: -31.985, width: 245.382, height: 337.13 }}
      />
      <Sticker
        src="/figma/hiw-match-heart-lg.png"
        box={{ left: -118.1, top: 100.46, width: 153.847, height: 155.118 }}
        rotate={17.05}
        width={122.703}
        height={124.62}
      />
      <Sticker
        src="/figma/hiw-match-heart-pink.png"
        box={{ left: -32.79, top: 253.04, width: 78.412, height: 79.14 }}
        rotate={-14.19}
        width={64.352}
        height={65.358}
      />
      <Sticker
        src="/figma/hiw-match-heart-pink.png"
        box={{ left: 171.03, top: 290.81, width: 137.475, height: 138.165 }}
        rotate={-27.11}
        width={101.61}
        height={103.198}
      />
    </div>
  );
}
