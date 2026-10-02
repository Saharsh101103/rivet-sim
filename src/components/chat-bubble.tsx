type ChatBubbleProps = {
  children: React.ReactNode;
  // "left": thought-bubble dots trail down-left; "right": tail drops down-right.
  tail: "left" | "right";
  color?: "blue" | "pink";
  className?: string;
  style?: React.CSSProperties;
};

/** Message bubble  from the people frame. */
export function ChatBubble({
  children,
  tail,
  color = "blue",
  className = "",
  style,
}: ChatBubbleProps) {
  const pink = color === "pink";
  return (
    <div
      className={`relative h-[43.599px] w-[133px] rounded-[17.616px] drop-shadow-[0px_4px_22px_rgba(0,0,0,0.35)] ${
        pink ? "bg-pink" : "bg-[#0084f9]"
      } ${className}`}
      style={style}
    >
      {tail === "left" ? (
        <>
          <img
            src="/figma/bubble-tail-dots-lg.svg"
            alt=""
            className="absolute bottom-[-5.29px] left-[24.66px] block size-[15.854px] max-w-none"
          />
          <img
            src="/figma/bubble-tail-dots-sm.svg"
            alt=""
            className="absolute bottom-[-11.01px] left-[37.43px] block size-[6.606px] max-w-none"
          />
        </>
      ) : (
        <img
          src={
            pink ? "/figma/hiw-bubble-tail-pink.svg" : "/figma/bubble-tail.svg"
          }
          alt=""
          className="absolute left-[84.66px] top-[33.03px] block h-[21.575px] w-[19.379px] max-w-none -scale-x-100"
        />
      )}
      <p className="absolute left-[15.86px] top-[calc(50%-15.64px)] w-[117.146px] font-tiktok text-[12.772px] font-medium leading-[14.533px] tracking-[-0.2554px] text-white">
        {children}
      </p>
    </div>
  );
}
