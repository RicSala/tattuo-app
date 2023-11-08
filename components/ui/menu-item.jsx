"use client";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const MenuItem = ({
  warningIcon: WarningIcon,
  onClick,
  label,
  onMouseEnter,
  className,
  warningMessage,
  ...props
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={cn(
        `
            flex
                cursor-pointer
                gap-2
                rounded
                px-4
                py-2
                transition
                hover:bg-accent
                sm:py-3
                        `,
        className,
      )}
      {...props}
    >
      {label}
      {WarningIcon ? (
        <TooltipProvider delayDuration={10}>
          <Tooltip>
            <TooltipTrigger asChild={true}>
              <WarningIcon className="text-red-600" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{warningMessage}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : null}
    </div>
  );
};

export default MenuItem;
