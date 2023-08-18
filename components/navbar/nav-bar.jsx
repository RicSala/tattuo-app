'use client'

import Link from "next/link";
import Container from "../ui/container";
import Logo from "./logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTrigger } from "../ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { NavMenu } from "./nav-menu";
import Sidebar from "./sidebar";
import { ModeToggle } from "../mode-toggle";
import { useRouter } from "next/navigation";
// import UserMenu from "./UserMenu";


function NavBar({
    currentUser,
}) {

    const router = useRouter()


    // Create a navBar component that will be used in the layout.js file
    return (
        // <Container>
        <div>

            <div className="fixed w-full bg-background shadow-sm text-foreground z-40">
                <div className="py-1 sm:py-4 border-b-[1px] border-border">
                    <Container>
                        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                            <div className="flex flex-row justify-between items-center gap-5">
                                <Logo />

                                <div className="hidden sm:flex">
                                    <NavMenu currentUser={currentUser} />
                                </div>
                            </div>
                            {/* <Search /> */}
                            {/* <UserMenu
                                currentUser={currentUser}

                            /> */}
                            <div className="flex flex-row justify-center items-center gap-2">
                                <Avatar className="cursor-pointer"
                                    onClick={() => {
                                        router.push('/admin/profile')
                                    }}
                                >
                                    <AvatarImage src={currentUser?.image || undefined} />
                                    <AvatarFallback>{
                                        currentUser?.name.split(" ").slice(0, 2).map((name) => name[0]).join("")
                                    }</AvatarFallback>
                                </Avatar>
                                <ModeToggle />
                                <Sidebar className="" currentUser={currentUser} />

                            </div>
                        </div>
                    </Container>
                </div>
                {/* <Categories /> */}
            </div >
        </div >
        // </Container>
    )


}

export default NavBar;