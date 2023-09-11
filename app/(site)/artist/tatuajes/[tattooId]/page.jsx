import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/components/ui/container";
import prisma from "@/lib/prismadb";
import TattooEditPageClient from "./TattooEditPageClient";


const TattooEditPage = async ({
    // currentUser //REVIEW: why not passing current user to children through the layout?
    params }) => {

    // We load user, styles and bodyParts in parallel to save time
    const currentUserPromise = getCurrentUser()
    const stylesPromise = prisma.style.findMany()
    const bodyPartsPromise = prisma.bodyPart.findMany()

    const [currentUser, styles, bodyParts] = await Promise.all([currentUserPromise, stylesPromise, bodyPartsPromise])

    if (!currentUser) //TODO: redirect to login (HOW?) if user is not logged in
        return <div>Not logged in</div>

    const { tattooId } = params
    let isNew = false
    if (tattooId === "new") isNew = true




    let tattoo = {}
    // if the tattoo is not new, we get it from the database
    // otherwise we just pass an empty object
    if (!isNew) {
        tattoo = await prisma.tattoo.findUnique({
            where: {
                id: tattooId
            },
            include: {
                artistProfile: true,
                style: true,
                bodyPart: true,
                tags: {
                    include: { tag: true }
                }
            }
        })
    }


    return (

        <Container>
            <TattooEditPageClient tattoo={tattoo} currentUser={currentUser}
                styles={styles} bodyParts={bodyParts}
                isNew={isNew}
            />
        </Container>
    )
};
export default TattooEditPage;