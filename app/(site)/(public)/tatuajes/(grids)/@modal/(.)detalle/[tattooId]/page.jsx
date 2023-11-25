import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TattooService } from "@/services/db/TattooService";
import { getCurrentUser } from "@/services/db/getCurrentUser";
import React from "react";
import { TattooDetails } from "../../../../detalle/[tattooId]/components/tattoo-details";
import { TattooModal } from "./tattooModal";

// const Page = ({ params }) => {
//   return <div>Page {params.tattooId}</div>;
// };
const Page = async ({ params }) => {
  const tattooPromise = TattooService.getById(params.tattooId);
  const currentUserPromise = getCurrentUser();
  const [tattoo, currentUser] = await Promise.all([
    tattooPromise,
    currentUserPromise,
  ]);
  return <TattooModal tattoo={tattoo} currentUser={currentUser} />;
};

export default Page;
