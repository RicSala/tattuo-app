"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TattooDetails } from "../../../../detalle/[tattooId]/components/tattoo-details";

export function TattooModal({ tattoo, currentUser }) {
  return (
    <Dialog
      defaultOpen={true}
      className="max-w-fit"
      onOpenChange={(isOpen) => {
        isOpen === false && history.back();
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
