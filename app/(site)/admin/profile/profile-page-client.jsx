'use client'

import axios from "axios";
import { useEffect, useRef, useState } from "react";


import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";

import { Form, } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Check, FormInputIcon, Redo, Save, Undo, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { DevTool } from "@hookform/devtools";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { formSchema } from "./components/zod-resolver";
import General from "./components/general";
import Prices from "./components/prices";
import Socials from "./components/socials";
import Images from "./components/images";


const STEPS = [
    {
        key: 'general', label: 'General',
        validations: ['artisticName', 'bio', 'styles', 'city']
    },
    {
        key: 'prices', label: 'Precios',
        validations: []

    },
    {
        key: 'socials', label: 'Redes',
        validations: ['facebook', 'instagram', 'tiktok', 'twitter', 'website', 'youtube']

    },
    {
        key: 'images', label: 'Imágenes',
        validations: ['images']

    },
];

const ProfilePageClient = ({
    artist,
    styles,
    cities
}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [selectedTab, setSelectedTab] = useState(0)
    const [stepsStatus, setStepsStatus] = useState({})

    const router = useRouter()


    const tabsRef = useRef()
    const tabRefs = useRef([]);

    // create a ref with a list of the images when the component mounts
    // so we delete them only when the form is submitted
    // otherwise we would delete them when they click "x" (and maybe they change their mind)
    // and we would not delete them when they just change the image
    const imagesRef = useRef(artist.images)
    const mainImageRef = useRef(artist.mainImage)


    const form = useForm({

        mode: "onBlur",

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
            facebook: artist.socials[0].profile || "",
            instagram: artist.socials[1].profile || "",
            tiktok: artist.socials[2].profile || "",
            twitter: artist.socials[3].profile || "",
            website: artist.website || "",
            youtube: artist.youtube || "",

        }
    })
    // TODO: Read about the fact that React Hook Form uses a "proxy" and we need to do this to "subscribe" to changes...??
    const { isDirty, isSubmitted } = form.formState;


    // Update the validity of each step / tab
    useEffect(() => {
        async function validateSteps() {
            const isValidArray = await Promise.all(STEPS.map(step => form.trigger(step.validations)));
            setStepsStatus(() => isValidArray);
        }

        validateSteps();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTab, form.formState.errors]);

    // scroll the the beginning of each step/tab when clicked "Siguiente"
    useEffect(() => {
        if (tabRefs.current[selectedTab]) {
            tabRefs.current[selectedTab].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
        }
    }, [selectedTab]);


    const scrollToTabList = () => {
        const yOffset = -100; // Adjust this value as needed
        const y = tabsRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }


    const onSubmit = async (data) => {

        // Not used for now
        // setIsLoading(true)

        const imagesToDelete = imagesRef.current.filter(img => !data.images.includes(img))
        const mainImageToDelete = mainImageRef.current !== data.mainImage ? mainImageRef.current : null

        const arrayToDelete = [...imagesToDelete, mainImageToDelete].filter(img => img)

        // delete images from cloudinary
        if (arrayToDelete.length > 0) {
            for (const image of arrayToDelete) {
                try {
                    await axios.delete(`/api/images/${image.split("/").pop().split(".")[0]}`);
                } catch (error) {
                    console.error(`Failed to delete image: ${image}`, error);
                    // You might want to handle this error in your UI as well
                }
            }
        }
        // // set the ref to the new images
        imagesRef.current = data.images
        mainImageRef.current = data.mainImage

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
                form.reset(data,
                    {
                        keepIsSubmitted: true
                    }
                )
            })
    }

    const onError = (errors, e) => {
        toast({
            variant: "destructive",
            title: `Error al guardar`,
            description: "Por favor, revisa el formulario"
        })

        console.log("ARTIST PROFILE PAGE ERROR - ", errors)
    };




    return (
        <>
            <Heading title="Tu perfil" subtitle={"Cuéntanos sobre ti y sobre tus piezas"} />

            <Separator className="my-6"
            />
            <Alert>
                <FormInputIcon className="w-4 h-4" />
                <AlertTitle>Respecto a este formulario</AlertTitle>
                <Separator className="my-2" />
                <AlertDescription>
                    Tus datos NO serán compartidos. Cuánta más información facilites, más fácil será que consigas clientes (lxs clientxs quiere saber quién eres!)<br />
                    Tu perfil solo se publicará cuando hayas rellenado todos los campos requeridos (marcados con *)
                </AlertDescription>
            </Alert>

            <div className="w-full mx-auto md:w-1/2 md:mt-14">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)}
                        className="space-y-8">
                        <Tabs
                            ref={tabsRef}
                            value={STEPS[selectedTab].key}
                            onValueChange={(value) =>
                                // index whose key is value
                                setSelectedTab(STEPS.findIndex(step => step.key === value))
                            }
                            className="w-full">
                            <TabsList className="flex flex-row justify-between h-auto mb-5 overflow-x-auto">
                                {


                                    STEPS.map((step, i) => {
                                        return (
                                            <TabsTrigger
                                                ref={el => tabRefs.current[i] = el}
                                                value={step.key} key={step.key} className="flex flex-row gap-1">
                                                <p>
                                                    {i + 1}. {step.label}
                                                </p>
                                                {
                                                    (stepsStatus[i] === true && i <= selectedTab) ?
                                                        <Check color="green" /> : null
                                                }
                                                {/* {
                                                    //Not using this for now.
                                                    (stepsStatus[i] === false && i <= selectedTab) ?
                                                        <X color="red" /> : null
                                                } */}
                                            </TabsTrigger>
                                        )
                                    })
                                }
                            </TabsList>
                            <TabsContent value="general">
                                <General form={form} cities={cities} styles={styles} setSelectedTab={setSelectedTab} />
                            </TabsContent>
                            <TabsContent value="prices">
                                <Prices form={form} />
                            </TabsContent>
                            <TabsContent value="socials">
                                <Socials form={form} />
                            </TabsContent>
                            <TabsContent value="images">
                                <Images form={form} />
                            </TabsContent>
                        </Tabs>


                        {

                            <div className="flex flex-row justify-between mt-5">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex flex-row items-center gap-2"
                                    onClick={
                                        () => {
                                            if (selectedTab > 0) {
                                                setSelectedTab(prev => prev - 1)
                                                scrollToTabList()

                                            }

                                            if (selectedTab === 0) router.back()
                                        }
                                    }>
                                    <Undo />
                                    {
                                        selectedTab === 0 ? 'Cancelar' : 'Anterior'

                                    }
                                </Button>
                                {/*TODO: Using just one ternary instead of two was creating a bug.
                                            (I mean, putting the both buttons in the same ternary condition) 
                                            Understand why this was happening and how to solve it
                                            */}
                                {
                                    (selectedTab !== STEPS.length - 1) ?

                                        <Button
                                            type="button"
                                            className="flex flex-row items-center gap-2"
                                            onClick={
                                                () => {
                                                    form.trigger(STEPS[selectedTab].validations)
                                                        .then((isValid) => {
                                                            if (isValid && selectedTab < STEPS.length - 1) {
                                                                setSelectedTab(prev => prev + 1)
                                                                scrollToTabList()
                                                                //TODO: is there a more declarative way to do this? 
                                                                // tabsRef.current.scrollIntoView()
                                                            }
                                                        })
                                                }
                                            }>
                                            Siguiente
                                            <Redo />
                                        </Button>
                                        : null
                                }
                                {
                                    (selectedTab === STEPS.length - 1) ?

                                        <Button
                                            type="submit"
                                            className="flex flex-row items-center gap-2"
                                        >
                                            {
                                                (isSubmitted &&
                                                    !isDirty
                                                ) ?
                                                    <>
                                                        Guardado
                                                        <Check color="green" />
                                                    </>
                                                    : `Guardar`}
                                            <Save />
                                        </Button>

                                        : null
                                }

                            </div>

                        }
                    </form>
                </Form>
            </div>

            {/* Dev tools for React Hook Forms  */}
            {/* <DevTool control={form.control} /> */}

        </>
    )

}

export default ProfilePageClient;