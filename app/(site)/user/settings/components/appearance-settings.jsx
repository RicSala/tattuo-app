"use client";

import Heading from "@/components/heading";
import Spinner from "@/components/icons/spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { apiClient } from "@/lib/apiClient";
import { Check, Save } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AppearanceSettings({ currentUser }) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      darkMode: currentUser?.settings?.darkMode || "false",
    },
  });

  const { isDirty, isSubmitted, isSubmitting } = form.formState;
  const [isSaving, setIsSaving] = useState(false);

  const { setTheme } = useTheme();

  const onSubmit = (data) => {
    setIsSaving(true);
    apiClient
      .put("/users", {
        data,
      })
      .then((res) => {
        toast({
          title: "Usuario actualizado correctamente",
          description: "Puedes seguir navegando y descubriendo nuev@s artistas",
          variant: "success",
        });
      })
      .catch((error) => {
        toast({
          title: "Error al guardar",
          description: error.response.data.error,
          variant: "customDestructive",
        });
      })
      .finally(() => {
        router.refresh();
        setIsSaving(false);
      });
  };

  return (
    <div>
      {/* TODO: is not working */}
      <Heading title="Elige como prefieres ver TATTUO" className="text-lg" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="darkMode"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Modo Oscuro</FormLabel>
                      <FormDescription>
                        Activa el modo oscuro para proteger tu vista. Nosotros
                        lo preferimos, pero entendemos que va por gustos!
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(value) => {
                          field.onChange(value);
                          value === true ? setTheme("dark") : setTheme("light");
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="flex flex-row items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitted && !isDirty ? (
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
        </form>
      </Form>
    </div>
  );
}
