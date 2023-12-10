"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserFormReturnType } from "@/types";
import { weekDays } from "../page-client";

export const OpenHours = ({ form }: { form: UserFormReturnType }) => {
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
