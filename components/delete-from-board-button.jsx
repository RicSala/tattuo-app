"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { apiClient } from "@/lib/apiClient";

export default function DeleteFromBoardButton({ tattooId, boardId, children }) {
  const router = useRouter();
  const { toast } = useToast();

  const onDelete = async (tattooId, boardId) => {
    // setIsDeleting(true)
    toast({
      title: "Eliminado del tablero",
      description: "",
    });
    await apiClient
      .delete(`/boards/${boardId}/tattoos/`, {
        data: {
          tattooId: tattooId,
        },
      })
      .then((res) => {
        router.refresh();
        return res.data;
      });
  };

  return (
    <Button
      onClick={() => {
        onDelete(tattooId, boardId);
      }}
    >
      {children}
    </Button>
  );
}
