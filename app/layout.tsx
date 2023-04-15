import { AuthContextProvider } from "#/lib/contexts/AuthContext";
import supabaseServerComponent from "#/lib/databases/supabase/supabase-server-component";
import "#/styles/globals.css";
import type { Session } from "next-auth";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { globalMetadata } from "./metadata";
import clsx from "clsx";

// This will ensure that every time a new route is loaded, our session data in RootLayout will always be up-to-date.
export const revalidate = 0;

export const metadata = globalMetadata;

const sfPro = localFont({
  src: "../styles/SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

async function getSession(cookie: string): Promise<Session> {
  const endpoint = process.env.APP_API_URL + "/auth/session";
  console.log("endpoint", endpoint);
  const response = await fetch(`${process.env.APP_API_URL}/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = supabaseServerComponent();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang="en">
      <AuthContextProvider accessToken={accessToken}>
        <body className={clsx(sfPro.variable, inter.variable)}>{children}</body>
      </AuthContextProvider>
    </html>
  );
}
