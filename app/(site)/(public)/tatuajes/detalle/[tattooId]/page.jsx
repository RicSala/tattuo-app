import { getCurrentUser } from "@/services/db/getCurrentUser";
import ListingGrid from "@/components/listings/listing-grid";
import TattooCard from "@/components/listings/tattoo-card";
import { notFound } from "next/navigation";
import { TattooService } from "@/services/db/TattooService";
import { TattooDetails } from "./components/tattoo-details";

const TattooDetailsPage = async ({ params }) => {
    // TODO: Head for SEO (title, description, etc)
    // TODO: rss feed (https://nextjs.org/docs/app/building-your-application/routing/router-handlers#non-ui-responses)
    // REVIEW: what is turbopack?

    // const tattoo = await getTattoosById(params.tattooId);
    // const similarTattoos = await TattooService.getSimilarTattoos(tattoo);
    // const currentUser = await getCurrentUser();
    // let's change the preview to a promise.all to get all the data at once in parallel

    const tattooPromise = TattooService.getById(params.tattooId);
    const currentUserPromise = getCurrentUser();
    const [tattoo, currentUser] = await Promise.all([
        tattooPromise,
        currentUserPromise,
    ]);
    const similarTattoos = await TattooService.getSimilar(tattoo);

    console.log("tattoo", tattoo);

    if (!tattoo) {
        return notFound();
    }

    return (
        <div className="">
            <TattooDetails tattoo={tattoo} currentUser={currentUser} />
            <h2 className="mb-4 mt-20">También te pueden gustar...</h2>
            {similarTattoos?.length > 0 && (
                <ListingGrid>
                    {similarTattoos.map((tattoo) => (
                        <TattooCard
                            data={tattoo}
                            currentUser={currentUser}
                            key={tattoo.id}
                        />
                    ))}
                </ListingGrid>
            )}
        </div>
    );
};

export default TattooDetailsPage;
