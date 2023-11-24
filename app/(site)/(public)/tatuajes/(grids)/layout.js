import { getCurrentUser } from "@/services/db/getCurrentUser";
import Container from "@/components/ui/container";
import { GridHeader } from "@/components/grid-header";
import { getStyleList } from "@/lib/getStyleList";
import { getCities } from "@/lib/getCities";
import { getBodyParts } from "@/lib/getBodyParts";
// import Container from "@/components/ui/Container";
export const dynamic = "force-dynamic";

const ArtistGridLayout = async (props) => {
  const user = await getCurrentUser();

  // REVIEW: why not passing current user to children through the layout?
  return (
    <>
      <Container>{props.children}</Container>
    </>
  );
};
export default ArtistGridLayout;
