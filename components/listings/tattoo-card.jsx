"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { BoardAdder } from "./board-adder";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import HeartButton from "../heart-button";
import path from "path";
import { apiClient } from "@/lib/apiClient";

export default function TattooCard({
  currentUser,
  data,
  className,
  hasBoardAdder = true,
  likeable = true,
  children,
  ...props
}) {
  const { toast } = useToast();

  const router = useRouter();

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
  //         console.log("response", res);
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
  //       console.log("ERROR - TattooCard", err);
  //       toast({
  //         variant: "destructive",
  //         title: `No ha sido posible añadir el tatuaje a ${board.title}`,
  //         description: `${err.response.data.error}`,
  //       });
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => {
        router.prefetch(`/tatuajes/detalle/${data.id}`);
      }}
      onClick={(event) => {
        if (event.target.id !== "tattoo-image" && event.target !== path) {
          event.preventDefault();
        } else {
          router.push(`/tatuajes/detalle/${data.id}`);
        }
      }}
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
        <CardContent className="grid gap-4">
          <Image
            src={data.imageSrc}
            fill
            alt={"tattoo"}
            className="object-cover"
            id="tattoo-image"
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
    </div>
  );
}
