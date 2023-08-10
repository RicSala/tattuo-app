'use client'

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import MenuItem from "../ui/menu-item";
import { artistMenuItems, clientMenuItems } from "@/lib/const";
import { Separator } from "../ui/separator";
import Logo from "./logo";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar({
}) {


    const [open, setOpen] = useState(false);

    const router = useRouter()

    return (
        <Sheet open={open}>
            <SheetTrigger asChild className="">
                <Menu className="cursor-pointer"
                    onClick={() => { setOpen(true) }}

                />
            </SheetTrigger>
            <SheetContent onClose={() => setOpen(false)} className={"flex flex-col justify-between"}>
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
                                setOpen(false)


                            }} key={el.label} />
                        ))
                    }
                    <Separator className="my-5" />
                    {
                        clientMenuItems.map((el) => (
                            <MenuItem label={el.label} onClick={() => {
                                router.push(el.url)
                                setOpen(false)


                            }} key={el.label} />
                        ))
                    }

                    <Separator className="my-5" />
                </div>
                <SheetFooter>
                    <div className="w-full text-center">
                        <Separator className="my-5" />
                        <p>
                            ¿Eres tatuador?
                        </p>
                        <Button variant="outline">Crea tu Cuenta</Button>
                    </div>
                </SheetFooter>
            </SheetContent>


        </Sheet>

    );
}