"use client";

import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Toc({
    headings,
}: {
    headings: { link: string; text: string }[];
}) {
    const [isTocOpen, setIsTocOpen] = useState(false);
    const tocRef = useClickOutside(() => {
        setIsTocOpen(false);
    }, ["click"]);

    return (
        //TODO: is there a way to keep this component server side while taking the "onClick behavior" client side? otherwise is not that good for seo
        <div
            className="relative mx-auto w-full max-w-sm border-b border-primary text-sm sm:rounded-md sm:border sm:p-2 sm:text-base"
            ref={tocRef}
        >
            <div
                className="flex cursor-pointer items-center justify-between rounded-md p-1 hover:bg-muted md:p-2"
                onClick={() => {
                    setIsTocOpen((prev) => !prev);
                }}
            >
                <p>Contenido</p>
                <ChevronsUpDown className="h-5 w-5" />
            </div>
            <ul
                id="toc-content"
                className={cn(
                    `absolute left-0 w-full max-w-sm rounded-lg border bg-background p-4`,
                    isTocOpen ? "block" : "hidden",
                )}
            >
                {headings.map((heading) => {
                    return (
                        <li
                            key={heading.link}
                            className="rounded-md p-1 hover:bg-muted"
                        >
                            <Link
                                href={heading.link}
                                className="block h-full w-full rounded-md p-1 hover:bg-muted"
                            >
                                {heading.text}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
