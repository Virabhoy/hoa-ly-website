import { cn } from "@/lib/utils";

export default function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-5 h-5 border-2 border-[#E5E5E5] border-t-[#0A0A0A] rounded-full animate-spin",
        className
      )}
    />
  );
}
