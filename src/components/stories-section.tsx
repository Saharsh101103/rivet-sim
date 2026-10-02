import { ScrollIndicator } from "./scroll-indicator";

type Card = {
  // Axis-aligned bounding box of the rotated card.
  box: { left: number; top: number; width: number; height: number };
  rotate: number;
};

const CARDS: Card[] = [
  {
    box: { left: 246.97, top: -0.07, width: 236.08, height: 302.272 },
    rotate: -4.28,
  },
  {
    box: { left: -101.01, top: -138.29, width: 292.035, height: 338.696 },
    rotate: 17.62,
  },
  {
    box: { left: -60.11, top: 275.64, width: 240.466, height: 305.391 },
    rotate: 5.22,
  },
  {
    box: { left: -25.44, top: 695.3, width: 271.128, height: 326.063 },
    rotate: 12.22,
  },
  {
    box: { left: 250.09, top: 491.59, width: 287.061, height: 335.826 },
    rotate: -16.28,
  },
  {
    box: { left: 230.09, top: 951.59, width: 287.061, height: 335.826 },
    rotate: -16.28,
  },
];

const CONTENT_HEIGHT = 1288;

function TestimonialCard({ box, rotate }: Card) {
  return (
    <div className="absolute flex items-center justify-center" style={box}>
      <figure
        className="relative h-[287px] w-[215.25px] flex-none overflow-clip rounded-[17.359px] bg-white text-[#160111] shadow-[0px_6.365px_6.944px_0px_rgba(0,0,0,0.09)]"
        style={{ rotate: `${rotate}deg` }}
      >
        <div className="absolute left-1/2 top-[23.8px] size-[76.379px] -translate-x-1/2">
          <img
            src="/figma/stories-avatar.png"
            alt=""
            className="absolute left-[-22.4px] top-[-11.2px] block size-[121.179px] max-w-none"
          />
        </div>
        <blockquote className="absolute left-1/2 top-[122.5px] w-[170.117px] -translate-x-1/2 text-center font-display text-[25.46px] font-extrabold leading-[0.95] tracking-[-0.7638px] [font-stretch:85%] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          “He is so not my type usually!”
        </blockquote>
        <p className="absolute left-[calc(50%-0.18px)] top-[174.86px] w-[186.897px] -translate-x-1/2 text-center font-sans text-[8.101px] font-medium leading-[1.3] opacity-60">
          The community introduced someone I wouldn&apos;t have found on my own
          and honestly was not my usual type at all. I said yes anyway. That was
          eight months ago. We just booked a trip together.
        </p>
        <figcaption className="absolute left-[13.89px] top-[247.57px] flex w-[186.897px] justify-center gap-[1.157px] whitespace-nowrap font-sans text-[8.101px] font-medium leading-[1.3] opacity-60">
          <span>31, Maya T.</span>
          <span>Charlotte, ND</span>
        </figcaption>
      </figure>
    </div>
  );
}

export function StoriesSection() {
  return (
    <section
      id="stories"
      data-header-theme="dark"
      className="story-reveal relative w-full"
      style={{ height: CONTENT_HEIGHT }}
    >
      {/* Background (headline is part of the Figma image) stays put while cards scroll over it */}
      <div className="sticky top-0 h-[932px] w-full overflow-clip bg-[#0a0e12]">
        <img
          src="/figma/stories-bg.png"
          alt=""
          aria-hidden
          className="absolute inset-0 block size-full max-w-none object-cover"
        />
      </div>
      <h2 className="sr-only">Real people, real lives, real stories</h2>

      <div className="absolute inset-0 overflow-clip">
        {CARDS.map((card, i) => (
          <TestimonialCard key={i} {...card} />
        ))}
      </div>

      {/* Button + scroll pill are outside Figma's scrolling layer, so they stay pinned */}
      <div className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 h-[932px]">
          <a
            href="#download"
            className="pointer-events-auto absolute left-[calc(50%+0.5px)] top-[632px] flex h-[63px] w-[189px] -translate-x-1/2 items-center justify-center rounded-[15px] bg-pink px-[36px] drop-shadow-[0px_14px_12px_rgba(0,0,0,0.25)]"
          >
            <span className="whitespace-nowrap font-sans text-[16px] font-medium leading-normal tracking-[-0.32px] text-[#ffe7de] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
              Get Riveting
            </span>
          </a>
          <div className="pointer-events-auto">
            <ScrollIndicator href="#faqs" variant="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
