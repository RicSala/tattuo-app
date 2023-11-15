"use client";

import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContext, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "../ui/dialog";
import { UiContext } from "@/providers/ui/ui-provider";
import { useToast } from "../ui/use-toast";
import { Separator } from "../ui/separator";
import axios from "axios";
import { LoginForm } from "./login-form";
import { apiClient } from "@/lib/apiClient";
import Stepper from "../multiStep/Stepper";
import AsyncCreatable from "../async-creatable";
import {
  getArtistsProfiles,
  getUnclaimedArtistsProfiles,
} from "@/lib/api-service";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import Spinner from "../icons/spinner";

const registerFormSchema = z.object({
  artisticName: z //object with two properties: value and string. both with atleast 3 letters
    .object({
      value: z.string().min(3, {
        message: "artisticName must be at least 2 characters.",
      }),
      label: z.string().min(3, {
        message: "artisticName must be at least 2 characters.",
      }),
    }),
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  confirmPassword: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  confirm: z.boolean(),
  role: z.string().min(2, {}),
});

export function ArtistRegisterForm({}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const { setSidebarOpen, setArtistRegisterOpen } = useContext(UiContext);

  const form = useForm({
    resolver: zodResolver(registerFormSchema),

    defaultValues: {
      artisticName: "Ricardo Sala",
      email: "ricardo@google.com",
      name: "Ricardo Sala",
      password: "88888888",
      confirmPassword: "88888888",
      role: "ARTIST",
      confirm: false,
    },
  });

  const {
    isLoading: isFormLoading,
    isSubmitting,
    isValidating,
  } = form.formState;

  const onSubmit = async (data) => {
    // TODO: I am transforming artistic name because I don't know how to do that transform between what the asyncselect expectes (object with value and label) and what the endpoint expects (a string)
    data.artisticName = data.artisticName.label;

    setIsLoading(true);
    apiClient
      .post("/register", data)
      .then(async (res) => {
        toast({
          title: "Bienvenido a TATTUO",
          description:
            "Por favor, completa tu perfil y publica tres obras para aparecer en TATTUO",
          variant: "success",
        });
        // Wait for signIn to complete
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl: `/artist/profile`,
        });

        // Only close the modal and sidebar after successful signIn
        // setArtistRegisterOpen(false);
        // setSidebarOpen(false);
      })
      .catch((err) => {
        toast({
          title: "Error creando usuario",
          description: "Por favor, inténtalo de nuevo",
          variant: "customDestructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [step, setStep] = useState(0);

  const filteredOptions = async (query) => {
    const artists = await getUnclaimedArtistsProfiles(query);
    const formattedArtistArray = artists.map((artist) => ({
      value: artist.artisticName,
      label: artist.artisticName,
      ...artist,
    }));
    console.log({ formattedArtistArray });
    return formattedArtistArray;
  };

  const handleCreate = async (inputValue) => {
    console.log({ inputValue });
    const fakeCreate = {
      value: inputValue,
      label: inputValue,
    };
    // setStep((prev) => prev + 1);

    return fakeCreate;
  };

  console.log("isLoadin", isLoading);
  console.log("isSubmitting", form.formState.isSubmitting);

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch("/dashboard");
  }, [router]);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <div className="text-2xl font-bold">Consigue clientes en TATTUO</div>
        <div className="mt-2 font-light text-primary">Crea tu cuenta</div>
      </div>
      <Stepper
        steps={STEPS}
        activeStep={step}
        setStep={setStep}
        className="mb-10"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div
            className={`
                     ${step === 0 ? `block` : `hidden`}
                    `}
          >
            <div className="flex flex-col items-center">
              <p>
                <strong>Antes de nada</strong>...
              </p>
              <p>
                <strong>Búscate</strong> en TATTUO!
              </p>
              <p>👇</p>
            </div>
            <FormField
              control={form.control}
              name="artisticName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <AsyncCreatable
                      {...field}
                      id="artisticName"
                      onChange={(event) => {
                        // console.log(form.getValues("artisticName").value);
                        field.onChange(event);
                        setStep((prev) => prev + 1);
                      }}
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
                      placeholder="Busca tu nombre artístico"
                    />
                  </FormControl>
                  <FormDescription>
                    <strong className="text-primary">
                      Es posible que tu perfil ya esté dado de alta
                    </strong>
                    , búscate para reclamarlo antes de seguir y si no te
                    encuentras créalo!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div
            className={`
                     ${step === 1 ? `block` : `hidden`}
                    `}
          >
            <FormField
              control={form.control}
              onChange={() => {
                console.log("heloo");
              }}
              name="confirm"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="flex flex-col gap-2">
                    <FormLabel>
                      Confirmo que este es mi perfil{" "}
                      {form.getValues("artisticName")?.value ?? ""}
                    </FormLabel>
                    <FormDescription>
                      Más adelante te pediremos que confirmes con un email
                      propio para confirmar que eres tú
                    </FormDescription>
                    <Button
                      type="button"
                      onClick={() => {
                        const isConfirmed = form.getValues("confirm");
                        if (isConfirmed) setStep((prev) => prev + 1);
                      }}
                    >
                      Confirmar
                    </Button>
                  </div>
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2">
                    <FormControl>
                      <Checkbox
                        {...field}
                        onChange={(event) => {
                          console.log(form.getValues("confirm"));
                          field.onChange(event);
                        }}
                        control={form.control}
                        trigger={form.trigger}
                        errors={form.errors}
                        setValue={form.setValue}
                        // rules={{
                        //   required: "Debes seleccionar al menos un tag",
                        //   // max lenth of the array is 3
                        //   validate: (value) =>
                        //     value.length <= 3 || "Máximo 3 tags",
                        // }}
                        // onCreateOption={handleCreate}
                        // onGetOptions={filteredOptions}
                      />
                    </FormControl>
                    <FormLabel>
                      Confirmo que tengo autoridad para reclamar este perfil
                    </FormLabel>
                  </div>
                  <FormDescription>
                    Asegúrate de que es tu perfil. Más adelante, necesitaremos
                    que confirmes con el email que aparece en tu web.
                  </FormDescription>
                  <FormMessage />
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      onClick={() => {
                        console.log(form.getValues("confirm"));
                        setStep((prev) => prev + 1);
                      }}
                    >
                      Confirmar
                    </Button>
                  </div>
                </FormItem>
              )}
            /> */}
          </div>
          <div
            className={`flex flex-col gap-2
                     ${step === 2 ? `block` : `hidden`}
                    `}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>e-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Aquí va tu email" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                                    Email con el que te diste de alta en TATTUO
                                </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Aquí va tu nombre" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                                    Para hacer todo un poco más personal!
                                </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Aquí va tu contraseña"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  {/* <FormDescription>
                                    Si no la recuerdas, escríbenos a hello@tattuo.com.
                                </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirma tu contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Aquí va tu contraseña"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  {/* <FormDescription>
                                    Así te aseguras que la has escrito bien.
                                </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* REVIEW: Why doesn't "isSubmitting" work here???? */}
            <Button disabled={isLoading} type="submit" className="flex gap-2">
              {isLoading ? (
                <>
                  <Spinner />
                  Registrando...
                </>
              ) : (
                "Registrar"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <Separator />
      {/* <div className="flex flex-col items-center space-y-2">
        <h4>También puedes acceder con</h4>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            signIn("google");
          }}
        >
          {
            //TODO: review callback después de logearse con google
          }
          Google
        </Button>
      </div> */}
    </div>
  );
}

