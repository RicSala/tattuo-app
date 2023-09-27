import { getCurrentUser } from "@/actions/getCurrentUser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSettings from "./components/account-settings";
import NotificationsSettings from "./components/notifications-settings";
import AppearanceSettings from "./components/appearance-settings";
import EmptyState from "@/components/empty-state";

export default async function SettingsPage({

}) {

    const currentUser = await getCurrentUser()

    return (

        <div className="mx-auto">
            <Tabs defaultValue="account" className="w-[350px] mx-auto ">
                <TabsList className="flex flex-row justify-between mb-5">
                    <TabsTrigger value="account">Tu cuenta</TabsTrigger>
                    {/* <TabsTrigger value="notifications">Notificaciones</TabsTrigger> */}
                    <TabsTrigger value="appearance">Apariencia</TabsTrigger>
                </TabsList>
                <TabsContent value="account"><AccountSettings currentUser={currentUser} /></TabsContent>
                <TabsContent value="notifications"><NotificationsSettings currentUser={currentUser} /></TabsContent>
                <TabsContent value="appearance"><AppearanceSettings currentUser={currentUser} /></TabsContent>
            </Tabs>


        </div>

    );
}