'use client'

import Link from "next/link";
import Container from "../ui/container";
import Logo from "./Logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTrigger } from "../ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import LoginForm from "../forms/login-form";
import { NavMenu } from "./nav-menu";
// import UserMenu from "./UserMenu";


function NavBar({
    currentUser,
}) {


    // Create a navBar component that will be used in the layout.js file
    return (
        // <Container>
        <div>

            <div className="fixed w-full bg-background shadow-sm text-foreground z-40">
                <div className="py-4 border-b-[1px] border-border">
                    <Container>
                        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                            <div className="flex flex-row justify-between items-center gap-5">
                                <Logo />
                                <div className="hidden md:flex md:gap-3">
                                    <Link href={'/tatuadores'}>Tatuadores</Link>
                                    <Link href={'/tatuajes'}>Tatuajes</Link>
                                    <Link href={'/blog'}>Consejos</Link>
                                </div>

                            </div>
                            {/* <Search /> */}
                            {/* <UserMenu
                                currentUser={currentUser}

                            /> */}
                            <div className="flex flex-row justify-center items-center gap-2">
                                <Dialog >
                                    <DialogTrigger className="hidden">
                                        Eres tatuador?
                                    </DialogTrigger>
                                    <DialogContent>
                                        <LoginForm />
                                    </DialogContent>
                                </Dialog>

                                <NavMenu />

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