"use client";

import { LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import MenuItem from "../ui/menu-item";
import {
  artistMenuItems,
  clientMenuItems,
  visitorMenuItems,
} from "@/config/const";
import { Separator } from "../ui/separator";
import Logo from "./logo";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { signOut } from "next-auth/react";
import { UiContext } from "@/providers/ui/ui-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import CoolLoginButton from "../cool-login-button";

export default function Sidebar({ currentUser }) {
  const {
    setLoginModalOpen,
    sidebarOpen,
    setSidebarOpen,
    setArtistRegisterOpen,
  } = useContext(UiContext);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const incompleteProfile = !currentUser?.artist?.isComplete;
  const notEnoughTattoos = currentUser?.artist?.tattoos?.length < 3;
  const notifications =
    currentUser?.artistProfile && (incompleteProfile || notEnoughTattoos);

  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen} className="">
      <SheetTrigger asChild className="">
        <div className="relative" id="hamb-menu">
          <Menu
            className="cursor-pointer"
            onClick={() => {
              setSidebarOpen(true);
            }}
          />
          {notifications ? (
            <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              <p>1</p>
            </div>
          ) : null}
        </div>
      </SheetTrigger>
      <SheetContent className={"flex flex-col justify-start"}>
        <div className="my-2 flex flex-col" id="sidebar-content">
          <SheetHeader>
            <SheetTitle asChild>
              <Logo />
            </SheetTitle>
            <SheetDescription className="hidden sm:block">
              Descubre nuevos tatuadores. Guarda inspiración. Contacta con
              ellos. Bienvenidx a TATTUO
            </SheetDescription>
          </SheetHeader>

          <Separator className="my-1" />
          {visitorMenuItems.map((el) => (
            <MenuItem
              label={el.label}
              onClick={() => {
                router.push(el.url);
                setSidebarOpen(false);
              }}
              onMouseEnter={() => {
                router.prefetch(el.url);
              }}
              key={el.label}
            />
          ))}
          {currentUser?.role === "ARTIST" || currentUser?.role === "ADMIN" ? (
            <>
              <Separator className="my-1" />
              {artistMenuItems.map((el) => (
                <MenuItem
                  warningIcon={
                    (incompleteProfile && el.id === "profile") ||
                    (notEnoughTattoos && el.id === "tattoos")
                      ? el.warningIcon
                      : null
                  }
                  label={el.label}
                  onClick={() => {
                    router.push(el.url);
                    setSidebarOpen(false);
                  }}
                  key={el.label}
                  onMouseEnter={() => {
                    router.prefetch(el.url);
                  }}
                  warningMessage={el.warningMessage}
                />
              ))}
            </>
          ) : null}
          {
            <>
              <Separator className="my-1" />
              <div className="relative">
                {clientMenuItems.map((el) => (
                  <MenuItem
                    label={el.label}
                    onClick={() => {
                      router.push(el.url);
                      setSidebarOpen(false);
                    }}
                    onMouseEnter={() => {
                      router.prefetch(el.url);
                    }}
                    key={el.label}
                  />
                ))}

                {!currentUser ? (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="absolute left-0 top-0 h-full w-full cursor-pointer rounded-md border border-accent bg-muted/50"
                          onClick={() => {
                            setLoginModalOpen(() => true);
                          }}
                        ></div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="flex flex-col items-center justify-center">
                          <p>Entra a tu cuenta para acceder</p>
                          <CoolLoginButton />
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : null}
              </div>
            </>
          }

          <Separator className="my-1" />
        </div>
        <SheetFooter className={"mt-auto"}>
          <div className="h-full w-full text-center">
            {currentUser ? (
              <Button
                variant="ghost"
                className="flex flex-row justify-center gap-2"
                onClick={() => {
                  signOut();
                  router.refresh();
                }}
              >
                <LogOut />
                <p>Salir de mi cuenta</p>
              </Button>
            ) : (
              <div className="flex flex-col justify-between">
                <div className="flex flex-col items-center space-y-3">
                  <p>
                    Para poder guardar tus favoritos y contactar con los
                    artistas
                  </p>
                  <CoolLoginButton />
                </div>
                <div className="mt-5 flex flex-col items-center text-primary/70">
                  <p>¿Y si eres tatuador?</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setArtistRegisterOpen(true);
                    }}
                    className="w-fit"
                  >
                    Regístrate
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
