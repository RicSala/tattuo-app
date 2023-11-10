"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function FakeTattooCard() {
  const router = useRouter();
  return (
    <div
      className="
      relative flex aspect-square
      w-full min-w-[150px] animate-pulse items-center justify-center overflow-hidden rounded-lg
      bg-gray-200
      "
    >
      <Button
        onClick={() => {
          router.push("/artist/tatuajes/new");
        }}
      >
        Publica tu {} tatuaje
      </Button>
    </div>
  );
}
