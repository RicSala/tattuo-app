"use client";

import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/pop-over";
import { Button } from "../ui/button";
import { LayoutDashboard } from "lucide-react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { UiContext } from "@/providers/ui/ui-provider";
import { useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export function BoardAdder({
  tattoo,
  boards,
  className,
  // onBoardCreate,
  // onBoardSelect,
  currentUser,
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);

  const onBoardCreate = useCallback(
    (title) => {
      setIsCreatingBoard(true);
      apiClient
        .post("/boards", { title: title })
        .then((res) => {
          toast({
            variant: "success",
            title: `Tablero ${title} creado`,
            description: "Ahora añadiremos el tatuaje a tu tablero...",
          });
          router.refresh();
          onBoardSelect(tattoo, res.data);
          console.log("response", res);
          return res.data;
        })
        .catch((err) => {
          // toast.error('Something went wrong')
        })
        .finally(() => {
          setIsCreatingBoard(false);
        });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [onBoardSelect, router, tattoo, toast],
  );

  const onBoardSelect = useCallback((tattoo, board) => {
    // add the tattoo to the board
    apiClient
      .post(`/boards/${board.id}/tattoos`, { tattooId: tattoo.id })
      .then((res) => {
        toast({
          variant: "success",
          title: `Tatuaje añadido a ${board.title}`,
          description: "Puedes seguir añadiendo más tatuajes",
        });
      })
      .catch((err) => {
        console.log("ERROR - TattooCard", err);
        toast({
          variant: "customDestructive",
          title: `No ha sido posible añadir el tatuaje a ${board.title}`,
          description: `${err.response.data.error}`,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //TODO: The open state of the adder is controlled by radix primitive or shadcn. Understand why and how to control it myself.
  const [showCreateForm, setShowCreateForm] = React.useState(false);
  const { setLoginModalOpen } = useContext(UiContext);

  return (
    <Popover
      // open={isOpen}
      onMouseLeave={() => {
        console.log("leave");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            `
                            flex
                            gap-2
                            `,
            className,
          )}
          onClick={() => {
            if (!currentUser) {
              toast({
                title: "Accede a tu cuenta",
                description: "Debes estar conectado para esta acción",
                variant: "customDestructive",
              });
              setLoginModalOpen(true);
              return;
            }
            // setIsOpen((prev) => !prev)
          }}
        >
          <LayoutDashboard />
          Añadir a tablero
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80"
        // onMouseLeave={
        //     () => {
        //         setIsOpen(() => false)
        //     }
        // }
      >
        <ScrollArea
          className={cn(
            `h-72 w-full p-0 
                transition-all`, //TODO:  How can I make this trasition?
            showCreateForm && `h-36`,
          )}
        >
          {!showCreateForm ? (
            <BoardList
              tattoo={tattoo}
              boards={boards}
              onCreate={() => setShowCreateForm(true)}
              onBoardSelect={onBoardSelect}
            />
          ) : (
            <BoardCreationForm
              onBoardCreate={async (title) => {
                // setIsOpen(false)
                await onBoardCreate(title);
                setShowCreateForm(false);
              }}
              onCancel={() => setShowCreateForm(false)}
              onBoardSelect={onBoardSelect}
              tattoo={tattoo}
              isCreatingBoard={isCreatingBoard}
            />
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

const BoardList = ({ tattoo, boards, onCreate, onBoardSelect }) => {
  return (
    <div className="">
      <h4>Tus tableros</h4>
      <Separator className="mb-2 mt-3" />
      {boards.map((board) => (
        <div
          key={board.id}
          onClick={
            // TODO: Review. Could we avoid passing tattoo?
            () => {
              onBoardSelect(tattoo, board);
            }
          }
        >
          <div className="cursor-pointer rounded p-2 text-sm hover:bg-muted">
            <p>{board.title}</p>
          </div>
          <Separator className="my-2" />
        </div>
      ))}

      <Button
        size="sm"
        onClick={() => {
          onCreate(true);
        }}
      >
        Crear tablero
      </Button>
    </div>
  );
};

const BoardCreationForm = ({
  onBoardCreate,
  onBoardSelect,
  tattoo,
  onCancel,
  isCreatingBoard,
}) => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  React.useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  const onSubmit = async (data) => {
    // if (!currentUser) return onOpenLoginModal()
    // Optimistic update -> we add the board to the user before the request is done
    // const temporaryBoard = { ...data, id: Date.now() }
    // setBoards([...boards, temporaryBoard])
    // We send the request to the server to create the board in the database after we have added it to the user
    onBoardCreate(data.title)
      .then((newBoard) => {
        onBoardSelect(tattoo, newBoard);
      })
      .catch((error) => {
        console.error("ERROR - TattooBoardAdder", error);
      });
  };

  return (
    <div className="board-adder-input my-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="flex flex-col gap-2 ">
          <h3>Crea un nuevo tablero</h3>
          <Input
            id={`title`}
            // id is like this to avoid the same id for all the boards. We have to separate them in the endpo
            label="New Board"
            placeholder="Nombre"
            type="text"
            errors={errors}
            {...register("title", {
              required: {
                value: true,
                message: "Title is required",
              },
            })}
          />
          <div className="flex flex-row justify-between">
            <Button
              type="button"
              variant="ghost"
              // TODO: make it go back when clicked...
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button size="lg" type="submit" disabled={isCreatingBoard}>
              Crear
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
