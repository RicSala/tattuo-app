'use client'

import axios from "axios";
import { useEffect, useRef, useState } from "react";


import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";

import { Form, } from "@/components/ui/form";
import { Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { DevTool } from "@hookform/devtools";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import General from "./components/general";
import Prices from "./components/prices";
import Socials from "./components/socials";
import Images from "./components/images";
import { useTabs } from "@/hooks/useTabs";
import { useArtistForm } from "@/hooks/useArtistForm";
import MultiStepButtons from "./components/multi-step-buttons";

// selectedTab, setSelectedTab, scrollToTabList

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
    // const [selectedTab, setSelectedTab] = useState(0)
    const [stepsStatus, setStepsStatus] = useState({})

    const tabsRef = useRef()
    const tabRefs = useRef([]);
    const { selectedTab, setSelectedTab, scrollToTabList } = useTabs(tabsRef, tabRefs, STEPS)

    // create a ref with a list of the images when the component mounts
    // so we delete them only when the form is submitted
    // otherwise we would delete them when they click "x" (and maybe they change their mind)
    // and we would not delete them when they just change the image
    const imagesRef = useRef(artist.images)
    const mainImageRef = useRef(artist.mainImage)


    const { form } = useArtistForm(artist)

    // Update the validity of each step / tab
    useEffect(() => {
        async function validateSteps() {
            const isValidArray = await Promise.all(STEPS.map(step => form.trigger(step.validations)));
            setStepsStatus(() => isValidArray);
        }

        validateSteps();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTab, form.formState.errors]);


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

        return axios.put(`/api/artists/${artist.id}`, data)
            .then(res => {

                toast({
                    variant: "success",
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
            <Separator className="my-6" />
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
                                    STEPS.map((step, i) => (
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
                                    ))
                                }
                            </TabsList>
                            <TabsContent value="general">
                                <div className="space-y-8">
                                    <General form={form} cities={cities} styles={styles} setSelectedTab={setSelectedTab} />
                                </div>
                            </TabsContent>
                            <TabsContent value="prices">
                                <div className="space-y-8">
                                    <Prices form={form} />
                                </div>
                            </TabsContent>
                            <TabsContent value="socials">
                                <div className="space-y-8">
                                    <Socials form={form} />
                                </div>
                            </TabsContent>
                            <TabsContent value="images">
                                <div className="space-y-8">
                                    <Images form={form} />
                                </div>
                            </TabsContent>
                        </Tabs>

                        <MultiStepButtons form={form} selectedTab={selectedTab} setSelectedTab={setSelectedTab} STEPS={STEPS}
                            scrollToTabList={scrollToTabList}
                        />
                    </form>
                </Form>
            </div>
            {/* Dev tools for React Hook Forms  */}
            {/* <DevTool control={form.control} /> */}
        </>
    )
}

export default ProfilePageClient;