'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HeartButton from "../heart-button";
import { Avatar } from "../ui/avatar";
import SaveButton from "../save-button";

const ArtistCard = ({
    data,
    currentUser
}) => {


    const router = useRouter();

    return (

        <div
            onClick={() => router.push(`/tatuadores/profile/${data.id}`)}

            className="
         border
         rounded-2xl
         shadow-sm
         overflow-hidden
         group
         flex
         flex-col
        cursor-pointer
        justify-between
        

        ">
            <div
                className="relative">
                <div className="absolute top-3 right-3 z-[3]">
                    <HeartButton listingId={data.id} currentUser={currentUser}
                        listingType="artists" />
                </div>


                <div className="absolute top-3 left-3 z-[3]">
                    <SaveButton listingId={data.id} currentUser={currentUser}
                        listingType="artists" />
                </div>



                <div className="aspect-square overflow-hidden">
                    <div className="relative overflow-hidden  aspect-square inset-0 transition-transform">

                        <Image
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            fill={true}
                            src={data.mainImage}
                            alt="profile picture"
                            className="object-cover"
                        />
                    </div>
                </div>

            </div>
            <div className="py-3 px-5 flex flex-row justify-start gap-6 items-center">
                {/* <Avatar user={data} /> */}
                <p>{data.artisticName}</p>
            </div>
            {/* <div className="py-3 px-5">
                €€€
            </div> */}
        </div>
    )
};
export default ArtistCard;