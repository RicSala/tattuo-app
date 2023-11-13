// import { getCurrentUser } from "@/actions/getCurrentUser";
// import Footer from "@/components/footer/Footer";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar/nav-bar";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Container from "@/components/ui/container";
import { getCurrentUser } from "@/services/db/getCurrentUser";
// import Container from "@/components/ui/Container";
export const dynamic = "force-dynamic";


export const metadata = {
    title: 'TATTUO · Encuentra los mejores tatuadores cerca de ti',
    description: 'Seleccionamos los mejores tatuadores de tu ciudad para que hagas realidad ese tatuaje qué tanto tiempo llevas buscando',
}

const SiteLayout = async ({ children }) => {

    const user = await getCurrentUser();

    // REVIEW: why not passing current user to children through the layout?
    return (

        <div className="flex flex-col justify-between min-h-screen ">
            <NavBar currentUser={user} />
            <div className="flex-grow w-full p-0 pt-16 pb-20 sm:pt-16 bg-background text-foreground sm:p-8">
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