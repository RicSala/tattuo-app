import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

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
                </CardContent>
            </Card>
        </Link>

    );
}