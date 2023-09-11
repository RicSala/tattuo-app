import { getCurrentUser } from "@/actions/getCurrentUser"
import Heading from "@/components/heading"
import FinderClient from "./finder-client"

export default function FinderPage({
    children,
    ...props
}) {
    const currentUser = getCurrentUser()

    return (
        <>
            <Heading title="Encuentra tu tatuador@"
                subtitle="Encuentra y guarda lxs artistas que más te gustan"
            />
            <FinderClient currentUser={currentUser} />
        </>
    )
}