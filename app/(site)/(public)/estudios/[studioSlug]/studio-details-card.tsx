"use client";

import ArtistSocials from "@/components/artist/artist-socials";
import { DisplayText } from "@/components/display-text";
import { Map } from "@/components/map";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  ArtistProfile,
  Studio,
  Style,
  studioGoogleProfile,
} from "@prisma/client";
import {
  ChevronDown,
  ChevronsUpDown,
  MoreHorizontal,
  Undo,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useState } from "react";

export type WithAdditionalProperties<T> = T & {
  studioGoogleProfile: studioGoogleProfile;
  artists: ArtistWithStyles[];
};

interface StudioCardProps {
  studio: WithAdditionalProperties<Studio>;
  className?: string;
  imagePriority?: boolean;
}

interface ArtistWithStyles extends ArtistProfile {
  styles: Style[]; // Assuming an artist can have multiple styles
}

// studio styles are the styles that the artists of the studio do, with no duplicates
const getStudioStyles = (studio: WithAdditionalProperties<Studio>) => {
  const styles = new Set<string>();
  if (!studio.artists) {
    return [];
  }
  studio.artists.forEach((artist) => {
    artist.styles.forEach((style) => {
      // search for the style in the
      styles.add(style.label);
    });
  });
  return Array.from(styles);
};

export function StudioDetailsCard({
  studio,
  imagePriority,
  ...props
}: StudioCardProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const currentUser = session?.user;

  return (
    <div className="mx-auto flex w-96 flex-col gap-2 rounded-lg bg-secondary/50 p-5">
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
            {!studio.userId && !currentUser ? (
              <DropdownMenuItem
                className="hover:cursor-pointer"
                // onClick={() => {
                //   setArtistRegisterOpen(true);
                // }}
              >
                Reclamar estudio
              </DropdownMenuItem>
            ) : null}
            {/* <DropdownMenuItem className="hover:cursor-pointer">Billing</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center justify-center">
        <Avatar>
          <AvatarImage src={studio.mainImageUrl} />
          <AvatarFallback>
            {studio.name
              .split(" ")
              .slice(0, 2)
              .map((name) => name[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col pl-2">
          <p className="font-bold">{studio.name}</p>
          <p className="text-muted-foreground">Disponible</p>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <Button
          variant="default"
          size="default"
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
      </div>

      <div
        className={cn(
          `
                        flex flex-col gap-3 sm:flex  sm:flex-col sm:gap-5
                        `,
        )}
      >
        <div>
          <p className="font-bold">Sobre el estudio</p>
          <p className="max-h-64 overflow-y-auto">
            <DisplayText text={studio.info} />
          </p>
        </div>
        <Separator />
        <div>
          <p className="font-bold">Dirección</p>
          <p className="max-h-64 overflow-y-auto">
            <DisplayText text={studio.studioGoogleProfile.address} />
          </p>
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-[350px] space-y-2"
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="default" className="w-full">
                <ChevronsUpDown className="mr-2 h-4 w-4" />
                Ver mapa
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="h-96 w-full">
                <Map />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <Separator />
        <div>
          <p className="font-bold">Horario</p>
          <p className="max-h-64 overflow-y-auto">
            <span className="font-semibold">Lunes:</span> {studio.lunes}
          </p>
          <p className="max-h-64 overflow-y-auto">
            <span className="font-semibold">Martes:</span> {studio.martes}
          </p>
          <p className="max-h-64 overflow-y-auto">
            <span className="font-semibold">Miércoles:</span> {studio.miercoles}
          </p>
          <p className="max-h-64 overflow-y-auto">
            <span className="font-semibold">Jueves:</span> {studio.jueves}
          </p>
          <p className="max-h-64 overflow-y-auto">
            <span className="font-semibold">Viernes:</span> {studio.viernes}
          </p>
          <p className="max-h-64 overflow-y-auto">
            <span className="font-semibold">Sábado:</span> {studio.sabado}
          </p>
          <p className="max-h-64 overflow-y-auto">
            <span className="font-semibold">Domingo:</span> {studio.domingo}
          </p>
        </div>
        <Separator />
        <div>
          <p className="font-bold">Contacto</p>
          <p className="max-h-64 overflow-y-auto">
            {`Teléfono: `}
            <Button
              variant="outline"
              size="default"
              className="h-2 py-3"
              asChild
            >
              <a href={`Tel: ${studio.phone || studio.phoneNumber}`}>
                {studio.phone || studio.phoneNumber}
              </a>
            </Button>
          </p>
          <p className="max-h-64 overflow-y-auto">
            {`WhatsApp:
                        
                    `}
            <a
              href={`https://wa.me/600243843/?text=Hola! Me gustaría informarme sobre un tatuaje`}
            >
              {/* <Button variant="outline" className="h-2 py-3">
                {artist.phone}
              </Button> */}
            </a>
            <Button
              variant="outline"
              size="default"
              className="h-2 py-3"
              asChild
            >
              <a
                href={`https://wa.me/600243843/?text=Hola! Me gustaría informarme sobre un tatuaje`}
                // href={`Tel: ${studio.phone || studio.phoneNumber}`}>
              >
                {studio.phone || studio.phoneNumber}
              </a>
            </Button>
          </p>
          <p className="max-h-64">{`Email: ${studio.email || ""}`}</p>
        </div>
        <Separator />
        <div>
          <p className="mb-2 font-bold">Redes Sociales</p>
        </div>
        <Separator />
        <div>
          <p className="mb-2 font-bold">Estilos</p>
          <div className="flex flex-row flex-wrap gap-2">
            {getStudioStyles(studio).map((style) => (
              <Badge key={style} className="bg-primary/50">
                {style}
              </Badge>
            ))}
          </div>
        </div>
        <Separator />
        {!studio.userId && !currentUser ? (
          <div className="flex items-center justify-center gap-2 text-sm italic text-primary/70">
            ¿Eres tú?
            {/* TODO: How can I send the form the name of the user? */}
            <Button variant="ghost" onClick={() => {}}>
              Reclama este estudio
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
