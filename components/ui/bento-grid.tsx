import { cn } from "@/lib/utils";

export function BentoGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[18rem]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-ink/70 p-6 transition-all duration-500 hover:border-glow/30 hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
