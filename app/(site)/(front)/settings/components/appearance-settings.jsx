'use client'

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function AppearanceSettings({
    currentUser
}) {



    console.log(currentUser.settings)
    const router = useRouter()
    const form = useForm({
        defaultValues: {
            theme: currentUser.settings.darkMode
        }
    })
    const { setTheme } = useTheme()

    const onSubmit = (data) => {
        axios.put(`/api/register`, data)
            .then(res => {
                console.log(res)
                router.refresh()
                toast({
                    title: "Hemos actualizado tu configuración",
                    description: "Puedes seguir navegando por TATTUO con tu nueva configuración"
                })

            }
            )
            .catch(err => console.log(err))
    }

    // useEffect((props) => {
    //     console.log("set theme")
    //     currentTheme === 'dark' ? setTheme('dark') : setTheme('light')

    // }, [currentTheme]);

    return (
        <div>
            <Heading title="Elige como prefieres ver TATTUO" className="text-lg" />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <div>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="theme"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Modo Oscuro
                                            </FormLabel>
                                            <FormDescription>
                                                Activa el modo oscuro para proteger tu vista. Nosotros lo preferimos, pero entendemos que va por gustos!
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={
                                                    field.value
                                                }
                                                onCheckedChange={(value) => {
                                                    field.onChange(value)
                                                    value === true ? setTheme('dark') : setTheme('light')
                                                }
                                                }
                                            />
                                        </FormControl>
                                    </FormItem>

                                )}
                            />
                        </div>
                    </div>
                    <Button type="submit">Guardar</Button>
                </form>
            </Form>
        </div>
    );
}