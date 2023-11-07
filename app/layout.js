import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { UiProvider } from "@/providers/ui/ui-provider";
import { LoginModal } from "@/components/modals/login-form";
import { ArtistRegisterModal } from "@/components/modals/artist-register";
import TagManager from "@/scripts/gtm";
import { Suspense } from "react";
import Feedback from "@/components/feedback";
import SupportButton from "@/components/support-button";
import { GlobalErrorHandler } from "@/errors/global-error-handler";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          <TagManager />
        </Suspense>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GlobalErrorHandler />
          <SupportButton />
          <Feedback />
          <UiProvider>
            <LoginModal />
            <ArtistRegisterModal />
            {children}
          </UiProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
