import { getCurrentUser } from "@/services/db/getCurrentUser";
import Container from "@/components/ui/container";
import { GridHeader } from "@/components/grid-header";
import { getStyleList } from "@/lib/getStyleList";
import { getCities } from "@/lib/getCities";
import { getBodyParts } from "@/lib/getBodyParts";
// import Container from "@/components/ui/Container";
export const dynamic = "force-dynamic";

const styles = getStyleList();
// const cities = getCities();
const bodyParts = getBodyParts();

const filtro1 = {
  label: "Estilos",
  value: "styles",
  options: styles,
};

const filtro2 = {
  label: "Parte del cuerpo",
  value: "bodyPart",
  options: bodyParts,
};

const ArtistGridLayout = async (props) => {
  const user = await getCurrentUser();

  // console.log({ props });
  // REVIEW: why not passing current user to children through the layout?
  return (
    <>
      <Container>
        <GridHeader
          title={`Descubre tatuajes de artistas cerca de ti`}
          subtitle={`Explora por estilo, parte del cuerpo, o simplemente escribe lo que buscas`}
          contentSlug={""}
          filtro1={filtro1}
          filtro2={filtro2}
        />
        {props.modal}
        {props.children}
      </Container>
    </>
  );
};
export default ArtistGridLayout;
