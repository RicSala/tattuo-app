"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { BoardAdder } from "./board-adder";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import HeartButton from "../heart-button";
import path from "path";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

export default function TattooCard({
  currentUser,
  data,
  className,
  hasBoardAdder = true,
  likeable = true,
  children,
  imagePriority = false,
  ...props
}) {
  const router = useRouter();

  useEffect(() => {
    // Prefetch the tattoo details when the component mounts
    console.log("prefetching...");
    router.prefetch(`/tatuajes/detalle/${data.id}`, {
      kind: "full",
    });
  }, [data.id, router]); // The effect depends on the tattoo id and will re-run if it changes

  // const onBoardCreate = useCallback(
  //   (title) => {
  //     return apiClient
  //       .post("/boards", { title: title })
  //       .then((res) => {
  //         toast({
  //           variant: "success",
  //           title: `Tablero ${title} creado`,
  //           description:
  //             "Hemos añadido el tatuaje a tu tablero. ¡Sigue añadiendo más tatuajes!",
  //         });
  //         router.refresh();
  //         return res.data;
  //       })
  //       .catch((err) => {
  //         // toast.error('Something went wrong')
  //       });

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   },
  //   [router, toast],
  // );

  // const onBoardSelect = useCallback((tattoo, board) => {
  //   // add the tattoo to the board
  //   apiClient
  //     .post(`/boards/${board.id}/tattoos`, { tattooId: tattoo.id })
  //     .then((res) => {
  //       toast({
  //         variant: "success",
  //         title: `Tutuaje añadido a ${board.title}`,
  //         description: "Puedes seguir añadiendo más tatuajes",
  //       });
  //     })
  //     .catch((err) => {
  //       toast({
  //         variant: "destructive",
  //         title: `No ha sido posible añadir el tatuaje a ${board.title}`,
  //         description: `${err.response.data.error}`,
  //       });
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Link
      href={`/tatuajes/detalle/${data.id}`}
      className="cursor-pointer"
      // onMouseEnter={() => {
      //   router.prefetch(`/tatuajes/detalle/${data.id}`);
      // }}
      // onClick={(event) => {
      //   if (event.target.id !== "tattoo-image" && event.target !== path) {
      //     event.preventDefault();
      //   } else {
      //     router.push(`/tatuajes/detalle/${data.id}`, {
      //       scroll: false, //TODO: Why it does not prevent the scroll?
      //     });
      //   }
      // }}
      scroll={true}
    >
      <Card
        className={cn(
          `
                    group
                    relative
                    aspect-square
                    w-full
                    min-w-[150px]
                    overflow-hidden
                    `,
          className,
        )}
      >
        <CardContent className="card-content relative h-full w-full gap-4">
          <Image
            src={data.imageSrc}
            fill
            alt={"tattoo"}
            className="object-cover"
            id="tattoo-image"
            // TW DEFAULTS: STARTS IN... sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
            priority={imagePriority}
          />
          <div className="absolute bottom-0 w-full">{children}</div>
          {hasBoardAdder && (
            <div className="absolute bottom-2">
              <BoardAdder
                tattoo={data}
                currentUser={currentUser}
                boards={currentUser?.boards || []}
                // onBoardCreate={onBoardCreate}
                // onBoardSelect={onBoardSelect}
                className=" group-hover:border-border group-hover:bg-background group-hover:text-primary sm:border-none sm:bg-transparent sm:text-transparent"
              />
            </div>
          )}

          {likeable && (
            <div className="absolute right-2 top-2 hidden p-3 group-hover:block">
              <HeartButton
                listingId={data.id}
                currentUser={currentUser}
                listingType={"tattoos"}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
TattooCard.Skeleton = <Skeleton classNama="h-80 w-80" />;
