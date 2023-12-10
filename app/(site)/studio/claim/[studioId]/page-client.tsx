"use client";

import MultiStepButtons from "@/app/(site)/artist/profile/components/multi-step-buttons";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTabs } from "@/hooks/useTabs";
import { apiClient } from "@/lib/apiClient";
import { useRef, useState } from "react";
import { City, Studio } from "@prisma/client";
import { StudioProfileClient } from "./(components)/studio-profile-form";
import { Confirm } from "./(components)/claim-confirm";
import { StudioClaim } from "./(components)/studio-claim";
import { useStudioForm } from "./useStudioForm";
import { WithProperty } from "@/types";

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
    validations: ["confirm"],
  },
  {
    key: "profile",
    label: "Complétalo",
    validations: [],
  },
];

export function StudioProfilePageClient({
  studio,
  currentUser,
  cities,
}: {
  studio: WithProperty<Studio, "city", City>;
  currentUser: any;
  cities: City[];
}) {
  const [stepsStatus, setStepsStatus] = useState({});
  const [loadingStatus, setLoadingStatus] = useState("idle");

  const tabsBarRef = useRef();
  const tabRefs = useRef([]);
  const { selectedTab, setSelectedTab } = useTabs(tabsBarRef, tabRefs);

  const { form } = useStudioForm(studio, currentUser);

  const onSubmit = async (data: WithProperty<Studio, "city", City>) => {
    try {
      setLoadingStatus("loading");
      const res = await apiClient.post("/studios", {
        action: data.id === "new" ? "CREATE" : "UPDATE",
        data,
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingStatus("idle");
    }
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
                <StudioProfileClient
                  form={form}
                  studioName={studio?.name}
                  cities={cities}
                />
              </div>
            </TabsContent>
          </Tabs>

          <MultiStepButtons
            form={form}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            STEPS={STEPS}
            //   scrollToTabList={scrollToTabList}
            loadingStatus={loadingStatus}
          />
        </form>
      </Form>
    </div>
  );
}
