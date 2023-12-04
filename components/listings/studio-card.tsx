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
import { Star } from "lucide-react";

type WithGoogleProfile<T> = T & { studioGoogleProfile: studioGoogleProfile };

interface StudioCardProps {
  studio: WithGoogleProfile<Studio>;
  className?: string;
  imagePriority?: boolean;
}

const StudioCard = ({
  studio,
  className,
  imagePriority = false,
  ...props
}: StudioCardProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const currentUser = session?.user;

  return (
    <div
      onClick={() => router.push(``)}
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
            listingId={studio.id}
            currentUser={currentUser}
            listingType="artists"
          />
        </div>

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
                fill={true}
                //TODO:  What about when there is not image??
                src={
                  studio.studioGoogleProfile.imgUrl || "/images/placeholder.png"
                }
                alt="profile picture"
                priority={imagePriority}
                className="object-cover"
              />
            </div>
          </div>
        </div>
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
      <div className="flex flex-row items-center justify-end gap-6 px-5 py-3">
        {/* <Avatar user={data} /> */}
        <Star className="h-5 w-5 text-primary" />
        <p className="truncate">{studio.studioGoogleProfile.rating}</p>
        <p className="truncate">
          ({studio.studioGoogleProfile.reviewCount} reviews)
        </p>
      </div>
      {/* <div className="px-5 py-3">
                €€€
            </div> */}
    </div>
  );
};
export default StudioCard;
