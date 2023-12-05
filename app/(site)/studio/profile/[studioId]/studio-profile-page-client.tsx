"use client";

import MultiStepButtons from "@/app/(site)/artist/profile/components/multi-step-buttons";
import AsyncCreatable from "@/components/async-creatable";
import { PlacesAutocompleteMap } from "@/components/places-autocomplete";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUploader, { ImageThumbnail } from "@/components/image-uploader";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTabs } from "@/hooks/useTabs";
import {
  getUnclaimedArtistsProfiles,
  getUnclaimedStudioProfiles,
} from "@/lib/api-service";
import { apiClient } from "@/lib/apiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { id } from "date-fns/locale";
import { Check } from "lucide-react";
import { useRef, useState } from "react";
import { FieldValues, UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

const weekDays = [
  {
    label: "Lunes",
    value: "lunes",
  },
  {
    label: "Martes",
    value: "martes",
  },
  {
    label: "Miércoles",
    value: "miercoles",
  },
  {
    label: "Jueves",
    value: "jueves",
  },
  {
    label: "Viernes",
    value: "viernes",
  },
  {
    label: "Sábado",
    value: "sabado",
  },
  {
    label: "Domingo",
    value: "domingo",
  },
];

type Step = {
  key: string;
  label: string;
  validations: string[];
};

const STEPS: Step[] = [
  {
    key: "claim",
    label: "Búscalo",
    validations: [],
  },
  {
    key: "confirm",
    label: "Confirma",
    validations: [],
  },
  {
    key: "profile",
    label: "Complétalo",
    validations: [],
  },
];

const registerStudioSchema = z.object(
  {
    // name
    name: z.string().min(3, {
      message: "El nombre debe tener al menos 3 caracteres",
    }),

    confirm: z.boolean(),
    email: z.string().email(),
    address: z.string(),
    lunes: z.string(),
    martes: z.string(),
    miercoles: z.string(),
    jueves: z.string(),
    viernes: z.string(),
    sabado: z.string(),
    domingo: z.string(),
    id: z.string().optional(),
    phone: z.string().optional(),
    whatsapp: z.string().optional(),
    mainImageUrl: z.string().optional(),
    images: z.array(z.string()).optional(),
  },
  {},
);

// infer the type from registerStudioSchema

type StudioFormValues = z.infer<typeof registerStudioSchema>;
type StudioProfileClientProps = {
  // TODO: chapucero...pero no se me ocurre otra forma de hacerlo
  form: UseFormReturn<any, any, undefined>;
};

export function StudioProfilePageClient({}) {
  const [stepsStatus, setStepsStatus] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const tabsBarRef = useRef();
  const tabRefs = useRef([]);
  const { selectedTab, setSelectedTab } = useTabs(tabsBarRef, tabRefs);

  const form = useForm({
    resolver: zodResolver(registerStudioSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      confirm: false,
      lunes: "",
      martes: "",
      miercoles: "",
      jueves: "",
      viernes: "",
      sabado: "",
      domingo: "",
      phone: "",
      whatsapp: "",
      mainImageUrl: "",
      images: [],
      id: "",
    },
  });

  const onSubmit = async (data: StudioFormValues) => {
    console.log(data);
    data.name;
    setIsLoading(true);
    const res = await apiClient.post("/studios", {
      action: data.id ? "UPDATE" : "CREATE",
      data,
    });

    console.log({ res });
    setIsLoading(false);
  };

  const onConfirm = () => {
    const isConfirmed = form.getValues("confirm");
    if (isConfirmed) setSelectedTab((prev) => prev + 1);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="claim">
              <div className="space-y-8">
                <StudioClaim form={form} />
              </div>
            </TabsContent>
            <TabsContent value="confirm">
              <div className="space-y-8">
                <Confirm form={form} onConfirm={onConfirm} />
              </div>
            </TabsContent>
            <TabsContent value="profile">
              <div>
                <StudioProfileClient form={form} />
              </div>
            </TabsContent>
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
  );
}

const StudioProfileClient = ({ form }: StudioProfileClientProps) => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <h2>Información básica</h2>
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del estudio</FormLabel>
                <FormControl>
                  <Input disabled {...field} value={field.value?.value ?? ""} />
                </FormControl>
                <FormDescription>
                  Si quieres cambiar el nombre, vuelve al primer paso
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono (Llamadas)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono (Whatsapp)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Direccion</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="h-96 w-96">
            <PlacesAutocompleteMap />
          </div>
        </div>
      </div>
      <div className="mt8 mt-10 flex flex-col">
        <h2>Imágenes</h2>
        <FormField
          control={form.control}
          name="mainImageUrl"
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
                  trigger={form.trigger}
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
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Otras Fotos</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-4">
                  {form
                    .getValues("images")
                    ?.map((image) => (
                      <ImageThumbnail
                        key={image}
                        value={image}
                        placeholderUrl="/images/placeholder.svg"
                      />
                    ))}
                </div>
              </FormControl>
              <FormControl>
                <ImageUploader
                  trigger={form.trigger}
                  field={field}
                  disabled={form.formState.isLoading}
                  maxFiles={3}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <OpenHours form={form} />
    </>
  );
};

