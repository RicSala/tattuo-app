"use client";

import { StudioProfileForm } from "../../claim/[studioId]/(components)/studio-profile-form";
import { City, Studio } from "@prisma/client";
import { Form } from "@/components/ui/form";
import {
    StudioFormValues,
    useStudioForm,
} from "../../claim/[studioId]/useStudioForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { WithProperty } from "@/types";
import { InviteForm } from "./invites";
import { FieldErrors } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { ApiService } from "@/services/api/api-service";

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
    const { toast } = useToast();

    const onSubmit = async (data: StudioFormValues) => {
        try {
            console.log("data", data);
            setLoadingStatus("loading");
            const res = await ApiService.updateOrCreateStudio(data);
            toast({
                title: "Estudio actualizado",
                description: "Los cambios serán visibles inmediatamente",
            });
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
                    <Button
                        type="submit"
                        disabled={loadingStatus === "loading"}
                    >
                        Guardar
                    </Button>
                </form>
            </Form>
            {/* <DevTool control={invitesForm.control} /> */}
        </div>
    );
}
