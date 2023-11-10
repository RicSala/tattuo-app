import { getCurrentUser } from "@/actions/getCurrentUser";
import { getTattoos } from "@/actions/getTattoos";
import { EmptyTattoos } from "@/components/empty-states/empty-tattoos";
import InfiniteListingGrid from "@/components/listings/infinite-listing-grid";
import TattooCard from "@/components/listings/tattoo-card";
import Container from "@/components/ui/container";
import { getBodyParts } from "@/lib/getBodyParts";
import { getStyleList } from "@/lib/getStyleList";
import { TattoosGridHeader } from "./components/tattoos-grid-header";
import { GridHeader } from "../../../../components/grid-header";
export const dynamic = "force-dynamic";

//TODO:
// SITEMAP
// ROBOTS.TXT [x]

export const metadata = {
  title: "TATTUO · Descubre Tatuajes de todos los estilos",
  description:
    "Seleccionamos los mejores tatuadores de tu ciudad para que hagas realidad ese tatuaje qué tanto tiempo llevas buscando",
};

const styles = getStyleList();
const bodyParts = getBodyParts();

const filtro1 = {
  label: "Estilo",
  value: "style",
  options: styles,
};

const filtro2 = {
  label: "Parte del cuerpo",
  value: "bodyPart",
  options: bodyParts,
};

// SearchFilterButton is a reusable component, so I need to provide the filter and the endpoint to get the results
const endpoint =
  process.env.APP_ENV === "production"
    ? `${process.env.HOST_NAME_PROD}/api/tattoos`
    : `${process.env.HOST_NAME_DEV}/api/tattoos`;

// For the infinite scroll we need to set the size of each page and the number of pages to load
const sizePerPage = 5;
const numberOfPagesToLoad = 2;
const initialDataSize = numberOfPagesToLoad * sizePerPage;

/**
 * TattoosPage component
 *
 * @param {Object} props - The props for the InfiniteListingGrid component
 * @param {string} props.searchParams - The component to render
 *
 * @returns {Promise<React.ReactElement>} The rendered InfiniteListingGrid component
 */
export default async function TattoosPage({ searchParams }) {
  const serverLoadedTattoos = await getTattoos(
    searchParams,
    0,
    initialDataSize,
  );

  const currentUser = await getCurrentUser();

  if (serverLoadedTattoos.length < 1) {
    return <EmptyTattoos filtro1={filtro1} filtro2={filtro2} />;
  }

  return (
    <Container>
      <GridHeader
        title={`Descubre tatuajes de artistas cerca de ti`}
        subtitle={`Explora por estilo, parte del cuerpo, o simplemente escribe lo que buscas`}
        contentSlug={""}
        filtro1={filtro1}
        filtro2={filtro2}
      />
      <InfiniteListingGrid // to render an infinite scroll we need...
        initialData={serverLoadedTattoos} // the initial data coming from the server
        sizePerPage={sizePerPage} // the size of each page
        endpoint={endpoint} // the endpoint to fetch more data in a client component
        Component={TattooCard} // the component to render for each item
        keyProp="tattoo" // the key prop to use to identify each item
        currentUser={currentUser} // the current user to check if the user is logged in
      />
    </Container>
  );
}
