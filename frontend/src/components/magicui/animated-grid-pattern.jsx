import { cn } from "../../lib/utils"

export default function AnimatedGridPattern({
  className,
  width = 40,
  height = 40,
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60 select-none",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)`,
        backgroundSize: `${width}px ${height}px`,
        maskImage: "radial-gradient(ellipse at center, black, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent)"
      }}
    />
  )
}
