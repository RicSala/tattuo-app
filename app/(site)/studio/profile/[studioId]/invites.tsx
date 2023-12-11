"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import AsyncCreatable from "@/components/async-creatable";
import { useState } from "react";
import { WithProperty, inviteFormBody } from "@/types";
import { getArtistsProfiles, sendInvitate } from "@/lib/api-service";
import { Input } from "@/components/ui/input";
import BaseError from "@/errors/CustomError";
import { useToast } from "@/components/ui/use-toast";
import { ArtistProfile, Invite } from "@prisma/client";
import { useRouter } from "next/navigation";
const filteredArtists = async (query: string) => {
  const artists = await getArtistsProfiles(query);
  const formattedStudioArray = artists.map((artist) => ({
    value: artist.artisticName,
    label: artist.artisticName,
    ...artist,
  }));
  return formattedStudioArray;
};

export function InviteForm({ studioId }: { studioId: string }) {
  const [loadingInviteStatus, setLoadingInviteStatus] = useState("idle");
  const { toast } = useToast();
  const router = useRouter();
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
      studioId: studioId,
      invites: [],
    },
  });

  //This is used in the case they add a new email to invite instead of selecting an existing artist
  const handleCreate = async (inputValue: string) => {
    const validEmail = z.string().email().safeParse(inputValue);
    if (!validEmail.success) {
      toast({
        title: "Error",
        description: "El email no es válido",
        variant: "destructive",
      });
      return;
    }
    return {
      value: inputValue,
      label: inputValue,
      id: "email",
    };
  };

  const onInvite = async (data: inviteFormBody) => {
    setLoadingInviteStatus("loading");
    console.log({ data });
    // TODO: Add error handling
    await sendInvitate(data);
    toast({
      title: "Invitaciones enviadas",
      description: "Se han enviado las invitaciones correctamente",
      variant: "default",
    });
    router.refresh();
    invitesForm.reset();
    setLoadingInviteStatus("idle");
  };

  return (
    <>
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
                    onGetOptions={filteredArtists}
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
    </>
  );
}

export const InvitesTable = ({
  invites,
}: {
  invites: WithProperty<Invite, "artist", ArtistProfile>[];
}) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Nombre
                  </th>
                  <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Email
                  </th>
                  <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {invites.map((invite) => (
                  <tr key={invite.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {invite.artist.artisticName}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {invite.artist.email}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5
                         ${
                           invite.status === "ACCEPTED"
                             ? "bg-green-100 text-green-800"
                             : "bg-red-100 text-red-800"
                         }`}
                      >
                        {invite.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InviteComp = ({
  studioId,
  invites,
}: {
  studioId: string;
  invites: WithProperty<Invite, "artist", ArtistProfile>[];
}) => {
  return (
    <>
      <h2>Invita a tatuadores</h2>
      <InviteForm studioId={studioId} />
      <InvitesTable invites={invites} />
    </>
  );
};
