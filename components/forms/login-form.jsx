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


const formSchema = z.object({
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
})


export default function LoginForm({

}) {

    const form = useForm({
        resolver: zodResolver(formSchema),

        defaultValues:
        {
            email: 'ricardo@google.com',
            password: '88888888',
        }
    });


    const onSubmit = () => {
        console.log("on Submit!")
    }



    return (
        <div className='flex flex-col gap-4'>
            {/* <Heading
            title="Bienvenido de nuevo"
            subtitle="Accede a tu cuenta"
        /> */}

            <div className='text-center'>
                <div className="text-2xl font-bold">Bienvenido de nuevo</div>
                <div className="font-light text-neutral-500 mt-2">Accede a tu cuenta</div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Here goes your email" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Here goes your email" {...field} type="password" />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <Button type="submit">Submit</Button>

                </form>
            </Form>

        </div>
    );
}