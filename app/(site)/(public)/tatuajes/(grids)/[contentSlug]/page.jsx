import { EmptyTattoos } from "@/app/(site)/(public)/tatuajes/components/empty-tattoos";
import TattooCard from "@/components/listings/tattoo-card";
import { getBodyParts } from "@/lib/getBodyParts";
import { getStyleList } from "@/lib/getStyleList";
import { capitalizeFirst } from "@/lib/utils";
import { notFound } from "next/navigation";
import { TattooService } from "@/services/db/TattooService";
import { generatedContentSlugs } from "@/config/constants";
import { GridHeader } from "@/components/grid-header";
import ListingGrid from "@/components/listings/listing-grid";
import CustomQueryClientProvider from "@/providers/query-client-provider";
import { InfiniteScroll } from "@/components/listings/infinite-scroll";

export const generateMetadata = async ({ params }) => {
  const { contentSlug } = params;

  return {
    title: `Tatuajes de ${capitalizeFirst(contentSlug)}`,
    description: `Descubre tatuajes de ${capitalizeFirst(
      contentSlug,
    )} en nuestra galería de tatuajes. Explora por estilo, parte del cuerpo, o simplemente escribe lo que buscas`,
  };
};

// true (default): Dynamic segments not included in generateStaticParams are generated on demand.
// // false: Dynamic segments not included in generateStaticParams will return a 404.
// export const dynamicParams = true; // true | false,
// // false | 'force-cache' | 0 | number
// export const revalidate = 86400; // 24 hours
// export const dynamic = "error";

// // It's gonna be used in build time
// export const generateStaticParams = () => {
//   return generatedContentSlugs.map((item) => {
//     return {
//       contentSlug: item.content,
//     };
//   });
// };

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
  const isGeneratedContentSlug = generatedContentSlugs
    .map((item) => item.content)
    .includes(params.contentSlug);
  if (!isGeneratedContentSlug) {
    notFound();
  }

  const endpoint =
    process.env.NODE_ENV === "production"
      ? `${process.env.HOST_NAME_PROD}/api/tattoos/content/${contentSlug}`
      : `${process.env.HOST_NAME_DEV}/api/tattoos/content/${contentSlug}`;

  const serverLoadedTattoos = await TattooService.getPaginated(
    {
      ...searchParams,
      // TODO: How do we solve this so the content slug works better? Should probably return the same as a free
      freeSearch: contentSlug.slice(0, -1),
    },
    0,
    // TODO: ojo!
    initialDataSize,
  );

  if (serverLoadedTattoos.length < 1) {
    return <EmptyTattoos />;
  }

  return (
    <>
      <GridHeader
        title={`Descubre tatuajes de ${contentSlug}`}
        subtitle={`Explora por estilo, parte del cuerpo, o simplemente escribe lo que buscas`}
        contentSlug={""}
        filtro1={filtro1}
        freeSearch={false}
        // filtro2={filtro2}
      />

      <ListingGrid>
        <CustomQueryClientProvider>
          {/* @ts-ignore */}
          <InfiniteScroll
            endpoint={endpoint}
            initialData={serverLoadedTattoos}
            sizePerPage={sizePerPage}
            keyProp={`tattoo-${contentSlug}`}
            Component={TattooCard}
            hasMore={serverLoadedTattoos.length >= sizePerPage}
          />
        </CustomQueryClientProvider>
      </ListingGrid>
      <div className="mt-10 flex flex-col gap-3">
        <h2>Tatuajes de {contentSlug}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: generatedContentSlugs.find(
              (item) => item.content === contentSlug,
            ).text,
          }}
        ></div>
      </div>
    </>
  );
}
