"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HeartButton from "../heart-button";
import SaveButton from "../save-button";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { useSession } from "next-auth/react";
import { ArtistProfile } from "@prisma/client";
import { PageType } from "@/types";

interface ArtistCardProps {
  data: ArtistProfile;
  className?: string;
  imagePriority?: boolean;
  altString?: string;
  pageType?: PageType;
}

const ArtistCard = ({
  data,
  className,
  imagePriority = false,
  altString = undefined,
  pageType = undefined,
}: ArtistCardProps) => {
  //   const altText =
  //     page === undefined ? `${data.artisticName} foto perfil` : "listing picture";
  // better with switch
  let altText = "profile picture";
  //   switch (pageType) {
  //     case "ARTIST":
  //       altText = `${artist.artisticName} perfil`;
  //       break;
  //     case "CITY":
  //       altText = `${artist.artisticName} en ${altString}`;
  //       break;
  //     default:
  //       altText = `${artist.artisticName} perfil`;
  //       break;
  //   }

  const router = useRouter();
  const { data: session } = useSession();

  const currentUser = session?.user;

  return (
    <div
      onClick={() => router.push(`/tatuadores/profile/${data.id}`)}
      onMouseEnter={() => {
        router.prefetch(`/tatuadores/profile/654e02287ffff1cdf25b7d92`);
      }}
      className={cn(
        `group isolate flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border shadow-sm
        transition-shadow ease-in-out hover:shadow-lg
        `,
        className,
      )}
    >
      <div className="relative">
        <div className="absolute right-3 top-3 z-[3]">
          <HeartButton
            className={""}
            listingId={data.id}
            currentUser={currentUser}
            listingType="artists"
          />
        </div>

        <div className="absolute left-3 top-3 z-[3]">
          <SaveButton
            listingId={data.id}
            currentUser={currentUser}
            listingType="artists"
          />
        </div>

        <div className="aspect-square overflow-hidden">
          <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
            <div className="relative inset-0 aspect-square overflow-hidden transition-transform">
              <Image
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                fill
                //TODO:  What about when there is not image??
                src={
                  data?.images[0] || data.mainImage || "/images/placeholder.png"
                }
                alt={altText}
                priority={imagePriority}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between gap-6 px-5 py-3">
        {/* <Avatar user={data} /> */}
        <p className="truncate">{data.artisticName}</p>
        {data.userId ? (
          <Badge className={"bg-primary/60"}>Verificado</Badge>
        ) : null}
      </div>
      {/* <div className="px-5 py-3">
                €€€
            </div> */}
    </div>
  );
};
export default ArtistCard;
