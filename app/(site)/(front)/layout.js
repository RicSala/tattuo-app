// import { getCurrentUser } from "@/actions/getCurrentUser";
// import Footer from "@/components/footer/Footer";

const FrontLayout = async ({ children }) => {

    // REVIEW: why not passing current user to children through the layout?
    return (

        <div className="flex flex-col justify-between">
            <div className="">
                {/* <Container> */}
                {children}
                {/* </Container> */}
            </div>
            {/* <Footer /> */}
        </div>

    )
};
export default FrontLayout;