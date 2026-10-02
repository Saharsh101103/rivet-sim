/** Frosted "Scroll for more" pill pinned near the bottom of each screen. */
export function ScrollIndicator({
  href = "#more",
  variant = "dark",
}: {
  href?: string;
  // "dark": smoky glass (hero → why sections); "light": pale glass used over the cream carousel.
  variant?: "dark" | "light";
}) {
  return (
    <a
      href={href}
      className={`absolute left-[calc(50%-0.5px)] top-[851px] z-10 flex h-[38px] -translate-x-1/2 items-center justify-center gap-[8px] rounded-[19px] border p-[15px] backdrop-blur-[22px] ${
        variant === "dark"
          ? "border-[rgba(255,255,255,0.19)] bg-[rgba(0,0,0,0.4)] drop-shadow-[0px_4px_17px_rgba(0,0,0,0.25)]"
          : "border-[rgba(255,255,255,0.39)] bg-[rgba(161,161,161,0.1)] drop-shadow-[0px_4px_17px_rgba(0,0,0,0.17)]"
      }`}
    >
      <span className="whitespace-nowrap font-sans text-[12px] font-normal leading-[23px] text-[#fff9fd] opacity-70 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
        Scroll for more
      </span>
      <span className="relative size-[8px] shrink-0">
        <img
          src="/figma/scroll-arrow.svg"
          alt=""
          className="absolute left-[-0.5px] top-[-0.5px] block h-[9.207px] w-[9px] max-w-none"
        />
      </span>
    </a>
  );
}
