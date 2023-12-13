"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { capitalizeFirst } from "@/lib/utils";

export function CitiesFilter({ filtroCities }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <span className="text-primary/60">Ciudad</span>
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {filtroCities.options.map((city) => {
          return (
            <DropdownMenuItem
              key={city.city}
              onClick={() => {
                console.log(city);
              }}
            >
              {capitalizeFirst(city.city)}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
