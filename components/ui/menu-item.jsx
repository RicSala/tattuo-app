'use client'

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const MenuItem = ({
    warningIcon: WarningIcon, onClick, label, onMouseEnter, className, ...props }) => {
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
                flex
                gap-2
                        `,
                className
            )}
            {...props}
        >
            {label}
            {
                WarningIcon ?
                    <TooltipProvider delayDuration={10}>
                        <Tooltip>
                            <TooltipTrigger asChild={true}><WarningIcon className="text-red-600" /></TooltipTrigger>
                            <TooltipContent>
                                <p>Tu perfil está incompleto</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    : null}
        </div>
    )
};

export default MenuItem;