import type { CSSProperties } from "react";

const LOGO_SPLASH_SCALE = 4.372;
const LOGO_W = 76 * LOGO_SPLASH_SCALE;
const LOGO_H = 28 * LOGO_SPLASH_SCALE;

export function SiteHeader() {
  return (
    <header className="fixed left-1/2 top-0 z-20 h-[107px] w-full max-w-[430px] -translate-x-1/2">
      {/* Frosted header strip — absent on the splash, fades in with the intro */}
      <div
        aria-hidden
        className="intro-fade-in absolute inset-0 bg-gradient-to-b from-[rgba(153,153,153,0.4)] to-[rgba(255,255,255,0)] backdrop-blur-[22px]"
      />

      <button
        type="button"
        aria-label="Open menu"
        className="intro absolute left-[12px] top-[29.5px] flex h-[56px] w-[62px] items-center justify-center rounded-[14px] bg-white px-[20px] py-[18px] drop-shadow-[0px_12px_6px_rgba(0,0,0,0.04)]"
        style={{ "--ix": "-140px" } as CSSProperties}
      >
        <span className="relative h-[14px] w-[19px] shrink-0">
          <img
            src="/figma/menu.svg"
            alt=""
            className="absolute left-[-1px] top-[-1px] block h-[16px] w-[21px] max-w-none"
          />
        </span>
      </button>

      <div
        className="intro absolute left-[172.78px] top-[43.64px] origin-top-left"
        style={
          {
            width: LOGO_W,
            height: LOGO_H,
            scale: 1 / LOGO_SPLASH_SCALE,
            "--ix": "-123.43px",
            "--iy": "361.35px",
            "--is": "1",
          } as CSSProperties
        }
      >
        <img
          src="/figma/rivet-logo.svg"
          alt="Rivet"
          className="absolute inset-0 block size-full transition-[filter] duration-[1900ms] ease-rivet motion-reduce:duration-0 [html[data-header-theme=dark]_&]:invert"
        />
        <img
          src="/figma/rivet-logo-pink.svg"
          alt=""
          aria-hidden
          className="intro-fade-out absolute inset-0 block size-full"
        />
      </div>

      <a
        href="#download"
        aria-label="Download on Google Play or the App Store"
        className="intro absolute left-[349px] top-[29.5px] h-[56px] w-[69px]"
        style={{ "--ix": "110px" } as CSSProperties}
      >
        <img
          src="/figma/right-icon.svg"
          alt=""
          className="absolute left-[-12px] top-0 block h-[80px] w-[93px] max-w-none"
        />
      </a>
    </header>
  );
}
