"use client";

import useSave from "@/hooks/useSave";
import { BookMarked } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const SaveButton = ({ listingId, currentUser, listingType = "artists" }) => {
  const { hasSaved, toggleSave } = useSave({
    listingId,
    currentUser,
    listingType,
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={toggleSave}
            className="relative cursor-pointer transition hover:opacity-80"
          >
            <BookMarked
              size={24}
              className={
                hasSaved ? "fill-black stroke-white" : "fill-neutral-500/30"
              }
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>Guardar</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SaveButton;
