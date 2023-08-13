'use client'

import axios from "axios";
import { useRef, useState } from "react";


import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import AsyncSelect from "@/components/async-select";
import ImageUploader, { ImageThumbnail } from "@/components/ui/image-uploader";
import { Button } from "@/components/ui/button";
import { Save, Undo } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import CustomSelect from "@/components/custom-select";
import { DevTool } from "@hookform/devtools";
import AsyncCreatable from "@/components/async-creatable";
import { useRouter } from "next/navigation";


const formSchema = z.object({

    title: z.string().min(2, {
        message: "El título debe tener al menos 2 caracteres.",
    }),
    description: z.string().min(2, {
        message: "La descripción debe tener al menos 2 caracteres.",
    }),
    imageSrc: z.string().url({
        message: "Debes ingresar una URL válida",
    }),
    style: z.object({
        id: z.string(),
        label: z.string(),
        value: z.string()
    }),

    tattooId: z.string().min(2, {
        message: "Debes ingresar un id de tatuaje",
    }),
    bodyPart: z.object({
        id: z.string(),
        label: z.string(),
        value: z.string()
    }),

    tags: z.array(z.any()).min(1, {
        message: "Debes subir al menos una imagen",
    }),


})

const TattooEditPageClient = ({
    tattoo,
    currentUser,
    styles,
    bodyParts,
    isNew,
}) => {

    const { toast } = useToast()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    // create a ref with a list of the images when the component mounts
    // so we delete them only when the form is submitted
    // otherwise we would delete them when they click "x" (and maybe they change their mind)
    // and we would not delete them when they just change the image
    const form = useForm({

        resolver: zodResolver(formSchema),

        defaultValues: {
            title: tattoo.title || "",
            description: tattoo.description || "",
            imageSrc: tattoo.imageSrc || "",
            style: tattoo.style || "",
            tattooId: tattoo.id || "new",
            bodyPart: tattoo.bodyPart || undefined,
            tags: tattoo.tags?.map(tag => (tag.tag)) || undefined,

        }
    })


    const onSubmit = async (data) => {

        // TODO: delete images too

        setIsLoading(true)
        console.log("data", data)

        // if tatto is new, we need to create it
        if (data.tattooId === "new") {
            axios.post(`/api/tattoos/`, data) //TODO: change to fetch (from Next)
                .then(res => {
                    // toast.success(successMessage)
                    toast({
                        title: "Tatuaje creado!",
                        description: "Tu pieza ya está publicada y lista para que la vean futuros clientes"
                    })
                    // after creating the tattoo, we redirect to the edit page,
                    // so the user does not add more tattoos by mistake
                    router.push(`/admin/tatuajes/${res.data.id}`)
                    router.refresh()
                })
                .catch(err => {
                    console.log("ERROR - TattooEditPageClient", err)
                    toast({
                        title: "Error al crear el tatuaje",
                        description: "Por favor, revisa el formulario",
                        variant: "destructive"
                    })
                })
                .finally(() => {
                    setIsLoading(false)
                })
            return
        }


        // else we update it
        axios.put(`/api/tattoos/`, data)
            .then(res => {
                toast({
                    title: "Tatuaje actualizado!",
                    description: "Tu pieza ya está publicada y lista para que la vean futuros clientes"
                })
                router.push(`/admin/tatuajes/${res.data.id}`)
                router.refresh()
            })
            .catch(err => {
                console.log("ERROR - TattooEditPageClient", err)
                toast({
                    title: "Error al actualizar el tatuaje!",
                    description: "Por favor, revisa el formulario",
                    variant: "destructive"
                })
            }
            )
            .finally(() => {
                setIsLoading(false)
            }
            )

        return
    }

    const onError = (errors, e) => {

        console.log("ERRORS", errors)
        toast({
            title: `Error al guardar`,
            description: "Por favor, revisa el formulario"
        })
    };

    return (
        <>
            <Heading title="Crear / Editar pieza" subtitle={""} />
            <Separator className="my-6"
            />

            <div className="w-full md:w-1/2 mx-auto md:mt-14">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)}
                        className="space-y-8">

                        <h2>Sobre la pieza</h2>

                        {/* TODO: The imageUploader is a bit of a mess: not very reusable. Could be improved using form context? */}


                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Aquí va tu nombre artístico" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Dale un nombre a tu pieza
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        {/* Why is validation triggered when I add a picture? */}
                        <FormField
                            control={form.control}
                            name="imageSrc"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Foto principal</FormLabel>
                                    <FormControl>
                                        <ImageThumbnail placeholderUrl="/images/placeholder.svg" {...field} />
                                    </FormControl>
                                    <FormControl>
                                        <ImageUploader field={field}
                                            disabled={form.formState.isLoading}
                                            maxFiles={1}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Esta es la foto que aparecerá en tus publicaciones, tu foto de perfil
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Donde sueles tatuar habitualmente" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Cuéntanos más sobre la pieza: descripción, qué aparece, estilo, colores, parte del cuerpo, etc.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />

                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Etiquetas</FormLabel>

                                    <FormControl>
                                        <AsyncCreatable
                                            {...field}
                                            control={form.control}
                                            trigger={form.trigger}
                                            errors={form.errors}
                                            setValue={form.setValue}
                                            rules={{
                                                required: "Debes seleccionar al menos un tag",
                                                // max lenth of the array is 3
                                                validate: (value) => value.length <= 3 || "Máximo 3 tags"
                                            }}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Cuéntanos más sobre la pieza: descripción, qué aparece, estilo, colores, parte del cuerpo, etc.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bodyPart"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Parte del cuerpo</FormLabel>
                                    <FormControl>
                                        <CustomSelect options={bodyParts} isMulti={false} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Esta es la foto que aparecerá en tus publicaciones, tu foto de perfil
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="style"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estilo</FormLabel>
                                    <FormControl>
                                        <CustomSelect options={styles} isMulti={false} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Esta es la foto que aparecerá en tus publicaciones, tu foto de perfil
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />





                        <div className="flex flex-row justify-between mt-5">
                            <Button
                                variant="outline" className="flex flex-row gap-2 items-center" >
                                <Undo />
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="flex flex-row gap-2 items-center" >
                                <Save />
                                Guardar
                            </Button>

                        </div>
                    </form>
                </Form>
            </div>





            {/* Dev tools for React Hook Forms  */}
            {/* <DevTool control={form.control} /> */}

        </>
    )

}

export default TattooEditPageClient;

