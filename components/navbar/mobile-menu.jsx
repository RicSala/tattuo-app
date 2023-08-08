'use client'

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import MenuItem from "../ui/menu-item";
import { artistMenuItems, clientMenuItems } from "@/lib/const";
import { Separator } from "../ui/separator";

export default function MobileMenu({
}) {
    return (
        <Sheet>
            <SheetTrigger asChild className="sm:hidden">
                <Menu className="cursor-pointer" />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you re done.
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col my-2">
                    <Separator />
                    {
                        artistMenuItems.map((el) => (
                            <MenuItem label={el.label} onClick={() => { console.log("hello") }} key={el.label} />
                        ))
                    }
                    <Separator />
                    {
                        clientMenuItems.map((el) => (
                            <MenuItem label={el.label} onClick={() => { console.log("hello") }} key={el.label} />
                        ))
                    }

                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>


        </Sheet>

    );
}