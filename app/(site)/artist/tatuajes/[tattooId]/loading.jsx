import Heading from "@/components/heading";
import ListingGrid from "@/components/listings/listing-grid";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { range } from "@/lib/utils";
export const dynamic = "force-dynamic";

const MyTattoosPage = async ({ params }) => {
  return (
    <>
      <Heading
        title={"Tus tatuajes publicados"}
        subtitle={
          "Añade más tatuajes para que te vean más y conseguir nuevos clientes"
        }
        url={"/artist/tatuajes/new"}
        buttonLabel={"Nuevo Tatuaje"}
      />
      <Separator className="my-5" />

      <>
        {range(3).map((el, i) => (
          <Skeleton className={"h-8 w-80 "} key={i} />
        ))}
      </>
    </>
  );
};

export default MyTattoosPage;
