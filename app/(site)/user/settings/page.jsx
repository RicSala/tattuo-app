import { getCurrentUser } from "@/services/db/getCurrentUser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSettings from "./components/account-settings";
import NotificationsSettings from "./components/notifications-settings";
import AppearanceSettings from "./components/appearance-settings";
export const dynamic = "force-dynamic";

export default async function SettingsPage({}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="mx-auto">
      <Tabs defaultValue="account" className="mx-auto w-[350px] ">
        <TabsList className="mb-5 flex flex-row justify-between">
          <TabsTrigger value="account">Tu cuenta</TabsTrigger>
          {/* <TabsTrigger value="notifications">Notificaciones</TabsTrigger> */}
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AccountSettings />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationsSettings />
        </TabsContent>
        <TabsContent value="appearance">
          <AppearanceSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
