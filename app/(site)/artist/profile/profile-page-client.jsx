"use client";
import { useEffect, useRef, useState } from "react";
import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";
import { AlertCircle, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { DevTool } from "@hookform/devtools";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import General from "./components/general";
import Prices from "./components/prices";
import Socials from "./components/socials";
import Images from "./components/images";
import { useTabs } from "@/hooks/useTabs";
import { useArtistForm } from "@/app/(site)/artist/profile/components/useArtistForm";
import MultiStepButtons from "./components/multi-step-buttons";
import { apiClient } from "@/lib/apiClient";
import { Alerts } from "./components/alerts";
import { STEPS } from "./steps";
import { useRouter } from "next/navigation";

// selectedTab, setSelectedTab, scrollToTabList

const ProfilePageClient = ({ artist, styles, cities }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [stepsStatus, setStepsStatus] = useState({});

  const tabsBarRef = useRef();
  const tabRefs = useRef([]);
  const { selectedTab, setSelectedTab, scrollToTabList } = useTabs(
    tabsBarRef,
    tabRefs,
    STEPS,
  );

  // create a ref with a list of the images when the component mounts
  // so we delete them only when the form is submitted
  // otherwise we would delete them when they click "x" (and maybe they change their mind)
  // and we would not delete them when they just change the image
  // const imagesRef = useRef(artist.images);
  const mainImageRef = useRef(artist.mainImage);

  const { form } = useArtistForm(artist);

  // Each time we cange the selectedTab, update the validity of each step / tab
  useEffect(() => {
    async function validateSteps() {
      const isValidArray = await Promise.all(
        STEPS.map((step, i) =>
          i < selectedTab ? form.trigger(step.validations) : null,
        ), // trigger all the validations up to that step
      );
      //   and update the step status accordingly
      setStepsStatus(() => isValidArray);
    }
    validateSteps();
  }, [selectedTab, form]);
  //   Not sure why we did this. Gonna leave it here for now.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [selectedTab, form.formState.errors]);

  const onSubmit = async (data) => {
    // Not used for now
    setIsLoading(true);
    // The images that were present when the page loaded...
    // const imagesToDelete = imagesRef.current.filter(
    //   (img) => !data.images.includes(img), //... and are not present in the form now
    // );
    console.log({ artist });
    const mainImageToDelete =
      mainImageRef.current !== data.mainImage ? mainImageRef.current : null;

    const arrayToDelete = [
      // ...imagesToDelete,
      mainImageToDelete,
    ].filter(
      (img) => img, // to remove false values lik
    );

    // delete images from cloudinary
    if (arrayToDelete.length > 0) {
      for (const image of arrayToDelete) {
        try {
          await apiClient.delete(
            `/images/${image.split("/").pop().split(".")[0]}`,
          );
        } catch (error) {
          console.error(`Failed to delete image: ${image}`, error);
          // You might want to handle this error in your UI as well
        }
      }
    }
    // // set the ref to the new images
    // imagesRef.current = data.images;
    mainImageRef.current = data.mainImage;

    return apiClient
      .put(`/artists/${artist.id}`, data)
      .then((res) => {
        if (artist.tattoos.length > 2) {
          {
            toast({
              variant: "success",
              title: `Cambios guardados`,
              description: "Tus cambios ya están visibles en TATTUO",
            });
          }
        } else {
          toast({
            variant: "success",
            title: `Cambios guardados`,
            description:
              "Publica el menos 3 tatuajes para que tu perfil sea visible",
          });
          router.refresh();
          router.push("/artist/tatuajes");
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: `Error al guardar`,
          description:
            "No hemos podido guardar tus cambios, por favor, inténtalo de nuevo",
        });
      })
      .finally(() => {
        form.reset(data, {
          keepIsSubmitted: true,
        });
        setIsLoading(false);
      });
  };

  const onError = (errors, e) => {
    toast({
      variant: "destructive",
      title: `Error al guardar`,
      description: "Por favor, revisa el formulario",
    });
  };

  return (
    <>
      <Heading
        title="Tu perfil"
        subtitle={"Cuéntanos sobre ti y sobre tus piezas"}
      />
      <Separator className="my-6" />
      <Alerts artist={artist} className={""} />
      <div className="mx-auto w-full md:mt-14 md:w-1/2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-8"
          >
            <Tabs
              ref={tabsBarRef}
              value={STEPS[selectedTab].key}
              onValueChange={(value) =>
                // index whose key is value
                setSelectedTab(STEPS.findIndex((step) => step.key === value))
              }
              className="w-full"
            >
              <TabsList className="mb-5 flex h-auto flex-row justify-between overflow-x-auto">
                {STEPS.map((step, i) => (
                  <TabsTrigger
                    ref={(el) => (tabRefs.current[i] = el)}
                    value={step.key}
                    key={step.key}
                    className="flex flex-row gap-1"
                  >
                    <p>
                      {i + 1}. {step.label}
                    </p>
                    {stepsStatus[i] === true && i <= selectedTab ? (
                      <Check color="green" />
                    ) : null}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="general">
                <div className="space-y-8">
                  <General
                    form={form}
                    cities={cities}
                    styles={styles}
                    setSelectedTab={setSelectedTab}
                  />
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
              {/* <TabsContent value="images">
                <div className="space-y-8">
                  <Images form={form} />
                </div>
              </TabsContent> */}
            </Tabs>

            <MultiStepButtons
              form={form}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              STEPS={STEPS}
              //   scrollToTabList={scrollToTabList}
              isLoading={isLoading}
            />
          </form>
        </Form>
      </div>
      {/* Dev tools for React Hook Forms  */}
      {/* <DevTool control={form.control} /> */}
    </>
  );
};

export default ProfilePageClient;
