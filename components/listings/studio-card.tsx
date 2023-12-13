"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HeartButton from "../heart-button";
import SaveButton from "../save-button";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { useSession } from "next-auth/react";
import { Prisma, Studio, studioGoogleProfile } from "@prisma/client";
import { data } from "autoprefixer";
import { PinIcon } from "lucide-react";
import { Rating } from "../rating";
import React from "react";

interface StudioCardProps {
  studio: Studio;
  className?: string;
  imagePriority?: boolean;
  children?: React.ReactNode;
}

const StudioCard = ({
  studio,
  className,
  imagePriority = false,
  children,
  ...props
}: StudioCardProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const currentUser = session?.user;

  return (
    <div
      onClick={() => router.push(`/estudios/${studio.slug}`)}
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
        {/* <div className="absolute right-3 top-3 z-[3]">
          <HeartButton
            className={""}
            listingId={studio.id}
            currentUser={currentUser}
            listingType="artists"
          />
        </div> */}

        <div className="absolute left-3 top-3 z-[3]">
          <SaveButton
            listingId={studio.id}
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
                src={studio.mainImageUrl || "/images/placeholder.png"}
                alt="profile picture"
                priority={imagePriority}
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full">{children}</div>
      </div>

      <div className="flex flex-row items-center justify-between gap-6 px-5 py-3">
        {/* <Avatar user={data} /> */}
        <p className="truncate">{studio.name}</p>
        {studio.isClaimed ? (
          <Badge className={"bg-primary/60"} variant={"default"}>
            Verificado
          </Badge>
        ) : null}
      </div>
      <div className="relative flex flex-row items-center justify-end gap-2 px-5 pb-2">
        <p className="mr-auto flex cursor-pointer items-center gap-2">
          {/* {studio.studioGoogleProfile.address} */}
          Zaragoza
          <PinIcon className="h-4 w-4" />
        </p>
        {/* <Avatar user={data} /> */}
        <Rating value={studio.googleRating} />
        <p className="truncate">
          {studio.googleRating}
          <span className="relative -bottom-0 ml-1 truncate text-xs italic text-primary/50">
            ({studio.googleReviewCount} reviews)
          </span>
        </p>
      </div>
      {/* <div className="px-5 py-3">
                €€€
            </div> */}
    </div>
  );
};
export default StudioCard;
