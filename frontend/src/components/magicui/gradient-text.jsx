import { cn } from "../../lib/utils";

export default function GradientText({ children, className }) {
  return (
    <span
      className={cn(
        "bg-gradient-to-br from-primary via-primary/80 to-primary/40 text-transparent bg-clip-text inline-block font-extrabold pb-2",
        className,
      )}
    >
      {children}
    </span>
  );
}
