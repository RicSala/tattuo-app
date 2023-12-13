"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import axios from "axios";

export default function EditTattooButton({ tattooId, children }) {
  const router = useRouter();

  const goToEditPage = (tattooId) => {
    router.push(`/artist/tatuajes/${tattooId}`);
  };

  return (
    <Button
      onClick={() => {
        goToEditPage(tattooId);
      }}
    >
      {children}
    </Button>
  );
}
