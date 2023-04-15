import { AuthContextProvider } from "#/lib/contexts/AuthContext";
import { FeatureToggleContextProvider } from "#/lib/contexts/FeatureToggleContext";
import { LayoutContextProvider } from "#/lib/contexts/LayoutContext";
import { SettingsContextProvider } from "#/lib/contexts/SettingsContext";
import supabaseServerComponent from "#/lib/databases/supabase/supabase-server-component";
import "#/styles/globals.css";
import clsx from "clsx";
import type { Session } from "next-auth";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Provider as RWBProvider } from "react-wrap-balancer";
import { globalMetadata } from "./metadata";

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
        <RWBProvider>
          <FeatureToggleContextProvider>
            <SettingsContextProvider>
              <LayoutContextProvider>
                <body className={clsx(sfPro.variable, inter.variable)}>
                  {children}
                </body>
              </LayoutContextProvider>
            </SettingsContextProvider>
          </FeatureToggleContextProvider>
        </RWBProvider>
      </AuthContextProvider>
    </html>
  );
}
