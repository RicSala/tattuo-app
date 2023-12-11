"use client";
import AsyncCreatable from "@/components/async-creatable";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { getUnclaimedStudioProfiles } from "@/lib/api-service";
import { UserFormReturnType } from "@/types";

export const StudioClaim = ({ form }: { form: UserFormReturnType }) => {
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
          <strong>Busca tu estudio</strong> en TATTUO!
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
                value={{
                  value: field.value,
                  label: field.value,
                }}
                id="name"
                onChange={(selection: any) => {
                  field.onChange(selection.value);
                  console.log("from claim", { selection });
                  // If selection has id, then it's an existing studio and we have to "load" it into the form
                  if (selection.id) {
                    form.setValue("name", selection.name || field.value);
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
                    // form.setValue(
                    //   "city",
                    //   {
                    //     id: selection.city.id,
                    //     value: selection.city.value,
                    //     label: selection.city.label,
                    //   } || "",
                    // );
                    // setStep((prev) => prev + 1);
                  }
                }}
                control={form.control}
                trigger={form.trigger}
                errors={form.formState.errors}
                setValue={form.setValue}
                onCreateOption={handleCreate}
                onGetOptions={filteredOptions}
                placeholder="Busca tu estudio"
              />
            </FormControl>
            <FormDescription>
              <strong className="text-primary">
                Es posible que tu estudio ya esté dado de alta
              </strong>
              , búscalo para reclamarlo antes de seguir y si no te encuentras
              créalo!
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
