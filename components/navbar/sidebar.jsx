'use client'

import { LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import MenuItem from "../ui/menu-item";
import { artistMenuItems, clientMenuItems, visitorMenuItems } from "@/lib/const";
import { Separator } from "../ui/separator";
import Logo from "./logo";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { signOut } from 'next-auth/react';
import { UiContext } from "@/providers/ui/ui-provider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import CoolLoginButton from "../cool-login-button";


export default function Sidebar({
    currentUser
}) {

    const { setLoginModalOpen, sidebarOpen, setSidebarOpen, setArtistRegisterOpen } = useContext(UiContext)

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const notifications = !currentUser?.artist?.isComplete
    // && other conditions


    return (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen} className="">
            <SheetTrigger asChild className="">
                <div className="relative">
                    <Menu className="cursor-pointer"
                        onClick={() => { setSidebarOpen(true) }} />
                    {
                        notifications ?
                            <div className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-1"><p>1</p></div>
                            : null
                    }
                </div>
            </SheetTrigger>
            <SheetContent className={"flex flex-col justify-start"}>
                <div className="flex flex-col my-2">
                    <SheetHeader>
                        <SheetTitle asChild><Logo /></SheetTitle>
                        <SheetDescription className="hidden sm:block">
                            Descubre nuevos tatuadores. Guarda inspiración. Contacta con ellos.
                            Bienvenidx a TATTUO
                        </SheetDescription>
                    </SheetHeader>
                    {
                        currentUser?.role === 'ARTIST' ?
                            <>

                                <Separator className="my-2 sm:my-5" />
                                {
                                    artistMenuItems.map((el) => (
                                        <MenuItem
                                            warningIcon={!currentUser?.artist?.isComplete ? el.warningIcon : null}
                                            label={el.label}
                                            onClick={() => {
                                                router.push(el.url)
                                                setSidebarOpen(false)
                                            }} key={el.label}
                                            onMouseEnter={() => {
                                                router.prefetch(el.url)
                                            }
                                            }

                                        />
                                    ))
                                }
                            </>
                            :
                            null
                    }
                    {
                        <>

                            <Separator className="my-1" />
                            <div className="relative">

                                {
                                    clientMenuItems.map((el) => (
                                        <MenuItem label={el.label} onClick={() => {
                                            router.push(el.url)
                                            setSidebarOpen(false)
                                        }}
                                            onMouseEnter={() => { router.prefetch(el.url) }}
                                            key={el.label} />
                                    ))
                                }

                                {
                                    !currentUser ?
                                        <TooltipProvider delayDuration={100}>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="absolute top-0 left-0 w-full h-full border rounded-md cursor-pointer border-accent bg-muted/50"
                                                        onClick={() => {
                                                            setLoginModalOpen(() => true)
                                                        }}
                                                    >
                                                    </div>

                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <div className="flex flex-col items-center justify-center">

                                                        <p>Entra a tu cuenta para acceder</p>
                                                        <CoolLoginButton />
                                                    </div>

                                                </TooltipContent>

                                            </Tooltip>
                                        </TooltipProvider>
                                        :
                                        null
                                }
                            </div>
                        </>

                    }

                    <Separator className="my-1" />
                    {
                        visitorMenuItems.map((el) => (
                            <MenuItem label={el.label} onClick={() => {
                                router.push(el.url)
                                setSidebarOpen(false)
                            }}
                                onMouseEnter={() => { router.prefetch(el.url) }}
                                key={el.label} />
                        ))
                    }
                    <Separator className="my-1" />

                </div>
                <SheetFooter className={"mt-auto"}>
                    <div className="w-full h-full text-center">

                        {
                            currentUser ?
                                <Button variant="ghost" className="flex flex-row justify-center gap-2"
                                    onClick={() => {
                                        signOut()
                                        router.refresh()
                                    }}>
                                    <LogOut />
                                    <p>Salir de mi cuenta</p>
                                </Button>
                                :
                                <div className="flex flex-col justify-between">
                                    <div className="flex flex-col items-center space-y-3">
                                        <p>Para poder guardar tus favoritos y contactar con los artistas</p>
                                        <CoolLoginButton />

                                    </div>
                                    <div className="flex flex-col items-center mt-5 text-primary/70">
                                        <p>
                                            ¿Y si eres tatuador?
                                        </p>
                                        <Button variant="outline"
                                            onClick={() => {
                                                console.log("clicked")
                                                setArtistRegisterOpen(true)
                                            }}
                                            className="w-fit">Regístrate</Button>
                                    </div>
                                </div>
                        }
                    </div>

                </SheetFooter>
            </SheetContent>


        </Sheet>

    );
}