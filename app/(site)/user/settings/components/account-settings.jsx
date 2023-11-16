"use client";

import Heading from "@/components/heading";
import Spinner from "@/components/icons/spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { apiClient } from "@/lib/apiClient";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z.object({
  currentPassword: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  newPassword: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  confirmNewPassword: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  // role: z.string().min(2, {
  // }),
});

export default function AccountSettings({ currentUser }) {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerFormSchema),

    defaultValues: {
      name: currentUser.name,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

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
        setIsSaving(false);
      });
  };

  return (
    <div>
      <Heading
        title={`${currentUser.name}, configura tu cuenta`}
        className="text-lg"
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña actual</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Aquí va tu contraseña actual..."
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña nueva</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Aquí la nueva..."
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirma tu contraseña nueva</FormLabel>
                <FormControl>
                  <Input
                    placeholder="...y aquí repite la nueva"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isSaving} type="submit">
            <div className="flex flex-row gap-2">
              Guardar
              {isSaving ? <Spinner /> : null}
            </div>
          </Button>

          {/* <DevTool control={form.control} /> */}
        </form>
      </Form>
    </div>
  );
}
