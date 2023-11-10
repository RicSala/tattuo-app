"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Container from "../container";
import { ModeToggle } from "../mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Logo from "./logo";
import { NavMenu } from "./nav-menu";
import Sidebar from "./sidebar";
import TopBar from "./top-bar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { UiContext } from "@/providers/ui/ui-provider";
// import UserMenu from "./UserMenu";

function NavBar({ currentUser }) {
  const router = useRouter();
  const userTheme = currentUser?.settings?.darkMode || "light";
  const { setArtistRegisterOpen } = useContext(UiContext);

  const [topbarShown, setTopbarShown] = useState(true);

  const getAvatarFallbackText = (user) => {
    if (user?.name) {
      return user.name
        .split(" ")
        .slice(0, 2)
        .map((name) => name[0])
        .join("");
    }
    if (user?.email) {
      return user.email.split("@")[0][0].toUpperCase();
    }
    return null;
  };

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    // add an event listener that updates the state when the scroll position changes
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(!scrolled);
      }
    }; // end handleScroll
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      // clean up the event handler when the component unmounts
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Create a navBar component that will be used in the layout.js file
  return (
    // <Container>
    <div
      className={cn(
        `
                sticky -top-8 z-40 w-full
                `,
        !topbarShown && "top-0",
      )}
    >
      <TopBar shown={topbarShown} setShown={setTopbarShown}>
        this is a topbar message
      </TopBar>

      {currentUser &&
      (!currentUser?.artist?.isComplete ||
        currentUser?.artist?.tattoos.length < 3) ? (
        <TopBar
          shown={topbarShown}
          setShown={setTopbarShown}
          className={"bg-destructive text-destructive-foreground"}
        >
          {!currentUser?.artist?.isComplete ? (
            <Link href={"/artist/profile"}>
              Completa tu perfil para aparecer en TATTUO
            </Link>
          ) : currentUser?.artist?.tattoos.length < 3 ? (
            <Link href={"/artist/tatuajes"}>
              Publica al menos 3 piezas para hacer visible tu perfil
            </Link>
          ) : (
            ""
          )}
        </TopBar>
      ) : null}

      <div
        className={`${
          scrolled ? "shadow-sm" : null
        } bg-background transition-shadow`}
      >
        <Container>
          <header className="mx-auto flex flex-row items-center  justify-between gap-3 md:gap-0">
            <div className="flex flex-row items-center justify-between gap-5">
              <Logo />

              <div className="hidden sm:flex">
                <NavMenu currentUser={currentUser} />
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-2 ">
              {currentUser ? (
                <Avatar
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/artist/profile");
                  }}
                >
                  <AvatarImage
                    src={
                      currentUser?.image ||
                      currentUser?.artist?.mainImage ||
                      undefined
                    }
                  />
                  <AvatarFallback>
                    {getAvatarFallbackText(currentUser)}
                  </AvatarFallback>
                </Avatar>
              ) : null}
              {!currentUser && (
                <Button
                  onClick={() => {
                    setArtistRegisterOpen(true);
                  }}
                  variant="ghost"
                  className="opacity-50"
                >
                  Soy tatuador
                </Button>
              )}
              <ModeToggle userTheme={userTheme} />
              <Sidebar className="bg-neutral" currentUser={currentUser} />
            </div>
          </header>
        </Container>
        {/* <Categories /> */}
      </div>
    </div>
    // </Container>
  );
}

export default NavBar;
