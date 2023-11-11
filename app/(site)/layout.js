// import { getCurrentUser } from "@/actions/getCurrentUser";
// import Footer from "@/components/footer/Footer";
import { getCurrentUser } from "@/services/db/getCurrentUser";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar/nav-bar";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Container from "@/components/ui/container";
// import Container from "@/components/ui/Container";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "TATTUO · Encuentra los mejores tatuadores cerca de ti",
  description:
    "Seleccionamos los mejores tatuadores de tu ciudad para que hagas realidad ese tatuaje qué tanto tiempo llevas buscando",
};

const SiteLayout = async ({ children }) => {
  const user = await getCurrentUser();

  // REVIEW: why not passing current user to children through the layout?
  return (
    <div className="flex min-h-screen flex-col justify-between ">
      <NavBar currentUser={user} />
      <div className="w-full flex-grow bg-background p-0 pb-20 pt-16 text-foreground sm:p-8 sm:pt-16">
        <Container>
          {/* <Container> */}
          {children}
          {/* </Container> */}
        </Container>
      </div>
      <Footer />
    </div>
  );
};
export default SiteLayout;
