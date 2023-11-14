"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HeartButton from "../heart-button";
import { Avatar } from "../ui/avatar";
import SaveButton from "../save-button";
import { cn } from "@/lib/utils";

const ArtistCard = ({ data, currentUser, className }) => {
  const router = useRouter();
  console.log({ data });

  return (
    <div
      onClick={() => router.push(`/tatuadores/profile/${data.id}`)}
      onMouseEnter={() => {
        router.prefetch(`/tatuajes/detalle/${data.id}`);
      }}
      className={cn(
        `group isolate flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border shadow-sm`,
        className,
      )}
    >
      <div className="relative">
        <div className="absolute right-3 top-3 z-[3]">
          <HeartButton
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
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill={true}
                //TODO:  What about when there is not image??
                src={data?.images[0] || data.mainImage}
                alt="profile picture"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-start gap-6 px-5 py-3">
        {/* <Avatar user={data} /> */}
        <p>{data.artisticName}</p>
      </div>
      {/* <div className="px-5 py-3">
                €€€
            </div> */}
    </div>
  );
};
export default ArtistCard;
