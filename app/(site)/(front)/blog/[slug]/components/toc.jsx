import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";

export default function Toc({
    headings
}) {
    return (
        <div className="p-2 border rounded-md border-primary">
            <div className="flex justify-between">

                <p>Contenido</p>
                <ChevronsUpDown className="w-5 h-5" />
            </div>
            <ul className={cn(``,

            )}>
                {
                    headings.map(heading => {
                        return (
                            <li key={heading.link} className="">
                                <Link href={heading.link}>
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