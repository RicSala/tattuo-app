"use client";

import Link from "next/link";
import TopBar from "./top-bar";
import { useContext } from "react";
import { UiContext } from "@/providers/ui/ui-provider";
import { Button } from "../ui/button";

export function TopBars({ topbarShown, setTopbarShown, currentUser }) {
  const { setUserModalVariant } = useContext(UiContext);
  const { setLoginModalOpen } = useContext(UiContext);
  return (
    <>
      {!currentUser && (
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
      )}

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
              <p>
                <span className="underline">Completa tu perfil</span> para
                aparecer en TATTUO
              </p>
            </Link>
          ) : currentUser?.artist?.tattoos.length < 3 ? (
            <Link href={"/artist/tatuajes"}>
              <p>Publica al menos 3 piezas para hacer visible tu perfil</p>
            </Link>
          ) : (
            ""
          )}
        </TopBar>
      ) : null}
    </>
  );
}
