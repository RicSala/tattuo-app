import { getCurrentUser } from "@/services/db/getCurrentUser";
import { EmptyTattoos } from "@/app/(site)/(public)/tatuajes/components/empty-tattoos";
import InfiniteListingGrid from "@/components/listings/infinite-listing-grid";
import TattooCard from "@/components/listings/tattoo-card";
import { TattooService } from "@/services/db/TattooService";
import { GridHeader } from "@/components/grid-header";
import { getStyleList } from "@/lib/getStyleList";
import { getBodyParts } from "@/lib/getBodyParts";
export const dynamic = "force-dynamic";

//TODO:
// SITEMAP
// ROBOTS.TXT [x]

export const metadata = {
  title: "TATTUO · Descubre Tatuajes de todos los estilos",
  description:
    "Seleccionamos los mejores tatuadores de tu ciudad para que hagas realidad ese tatuaje que tanto tiempo llevas buscando",
};

// SearchFilterButton is a reusable component, so I need to provide the filter and the endpoint to get the results
const endpoint =
  process.env.NODE_ENV === "production"
    ? `${process.env.HOST_NAME_PROD}/api/tattoos`
    : `${process.env.HOST_NAME_DEV}/api/tattoos`;

// For the infinite scroll we need to set the size of each page and the number of pages to load
const sizePerPage = 5;
const numberOfPagesToLoad = 2;
const initialDataSize = numberOfPagesToLoad * sizePerPage;
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

// getData();

/**
 * TattoosPage component
 *
 * @param {Object} props - The props for the InfiniteListingGrid component
 * @param {string} props.searchParams - The component to render
 *
 * @returns {Promise<React.ReactElement>} The rendered InfiniteListingGrid component
 */
export default async function TattoosPage({ searchParams }) {
  const serverLoadedTattoos = await TattooService.getPaginated(
    searchParams,
    0,
    initialDataSize,
  );

  const currentUser = await getCurrentUser();

  if (serverLoadedTattoos.length < 1) {
    return <EmptyTattoos />;
  }

  return (
    <>
      <GridHeader
        title={`Descubre tatuajes de artistas cerca de ti`}
        subtitle={`Explora por estilo, parte del cuerpo, o simplemente escribe lo que buscas`}
        contentSlug={""}
        filtro1={filtro1}
        // filtro2={filtro2}
      />
      <InfiniteListingGrid // to render an infinite scroll we need...
        initialData={serverLoadedTattoos} // the initial data coming from the server
        sizePerPage={sizePerPage} // the size of each page
        endpoint={endpoint} // the endpoint to fetch more data in a client component
        Component={TattooCard} // the component to render for each item
        keyProp="tattoo" // the key prop to use to identify each item
        currentUser={currentUser} // the current user to check if the user is logged in
      />
    </>
  );
}
