"use client";

import MultiStepButtons from "@/app/(site)/artist/profile/components/multi-step-buttons";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTabs } from "@/hooks/useTabs";
import { getUnclaimedArtistsProfiles } from "@/lib/api-service";
import { apiClient } from "@/lib/apiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { id } from "date-fns/locale";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FieldValues, UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import prisma from "@/lib/prismadb";
import { PrismaClient, Studio } from "@prisma/client";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useSession } from "next-auth/react";
import { StudioProfileClient } from "./StudioProfileClient";
import { Confirm } from "./Confirm";
import { StudioClaim } from "./StudioClaim";

export const weekDays = [
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
    name: z.string(),
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
    userId: z.string().optional(),
  },
  {},
);

type StudioFormValues = z.infer<typeof registerStudioSchema>;
export type UserFormReturnType = UseFormReturn<any, any, undefined>;

export function StudioProfilePageClient({
  studio,
  currentUser,
}: {
  studio: Studio;
  currentUser: any;
}) {
  const [stepsStatus, setStepsStatus] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const tabsBarRef = useRef();
  const tabRefs = useRef([]);
  const { selectedTab, setSelectedTab } = useTabs(tabsBarRef, tabRefs);

  const form = useForm({
    resolver: zodResolver(registerStudioSchema),
    defaultValues: {
      name: studio.name || "",
      email: studio.email || "",
      address: studio.address || "",
      confirm: false,
      lunes: studio.lunes || "",
      martes: studio.martes || "",
      miercoles: studio.miercoles || "",
      jueves: studio.jueves || "",
      viernes: studio.viernes || "",
      sabado: studio.sabado || "",
      domingo: studio.domingo || "",
      phone: studio.phone || "",
      whatsapp: studio.whatsapp || "",
      mainImageUrl: studio.mainImageUrl || "",
      images: [],
      id: studio.id || "",
      userId: currentUser.id || "",
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
                <StudioProfileClient form={form} studioName={studio.name} />
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
