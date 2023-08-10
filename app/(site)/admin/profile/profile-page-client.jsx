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
import { Save, SkipBack, Undo } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";


const formSchema = z.object({
    artisticName: z.string({
        message: "Debes subir una imagen"
    }).min(1, {
        message: "El nombre artístico debe tener al menos 2 caracteres.",
    }),
    mainImage: z.string().min(2, {
        message: "Tienes que subir una imagen de perfil",
    }),
    email: z.string().email({
        message: "Debes ingresar un email válido",
    }),
    bio: z.string().min(2, {
        message: "Debes ingresar una biografía",
    }),
    minWorkPrice: z.number().min(0, {
        message: "Debes ingresar un precio mínimo",
    }),
    pricePerHour: z.number().min(0, {
        message: "Debes ingresar un precio por hora",
    }),
    pricePerSession: z.number().min(0, {
        message: "Debes ingresar un precio por sesión",
    }),
    facebook: z.string().url({
        message: "Debes ingresar una URL válida",
    }),
    instagram: z.string().url({
        message: "Debes ingresar una URL válida",
    }),
    tiktok: z.string().url({
        message: "Debes ingresar una URL válida",
    }),
    twitter: z.string().url({
        message: "Debes ingresar una URL válida",
    }),
    youtube: z.string().url({
        message: "Debes ingresar una URL válida",
    }),
    website: z.string().url({
        message: "Debes ingresar una URL válida",
    }),
    images: z.array(z.string()).min(1, {
        message: "Debes subir al menos una imagen",
    }),
    phone: z.string().min(2, {
        message: "Debes ingresar un número de teléfono",
    }),
    city: z.string().min(2, {
        message: "Debes ingresar una ciudad",
    }),
    styles: z.array(z.string()).min(1, {
        message: "Debes seleccionar al menos un estilo",
    }),

})


