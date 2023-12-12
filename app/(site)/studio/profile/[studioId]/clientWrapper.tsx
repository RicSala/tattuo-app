"use client";

import { StudioProfileForm } from "../../claim/[studioId]/(components)/studio-profile-form";
import { City, Studio } from "@prisma/client";
import { Form } from "@/components/ui/form";
import { useStudioForm } from "../../claim/[studioId]/useStudioForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { WithProperty } from "@/types";
import { updateOrCreateStudio } from "@/lib/api-service";
import { InviteForm } from "./invites";
import { FieldErrors } from "react-hook-form";

export function ClientWrapper({
  cities,
  studio,
  currentUser,
}: {
  cities: City[];
  studio: WithProperty<Studio, "city", City>;
  currentUser: any;
}) {
  const { form } = useStudioForm(studio, currentUser);
  const [loadingStatus, setLoadingStatus] = useState("idle");

  const onSubmit = async (data: WithProperty<Studio, "city", City>) => {
    try {
      setLoadingStatus("loading");
      const res = await updateOrCreateStudio(data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingStatus("idle");
    }
  };

  const onError = (error: FieldErrors) => {
    console.log("error", error);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-5"
        >
          <StudioProfileForm
            cities={cities}
            form={form}
            studioName={studio.name}
          />
          <Button type="submit" disabled={loadingStatus === "loading"}>
            Guardar
          </Button>
        </form>
      </Form>
      {/* <DevTool control={invitesForm.control} /> */}
    </div>
  );
}
