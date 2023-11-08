'use client'

import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Toc({
    headings
}) {

    
    const [isTocOpen, setIsTocOpen] = useState(false)
    const tocRef = useClickOutside(()=>{setIsTocOpen(false)}, ["click"])

    return (
        //TODO: is there a way to keep this component server side while taking the "onClick behavior" client side? otherwise is not that good for seo
        <div className="relative w-full max-w-sm mx-auto text-sm border-b sm:rounded-md sm:border sm:text-base sm:p-2 border-primary"
            ref={tocRef}
        >
            <div className="flex items-center justify-between p-1 rounded-md cursor-pointer md:p-2 hover:bg-muted"
                onClick={() => { setIsTocOpen((prev) => !prev) }}
            >
                <p>Contenido</p>
                <ChevronsUpDown className="w-5 h-5" />
            </div>
            <ul
                id="toc-content"
                className={cn(`absolute bg-background border rounded-lg w-full max-w-sm p-4 left-0`,
                    isTocOpen ? 'block' : 'hidden'

                )}>
                {
                    headings.map(heading => {
                        return (
                            <li key={heading.link} className="p-1 rounded-md hover:bg-muted">
                                <Link href={heading.link} className="block w-full h-full p-1 rounded-md hover:bg-muted" >
                                    {heading.text}
                                </Link>
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    );
}