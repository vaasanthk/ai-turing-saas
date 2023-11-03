import ModalProvider from "@/components/modal-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { montserratSmall, roboto } from "@/config/font"
import ToasterProvider from "@/components/toaster-provider"

import type { Metadata } from "next"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { CrispProvider } from "@/components/crisp-provider"

export const metadata: Metadata = {
  title: "Turing",
  description: "Experience the future of advanced AI",
  icons: {
    icon: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CrispProvider />
            <ModalProvider />
            <ToasterProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
