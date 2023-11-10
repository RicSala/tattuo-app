"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HeartButton from "../heart-button";
import { Avatar } from "../ui/avatar";
import SaveButton from "../save-button";

const ArtistCard = ({ data, currentUser }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/tatuadores/profile/${data.id}`)}
      onMouseEnter={() => {
        router.prefetch(`/tatuajes/detalle/${data.id}`);
      }}
      className="group isolate flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border shadow-sm"
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
          <div className="relative inset-0 aspect-square overflow-hidden transition-transform">
            <Image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill={true}
              //TODO:  What about when there is not image??
              src={data.mainImage}
              alt="profile picture"
              className="object-cover"
            />
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