const ProfilePageClient = ({
    artist,
    styles,
}) => {

    const [isLoading, setIsLoading] = useState(false)
    // create a ref with a list of the images when the component mounts
    // so we delete them only when the form is submitted
    // otherwise we would delete them when they click "x" (and maybe they change their mind)
    // and we would not delete them when they just change the image
    const imagesRef = useRef(artist.images)
    const mainImageRef = useRef(artist.mainImage)

    const form = useForm({

        resolver: zodResolver(formSchema),

        defaultValues: {
            artisticName: artist?.artisticName || "",
            email: artist.email || "",
            bio: artist.bio || "",
            city: artist.city || "",
            images: artist.images || [],
            mainImage: artist.mainImage || "",
            styles: artist.styles || "",
            minWorkPrice: artist.minWorkPrice || null,
            phone: artist.phone || "",
            pricePerHour: artist.pricePerHour || null,
            pricePerSession: artist.pricePerSession || null,
            facebook: artist.facebook || "",
            instagram: artist.instagram || "",
            tiktok: artist.tiktok || "",
            twitter: artist.twitter || "",
            website: artist.website || "",
            youtube: artist.youtube || "",

        }
    })


    const onSubmit = async (data) => {

        // setIsLoading(true)

        // const imagesToDelete = imagesRef.current.filter(img => !data.images.includes(img))
        // const mainImageToDelete = mainImageRef.current !== data.mainImage ? mainImageRef.current : null

        // const arrayToDelete = [...imagesToDelete, mainImageToDelete].filter(img => img)

        // delete images from cloudinary
        // if (arrayToDelete.length > 0) {
        //     for (const image of arrayToDelete) {
        //         await axios.delete(`/api/images/${image.split("/").pop().split(".")[0]}`)
        //     }
        // }

        // // set the ref to the new images
        // imagesRef.current = data.images
        // mainImageRef.current = data.mainImage

        console.log("data", data)

        axios.put(`/api/artists/${artist.id}`, data)
            .then(res => {

                toast({
                    title: `Cambios guardados`,
                    description: "Tus cambios ya están visibles en TATTUO"
                })
            })
            .catch(err => {
                toast({
                    variant: "destructive",
                    title: `Error al guardar`,
                    description: "No hemos podido guardar tus cambios, por favor, inténtalo de nuevo"
                })
            })
            .finally(() => {
                // setIsLoading(false)
            })
    }

    const onError = (errors, e) => {
        toast({
            title: `Error al guardar`,
            description: "Por favor, revisa el formulario"
        })
    };

    return (
        <>
            <Heading title="Tu perfil" subtitle={"Cuéntanos sobre ti y sobre tus piezas"} />
            <Separator className="my-6"
            />

            <div className="w-full md:w-1/2 mx-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)}
                        className="space-y-8">

                        <h2>Información básica</h2>

                        {/* TODO: The imageUploader is a bit of a mess: not very reusable. Could be improved using form context? */}

                        <FormField
                            control={form.control}
                            name="mainImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Foto principal</FormLabel>
                                    <FormControl>
                                        <ImageThumbnail placeholderUrl="/images/placeholder.svg" {...field} />
                                    </FormControl>
                                    <FormControl>
                                        <ImageUploader field={field} setValue={form.setValue} trigger={form.trigger}
                                            disabled={form.formState.isLoading}
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
                            name="artisticName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre Artístico</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Aquí va tu nombre artístico" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El nombre por el que se te conoce (Que a veces no es el que aparece en tu DNI!)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Teléfono</FormLabel>
                                    <FormControl>
                                        <Input placeholder="666 123 456" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Teléfono al que te puedan escribir tus clientes.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ciudad</FormLabel>
                                    <FormControl>
                                        <AsyncSelect placeholder="Donde sueles tatuar habitualmente" {...field} resources="cities" />
                                    </FormControl>
                                    <FormDescription>
                                        Si tatúas en varias ciudades, de momento pon en la que más estás. Estamos desarrollando la funcionalidad para poner varias.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Donde sueles tatuar habitualmente" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Cuéntanos sobre ti! Tu estilo, tu forma de trabajo, ... los usuarios quieren conocerte mejor antes de decidirse a hacerse un tatuaje contigo
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />

                        <h2>Precios</h2>

                        <FormField
                            control={form.control}
                            name="minWorkPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Precio mínimo</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Aquí va tu nombre" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Precio del trabajo que aceptas como mínimo (Es decir, el trabajo más pequeño que quieres aceptar)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="pricePerHour"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Precio por hora</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Aquí va tu nombre" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Precio del trabajo que aceptas como mínimo (Es decir, el trabajo más pequeño que quieres aceptar)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="pricePerSession"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Precio por sesión</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Aquí va tu nombre" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Precio del trabajo que aceptas como mínimo (Es decir, el trabajo más pequeño que quieres aceptar)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />

                        <h2>Contacto y redes</h2>
                        <FormField
                            control={form.control}
                            name="facebook"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Facebook</FormLabel>
                                    <FormControl>
                                        <Input type="" placeholder="Aquí va tu nombre" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Precio del trabajo que aceptas como mínimo (Es decir, el trabajo más pequeño que quieres aceptar)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="instagram"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instagram</FormLabel>
                                    <FormControl>
                                        <Input type="" placeholder="Aquí va tu nombre" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Precio del trabajo que aceptas como mínimo (Es decir, el trabajo más pequeño que quieres aceptar)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="tiktok"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>TikTok</FormLabel>
                                    <FormControl>
                                        <Input type="url" placeholder="Aquí va tu nombre" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Precio del trabajo que aceptas como mínimo (Es decir, el trabajo más pequeño que quieres aceptar)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="twitter"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Twitter</FormLabel>
                                    <FormControl>
                                        <Input type="" placeholder="Aquí va tu nombre" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Precio del trabajo que aceptas como mínimo (Es decir, el trabajo más pequeño que quieres aceptar)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input type="" placeholder="Aquí va tu nombre" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Precio del trabajo que aceptas como mínimo (Es decir, el trabajo más pequeño que quieres aceptar)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="youtube"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Youtube</FormLabel>
                                    <FormControl>
                                        <Input type="" placeholder="Aquí va tu nombre" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Precio del trabajo que aceptas como mínimo (Es decir, el trabajo más pequeño que quieres aceptar)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />


                        <h2>Fotos de trabajos</h2>

                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Algunos de tus trabajos</FormLabel>
                                    <div className="flex flex-row gap-5">
                                        {
                                            field.value.map((image, index) => {
                                                const onChange = async () => {
                                                    const newImageArray = form.getValues("images").filter((img, i) => i !== index)
                                                    field.onChange(newImageArray)
                                                    // await axios.delete(`/api/images/${image.split("/").pop().split(".")[0]}`)
                                                }

                                                return (
                                                    <FormControl key={image}>
                                                        <ImageThumbnail
                                                            placeholderUrl="/images/placeholder.svg" value={image}
                                                            onChange={onChange}

                                                        />
                                                    </FormControl>
                                                )
                                            })
                                        }
                                    </div>
                                    <FormControl>
                                        <ImageUploader field={field} setValue={form.setValue} trigger={form.trigger} />
                                    </FormControl>
                                    <FormDescription>
                                        Esta es la foto que aparecerá en tus publicaciones, tu foto de perfil
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />

                        {/* <FormField
                            control={form.control}
                            name="styles"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estilos</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value.label}
                                        multi
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                styles.map((style) => {

                                                    console.log("key", style.id)
                                                    return (
                                                        <div key={style.id} >
                                                            <SelectItem value={style}>{style.label}</SelectItem>
                                                        </div>

                                                    )
                                                })
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        You can manage email addresses in your{" "}
                                        <Link href="/examples/forms">email settings</Link>.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}


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
            {/* <DevTool control={control} /> */}

        </>
    )

}

export default ProfilePageClient;

