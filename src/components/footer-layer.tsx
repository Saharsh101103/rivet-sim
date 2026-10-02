import type { CSSProperties } from "react";
import { GlassAvatar, type GlassAvatarProps } from "./glass-avatar";

/* Dark footer revealed under the white closing panel  */

type Kit = Pick<
  GlassAvatarProps,
  "size" | "photoSize" | "photoOffset" | "shadow" | "dropShadow"
> & {
  shineA: {
    left: number;
    top: number;
    width: number;
    height: number;
    w: number;
    h: number;
  };
  shineB: { left: number; top: number; width: number; height: number };
};

// Glass geometry per bubble size, verbatim from the Figma export.
const KITS: Record<string, Kit> = {
  g89: {
    size: 89.418,
    photoSize: 89.833,
    photoOffset: -0.21,
    shadow:
      "inset 8.086px 4.756px 20.928px 0px white, inset -3.805px -3.805px 15.22px 0px rgba(0,0,0,0.58)",
    dropShadow: "drop-shadow(0px 6.659px 3.329px rgba(0,0,0,0.25))",
    shineA: {
      left: 2.25,
      top: 11.5,
      width: 89.805,
      height: 71.723,
      w: 84.226,
      h: 64.207,
    },
    shineB: { left: -6.22, top: -5.41, width: 93.136, height: 103.166 },
  },
  g72: {
    size: 71.694,
    photoSize: 72.027,
    photoOffset: -0.17,
    shadow:
      "inset 6.483px 3.814px 16.779px 0px white, inset -3.051px -3.051px 12.203px 0px rgba(0,0,0,0.58)",
    dropShadow: "drop-shadow(0px 5.339px 2.669px rgba(0,0,0,0.25))",
    shineA: {
      left: 1.45,
      top: 7.39,
      width: 72.004,
      height: 57.507,
      w: 67.532,
      h: 51.481,
    },
    shineB: { left: -4, top: -3.48, width: 74.675, height: 82.717 },
  },
  g79: {
    size: 79.261,
    photoSize: 79.629,
    photoOffset: -0.18,
    shadow:
      "inset 7.167px 4.216px 18.55px 0px white, inset -3.373px -3.373px 13.491px 0px rgba(0,0,0,0.58)",
    dropShadow: "drop-shadow(0px 5.902px 2.951px rgba(0,0,0,0.25))",
    shineA: {
      left: 1.77,
      top: 9.04,
      width: 79.604,
      height: 63.577,
      w: 74.659,
      h: 56.914,
    },
    shineB: { left: -4.89, top: -4.25, width: 82.557, height: 91.447 },
  },
  g101: {
    size: 100.749,
    photoSize: 101.217,
    photoOffset: -0.23,
    shadow:
      "inset 9.11px 5.359px 23.58px 0px white, inset -4.287px -4.287px 17.149px 0px rgba(0,0,0,0.58)",
    dropShadow: "drop-shadow(0px 7.503px 3.751px rgba(0,0,0,0.25))",
    shineA: {
      left: 2.86,
      top: 14.6,
      width: 101.185,
      height: 80.813,
      w: 94.9,
      h: 72.344,
    },
    shineB: { left: -7.9, top: -6.86, width: 104.938, height: 116.24 },
  },
  g84: {
    size: 84.457,
    photoSize: 84.849,
    photoOffset: -0.2,
    shadow:
      "inset 7.637px 4.492px 19.766px 0px white, inset -3.594px -3.594px 14.376px 0px rgba(0,0,0,0.58)",
    dropShadow: "drop-shadow(0px 6.289px 3.145px rgba(0,0,0,0.25))",
    shineA: {
      left: 2.01,
      top: 10.26,
      width: 84.822,
      height: 67.744,
      w: 79.553,
      h: 60.645,
    },
    shineB: { left: -5.55, top: -4.82, width: 87.968, height: 97.442 },
  },
};

type FooterAvatar = {
  kit: keyof typeof KITS;
  photo: string;
  photoCrop?: CSSProperties;
  hlB?: string; // some bubbles reuse a kit with a different lower highlight
  box: { left: number; top: number; size: number };
  rotate: number;
  // Figma motion -> start offset relative to the resting pose, staggered spring.
  drop: { x: number; y: number; r: number; delay: number; duration: number };
};

const AVATARS: FooterAvatar[] = [
  {
    kit: "g89",
    photo: "/figma/ft-avatar-a.png",
    box: { left: 192.87, top: 842.39, size: 89.418 },
    rotate: 0,
    drop: { x: 0, y: -447.089, r: 0, delay: 0, duration: 1.2066 },
  },
  {
    kit: "g72",
    photo: "/figma/ft-avatar-b.png",
    box: { left: 350, top: 810.56, size: 88.167 },
    rotate: -15.41,
    drop: {
      x: -35.905,
      y: -478.219,
      r: 51.098,
      delay: 0.1316,
      duration: 1.075,
    },
  },
  {
    kit: "g79",
    photo: "/figma/ft-avatar-c.png",
    box: { left: -0.77, top: 777.95, size: 79.261 },
    rotate: 0,
    drop: { x: 30, y: -467.949, r: -46.238, delay: 0.166, duration: 1.0406 },
  },
  {
    kit: "g79",
    photo: "/figma/avatar-4.png",
    hlB: "/figma/ft-g79-hl-b2.svg",
    box: { left: 237.59, top: 770, size: 95.315 },
    rotate: -13.25,
    drop: { x: 2.292, y: -467.683, r: 0, delay: 0.1316, duration: 1.075 },
  },
  {
    kit: "g72",
    photo: "/figma/avatar-3.png",
    hlB: "/figma/ft-g72-hl-b2.svg",
    photoCrop: {
      left: "-13.13%",
      top: "-18.82%",
      width: "126.54%",
      height: "156.32%",
    },
    box: { left: 128.98, top: 790.31, size: 91.208 },
    rotate: 19.1,
    drop: { x: -3.272, y: -467.399, r: 0, delay: 0.1, duration: 1.1066 },
  },
  {
    kit: "g101",
    photo: "/figma/avatar-1.png",
    box: { left: 42.11, top: 821.87, size: 119.45 },
    rotate: -11.97,
    drop: { x: 2.073, y: -512.872, r: 21.031, delay: 0.077, duration: 1.1296 },
  },
  {
    kit: "g84",
    photo: "/figma/avatar-2.png",
    box: { left: 268.82, top: 834.29, size: 111.163 },
    rotate: 23.54,
    drop: {
      x: 0.294,
      y: -504.175,
      r: -50.231,
      delay: 0.0214,
      duration: 1.1852,
    },
  },
];

