import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const ListingGrid = forwardRef(({ children, className }, ref) => {
    return (

        <div className={cn(`
            grid
            grid-cols-1
            gap-8
            item-center
            sm:grid-cols-2
            md:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-3
            2xl:grid-cols-4
            m-auto
            `,
            className
        )}
            ref={ref}
        >
            {children}
        </div>


    )
})

ListingGrid.displayName = "ListingGrid"

export default ListingGrid;