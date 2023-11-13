import React from "react";
import { TattooDetails } from "../../../../detalle/[tattooId]/components/tattoo-details";
import { TattooService } from "@/services/db/TattooService";
import { getCurrentUser } from "@/services/db/getCurrentUser";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Page = async ({ params }) => {
  const tattooPromise = TattooService.getById(params.tattooId);
  const currentUserPromise = getCurrentUser();
  const [tattoo, currentUser] = await Promise.all([
    tattooPromise,
    currentUserPromise,
  ]);
  return (
    <Dialog defaultOpen={true} className="max-w-fit">
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
};

export default Page;
