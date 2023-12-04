import { cn } from "@/lib/utils";
import { ReactNode, forwardRef } from "react";

interface ListingGridProps {
  children: ReactNode;
  className?: string;
}

const ListingGrid = forwardRef<HTMLDivElement, ListingGridProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          `
            m-auto
            grid
            grid-cols-1
            gap-8
            sm:grid-cols-2
            md:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-3
            2xl:grid-cols-4
            `,
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ListingGrid.displayName = "ListingGrid";

export default ListingGrid;
