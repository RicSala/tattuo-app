"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { apiClient } from "@/lib/apiClient";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "../icons/spinner";

export default function BoardCard({ board }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  if (isDeleting) return null;

  return (
    <div
      className="relative m-10 mx-auto aspect-square w-full min-w-[200px] max-w-xs overflow-hidden
        rounded-lg bg-white shadow-md
        "
    >
      <Link href={`/user/boards/${board.id}`} className="">
        <Image
          src={board.firstTattoo || "/images/placeholder.png"}
          alt="image"
          fill
          className="h-60 rounded-t-lg object-cover"
        />
        <div className="absolute bottom-2 flex w-full justify-between px-3">
          <div className="rounded-md bg-primary/70 p-2 font-bold text-primary-foreground">
            <p>{board.title}</p>
          </div>
          <Button
            className="gap-2"
            onClick={async (e) => {
              e.preventDefault();
              setIsDeleting(true);
              await apiClient.delete(`/boards/${board.id}`);
              //   router.refresh();
              //   setIsDeleting(false);
              toast({
                title: "Tablero borrado",
                description: "Puedes seguir navegando",
                variant: "success",
              });
            }}
          >
            {isDeleting ? (
              <>
                <Spinner />
                {"Borrando..."}
              </>
            ) : (
              "Borrar"
            )}
          </Button>
        </div>
      </Link>
    </div>
  );
}
