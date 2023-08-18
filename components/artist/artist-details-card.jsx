'use client'

import { ArrowDownRightFromCircle, ChevronDown, MoreHorizontal, Undo } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import ArtistSocials from "./artist-socials";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useSave from "@/hooks/useSave";
import { toast } from "../ui/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function ArtistDetailsCard({
    artist,
    currentUser

}) {


    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const router = useRouter()
    const { hasSaved, toggleSave } = useSave({ listingId: artist.id, currentUser: currentUser, listingType: 'artists' })

    return (
        <div className="
        w-96
        flex flex-col bg-secondary/50 rounded-lg p-5 gap-2">
            <div className="flex flex-row justify-between">
                <Undo
                    onClick={() => { router.back() }}
                    className="hover:bg-muted cursor-pointer"

                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <MoreHorizontal


                            className="hover:text-primary/70 cursor-pointer"

                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="hover:cursor-pointer">Reportar</DropdownMenuItem>
                        {/* <DropdownMenuItem className="hover:cursor-pointer">Billing</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

            <div className="flex justify-center items-center">
                <Avatar>
                    <AvatarImage src={artist.mainImage} />
                    <AvatarFallback>{
                        artist.artisticName.split(" ").slice(0, 2).map((name) => name[0]).join("")
                    }</AvatarFallback>
                </Avatar>
                <div className="flex flex-col pl-2">
                    <p className="font-bold">{artist.artisticName}</p>
                    <p className="text-muted-foreground">Disponible</p>
                </div>
            </div>

            <div className="flex flex-row gap-2">
                <Button className="w-[50%]"
                    onClick={() => {
                        toast({
                            title: "Puedes contactarle directamente",
                            description: "El contacto con lxs artistas is libre y gratuito, ¡Contáctale en cualquiera de sus redes",

                        })
                    }}

                >Contactar</Button>
                <Button
                    onClick={(e) => {
                        console.log({ currentUser })
                        toggleSave(e)
                    }}
                    className="w-[50%]" variant="outline">
                    {hasSaved ? "Guardado" :
                        "Guardar"
                    }
                </Button>
            </div>

            <div className="
            flex flex-col 
            justify-center 
            items-center
            cursor-pointer
            hover:bg-muted
            gap-3
            "
                onClick={() => setIsDetailsOpen((prev) => !prev)}
            >
                <p>Más información</p>
                <ChevronDown />

            </div>


            <div className={cn(`
                        sm:flex sm:flex-col sm:gap-5
                        `,
                !isDetailsOpen ? 'hidden' : ''
            )}>
                <div>
                    <p className="font-bold">Bio</p>
                    <p>{artist.bio}</p>
                </div>
                <Separator />
                <div>
                    <p className="font-bold mb-2">Redes Sociales</p>
                    <ArtistSocials artist={artist} />
                </div>
                <Separator />
                <div>

                    <p className="font-bold mb-2">Estilos</p>
                    <div className="flex flex-row flex-wrap gap-2">

                        {
                            artist.styles.map((style, index) => {
                                return (
                                    <Badge key={index} color="primary" className="inline">
                                        {style.label}
                                    </Badge>
                                );
                            }
                            )
                        }
                    </div>
                </div>


            </div>



        </div>
    );
}