"use client";

import { ChevronDown, MoreHorizontal, Undo } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import CustomError from "@/errors/CustomError";
import { useHandleError } from "@/errors/useHandleError";

export default function ArtistDetailsCard({ artist, currentUser }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const router = useRouter();
  const { hasSaved, toggleSave } = useSave({
    listingId: artist.id,
    currentUser: currentUser,
    listingType: "artists",
  });
  const handle = useHandleError();

  return (
    <div className="flex w-96 flex-col gap-2 rounded-lg bg-secondary/50 p-5">
      <div className="flex flex-row justify-between">
        <Undo
          onClick={() => {
            router.back();
          }}
          className="cursor-pointer hover:bg-muted"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreHorizontal className="cursor-pointer hover:text-primary/70" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => {
                handle(new CustomError("Reportar artista", "No implementado"));
                toast({
                  title: "Gracias por reportar",
                  description:
                    "Revisaremos lo antes posible tu aviso. Por favor, si es urgente, escríbenos a hello@tattuo.com",
                  variant: "success",
                });
              }}
            >
              Reportar
            </DropdownMenuItem>
            {/* <DropdownMenuItem className="hover:cursor-pointer">Billing</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center justify-center">
        <Avatar>
          <AvatarImage src={artist.mainImage} />
          <AvatarFallback>
            {artist.artisticName
              .split(" ")
              .slice(0, 2)
              .map((name) => name[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col pl-2">
          <p className="font-bold">{artist.artisticName}</p>
          <p className="text-muted-foreground">Disponible</p>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <Button
          className="w-[50%]"
          onClick={() => {
            toast({
              variant: "success",
              title: "Puedes contactarle directamente",
              description:
                "El contacto con lxs artistas es libre y gratuito, ¡Contáctale en cualquiera de sus redes",
            });
          }}
        >
          Contactar
        </Button>
        <Button
          onClick={(e) => {
            toggleSave(e);

            !hasSaved
              ? toast({
                  variant: "success",
                  title: "Artista guardadx!",
                  description:
                    "¿Por qué no le escribes un mensaje para hablar de ese tatuaje?",
                })
              : toast({
                  variant: "success",
                  title: "Artista Borrado!",
                  description:
                    "¿Seguro que no quieres mantenerlo en tu lista de artistas favoritos?",
                });
          }}
          className="w-[50%]"
          variant="outline"
        >
          {hasSaved ? "Guardado" : "Guardar"}
        </Button>
      </div>

      <Button
        className="flex cursor-pointer items-center justify-center gap-3 hover:bg-muted sm:hidden"
        onClick={() => setIsDetailsOpen((prev) => !prev)}
        variant="outline"
      >
        <p>Más información</p>
        <ChevronDown color="black" />
      </Button>

      <div
        className={cn(
          `
                        flex flex-col gap-3 sm:flex  sm:flex-col sm:gap-5
                        `,
          !isDetailsOpen ? "hidden" : "",
        )}
      >
        <div>
          <p className="font-bold">Bio</p>
          <p className="max-h-64 overflow-y-auto">{artist.bio}</p>
        </div>
        <Separator />
        <div>
          <p className="font-bold">Contacto</p>
          <p className="max-h-64 overflow-y-auto">
            {`Teléfono:
                        
                    `}
            <a href={`Tel: ${artist.phone}`}>
              <Button variant="outline" className="h-2 py-3">
                {artist.phone}
              </Button>
            </a>
          </p>
          <p className="max-h-64 overflow-y-auto">
            {`WhatsApp:
                        
                    `}
            <a
              href={`https://wa.me/600243843/?text=Hola! Me gustaría informarme sobre un tatuaje`}
            >
              <Button variant="outline" className="h-2 py-3">
                {artist.phone}
              </Button>
            </a>
          </p>
          <p className="max-h-64 overflow-y-auto">
            {`Email:
                        
                    `}
            <a href={`Mailto: ${artist.email}`}>
              <Button variant="outline" className="h-2 py-3">
                {artist.email}
              </Button>
            </a>
          </p>
        </div>
        <Separator />
        <div>
          <p className="mb-2 font-bold">Redes Sociales</p>
          <ArtistSocials artist={artist} />
        </div>
        <Separator />
        <div>
          <p className="mb-2 font-bold">Estilos</p>
          <div className="flex flex-row flex-wrap gap-2">
            {artist.styles.map((style, index) => {
              return (
                <Badge key={index} color="primary" className="inline">
                  {style.label}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
