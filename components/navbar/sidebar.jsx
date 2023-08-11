'use client'

import { LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import MenuItem from "../ui/menu-item";
import { artistMenuItems, clientMenuItems } from "@/lib/const";
import { Separator } from "../ui/separator";
import Logo from "./logo";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { signOut } from 'next-auth/react';
import { UiContext } from "@/providers/ui/ui-provider";


export default function Sidebar({
    currentUser
}) {


    const { setLoginModalOpen, sidebarOpen, setSidebarOpen, setArtistRegisterOpen } = useContext(UiContext)

    const router = useRouter()


    return (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild className="">
                <Menu className="cursor-pointer"
                    onClick={() => { setSidebarOpen(true) }} />
            </SheetTrigger>
            <SheetContent className={"flex flex-col justify-between"}>
                <div className="flex flex-col my-2">
                    <SheetHeader>
                        <SheetTitle asChild><Logo /></SheetTitle>
                        <SheetDescription>
                            Descubre nuevos tatuadores. Guarda inspiración. Contacta con ellos.
                            Bienvenidx a TATTUO
                        </SheetDescription>
                    </SheetHeader>
                    <Separator className="my-5" />
                    {
                        artistMenuItems.map((el) => (
                            <MenuItem label={el.label} onClick={() => {
                                router.push(el.url)
                                setSidebarOpen(false)


                            }} key={el.label} />
                        ))
                    }
                    <Separator className="my-5" />
                    {
                        clientMenuItems.map((el) => (
                            <MenuItem label={el.label} onClick={() => {
                                router.push(el.url)
                                setSidebarOpen(false)


                            }} key={el.label} />
                        ))
                    }

                    <Separator className="my-5" />
                </div>
                <SheetFooter>
                    <div className="w-full text-center">

                        {
                            currentUser ?
                                <Button variant="ghost" className="flex flex-row gap-2 justify-center"
                                    onClick={() => {
                                        signOut()
                                        router.refresh()
                                    }}>
                                    <LogOut />
                                    <p>Salir de mi cuenta</p>
                                </Button>
                                :
                                <div>
                                    <Separator className="my-5" />
                                    <div className="flex flex-col space-y-3 items-center">
                                        <p>Para poder guardar tus favoritos y contactar con los artistas</p>
                                        <Button
                                            // TODO: as we are using the same modal for register an login...
                                            // but we cannot pass which one should be open...
                                            // maybe we need to use two modals instead
                                            onClick={() => { setLoginModalOpen(true) }}
                                        >Entra</Button>
                                        {/* <p>
                                            ¿Aún no tienes cuenta?
                                        </p>
                                        <Button variant="" className="w-fit"
                                            onClick={() => { setLoginModalOpen(true) }}
                                        >Regístrate</Button> */}
                                    </div>
                                    <Separator className="my-5" />
                                    <div className="flex flex-col space-y-2 items-center">
                                        <p>
                                            ¿Eres tatuador?
                                        </p>
                                        <Button variant="outline"
                                            onClick={() => {
                                                console.log("clicked")
                                                setArtistRegisterOpen(true)
                                            }}
                                            className="w-fit">Publica</Button>
                                    </div>
                                </div>
                        }
                    </div>
                </SheetFooter>
            </SheetContent>


        </Sheet>

    );
}