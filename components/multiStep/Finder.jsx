"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Stepper from "./Stepper";
import AsyncSelect from "../async-select";
import { Textarea } from "../ui/textarea";
import ImageUploader, { ImageThumbnail } from "../ui/image-uploader";
import { getStyleList } from "@/lib/getStyleList";
import { useState } from "react";
import { getCities } from "@/lib/getCities";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { toast } from "../ui/use-toast";
import MultiStepButtons from "@/app/(site)/artist/profile/components/multi-step-buttons";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { apiClient } from "@/lib/apiClient";

//TODO: change isLoading to be = isSubmitting

//TODO: Add google analytics
//TODO: Image inside a div with relative position
//TODO: Add breadcrumbs
// https://freefrontend.com/tailwind-code-examples/
// https://www.hyperui.dev/

const STEPS = [
  {
    key: "address",
    label: "Dirección",
    validations: ["address"],
  },
  {
    key: "when",
    label: "¿Cuándo?",
    validations: ["when"],
  },
  {
    key: "size",
    label: "Tamaño",
    validations: ["size"],
  },
  {
    key: "description",
    label: "Bio",
    validations: ["description"],
  },
  {
    key: "color",
    label: "Color",
    validations: ["color"],
  },
  {
    key: "style",
    label: "Estilo",
    validations: ["style"],
  },
  {
    key: "images",
    label: "Imágenes",
    validations: ["images"],
  },
];

const whenOptions = [
  { label: "Lo antes posible", value: "soonest" },
  { label: "En 1 semana", value: "1week" },
  { label: "En 2 semanas", value: "2weeks" },
  { label: "En 1 mes", value: "1month" },
  { label: "A largo plazo", value: "longterm" },
];

const sizeOptions = [
  { label: "Pequeño", value: "small" },
  { label: "Mediano", value: "medium" },
  { label: "Grande", value: "large" },
  { label: "Muy grande", value: "xlarge" },
];

const colorOptions = [
  { label: "Blanco y Negro", value: "blackandwhite" },
  { label: "A color", value: "color" },
  { label: "No lo sé aún", value: "dontknow" },
];

const styleOptions = getStyleList();

const cities = getCities();

const finderFormSchema = z.object({
  address: z
    .union([
      z.object({
        id: z.string(),
        label: z.string(),
        value: z.string(),
      }),
      z.null(),
    ])
    .refine((value) => value !== null, {
      message: "Selecciona una ciudad",
    }),

  when: z.string().min(2, {
    message: "Selecciona una opción.",
  }),
  size: z.string().min(2, {
    message: "Selecciona una opción.",
  }),
  description: z.string().min(2, {
    message: "Cuéntanos cómo es el tatuaje que quieres hacerte.",
  }),
  color: z.string().min(2, {
    message: "Selecciona una opción.",
  }),
  style: z.string().min(2, {
    message: "Selecciona una opción.",
  }),
  images: z.string().min(2, {
    message:
      "Sube una imagen, nos ayudará a encontrar el mejor tatuador para el estilo que buscas",
  }),
});

export default function Finder({ children, setResults, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  //TODO: Image to delete as in profilepageclient

  const form = useForm({
    resolver: zodResolver(finderFormSchema),
    mode: "onChange",
    defaultValues: {
      address: null,
      when: "",
      size: "",
      description: "",
      color: "",
      style: "",
      images: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    setIsLoading(true);
    toast({
      title: "Enviando información",
      description:
        "Estamos buscando los artistas que mejor se adapten a tu estilo",
      variant: "success",
    });
    apiClient
      .post("/artists/finder", data)
      .then((res) => {
        toast({
          title: "Éxito",
          description:
            "Hemos encontrado los artistas que mejor se adaptan a tu estilo",
          variant: "success",
        });
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Ha habido un error al buscar los artistas",
          variant: "customDestructive",
        });
        setIsLoading(false);
      })
      .finally(() => {
        form.reset(data, {
          keepIsSubmitted: true,
        });
      });
  };

  const onError = (errors, e) => {};

  return (
    <div className="mx-auto sm:w-full md:w-full lg:w-2/3 xl:w-1/2">
      <Stepper steps={STEPS} activeStep={step} setStep={setStep} />

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div
            className={`
                     ${step === 0 ? `block` : `hidden`}
                    `}
          >
            <FormField
              control={form.control}
              name="address"
              defaultOptions={cities}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Ciudad</FormLabel>
                  <FormControl>
                    <AsyncSelect
                      placeholder="Donde sueles tatuar habitualmente"
                      {...field}
                      resources="cities"
                    />
                  </FormControl>
                  <FormDescription>
                    Si tatúas en varias ciudades, de momento pon en la que más
                    estás. Estamos desarrollando la funcionalidad para poner
                    varias.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={` ${step === 1 ? `block` : `hidden`}`}>
            <FormField
              control={form.control}
              name="when"
              defaultOptions={cities}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">
                    ¿Cuándo tienes pensado tatuarte?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {whenOptions.map((option, index) => (
                        <FormItem
                          key={index}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Si tatúas en varias ciudades, de momento pon en la que más
                    estás. Estamos desarrollando la funcionalidad para poner
                    varias.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={` ${step === 2 ? `block` : `hidden`}`}>
            <FormField
              control={form.control}
              name="size"
              defaultOptions={cities}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">
                    ¿Cuál es el tamaño aproximado del tatuaje?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {sizeOptions.map((option, index) => (
                        <FormItem
                          key={index}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Si tatúas en varias ciudades, de momento pon en la que más
                    estás. Estamos desarrollando la funcionalidad para poner
                    varias.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={` ${step === 3 ? `block` : `hidden`}`}>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none "
                      placeholder="Me llamo Black Vic, tatúo en Zaragoza y me apasiona el estilo hiper realista. Disfruto del arte del tatuaje desde que..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Cuéntanos sobre ti! Tu estilo, tu forma de trabajo, ... los
                    usuarios quieren conocerte mejor antes de decidirse a
                    hacerse un tatuaje contigo
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={` ${step === 4 ? `block` : `hidden`}`}>
            <FormField
              control={form.control}
              name="color"
              defaultOptions={cities}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">
                    ¿Qué colores te gustaría que tuviera?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {colorOptions.map((option, index) => (
                        <FormItem
                          key={index}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Si tatúas en varias ciudades, de momento pon en la que más
                    estás. Estamos desarrollando la funcionalidad para poner
                    varias.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={` ${step === 5 ? `block` : `hidden`}`}>
            <FormField
              control={form.control}
              name="style"
              defaultOptions={cities}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">¿Qué estilo te gustaría?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {styleOptions.map((option, index) => (
                        <FormItem
                          key={index}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Si tatúas en varias ciudades, de momento pon en la que más
                    estás. Estamos desarrollando la funcionalidad para poner
                    varias.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={` ${step === 6 ? `block` : `hidden`}`}>
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto principal</FormLabel>
                  <FormControl>
                    <ImageThumbnail
                      placeholderUrl="/images/placeholder.svg"
                      {...field}
                    />
                  </FormControl>
                  <FormControl>
                    <ImageUploader
                      field={field}
                      setValue={form.setValue}
                      trigger={form.trigger}
                      disabled={form.formState.isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Esta es la foto que aparecerá en tus publicaciones, como tu
                    foto de perfil en otras redes sociales
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <MultiStepButtons
            STEPS={STEPS}
            form={form}
            setSelectedTab={setStep}
            selectedTab={step}
            isLoading={isLoading}
          />
        </form>
      </Form>
      {/* <DevTool control={control} /> */}
    </div>
  );
}
