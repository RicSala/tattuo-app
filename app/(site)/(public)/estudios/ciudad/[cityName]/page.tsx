import { getStyleList } from "@/lib/getStyleList";
import { EmptyArtist } from "@/app/(site)/(public)/tatuadores/components/empty-artists";
import { GridHeader } from "@/components/grid-header";
import ListingGrid from "@/components/listings/listing-grid";
import StudioCard from "@/components/listings/studio-card";
import { StudioService } from "@/services/db/StudioService";
import { Studio, studioGoogleProfile } from "@prisma/client";
import { generatedCities } from "@/config/constants";
import { notFound } from "next/navigation";

const endpoint =
  process.env.NODE_ENV === "production"
    ? `${process.env.HOST_NAME_PROD}/api/artists`
    : `${process.env.HOST_NAME_DEV}/api/artists`;

const numberOfPagesToLoad: number | undefined = 1;
const sizePerPage: number | undefined = 5;
const initialDataSize: number | undefined = undefined;
// numberOfPagesToLoad * sizePerPage;
const styles = getStyleList();
const cities = generatedCities;

const filtro1 = {
  label: "Estilos",
  value: "styles",
  options: styles,
};

const filtroCity = {
  label: "Ciudad",
  value: "cities",
  options: cities,
};

export const metadata = {
  title: `Los mejores tatuadores de tu ciudad`,
  description:
    "Encuentra tatuadores cerca de ti buscando por tatuajes, por estilo, por ciudad... Y contáctales cuando quieras totalmente GRATIS",
};

export default async function StudiosPage({
  searchParams,
  params,
}: {
  searchParams: Record<string, string>;
  params: Record<string, string>;
}) {
  const { cityName } = params;

  const city = cities.find((item) => item.city === cityName);
  if (!city) {
    return notFound();
  }

  type WithGoogleProfile<T> = T & {
    studioGoogleProfile: studioGoogleProfile;
  };

  type StudioWithGoogleProfile = WithGoogleProfile<Studio>;

  const studios = (await StudioService.getPaginated(
    {
      ...searchParams,
      city: cityName,
    },
    0,
    // TODO: ojo!
    initialDataSize,
    {
      studioGoogleProfile: true,
    },
  )) as StudioWithGoogleProfile[];
  if (studios.length < 1) {
    return <EmptyArtist />;
  }

  return (
    <>
      <GridHeader
        title={`Los mejores estudios de tatuaje de ${params.cityName}`}
        subtitle={`Explora por estilo, o simplemente escribe lo que buscas`}
        contentSlug={""}
        // filtro1={filtro1}
        // filtroCities={filtroCity}
      />
      <ListingGrid>
        {studios.map((studio) => (
          <StudioCard key={studio.id} studio={studio} />
          //   <div key={studio.id}>
          //     <p>{studio.name}</p>
          //     <p>{studio.studioGoogleProfile.rating}</p>
          //     <p>{studio.studioGoogleProfile.reviewCount}</p>
          //     <p>{studio.studioGoogleProfile.website}</p>
          //     <Image
          //       src={studio.studioGoogleProfile.imgUrl}
          //       alt={studio.name}
          //       width={100}
          //       height={100}
          //     />
          //   </div>
        ))}
      </ListingGrid>

      {/* <div className="mt-10 flex flex-col gap-3">
      <h2>Encuentra tatuador en {cityName}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: generatedCities.find((item) => item.city === cityName).text,
        }}
      ></div>
    </div> */}
    </>
  );
}
