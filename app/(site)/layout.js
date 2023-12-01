import Footer from "@/components/footer";
import NavBar from "@/components/navbar/nav-bar";
import Container from "@/components/ui/container";
// import Container from "@/components/ui/Container";
// export const dynamic = "force-dynamic";

export const metadata = {
  title: "TATTUO · Encuentra los mejores tatuadores cerca de ti",
  description:
    "Seleccionamos los mejores tatuadores de tu ciudad para que hagas realidad ese tatuaje que tanto tiempo llevas buscando",
};

const SiteLayout = async ({ children }) => {
  // REVIEW: why not passing current user to children through the layout?
  return (
    <div className="flex min-h-screen flex-col justify-between ">
      <NavBar />
      <div className="w-full flex-grow bg-background p-0 pb-20 pt-8 text-foreground sm:p-8 sm:pt-12">
        <Container>{children}</Container>
      </div>
      <Footer />
    </div>
  );
};
export default SiteLayout;
