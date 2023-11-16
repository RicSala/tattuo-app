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
import { TopBars } from "./top-bars";
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
                sticky top-0 z-40 w-full
                `,
        topbarShown && "-top-8",
      )}
    >
      <TopBars
        currentUser={currentUser}
        topbarShown={topbarShown}
        setTopbarShown={setTopbarShown}
      />
      <div
        className={`${
          scrolled ? "shadow-sm" : null
        } bg-background transition-shadow`}
      >
        <Container>
          <header className="mx-auto flex flex-row items-center  justify-between gap-3 md:gap-0">
            <div className="flex flex-row items-center justify-between gap-5">
              <Logo />

              <div className="hidden md:flex">
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
                    src={currentUser?.image || currentUser?.artist?.mainImage}
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
                  className="text-xs opacity-50"
                >
                  Soy tatuador
                </Button>
              )}
              {/* <ModeToggle userTheme={userTheme} /> */}
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
