import Image from "next/image";
import type { CSSProperties } from "react";

// fading from hot pink into white.
const heroBackground =
  "radial-gradient(1943px 746.5px at 215px -772.5px, #ff1bb8 0%, #fc3cc0 4.639%, #f95cc8 9.278%, #f67dd0 13.917%, #f39dd8 18.556%, #f7c5e7 25.982%, #faedf6 33.408%, #ffffff 46.099%)";

const splashBackground =
  "linear-gradient(180deg, rgba(250,207,169,0) 57.672%, rgba(253,167,189,0.5) 74.146%, #ff1bb8 100%), #facfa9";

type Pose = { x: number; y: number; r: number };

type PhotoCardProps = {
  src: string;
  // Axis-aligned bounding box of the rotated card.
  box: { left: number; top: number; width: number; height: number };
  card: { width: number; height: number; rotate: number };
  // Offset from the resting pose in the splash frame.
  intro: Pose;
  exit: Pose;
  priority?: boolean;
};

function PhotoCard({ src, box, card, intro, exit, priority }: PhotoCardProps) {
  return (
    <div
      className="sd-exit-hero absolute"
      style={
        {
          ...box,
          "--xx": `${exit.x}px`,
          "--xy": `${exit.y}px`,
          "--xr": `${exit.r}deg`,
        } as CSSProperties
      }
    >
      <div
        className="intro absolute inset-0 flex items-center justify-center"
        style={
          {
            "--ix": `${intro.x}px`,
            "--iy": `${intro.y}px`,
            "--ir": `${intro.r}deg`,
          } as CSSProperties
        }
      >
        <div
          className="flex-none"
          style={{ transform: `rotate(${card.rotate}deg)` }}
        >
          <div
            className="relative overflow-hidden rounded-[15px] bg-[#d9d9d9] shadow-[0px_4px_54px_0px_rgba(0,0,0,0.25)]"
            style={{ width: card.width, height: card.height }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes={`${Math.ceil(card.width)}px`}
              priority={priority}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      className="timeline-hero relative h-[932px] w-full overflow-clip"
      style={{ backgroundImage: heroBackground }}
    >
      {/* Splash background crossfades into the hero gradient */}
      <div
        aria-hidden
        className="intro-fade-out absolute inset-0"
        style={{ background: splashBackground }}
      />

      {/* Soft white glow at the top edge (sits lower on the splash) */}
      <div
        aria-hidden
        className="intro pointer-events-none absolute inset-0"
        style={{ "--iy": "570px" } as CSSProperties}
      >
        <img
          src="/figma/top-glow.svg"
          alt=""
          className="absolute left-[-695px] top-[-878px] block h-[928px] w-[1834px] max-w-none"
        />
      </div>

      <PhotoCard
        src="/figma/image-01.png"
        box={{ left: 294.32, top: 633.47, width: 176.654, height: 237.711 }}
        card={{ width: 150.912, height: 221.008, rotate: 6.98 }}
        intro={{ x: 579.99, y: 40, r: -31.31 }}
        exit={{ x: 580, y: 532, r: -31.31 }}
      />
      <PhotoCard
        src="/figma/image-02.png"
        box={{ left: -17.79, top: 121.02, width: 197.023, height: 254.619 }}
        card={{ width: 156.461, height: 229.135, rotate: 10.92 }}
        intro={{ x: -329.99, y: -110, r: -26.82 }}
        exit={{ x: -330, y: 382, r: -26.82 }}
        priority
      />

      {/* Headline: double size below the fold on the splash; lags behind as the hero scrolls away */}
      <div
        className="sd-exit-hero absolute inset-0"
        style={{ "--xy": "208px" } as CSSProperties}
      >
        <div
          className="intro absolute inset-0 origin-[214.5px_344px]"
          style={{ "--iy": "693px", "--is": "1.982" } as CSSProperties}
        >
          <h1 className="absolute left-[calc(50%-0.5px)] top-[calc(50%-121.98px)] w-[357px] -translate-x-1/2 text-center font-display text-[64px] font-extrabold leading-[0.95] tracking-[-1.28px] text-ink [font-stretch:85%] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
            Better <span className="text-pink">introductions,</span> brought to
            you by <span className="text-pink">people</span>
          </h1>
        </div>
      </div>

      <PhotoCard
        src="/figma/image-04.png"
        box={{ left: 278.64, top: 171.82, width: 200.011, height: 251.012 }}
        card={{ width: 150.912, height: 221.008, rotate: -14.04 }}
        intro={{ x: 340, y: 40, r: 34.2 }}
        exit={{ x: 340, y: 532, r: 34.2 }}
        priority
      />
      <PhotoCard
        src="/figma/image-03.png"
        box={{ left: -24.82, top: 716.36, width: 179.094, height: 243.947 }}
        card={{ width: 156.461, height: 229.135, rotate: -5.88 }}
        intro={{ x: -290, y: 180, r: 26.62 }}
        exit={{ x: -290, y: 672, r: 26.62 }}
      />

      <div
        className="sd-exit-hero absolute inset-0"
        style={{ "--xy": "702px", "--xo": "0" } as CSSProperties}
      >
        <div
          className="intro absolute inset-0"
          style={{ "--iy": "590px" } as CSSProperties}
        >
          <a
            href="#download"
            className="absolute left-[calc(50%-0.5px)] top-[619px] flex h-[73px] w-[229px] -translate-x-1/2 items-center justify-center gap-[12px] rounded-[22px] bg-ink p-[36px]"
          >
            <span className="whitespace-nowrap font-sans text-[16px] font-medium leading-normal tracking-[-0.32px] text-[#f5f6f7] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
              Download Rivet
            </span>
            <span className="relative h-[19.221px] w-[49.348px] shrink-0">
              <img
                src="/figma/store-icons.svg"
                alt="Google Play and App Store"
                className="absolute left-0 top-[-2.92px] block h-[22.142px] w-[49.348px] max-w-none"
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
