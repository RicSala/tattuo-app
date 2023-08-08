import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { BoardAdder } from "./board-adder";

/** @typedef {import('@/defs.js').TattooType} Tattoo */

/**
 * @param {{ tattoo: Tattoo, className: String }} param
 */
export default function TattooCard({
    tattoo,
    className,
    ...props
}) {

    return (
        <Link href={"/"}>

            <Card className={cn(`
                    w-full
                    aspect-square
                    relative
                    overflow-hidden
                    group
                    `,
                className
            )}>
                <CardHeader>
                    <CardTitle>

                        {
                            tattoo.title
                        }
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Image src={tattoo.imageSrc} fill alt={"tattoo"} className="object-cover" />
                    <div className="absolute bottom-2 hidden group-hover:flex">
                        <BoardAdder className="bg-background" />
                    </div>
                </CardContent>
            </Card>
        </Link>

    );
}