const STEPS = [
  {
    key: "name",
    label: "Nombre",
    validations: ["name"],
  },
  {
    key: "confirm",
    label: "Confirmación",
    validations: ["confirmation"],
  },
  {
    key: "data",
    label: "Datos",
    validations: ["data"],
  },
];

export function ArtistRegisterModal({ variant = "register" }) {
  const { artistRegisterOpen, setArtistRegisterOpen } = useContext(UiContext);
  const [variantShown, setVariantShown] = useState(variant);

  return (
    <Dialog
      open={artistRegisterOpen}
      //TODO: This "use" of open and onOpenChange is what should be done. Review other parts.
      onOpenChange={setArtistRegisterOpen}
    >
      <DialogContent>
        {variantShown === "login" ? (
          <div className="flex flex-col items-center space-y-2">
            <LoginForm />
            <p>
              ¿No tienes cuenta?{" "}
              <Button
                variant="ghost"
                className="inline-block"
                onClick={() => {
                  setVariantShown("register");
                }}
              >
                ¡Créala!
              </Button>
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <ArtistRegisterForm />
            <p>
              ¿Ya tienes cuenta?{" "}
              <Button
                variant="ghost"
                className="inline-block"
                onClick={() => {
                  setVariantShown("login");
                }}
              >
                ¡Entra!
              </Button>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

const ClaimArtist = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>e-mail</FormLabel>
          <FormControl>
            <Input placeholder="Aquí va tu email" {...field} />
          </FormControl>
          {/* <FormDescription>
                                    Email con el que te diste de alta en TATTUO
                                </FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
