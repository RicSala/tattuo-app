"use client";
import { PlacesAutocompleteMap } from "@/components/places-autocomplete";
import PrimitiveAsyncSelect from "@/components/async-select";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUploader, { ImageThumbnail } from "@/components/image-uploader";
import { Input } from "@/components/ui/input";
import { OpenHours } from "./profile-open-hours";
import { City } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { UserFormReturnType } from "@/types";

export const StudioProfileClient = ({
  form,
  studioName,
  cities,
}: {
  form: UserFormReturnType;
  studioName: string;
  cities: City[];
}) => {
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
                  <Input {...field} value={field.value || ""} disabled />
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

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:content-['*']">Ciudad</FormLabel>
                <FormControl>
                  <PrimitiveAsyncSelect
                    defaultOptions={cities}
                    placeholder="Selecciona ciudad"
                    {...field}
                    //@ts-ignore
                    resources="cities"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="h-96 w-full">
            <PlacesAutocompleteMap
              studioName={form.getValues("name")}
              form={form}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea rows={7} {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    ?.map((image: string) => (
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
