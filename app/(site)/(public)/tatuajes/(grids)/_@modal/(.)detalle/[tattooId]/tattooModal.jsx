"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TattooDetails } from "../../../../detalle/[tattooId]/components/tattoo-details";
import { useRouter } from "next/navigation";

export function TattooModal({ tattoo, currentUser }) {
  const router = useRouter();
  return (
    <Dialog
      defaultOpen={true}
      className="max-w-fit"
      onOpenChange={(isOpen) => {
        isOpen === false && router.back();
      }}
    >
      <DialogContent className="max-h-full min-w-full overflow-auto border-none bg-transparent shadow-none">
        <div
          className="thisone"
          style={{
            maxHeight: "95vh",
            paddingTop: "2rem",
            paddingBottom: "2rem",
          }}
        >
          <TattooDetails
            tattoo={tattoo}
            currentUser={currentUser}
            className={"w-full"}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
