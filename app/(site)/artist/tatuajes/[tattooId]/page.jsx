import { getCurrentUser } from "@/services/db/getCurrentUser";
import Container from "@/components/ui/container";
import prisma from "@/lib/prismadb";
import TattooEditPageClient from "./TattooEditPageClient";
import { TattooService } from "@/services/db/TattooService";
import { OthersService } from "@/services/db/OthersService";

const TattooEditPage = async ({
  // currentUser //REVIEW: why not passing current user to children through the layout?
  params,
}) => {
  // We load user, styles and bodyParts in parallel to save time
  const currentUserPromise = getCurrentUser();
  const stylesPromise = OthersService.getStyles();
  const bodyPartsPromise = OthersService.getBodyParts();

  const [currentUser, styles, bodyParts] = await Promise.all([
    currentUserPromise,
    stylesPromise,
    bodyPartsPromise,
  ]);

  if (!currentUser)
    //TODO: redirect to login (HOW?) if user is not logged in
    return <div>Not logged in</div>;

  const { tattooId } = params;
  let isNew = false;
  if (tattooId === "new") isNew = true;

  let tattoo = {};
  // if the tattoo is not new, we get it from the database
  // otherwise we just pass an empty object
  if (!isNew) tattoo = await TattooService.getById(tattooId);

  return (
    <Container>
      <TattooEditPageClient
        tattoo={tattoo}
        currentUser={currentUser}
        styles={styles}
        bodyParts={bodyParts}
        isNew={isNew}
      />
    </Container>
  );
};
export default TattooEditPage;
