import { getStyleList } from "@/lib/getStyleList";
import { EmptyArtist } from "@/app/(site)/(public)/tatuadores/components/empty-artists";
import { GridHeader } from "@/components/grid-header";
import ListingGrid from "@/components/listings/listing-grid";
import StudioCard from "@/components/listings/studio-card";
import { StudioService } from "@/services/db/StudioService";
import { Studio, studioGoogleProfile } from "@prisma/client";
import { generatedCities } from "@/config/const";
import Breadcrumbs from "@/components/breadcrumbs";
import { Filter } from "@/types";

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
} satisfies Filter;

const filtroCity = {
    label: "Ciudad",
    value: "cities",
    options: cities,
} satisfies Filter;

export const metadata = {
    title: "Los mejores tatuadores de tu ciudad",
    description:
        "Encuentra tatuadores cerca de ti buscando por tatuajes, por estilo, por ciudad... Y contáctales cuando quieras totalmente GRATIS",
};

const breadcrumbs = [
    {
        label: "Inicio",
        path: "/",
    },
    {
        label: "Estudios",
        path: "/estudios",
    },
];

export default async function StudiosPage({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) {
    type WithGoogleProfile<T> = T & {
        studioGoogleProfile: studioGoogleProfile;
    };

    type StudioWithGoogleProfile = WithGoogleProfile<Studio>;

    const studios = (await StudioService.getPaginated(
        {
            ...searchParams,
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
    //   const serverLoadedArtists = studios.slice(0, initialDataSize);
    //   const serverHasMoreArtists = studios.length > initialDataSize;

    return (
        <>
            <Breadcrumbs items={breadcrumbs} />
            <GridHeader
                title={`Los mejores estudios de tatuaje cerca de ti`}
                subtitle={`Explora por estilo, o simplemente escribe lo que buscas`}
                contentSlug={""}
                // filtro1={filtro1}
                filtroCities={filtroCity}
            />
            <ListingGrid>
                {studios.map((studio) => (
                    <StudioCard key={studio.id} studio={studio} />
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
