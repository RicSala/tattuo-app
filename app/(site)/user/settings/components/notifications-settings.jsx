'use client'

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";

export default function NotificationsSettings({
    currentUser
}) {

    const form = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div>
            <Heading title="¿Cuándo te avisamos?" className="text-lg" />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <div>
                        <h3 className="mb-4 text-lg font-medium">Notificaciones por Email</h3>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="marketing_emails"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Emails de marketing
                                            </FormLabel>
                                            <FormDescription>
                                                Entérate antes de ofertas con plazas limitadas de tatuadores en tu ciudad
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {/* <FormField
                                control={form.control}
                                name="security_emails"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Security emails</FormLabel>
                                            <FormDescription>
                                                Receive emails about your account security.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled
                                                aria-readonly
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            /> */}
                        </div>
                    </div>
                    <Button type="submit">Guardar</Button>
                </form>
            </Form>


        </div>
    );
}