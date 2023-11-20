import ArtistSmallCard from "@/components/artist/artist-small-card";
import { DisplayText } from "@/components/display-text";
import HeartButton from "@/components/heart-button";
import ShareButtons from "@/components/share-buttons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function TattooDetails({ tattoo, currentUser, className }) {
  const hostname =
    process.env.NODE_ENV === "production"
      ? `${process.env.HOST_NAME_PROD}/api/artists`
      : `${process.env.HOST_NAME_DEV}/api/artists`;

  const age = Math.floor(
    (new Date() - new Date(tattoo?.createdAt)) / (1000 * 60 * 60 * 24),
  );

  return (
    <div
      className={cn(
        `mx-auto max-w-screen-lg overflow-hidden rounded-xl border bg-background shadow-lg`,
        className,
      )}
    >
      <div className="flex flex-col overflow-hidden lg:flex-row ">
        {/* order-first 
                md:order-none */}
        <div className="relative aspect-square grow ">
          <Image
            alt="tattoo"
            fill
            src={tattoo?.imageSrc}
            priority
            className="object-cover "
          />

          <HeartButton
            currentUser={currentUser}
            listingId={tattoo?.id}
            listingType={"tattoos"}
            className="absolute right-5 top-5"
            size={40}
          />
        </div>

        <div className="sidebar flex flex-shrink-0 basis-80 flex-col justify-between gap-2 lg:overflow-x-auto">
          <h2 className="mt-2 px-4 pt-1 sm:pt-4">{tattoo?.title}</h2>
          <div className="px-4 pt-4">
            <h3 className="">Sobre la pieza: </h3>
            <p className="line-clamp-[10]">
              <DisplayText text={tattoo?.description} />
            </p>
          </div>

          <div className="px-4 pt-4">
            <h3>Estilo</h3>
            <div className="flex gap-2">
              {tattoo?.styles
                ? tattoo.styles.map((style) => (
                    <Badge key={style.id} variant={"secondary"}>
                      {style.label}
                    </Badge>
                  ))
                : null}
            </div>
          </div>
          <div>
            {/* tags separated by commas */}
            <div className="px-4 pt-4">
              <h3>Tags </h3>
              <p className="">
                {tattoo?.tags
                  .map((el) => `#${el.tag.label.toLowerCase()}`)
                  .join(", ")}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between p-4">
            {
              <p>
                {" "}
                {age === 0
                  ? "Publicado hoy"
                  : age > 1
                  ? `Publicado hace ${age} días`
                  : `Publicado ayer`}{" "}
              </p>
            }
            {tattoo?.likes?.length > 0 && (
              <div className="flex flex-row items-center gap-1">
                {tattoo?.likes?.length} likes
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 px-4 py-2">
            <h3>Compártelo</h3>
            <ShareButtons url={`${hostname}/tatuajes/${tattoo?.id}`} />
          </div>
          {tattoo?.artistProfileId && tattoo?.artistProfileId !== "" ? (
            <div className="px-4 py-2">
              <p>Artista:</p>
              <ArtistSmallCard artist={tattoo?.artistProfile} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
