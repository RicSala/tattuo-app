'use client'

import axios from "axios";

import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader, { ImageThumbnail } from "@/components/ui/image-uploader";
import { Button } from "@/components/ui/button";
import { Check, Save, Undo } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import CustomSelect from "@/components/custom-select";
import { DevTool } from "@hookform/devtools";
import AsyncCreatable from "@/components/async-creatable";
import { useRouter } from "next/navigation";
import Spinner from "@/components/icons/spinner";


const formSchema = z.object({

    title: z.string().min(2, {
        message: "El título debe tener al menos 2 caracteres.",
    }),
    description: z.string().min(2, {
        message: "La descripción debe tener al menos 2 caracteres.",
    }),
    imageSrc: z.union([
        z.string().url(),
        z.null()
    ]).refine(value => value !== null, {
        message: "Sube una imagen de la pieza",
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

    const { isSubmitting, isSubmitted, isDirty } = form.formState

    const onSubmit = async (data) => {

        // TODO: delete images too

        if (data.tattooId === "new") {
            return axios.post(`/api/tattoos`, data) //TODO: change to fetch (from Next)
                .then(res => {
                    // toast.success(successMessage)
                    toast({
                        variant: "success",
                        title: "Tatuaje creado!",
                        description: "Tu pieza ya está publicada y lista para que la vean futuros clientes"
                    })
                    // after creating the tattoo, we redirect to the edit page,
                    // so the user does not add more tattoos by mistake
                    router.push(`/admin/tatuajes`)
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
                    form.reset(data,
                        {
                            keepIsSubmitted: true
                        }
                    )
                })
        }


        // else we update it
        return axios.put(`/api/tattoos/`, data)
            .then(res => {
                toast({
                    variant: "success",
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
                form.reset(data,
                    {
                        keepIsSubmitted: true
                    }
                )
            })
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

            <div className="w-full mx-auto md:w-1/2 md:mt-14">
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
                                        <Input placeholder="Retrato hiperrealista" {...field} />
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
                                    <FormLabel>Foto</FormLabel>
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
                                        Foto de la pieza
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
                                        <Textarea
                                            className="resize-none "
                                            placeholder="Donde sueles tatuar habitualmente" {...field} />
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
                                variant="outline" className="flex flex-row items-center gap-2"
                                onClick={() => { router.back() }}
                            >
                                <Undo />
                                Cancelar
                            </Button>
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                className={`flex flex-row items-center gap-2`}>
                                {
                                    (isSubmitting) ?
                                        <>
                                            Guardando
                                            <Spinner />
                                        </>
                                        :
                                        (isSubmitted && !isDirty) ?
                                            <>
                                                Guardado
                                                <Check color="green" />
                                            </>
                                            :
                                            <>
                                                Guardar
                                                <Save />
                                            </>
                                }
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

