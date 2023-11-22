"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { apiClient } from "@/lib/apiClient";

export default function DeleteTattooButton({ tattooId, boardId, children }) {
  const router = useRouter();
  const { toast } = useToast();

  const onDelete = async (tattooId) => {
    // setIsDeleting(true)
    // toast.success('Tatuaje eliminado')
    await apiClient.delete(`/tattoos/${tattooId}`).then((res) => {
      console.log({ res });
      router.refresh();
      return res.data;
    });
  };

  return (
    <Button
      onClick={() => {
        const userConfirmation = confirm(
          "¿Seguro que quieres borrar este tatuaje? Dejará de estar publicado inmediatamente",
        );
        if (userConfirmation) onDelete(tattooId);
      }}
    >
      {children}
    </Button>
  );
}
