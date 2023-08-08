'use client'

import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/pop-over"
import { Button } from "../ui/button"
import { LayoutDashboard } from "lucide-react"

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export function BoardAdder({
    className
}) {


    const [isOpen, setIsOpen] = React.useState(false);

    return (

        <Popover open={isOpen}>
            <PopoverTrigger asChild className=""
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}

            >
                <Button variant="outline" className="gap-2 flex"
                >
                    <LayoutDashboard />
                    Añadir a tablero
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <ScrollArea className={cn(`h-72 w-48 rounded-md border`)}>
                    <div className="p-4">
                        <h4 className="mb-4 text-sm font-medium leading-none">Tus tableros</h4>
                        {tags.map((tag) => (
                            <>
                                <div className="text-sm" key={tag}>
                                    {tag}
                                </div>
                                <Separator className="my-2" />
                            </>
                        ))}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    )
}
