'use client'

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


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
    role: z.string().min(2, {
    }),
})

export default function AccountSettings({
    currentUser
}) {


    const form = useForm({
        resolver: zodResolver(registerFormSchema),

        defaultValues:
        {
            email: 'ricardo@google.com',
            name: 'Ricardo Sala',
            password: '88888888',
            confirmPassword: '88888888',
            role: 'ARTIST'
        }
    });
    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div>

            <Heading title="Configura tu cuenta" className="text-lg" />

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
        </div>
    );
}