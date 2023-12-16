import { getCurrentUser } from "@/services/db/getCurrentUser";
import Container from "@/components/container";
import prisma from "@/lib/prismadb";
import TattooEditPageClient from "./TattooEditPageClient";
import { TattooService } from "@/services/db/TattooService";
import { OthersService } from "@/services/db/OthersService";
import { getSizes } from "@/lib/getSizes";

type props = {
    params: {
        tattooId: string;
    };
};

const TattooEditPage = async ({ params }: props) => {
    // We load user, styles and bodyParts in parallel to save time
    const currentUserPromise = getCurrentUser();
    const stylesPromise = OthersService.getStyles();
    const bodyPartsPromise = OthersService.getBodyParts();

    const [currentUser, styles, bodyParts] = await Promise.all([
        currentUserPromise,
        stylesPromise,
        bodyPartsPromise,
    ]);

    const sizes = getSizes();

    //   TODO: There is no auth here!!!

    const { tattooId } = params;
    let isNew = false;
    if (tattooId === "new") isNew = true;

    let tattoo: any = {};
    // if the tattoo is not new, we get it from the database
    // otherwise we just pass an empty object
    if (!isNew) {
        const dbTattoo = await TattooService.getById(tattooId);
        tattoo = dbTattoo;
    }

    return (
        <Container>
            <TattooEditPageClient
                tattoo={tattoo}
                styles={styles}
                bodyParts={bodyParts}
                sizes={sizes}
            />
        </Container>
    );
};
export default TattooEditPage;
