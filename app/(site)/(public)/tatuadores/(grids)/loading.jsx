import ListingGrid from "@/components/listings/listing-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { range } from "@/lib/utils";
// export const dynamic = "force-dynamic";

//TODO:
// SITEMAP
// ROBOTS.TXT [x]

export const metadata = {
  title: "Los mejores tatuadores de tu ciudad",
  description:
    "Encuentra tatuadores cerca de ti buscando por tatuajes, por estilo, por ciudad... Y contáctales cuando quieras totalmente GRATIS",
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
