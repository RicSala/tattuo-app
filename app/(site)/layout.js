// import { getCurrentUser } from "@/actions/getCurrentUser";
// import Footer from "@/components/footer/Footer";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Footer from "@/components/fotter";
import NavBar from "@/components/navbar/nav-bar";
import Container from "@/components/ui/container";
// import Container from "@/components/ui/Container";

const SiteLayout = async ({ children }) => {

    const user = await getCurrentUser();

    // REVIEW: why not passing current user to children through the layout?
    return (

        <div className="flex flex-col min-h-screen justify-between ">
            <NavBar

                currentUser={user}

            />
            <div className="pb-20 sm:pt-32 pt-20 w-full bg-background text-foreground flex-grow p-2 sm:p-8">
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