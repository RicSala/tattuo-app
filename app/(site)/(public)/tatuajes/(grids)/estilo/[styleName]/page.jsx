import { EmptyTattoos } from "@/app/(site)/(public)/tatuajes/components/empty-tattoos";
import ListingGrid from "@/components/listings/listing-grid";
import TattooCard from "@/components/listings/tattoo-card";
import { getBodyParts } from "@/lib/getBodyParts";
import { getStyleList, mapValueToLabel } from "@/lib/getStyleList";
import { capitalizeFirst, sanitize } from "@/lib/utils";
import { notFound } from "next/navigation";
import { TattooService } from "@/services/db/TattooService";
import { GridHeader } from "@/components/grid-header";
import CustomQueryClientProvider from "@/providers/query-client-provider";
import { InfiniteScroll } from "@/components/listings/infinite-scroll";
import Breadcrumbs from "@/components/breadcrumbs";

export const generateMetadata = async ({ params }) => {
    const { styleName } = params;

    return {
        title: `Tatuajes de ${capitalizeFirst(styleName)}`,
        description: `Descubre tatuajes de ${capitalizeFirst(
            styleName,
        )} en nuestra galería de tatuajes. Explora por estilo, parte del cuerpo, o simplemente escribe lo que buscas`,
    };
};

const styles = getStyleList();
// const cities = getCities();
const bodyParts = getBodyParts();

const filtro1 = {
    label: "Estilos",
    value: "styles",
    options: styles,
};

// const filtro2 = {
//   label: "Parte del cuerpo",
//   value: "bodyPart",
//   options: bodyParts,
// };

// It's gonna be used in build time
export const generateStaticParams = () => {
    return getStyleList().map((item) => {
        return {
            styleName: item.value,
        };
    });
};

//"error" Force static rendering and cache the data of a layout or page by causing an error if any components use dynamic functions or uncached data. This option is equivalent to:
export const dynamic = "error";

// true (default): Dynamic segments not included in generateStaticParams are generated on demand.
// false: Dynamic segments not included in generateStaticParams will return a 404.
export const dynamicParams = false; // true | false,

// false | 'force-cache' | 0 | number
export const revalidate = 86400; // 24 hours

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
export default async function TattoosPage({ params, searchParams }) {
    const { styleName } = params;
    const endpoint =
        process.env.NODE_ENV === "production"
            ? `${process.env.HOST_NAME_PROD}/api/tattoos/estilo/${styleName}`
            : `${process.env.HOST_NAME_DEV}/api/tattoos/estilo/${styleName}`;

    const isGeneratedStyle = getStyleList()
        .map((item) => item.value)
        .includes(styleName);
    if (!isGeneratedStyle) {
        notFound();
    }

    const label = mapValueToLabel(styleName);

    const serverLoadedTattoos = await TattooService.getPaginated(
        {
            ...searchParams,
            // we are modifying the searchParams to add the styles string
            styles: label,
        },
        0,
        // TODO: ojo!
        initialDataSize,
    );

    if (serverLoadedTattoos.length < 1) {
        return <EmptyTattoos />;
    }

    const breadcrumbs = [
        {
            label: "Inicio",
            path: "/",
        },
        {
            label: "Tatuajes",
            path: "/tatuajes",
        },
        {
            label: `${capitalizeFirst(label)}`,
            path: `/tatuajes/estilo/${styleName}`,
        },
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbs} />
            <GridHeader
                title={`Tatuajes estilo ${label}`}
                subtitle={`Explora por estilo, parte del cuerpo, o simplemente escribe lo que buscas`}
                contentSlug={""}
                filtro1={filtro1}
                freeSearch={true}
                // filtro2={filtro2}
            />

            <ListingGrid>
                <CustomQueryClientProvider>
                    <InfiniteScroll
                        endpoint={endpoint}
                        initialData={serverLoadedTattoos}
                        sizePerPage={sizePerPage}
                        keyProp={`tattoo-${styleName}`}
                        Component={TattooCard}
                        hasMore={serverLoadedTattoos.length >= sizePerPage}
                        altSubstring={styleName}
                    />
                </CustomQueryClientProvider>
            </ListingGrid>

            <div className="mt-10 flex flex-col gap-3">
                <h2>Tatuajes de estilo {label}</h2>
                <div
                    dangerouslySetInnerHTML={{
                        __html: getStyleList().find(
                            (item) =>
                                sanitize(item.value.toLowerCase()) ===
                                styleName.toLowerCase(),
                        ).text,
                    }}
                ></div>
            </div>
        </>
    );
}
