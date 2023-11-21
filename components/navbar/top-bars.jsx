"use client";

import Link from "next/link";
import TopBar from "./top-bar";
import { useContext } from "react";
import { UiContext } from "@/providers/ui/ui-provider";
import { Button } from "../ui/button";
import { isProfileComplete } from "@/lib/utils";

export function TopBars({ topbarShown, setTopbarShown, currentUser }) {
  const { setUserModalVariant } = useContext(UiContext);
  const { setLoginModalOpen } = useContext(UiContext);

  const isArtist = !!currentUser?.artist;
  const hasCompleteProfile = !!currentUser?.artist?.isComplete;
  const hasEnoughTattoos = !!(currentUser?.artist?.tattoos.length >= 3);

  // Not registered yet. We don't know if is potential artist or client
  if (!currentUser)
    return (
      <TopBar
        shown={topbarShown}
        setShown={setTopbarShown}
        className={"bg-primary text-primary-foreground"}
      >
        <p
          onClick={() => {
            setUserModalVariant("register");
            setLoginModalOpen(true);
          }}
          className="cursor-pointer"
        >
          <span className="underline">Regístrate</span> y contacta con tu
          tatuador
        </p>
      </TopBar>
    );

  if (currentUser && !isArtist) {
    return setTopbarShown(false);
  }

  if (isArtist && hasCompleteProfile && hasEnoughTattoos)
    return setTopbarShown(false);

  if (isArtist && !hasCompleteProfile)
    return (
      <TopBar
        shown={topbarShown}
        setShown={setTopbarShown}
        className={"bg-destructive text-destructive-foreground"}
      >
        <Link href={"/artist/profile"}>
          <p>
            <span className="underline">Completa tu perfil</span> para aparecer
            en TATTUO
          </p>
        </Link>
      </TopBar>
    );

  if (isArtist && !hasEnoughTattoos)
    return (
      <TopBar
        shown={topbarShown}
        setShown={setTopbarShown}
        className={"bg-destructive text-destructive-foreground"}
      >
        <Link href={"/artist/tatuajes"}>
          <p>Publica 3 tatuajes y haz visible tu perfil</p>
        </Link>
      </TopBar>
    );
}
