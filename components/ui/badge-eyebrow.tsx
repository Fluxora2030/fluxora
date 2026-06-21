import { cn } from "@/lib/utils";

/** Small monospace eyebrow label — the "machine voice" of the technical brand. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-glow/25 bg-glow/10 px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-glow",
        className
      )}
    >
      {children}
    </span>
  );
}
