import { getCurrentUser } from "@/services/db/getCurrentUser";
import { EmptyTattoos } from "@/components/empty-states/empty-tattoos";
import ListingGrid from "@/components/listings/listing-grid";
import TattooCard from "@/components/listings/tattoo-card";
import Container from "@/components/ui/container";
import { getBodyParts } from "@/lib/getBodyParts";
import { getStyleList } from "@/lib/getStyleList";
import { capitalizeFirst } from "@/lib/utils";
import { notFound } from "next/navigation";
import { TattoosGridHeader } from "../components/tattoos-grid-header";
import { TattooService } from "@/services/db/TattooService";
export const dynamic = "force-dynamic";

export const generatedContentSlugs = [
  "mariposa",
  "tribal",
  "estrella",
  "goku",
  "arbol",
];

export const generateMetadata = async ({ params }) => {
  const { contentSlug } = params;

  return {
    title: `Tatuajes de ${capitalizeFirst(contentSlug)}`,
    description: `Descubre tatuajes de ${capitalizeFirst(
      contentSlug,
    )} en nuestra galería de tatuajes. Explora por estilo, parte del cuerpo, o simplemente escribe lo que buscas`,
  };
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

const endpoint =
  process.env.NODE_ENV === "production"
    ? `${process.env.HOST_NAME_PROD}/api/tattoos`
    : `${process.env.HOST_NAME_DEV}/api/tattoos`;
const sizePerPage = 5;
const numberOfPagesToLoad = 1;
const initialDataSize = numberOfPagesToLoad * sizePerPage;

/**
 * TattoosPage component
 *
 * @param {Object} props - The props for the InfiniteListingGrid component
 * @param {string} props.searchParams - The component to render
 *
 * @returns {Promise<React.ReactElement>} The rendered InfiniteListingGrid component
 */
export default async function TattoosPage({ params, searchParams }) {
  const { contentSlug } = params;

  const isGeneratedContentSlug = generatedContentSlugs.includes(
    params.contentSlug,
  );

  if (!isGeneratedContentSlug) {
    console.log("NOT FOUD CALLED");
    notFound();
  }

  const serverLoadedTattoos = await TattooService.getPaginated(
    {
      ...searchParams,
      contentSlug,
    },
    0,
    initialDataSize,
  );

  const currentUser = await getCurrentUser();

  if (serverLoadedTattoos.length < 1) {
    return <EmptyTattoos filtro1={filtro1} filtro2={filtro2} />;
  }

  return (
    <Container>
      {/* <InfiniteListingGrid // to render an infinite scroll we need...
              initialData={serverLoadedTattoos} // the initial data coming from the server
              sizePerPage={sizePerPage} // the size of each page
              endpoint={endpoint}  // the endpoint to fetch more data in a client component
              Component={TattooCard} // the component to render for each item
              keyProp="tattoo" // the key prop to use to identify each item
              currentUser={currentUser} // the current user to check if the user is logged in
          /> */}

      <TattoosGridHeader
        filtro1={filtro1}
        filtro2={filtro2}
        contentSlug={contentSlug}
      />
      <ListingGrid>
        {serverLoadedTattoos.map((tattoo) => (
          <TattooCard key={tattoo.id} data={tattoo} currentUser={currentUser} />
        ))}
      </ListingGrid>
    </Container>
  );
}