const OpenHours = ({ form }) => {
  return (
    <div className="mt8 mt-10 flex flex-col">
      <h2>Horarios</h2>
      <div
        className="
    grid
    gap-4
    sm:grid-cols-2
    lg:grid-cols-3
    "
      >
        {weekDays.map((day) => (
          <FormField
            key={day.value}
            control={form.control}
            name={day.value}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">{day.label}</FormLabel>
                <FormControl className="!mt-0">
                  <Input {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};

const StudioClaim = ({ form }) => {
  // We won't actually create the studio here
  const handleCreate = async (inputValue: string) => {
    const fakeCreate = {
      value: inputValue,
      label: inputValue,
    };
    // setStep((prev) => prev + 1);

    return fakeCreate;
  };

  const filteredOptions = async (query: string) => {
    const studios = await getUnclaimedStudioProfiles(query);
    console.log({ studios });
    const formattedStudioArray = studios.map((studio) => ({
      value: studio.name,
      label: studio.name,
      ...studio,
    }));
    return formattedStudioArray;
  };

  return (
    <div
      //  ${step === 0 ? `block` : `hidden`}
      className={`
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
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel></FormLabel>
            <FormControl>
              <AsyncCreatable
                {...field}
                id="name"
                onChange={(selection) => {
                  field.onChange(selection);
                  console.log({ selection });
                  // If selection has id, then it's an existing studio and we have to "load" it into the form
                  if (selection.id) {
                    form.setValue("name", {
                      value: selection.name,
                      label: selection.name,
                    });
                    form.setValue("email", selection.email || "");
                    form.setValue("address", selection.address);
                    form.setValue("lunes", selection.lunes);
                    form.setValue("martes", selection.martes);
                    form.setValue("miercoles", selection.miercoles);
                    form.setValue("jueves", selection.jueves);
                    form.setValue("viernes", selection.viernes);
                    form.setValue("sabado", selection.sabado);
                    form.setValue("domingo", selection.domingo);
                    form.setValue("id", selection.id);
                    form.setValue("phone", selection.phone || "");
                    form.setValue("whatsapp", selection.whatsapp || "");
                    form.setValue("mainImageUrl", selection.mainImageUrl || "");
                    form.setValue("images", selection.images || "");
                    // setStep((prev) => prev + 1);
                  }
                }}
                control={form.control}
                trigger={form.trigger}
                errors={form.errors}
                setValue={form.setValue}
                onCreateOption={handleCreate}
                onGetOptions={filteredOptions}
                placeholder="Busca tu estudio"
              />
            </FormControl>
            <FormDescription>
              <strong className="text-primary">
                Es posible que tu perfil ya esté dado de alta
              </strong>
              , búscate para reclamarlo antes de seguir y si no te encuentras
              créalo!
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const Confirm = ({ form, onConfirm }) => {
  return (
    <div>
      <FormField
        control={form.control}
        onChange={() => {}}
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
              <FormLabel
                className={`
          ${form.getValues("confirm") ? "text-green-600" : "text-destructive"}
          `}
              >
                Confirmo que este es mi perfil:{" "}
                {form.getValues("name")?.value ?? ""}
              </FormLabel>
              <FormDescription>
                Más adelante te pediremos que confirmes con un email propio para
                confirmar que eres tú
              </FormDescription>
              <Button type="button" onClick={onConfirm}>
                Confirmar
              </Button>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};
