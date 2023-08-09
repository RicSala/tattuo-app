'use client'

import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { BoardAdder } from "./board-adder";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import axios from "axios";
import { useToast } from "../ui/use-toast";

/** @typedef {import('@/defs.js').TattooType} Tattoo */

/**
 * @param {{ tattoo: Tattoo, className: String }} param
 */
export default function TattooCard({
    currentUser,
    tattoo,
    className,
    ...props
}) {

    const { toast } = useToast()

    const router = useRouter()

    const onBoardCreate = useCallback((title) => {
        return axios.post('/api/boards', { title: title })
            .then(res => {
                toast({
                    title: `Tablero ${title} creado`,
                    description: "Hemos añadido el tatuaje a tu tablero. ¡Sigue añadiendo más tatuajes!",
                })
                router.refresh()
                return res.data
            })
            .catch(err => {
                // toast.error('Something went wrong')
            }
            )

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router])


    const onBoardSelect = useCallback((tattoo, board) => {
        // add the tattoo to the board


        axios.post(`/api/boards/${board.id}/tattoos`, { tattooId: tattoo.id })
            .then(res => {
                console.log("response data:", res.data)
                toast({
                    title: `Tablero añadido el tatuaje a ${board.title}`,
                    description: "Puedes seguir añadiendo más tatuajes",

                })
            })
            .catch(err => {
                console.log("ERROR - TattooCard", err)
                toast({
                    title: `No ha sido posible añadir el tatuaje a ${board.title}`,
                    description: `${err.response.data.error}`,
                    variant: "destructive"

                })
            }
            )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Link href={"/"}
            onClick={(event) => {
                if (event.target.id !== "tattoo-image") {
                    event.preventDefault()
                }
            }}>

            <Card className={cn(`
                    w-full
                    aspect-square
                    relative
                    overflow-hidden
                    group
                    `,
                className
            )}>
                <CardContent className="grid gap-4">
                    <Image src={tattoo.imageSrc} fill alt={"tattoo"} className="object-cover" id="tattoo-image" />
                    <div className="absolute bottom-2">
                        <BoardAdder
                            tattoo={tattoo}
                            boards={currentUser.boards}
                            onBoardCreate={onBoardCreate}
                            onBoardSelect={onBoardSelect}
                            className="
                        sm:bg-transparent sm:text-transparent sm:border-none
                        group-hover:bg-background
                        group-hover:text-primary
                        group-hover:border-border

                        " />
                    </div>
                </CardContent>
            </Card>
        </Link>

    );
}