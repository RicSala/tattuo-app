// import { getCurrentUser } from "@/actions/getCurrentUser";
// import Footer from "@/components/footer/Footer";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Footer from "@/components/fotter";
import NavBar from "@/components/navbar/nav-bar";
import Container from "@/components/ui/container";
// import Container from "@/components/ui/Container";
export const dynamic = "force-dynamic";


const SiteLayout = async ({ children }) => {

    const user = await getCurrentUser();

    // REVIEW: why not passing current user to children through the layout?
    return (

        <div className="flex flex-col justify-between min-h-screen ">
            <NavBar currentUser={user}

            />
            <div className="flex-grow w-full p-2 pt-20 pb-20 sm:pt-32 bg-background text-foreground sm:p-8">
                <Container>

                    {/* <Container> */}
                    {children}
                    {/* </Container> */}
                </Container>
            </div>
            <Footer />
        </div>

    )
};
export default SiteLayout;