'use client'

import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useContext, useState } from "react";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { UiContext } from "@/providers/ui/ui-provider";
import { useToast } from "../ui/use-toast";
import { Separator } from "../ui/separator";
import axios from "axios";



const signInFormSchema = z.object({
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
})


export function LoginForm({

}) {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const { setSidebarOpen,
        setLoginModalOpen } = useContext(UiContext)

    const form = useForm({
        resolver: zodResolver(signInFormSchema),

        defaultValues:
        {
            email: 'ricardo@google.com',
            password: '88888888',
        }
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then(
            (res) => {
                setIsLoading(false);
                if (!res.error) { //why is not using catch? doesn't it return an error?
                    // toast.success('¡Bienvenido a Tattuo! 🎉');
                    setLoginModalOpen(false)
                    setSidebarOpen(false)
                    console.log("RES", res) //TODO: why it does not return the user??
                    router.refresh()
                    //TODO: why this does not work? is it because it's a portal and thus the provider is not 
                    // providing the portal?
                    toast({
                        title: `Bienvenido ${data.email}`,
                        description: "Navega y encuentra tus tatuajes y artistas favoritos",
                    })
                    // onCloseLoginModal();
                }

                if (res.error) {
                    toast({
                        title: `Error al entrar`,
                        description: "Algo ha ocurrido. Por favor, inténtalo de nuevo",
                        variant: "destructive"
                    })
                    // toast.error(res.error);
                }
            }

        )

    }


    return (
        <div className='flex flex-col gap-4'>
            {/* <Heading
            title="Bienvenido de nuevo"
            subtitle="Accede a tu cuenta"
        /> */}

            <div className='text-center'>
                <div className="text-2xl font-bold">Bienvenidx de nuevo</div>
                <div className="font-light text-neutral-500 mt-2">Accede a tu cuenta</div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>e-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="Aquí va tu email" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Email con el que te diste de alta en TATTUO
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input placeholder="Aquí va tu contraseña" {...field} type="password" />
                                </FormControl>
                                <FormDescription>
                                    Si no la recuerdas, escríbenos a hello@tattuo.com.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <Button type="submit">Entrar</Button>

                </form>
            </Form>

            <Separator />
            <div className="flex flex-col items-center space-y-2">
                <h4>También puedes acceder con</h4>
                <Button variant="outline" className="w-full"
                    onClick={() => { signIn('google') }}
                >
                    {
                        //TODO: review callback después de logearse con google 
                    }
                    Google
                </Button>
            </div>

        </div>
    );
}



const registerFormSchema = z.object({
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
    confirmPassword: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
})

export function RegisterForm({

}) {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const { setSidebarOpen,
        setLoginModalOpen } = useContext(UiContext)

    const form = useForm({
        resolver: zodResolver(registerFormSchema),

        defaultValues:
        {
            email: 'ricardo@google.com',
            name: 'Ricardo Sala',
            password: '88888888',
            confirmPassword: '88888888'
        }
    });


    const onSubmit = async (data) => {
        setIsLoading(true);
        axios.post('/api/register', data)
            .then((res) => {
                setLoginModalOpen(false);
                setSidebarOpen(false)

                toast({
                    title: "Bienvenido a TATTUO",
                    description: "Ya puedes guardar tus obras y artistas favoritos"
                })
                signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    // callbackUrl: `${window.location.origin}/dashboard`,
                });
            })
            .catch((err) => {
                toast({
                    title: "Error creando usuario",
                    description: "Por favor, inténtalo de nuevo",
                    variant: "destructive"
                })
                console.log("ERROR:", err.response?.data.error);
                console.log("ERROR:", err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    };
    // const onSubmit = async (data) => {
    //     setIsLoading(true);
    //     signIn('credentials', {
    //         ...data,
    //         redirect: false,
    //     }).then(
    //         (res) => {
    //             setIsLoading(false);
    //             if (!res.error) { //why is not using catch? doesn't it return an error?
    //                 // toast.success('¡Bienvenido a Tattuo! 🎉');
    //                 setLoginModalOpen(false)
    //                 setSidebarOpen(false)
    //                 console.log("RES", res) //TODO: why it does not return the user??
    //                 router.refresh()
    //                 //TODO: why this does not work? is it because it's a portal and thus the provider is not 
    //                 // providing the portal?
    //                 toast({
    //                     title: `Bienvenido ${data.email}`,
    //                     description: "Navega y encuentra tus tatuajes y artistas favoritos",
    //                 })
    //                 // onCloseLoginModal();
    //             }

    //             if (res.error) {
    //                 toast({
    //                     title: `Error al entrar`,
    //                     description: "Algo ha ocurrido. Por favor, inténtalo de nuevo",
    //                     variant: "destructive"
    //                 })
    //                 // toast.error(res.error);
    //             }
    //         }

    //     )

    // }


    return (
        <div className='flex flex-col gap-4'>
            {/* <Heading
            title="Bienvenido de nuevo"
            subtitle="Accede a tu cuenta"
        /> */}

            <div className='text-center'>
                <div className="text-2xl font-bold">Bienvenido a TATTUO</div>
                <div className="font-light text-neutral-500 mt-2">Crea tu cuenta</div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>e-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="Aquí va tu email" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    Email con el que te diste de alta en TATTUO
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Aquí va tu nombre" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    Para hacer todo un poco más personal!
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input placeholder="Aquí va tu contraseña" {...field} type="password" />
                                </FormControl>
                                {/* <FormDescription>
                                    Si no la recuerdas, escríbenos a hello@tattuo.com.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirma tu contraseña</FormLabel>
                                <FormControl>
                                    <Input placeholder="Aquí va tu contraseña" {...field} type="password" />
                                </FormControl>
                                {/* <FormDescription>
                                    Así te aseguras que la has escrito bien.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )} />
                    <Button type="submit">Registrar</Button>

                </form>
            </Form>

            <Separator />
            <div className="flex flex-col items-center space-y-2">
                <h4>También puedes acceder con</h4>
                <Button variant="outline" className="w-full"
                    onClick={() => { signIn('google') }}
                >
                    {
                        //TODO: review callback después de logearse con google 
                    }
                    Google
                </Button>
            </div>

        </div>
    );
}

export function LoginModal({
    variant = "login"
}) {

    const { loginModalOpen, setLoginModalOpen } = useContext(UiContext)
    const [variantShown, setVariantShown] = useState(variant);

    return (
        <Dialog open={loginModalOpen}

            //TODO: This "use" of open and onOpenChange is what should be done. Review other parts.
            onOpenChange={setLoginModalOpen}

        >
            <DialogContent>
                {
                    variantShown === "login" ?
                        <div className="flex flex-col items-center space-y-2">
                            <LoginForm />
                            <p>¿No tienes cuenta? <Button
                                variant="ghost"
                                className="inline-block"
                                onClick={() => { setVariantShown('register') }}
                            >¡Créala!</Button></p>
                        </div>
                        :
                        <div className="flex flex-col items-center space-y-2">
                            <RegisterForm />
                            <p>¿Ya tienes cuenta? <Button
                                variant="ghost"
                                className="inline-block"
                                onClick={() => { setVariantShown('login') }}
                            >¡Entra!</Button></p>
                        </div>
                }
            </DialogContent>
        </Dialog>

    )
}