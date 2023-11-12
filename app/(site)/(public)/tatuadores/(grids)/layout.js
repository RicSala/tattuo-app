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
      <Container>
        <GridHeader
          title={`Inspírate en los tatuajes de los mejores artistas`}
          subtitle={`Explora por estilo, ciudad, o simplemente escribe lo que buscas`}
          contentSlug={""}
          filtro1={filtro1}
        />
        {children}
      </Container>
    </>
  );
};
export default ArtistGridLayout;
