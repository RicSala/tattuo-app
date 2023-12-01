import Container from "@/components/ui/container";
import { getStyleList } from "@/lib/getStyleList";
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
  return <Container>{children}</Container>;
};
export default ArtistGridLayout;