// The avatars start falling once the white panel has mostly lifted.
const DROP_START = 0.8;

function FooterGlassAvatar({
  avatar,
  active,
}: {
  avatar: FooterAvatar;
  active: boolean;
}) {
  const kit = KITS[avatar.kit];
  const assets = `/figma/ft-${avatar.kit}`;
  const { drop, box } = avatar;
  return (
    <div
      className="avatar-drop absolute"
      data-active={active}
      style={
        {
          left: box.left,
          top: box.top,
          width: box.size,
          height: box.size,
          "--drop-x": `${drop.x}px`,
          "--drop-y": `${drop.y}px`,
          "--drop-r": `${drop.r}deg`,
          "--drop-delay": `${DROP_START + drop.delay}s`,
          "--drop-duration": `${drop.duration}s`,
        } as CSSProperties
      }
    >
      <GlassAvatar
        photo={avatar.photo}
        photoCrop={avatar.photoCrop}
        size={kit.size}
        photoSize={kit.photoSize}
        photoOffset={kit.photoOffset}
        shadow={kit.shadow}
        dropShadow={kit.dropShadow}
        tint="rgba(128,4,70,0.24)"
        box={{ left: 0, top: 0, size: box.size }}
        rotate={avatar.rotate}
        highlights={[`${assets}-hl-a.svg`, avatar.hlB ?? `${assets}-hl-b.svg`]}
        highlightInsets={[
          "0 0 -14.62% -13.37%",
          "-5.41% -10.26% -22.51% -19.03%",
        ]}
        shines={[
          {
            wrap: {
              left: kit.shineA.left,
              top: kit.shineA.top,
              width: kit.shineA.width,
              height: kit.shineA.height,
            },
            width: kit.shineA.w,
            height: kit.shineA.h,
            rotate: -5.31,
            flip: false,
            mask: `${assets}-mask-a.svg`,
            maskPosition: "40.006px 61.625px",
            maskSize: "166.523px 120.953px",
            src: `${assets}-shine-a.svg`,
          },
          {
            wrap: kit.shineB,
            width: kit.shineA.w,
            height: kit.shineA.h,
            rotate: -65.75,
            mask: `${assets}-mask-b.svg`,
            maskPosition: "-5.628px -18.322px",
            maskSize: "148.002px 145.422px",
            src: `${assets}-shine-b.svg`,
          },
        ]}
      />
    </div>
  );
}

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/rivet.dating",
    box: 19.447,
    icon: "/figma/ft-instagram.svg",
    inset: "0",
  },
  {
    label: "YouTube",
    href: "#",
    box: 22.029,
    icon: "/figma/ft-youtube.svg",
    inset: "15.37% 0.66% 15.48% 0.55%",
  },
  {
    label: "TikTok",
    href: "#",
    box: 19.447,
    icon: "/figma/ft-tiktok.svg",
    inset: "0.55% 0.67% 0.66% 0.55%",
  },
];

export function FooterLayer({ revealed }: { revealed: boolean }) {
  return (
    <footer
      className="absolute inset-0 overflow-clip bg-[#1f0012]"
      // Pink radial glow from the frame fill, rendered at 60% over the plum base.
      style={{
        backgroundImage:
          "radial-gradient(749.42px 932px at 215px 0px, rgba(174,0,91,0) 59.978%, rgba(230,19,155,0.69) 89.708%, #ff1bb8 100%)",
        backgroundBlendMode: "normal",
      }}
    >
      <div aria-hidden className="absolute inset-0 bg-[#1f0012] opacity-40" />

      <img
        src="/figma/footer-wordmark.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-0 top-[506px] block h-[183px] w-[430px] max-w-none mix-blend-overlay"
      />

      <div className="absolute left-[calc(50%-0.5px)] top-[708px] flex w-[145px] -translate-x-1/2 flex-col items-center gap-[7px] opacity-80">
        {["Meant2be, Inc. ©2026", "Made with love in New York & India"].map(
          (line) => (
            <p
              key={line}
              className="whitespace-nowrap text-center font-sans text-[14px] font-medium leading-[1.2] text-white [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]"
            >
              {line}
            </p>
          ),
        )}
      </div>

      <div className="absolute left-[calc(50%+0.46px)] top-[753px] flex -translate-x-1/2 items-center gap-[9px]">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            className="relative shrink-0"
            style={{ width: s.box, height: s.box }}
          >
            <span className="absolute" style={{ inset: s.inset }}>
              <img src={s.icon} alt="" className="block size-full max-w-none" />
            </span>
          </a>
        ))}
      </div>

      {AVATARS.map((avatar, i) => (
        <FooterGlassAvatar key={i} avatar={avatar} active={revealed} />
      ))}
    </footer>
  );
}
