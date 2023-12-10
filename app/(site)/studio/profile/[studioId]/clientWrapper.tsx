"use client";

import { z } from "zod";
import { StudioProfileClient } from "../../claim/[studioId]/(components)/studio-profile-form";
import { City, Studio } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useStudioForm } from "../../claim/[studioId]/useStudioForm";
import { Button } from "@/components/ui/button";
import AsyncCreatable from "@/components/async-creatable";
import { DevTool } from "@hookform/devtools";
import BaseError from "@/errors/CustomError";
import { useState } from "react";
import { inviteFormData } from "@/types";
import {
  getUnclaimedArtistsProfiles,
  sendInvitations,
} from "@/lib/api-service";
import { Input } from "@/components/ui/input";

export function ClientWrapper({
  cities,
  studio,
  currentUser,
}: {
  cities: City[];
  studio: Studio;
  currentUser: any;
}) {
  const { form } = useStudioForm(studio, currentUser);
  const [loadingInviteStatus, setLoadingInviteStatus] = useState("idle");
  const invitesForm = useForm({
    resolver: zodResolver(
      // Array of user ids to send invites to

      z.object({
        studioId: z.string(),
        invites: z.array(
          z.object({ value: z.string(), label: z.string(), id: z.string() }),
        ),
      }),
    ),
    defaultValues: {
      studioId: studio.id,
      invites: [],
    },
  });

  console.log({ studio });

  const onSubmit = async (values: any) => {
    console.log(values);
  };

  const onInvite = async (data: inviteFormData) => {
    setLoadingInviteStatus("loading");
    console.log({ data });
    await sendInvitations(data);
    setLoadingInviteStatus("idle");
  };

  const handleCreate = async (inputValue: string) => {
    // const validEmail = z.string().email().parse(inputValue);
    // if (!validEmail) {
    //   throw new BaseError("Invalid email");
    // }

    return {
      value: inputValue,
      label: inputValue,
      id: "email",
    };
  };

  const filteredOptions = async (query: string) => {
    const artists = await getUnclaimedArtistsProfiles(query);
    const formattedStudioArray = artists.map((artist) => ({
      value: artist.artisticName,
      label: artist.artisticName,
      ...artist,
    }));
    return formattedStudioArray;
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <StudioProfileClient
            cities={cities}
            form={form}
            studioName={studio.name}
          />
          <Button type="submit">Guardar</Button>
        </form>
      </Form>
      {/* HERE data: {JSON.stringify(invitesForm.getValues("studioId"))}
      HERE studio: {JSON.stringify(studio.id)} */}
      <Form {...invitesForm}>
        <form
          onSubmit={invitesForm.handleSubmit(onInvite, (error) => {
            console.log(error);
          })}
          className="space-y-5"
        >
          <FormField
            control={invitesForm.control}
            name="studioId"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={invitesForm.control}
            name="invites"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invita tatuadores</FormLabel>

                <FormControl>
                  <AsyncCreatable
                    {...field}
                    createLabel={"Invitar a este email: "}
                    control={invitesForm.control}
                    trigger={invitesForm.trigger}
                    errors={invitesForm.formState.errors}
                    setValue={invitesForm.setValue}
                    // rules={{
                    //   required: "Selecciona al menos un tatuador",
                    //   // max lenth of the array is 3
                    //   validate: (value: any) => {
                    //     value.length <= 3 || "Máximo 3 tags";
                    //   },
                    // }}
                    onCreateOption={handleCreate}
                    onGetOptions={filteredOptions}
                    isMulti={true}
                  />
                </FormControl>
                <FormDescription>
                  Elige entre lxs tatuadores de Tattuo, o introduce un su email
                  si no está en la plataforma
                  {JSON.stringify(invitesForm.formState.errors)}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loadingInviteStatus === "loading"} type="submit">
            Invitar
          </Button>
        </form>
      </Form>
      <DevTool control={invitesForm.control} />
    </div>
  );
}
