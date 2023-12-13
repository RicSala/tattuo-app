"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const SmallCard = ({
  image,
  name,
  url,
}: {
  image: string;
  name: string;
  url: string;
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(url)}
      className="mx-auto flex w-full cursor-pointer flex-col items-center rounded-xl border px-4 py-4 text-center hover:bg-muted sm:mb-4 sm:flex-row sm:text-left md:max-w-lg"
    >
      <div className="relative mb-4 rounded-full md:mb-0 md:mr-6">
        <Avatar className="cursor-pointer">
          <AvatarImage src={image || undefined} />
          <AvatarFallback>
            {name
              .split(" ")
              .slice(0, 2)
              .map((name) => name[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-grow flex-col justify-center gap-2">
        <p className="text-xl font-medium text-primary">{name}</p>
        <p>Ver Perfil</p>
      </div>
    </div>
  );
};
