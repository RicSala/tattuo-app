"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { UserFormReturnType } from "./studio-profile-page-client";

export const Confirm = ({
  form,
  onConfirm,
}: {
  form: UserFormReturnType;
  onConfirm: () => void;
}) => {
  return (
    <div>
      <FormField
        control={form.control}
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
                Confirmo que este es mi estudio: {form.getValues("name") || ""}
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
