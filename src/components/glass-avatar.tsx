import type { CSSProperties } from "react";

type Box = { left: number; top: number; width: number; height: number };

type Shine = {
  // Unrotated wrapper box, relative to the bubble.
  wrap: Box;
  // Rotated, masked shine shape.
  width: number;
  height: number;
  rotate: number;
  // Most shines are mirrored vertically in Figma; the footer variant's first one is not.
  flip?: boolean;
  opacity?: number;
  mask: string;
  maskPosition: string;
  maskSize: string;
  src: string;
};

export type GlassAvatarProps = {
  photo: string;
  size: number;
  // Photo is ~0.5% larger than the bubble and nudged up-left, as in Figma.
  photoSize: number;
  photoOffset: number;
  // Optional manual crop of the photo (Figma image fill offsets); defaults to object-cover.
  photoCrop?: CSSProperties;
  shadow: string;
  highlights: [string, string];
  // Footer variant: highlight artwork bleeds past its frame by these insets.
  highlightInsets?: [string, string];
  shines: [Shine, Shine];
  // Glass tint over the photo (white by default, magenta in the footer).
  tint?: string;
  dropShadow?: string;
  // Axis-aligned bounding box of the rotated bubble.
  box: { left: number; top: number; size: number };
  rotate: number;
};

function ShineLayer({ shine }: { shine: Shine }) {
  const style: CSSProperties = {
    width: shine.width,
    height: shine.height,
    opacity: shine.opacity,
    maskImage: `url("${shine.mask}")`,
    maskMode: "alpha",
    maskComposite: "intersect",
    maskClip: "no-clip",
    maskRepeat: "no-repeat",
    maskPosition: shine.maskPosition,
    maskSize: shine.maskSize,
  };
  return (
    <div
      className="absolute flex items-center justify-center mix-blend-plus-lighter"
      style={{
        left: shine.wrap.left,
        top: shine.wrap.top,
        width: shine.wrap.width,
        height: shine.wrap.height,
      }}
    >
      <div
        className="flex-none"
        style={{
          rotate: `${shine.rotate}deg`,
          scale: shine.flip === false ? undefined : "1 -1",
        }}
      >
        <div className="relative" style={style}>
          <img
            src={shine.src}
            alt=""
            className="absolute inset-0 block size-full max-w-none"
          />
        </div>
      </div>
    </div>
  );
}

/** Circular profile photo behind a glossy glass lens. */
export function GlassAvatar({
  photo,
  size,
  photoSize,
  photoOffset,
  photoCrop,
  shadow,
  highlights,
  highlightInsets,
  shines,
  tint = "rgba(255,255,255,0.12)",
  dropShadow,
  box,
  rotate,
}: GlassAvatarProps) {
  const photoBox: CSSProperties = {
    width: photoSize,
    height: photoSize,
    left: `calc(50% + ${photoOffset}px)`,
    top: `calc(50% + ${photoOffset}px)`,
  };

  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        left: box.left,
        top: box.top,
        width: box.size,
        height: box.size,
      }}
    >
      <div
        className="flex-none"
        style={{ rotate: `${rotate}deg`, filter: dropShadow }}
      >
        <div
          className="relative overflow-clip rounded-full bg-white"
          style={{ width: size, height: size }}
        >
          {photoCrop ? (
            <div
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 overflow-hidden"
              style={photoBox}
            >
              <img
                src={photo}
                alt=""
                className="absolute max-w-none"
                style={photoCrop}
              />
            </div>
          ) : (
            <img
              src={photo}
              alt=""
              className="pointer-events-none absolute max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
              style={photoBox}
            />
          )}

          <div className="absolute inset-0 overflow-clip rounded-full">
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{ background: tint }}
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{ boxShadow: shadow }}
            />

            <div
              className="absolute inset-[-12.36%_-6.84%_49.59%_27.04%] flex items-center justify-center mix-blend-plus-lighter"
              style={{ containerType: "size" }}
            >
              <div className="relative h-[hypot(-10.1986cqw,81.9337cqh)] w-[hypot(89.8014cqw,18.0663cqh)] flex-none rotate-[8.99deg]">
                <div
                  className="absolute"
                  style={{ inset: highlightInsets?.[0] ?? 0 }}
                >
                  <img
                    src={highlights[0]}
                    alt=""
                    className="block size-full max-w-none"
                  />
                </div>
              </div>
            </div>
            <div
              className="absolute inset-[46.94%_30.09%_-2.84%_-0.21%] flex items-center justify-center mix-blend-plus-lighter"
              style={{ containerType: "size" }}
            >
              <div className="relative h-[hypot(11.7628cqw,-79.439cqh)] w-[hypot(-88.2372cqw,-20.561cqh)] flex-none rotate-[-169.48deg]">
                <div
                  className="absolute"
                  style={{ inset: highlightInsets?.[1] ?? 0 }}
                >
                  <img
                    src={highlights[1]}
                    alt=""
                    className="block size-full max-w-none"
                  />
                </div>
              </div>
            </div>

            <ShineLayer shine={shines[0]} />
            <ShineLayer shine={shines[1]} />
          </div>
        </div>
      </div>
    </div>
  );
}
