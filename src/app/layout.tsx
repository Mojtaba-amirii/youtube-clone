import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/shared/Navigation/Navigation";
import CurrentUserProvider from "@/context/CurrentUserContext";
import getCurrentUser from "@/actions/getCurrent";
import CreateChannelModalProvider from "@/context/CreateChannelModalContext";
import CreateChannelModal from "@/components/shared/Modal/CreateChannelModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MujiTube",
  description: "Broadcast yourself",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen w-screen text-white bg-stone-950`}
      >
        <CreateChannelModalProvider>
          <CreateChannelModal />
          <Toaster
            toastOptions={{
              position: "bottom-left",
            }}
          />
          <CurrentUserProvider user={currentUser}>
            <Navigation />
            <main className=" mt-16">{children}</main>
          </CurrentUserProvider>
        </CreateChannelModalProvider>
      </body>
    </html>
  );
}
