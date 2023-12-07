"use client";

import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { Tag } from "@prisma/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader, { ImageThumbnail } from "@/components/image-uploader";
import { Button } from "@/components/ui/button";
import { Check, Save, Undo } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import CustomSelect from "@/components/custom-select";
import { DevTool } from "@hookform/devtools";
import AsyncCreatable from "@/components/async-creatable";
import { useRouter } from "next/navigation";
import Spinner from "@/components/icons/spinner";
import { apiClient } from "@/lib/apiClient";
import { useHandleError } from "@/errors/useHandleError";
import BaseError, { createBaseError } from "@/errors/CustomError";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "El título debe tener al menos 2 caracteres.",
    })
    .max(30, {
      message: "El título debe tener menos de 30 caracteres.",
    }),

  description: z
    .string()
    .min(2, {
      message: "La descripción debe tener al menos 2 caracteres.",
    })
    .max(200, {
      message: "La descripción debe tener menos de 200 caracteres.",
    }),
  imageSrc: z
    .union([z.string().url(), z.null()])
    .refine((value) => value !== null, {
      message: "Sube una imagen de la pieza",
    }),
  // style:
  //  z.object({
  //   id: z.string(),
  //   label: z.string(),
  //   value: z.string(),
  // }),

  styles: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      value: z.string(),
    }),
  ),

  tattooId: z.string().min(2, {
    message: "Debes ingresar un id de tatuaje",
  }),
  bodyPart: z.object({
    id: z.string(),
    label: z.string(),
    value: z.string(),
  }),

  tags: z.array(z.any()).min(1, {
    message: "Debes subir al menos una imagen",
  }),
});

const TattooEditPageClient = ({
  tattoo,
  currentUser,
  styles,
  bodyParts,
  isNew,
}) => {
  const { toast } = useToast();
  const router = useRouter();
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
      // style: tattoo.style || "",
      styles: tattoo.styles || [],
      tattooId: tattoo.id || "new",
      bodyPart: tattoo.bodyPart || undefined,
      tags: tattoo.tags?.map((tag) => tag.tag) || undefined,
    },
  });

  const { isSubmitting, isSubmitted, isDirty } = form.formState;
  const handle = useHandleError();

  const onSubmit = async (data) => {
    // TODO: delete images too

    if (data.tattooId === "new") {
      return apiClient
        .post(`/tattoos`, data) //TODO: change to fetch (from Next)
        .then((res) => {
          // toast.success(successMessage)
          toast({
            variant: "success",
            title: "Tatuaje creado!",
            description:
              "Tu pieza ya está publicada y lista para que la vean futuros clientes",
          });
          // after creating the tattoo, we redirect to the edit page,
          // so the user does not add more tattoos by mistake
          router.push(`/artist/tatuajes`);
          router.refresh();
        })
        .catch((e) => {
          handle(
            createBaseError({
              e,
              logMessage: "ERROR - TattooEditPageClient",
              ToastDescription: "Por favor, revisa tu formulario",
              toastTitle: "Error al actualizar el tatuaje",
            }),
          );
        })
        .finally(() => {
          form.reset(data, {
            keepIsSubmitted: true,
          });
        });
    }

    // else we update it
    return apiClient
      .put(`/tattoos/`, data)
      .then((res) => {
        toast({
          variant: "success",
          title: "Tatuaje actualizado!",
          description:
            "Tu pieza ya está publicada y lista para que la vean futuros clientes",
        });
        router.push(`/artist/tatuajes/${res.data.id}`);
        router.refresh();
      })
      .catch((e) => {
        handle(
          createBaseError({
            e,
            logMessage: "ERROR - TattooEditPageClient",
            ToastDescription: "Por favor, revisa tu formulario",
            toastTitle: "Error al actualizar el tatuaje",
          }),
        );
      })
      .finally(() => {
        form.reset(data, {
          keepIsSubmitted: true,
        });
      });
  };

  const onError = (errors, e) => {
    handle(
      createBaseError({
        e: errors,
        logMessage: "ERROR - TattooEditPageClient - SUBMIT",
        ToastDescription: "Por favor, revisa tu formulario",
        toastTitle: "Error al actualizar el tatuaje",
      }),
    );
  };

  const filteredOptions = async (inputValue) => {
    const res = await apiClient.get(`/tags?s=${inputValue}`);
    /**
     * @type {Tag[]}
     */
    const tags = res.data;
    return tags;
  };

  const handleCreate = async (inputValue) => {
    // send a post request to our api to create a new tag
    const res = await apiClient.post(`/tags/`, { label: inputValue });
    const newTag = res.data;

    return newTag;
  };

  return (
    <>
      <Heading title="Crear / Editar pieza" subtitle={""} />
      <Separator className="my-6" />
      <div className="mx-auto w-full md:mt-14 md:w-1/2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-8"
          >
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
                  <FormDescription>Dale un nombre a tu pieza</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Why is validation triggered when I add a picture? */}
            <FormField
              control={form.control}
              name="imageSrc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto</FormLabel>
                  <FormControl>
                    <ImageThumbnail
                      placeholderUrl="/images/placeholder.svg"
                      {...field}
                    />
                  </FormControl>
                  <FormControl>
                    <ImageUploader
                      field={field}
                      disabled={form.formState.isLoading}
                      maxFiles={1}
                    />
                  </FormControl>
                  <FormDescription>Foto de la pieza</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Cuéntanos todo lo que te parezca importante de este trabajo"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Cuéntanos más sobre la pieza: descripción, qué aparece,
                    estilo, colores, parte del cuerpo, etc.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Etiquetas / Contenido</FormLabel>

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
                        validate: (value) =>
                          value.length <= 3 || "Máximo 3 tags",
                      }}
                      onCreateOption={handleCreate}
                      onGetOptions={filteredOptions}
                      isMulti={true}
                    />
                  </FormControl>
                  <FormDescription>
                    Palabras clave para encontrar tu pieza. Especialmente, qué
                    contenido (por ejemplo: leon, flor, mariposa, estrella, ...)
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
                    <CustomSelect
                      options={bodyParts}
                      isMulti={false}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>¿Dónde lo has tatuado?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="styles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:content-['*']">Estilos</FormLabel>
                  <FormControl>
                    <CustomSelect
                      options={styles}
                      isMulti={true}
                      {...field}
                      afterChange={() => {
                        form.trigger("styles");
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Puedes elegir hasta tres estilos. Seguro que controlas
                    muchos más, pero los clientes quieren saber lo que mejor se
                    te da!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estilo</FormLabel>
                  <FormControl>
                    <CustomSelect options={styles} isMulti={false} {...field} />
                  </FormControl>
                  <FormDescription>
                    ¿Cuál es el estilo PRINCIPAL del trabajo?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <div className="mt-5 flex flex-row justify-between">
              <Button
                variant="outline"
                className="flex flex-row items-center gap-2"
                onClick={() => {
                  router.back();
                }}
                type="button"
              >
                <Undo />
                Cancelar
              </Button>
              <Button
                disabled={isSubmitting}
                type="submit"
                className={`flex flex-row items-center gap-2`}
              >
                {isSubmitting ? (
                  <>
                    Guardando
                    <Spinner />
                  </>
                ) : isSubmitted && !isDirty ? (
                  <>
                    Guardado
                    <Check color="green" />
                  </>
                ) : (
                  <>
                    Guardar
                    <Save />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Dev tools for React Hook Forms  */}
      {/* <DevTool control={form.control} /> */}
    </>
  );
};

export default TattooEditPageClient;
