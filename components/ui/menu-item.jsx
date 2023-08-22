'use client'

import { cn } from "@/lib/utils";

const MenuItem = ({ onClick, label, onMouseEnter, className, ...props }) => {
    return (
        <div
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            className={cn(`
            px-4
                py-2
                sm:py-3
                cursor-pointer
                transition
                hover:bg-accent
                rounded
                        `,
                className
            )}
            {...props}
        >
            {label}
        </div>
    )
};

export default MenuItem;