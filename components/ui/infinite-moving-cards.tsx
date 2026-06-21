import { cn } from "@/lib/utils";

type Item = {
  name: string;
  role: string;
  text: string;
  stars: number;
};

/**
 * Aceternity-style infinite marquee. Pure CSS animation (see .fx-marquee),
 * pauses on hover, respects prefers-reduced-motion. Items are duplicated so
 * the loop is seamless.
 */
export function InfiniteMovingCards({
  items,
  duration = "52s",
  className,
}: {
  items: Item[];
  duration?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "fx-marquee-wrap relative w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]",
        className
      )}
    >
      <ul
        className="fx-marquee flex w-max gap-4"
        style={{ "--fx-duration": duration } as React.CSSProperties}
      >
        {[...items, ...items].map((t, i) => (
          <li
            key={i}
            className="flex w-[340px] shrink-0 flex-col gap-4 rounded-2xl border border-white/10 bg-ink/80 p-6"
          >
            <div className="text-[15px] tracking-wide text-blush">
              {"★".repeat(t.stars)}
            </div>
            <p className="flex-1 text-sm leading-relaxed text-mist">“{t.text}”</p>
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-glow to-iris text-sm font-bold text-void">
                {t.name[0]}
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {t.name}
                </div>
                <div className="font-mono text-[11px] text-mist">{t.role}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
