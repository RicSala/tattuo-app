import ListingGrid from "@/components/listings/listing-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { range } from "@/lib/utils";
// export const dynamic = "force-dynamic";

//TODO:
// SITEMAP
// ROBOTS.TXT [x]

export const metadata = {
  title: "TATTUO · Descubre Tatuajes de todos los estilos",
  description:
    "Seleccionamos los mejores tatuadores de tu ciudad para que hagas realidad ese tatuaje que tanto tiempo llevas buscando",
};

export default async function TattoosPage({ searchParams }) {
  return (
    <ListingGrid>
      {range(10).map((el, i) => (
        <Skeleton className={"h-80 w-80"} key={i} />
      ))}
    </ListingGrid>
  );
}
