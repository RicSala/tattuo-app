"use client";

import { useRouter } from "next/navigation";
import Heading from "../heading";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const EmptyState = ({
  title = "No hay coincidencias",
  subtitle = "Prueba con otros filtros",
  actionUrl,
  actionLabel,
  className,
}) => {
  const router = useRouter();
  return (
    <div
      className={cn(
        `flex h-full flex-col items-center justify-center gap-2 `,
        className,
      )}
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="mt-4 w-48">
        {actionLabel && actionUrl && (
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => router.push(actionUrl)}
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
