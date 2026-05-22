import { Rocket } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PromoBannerProps {
  threshold?: number;
  currentAmount?: number;
  className?: string;
}

const PromoBanner = ({
  threshold = 75,
  currentAmount = 45,
  className,
}: PromoBannerProps) => {
  const progress = Math.min((currentAmount / threshold) * 100, 100);

  return (
    <div className="bg-primary w-full">
      <div
        className={cn(
          "mx-auto w-full max-w-7xl text-primary-foreground",
          className,
        )}
      >
        <div className="container flex flex-col items-center justify-center gap-2 py-2 sm:flex-row sm:gap-3 sm:py-2.5">
          <Rocket className="hidden size-4 shrink-0 sm:block" />

          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <p className="text-center text-xs sm:text-sm">
              Get early access to{" "}
              <span className="font-semibold">Synvanta Systems</span>
            </p>

            <Progress
              value={progress}
              className="dark h-1 w-16 sm:h-1.5 sm:w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
