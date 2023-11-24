import { getCurrentUser } from "@/services/db/getCurrentUser";
import Container from "@/components/ui/container";
import { GridHeader } from "@/components/grid-header";
import { getStyleList } from "@/lib/getStyleList";
import { getCities } from "@/lib/getCities";
// import Container from "@/components/ui/Container";
export const dynamic = "force-dynamic";

const styles = getStyleList();
// const cities = getCities();

const filtro1 = {
  label: "Estilos",
  value: "styles",
  options: styles,
};

const ArtistGridLayout = async ({ children }) => {
  const user = await getCurrentUser();

  // REVIEW: why not passing current user to children through the layout?
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};
export default ArtistGridLayout;
