import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { CartProvider } from "@/hooks/useCart";
import { ConvexClientProvider } from "./ConvexClientProvider";

export const metadata: Metadata = {
  title: "AudioPhile",
  description: "E-Commerce for audio devices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>
          <CartProvider>{children}</CartProvider>
        </ConvexClientProvider>
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          expand
          toastOptions={{
            style: { fontSize: "14px" },
          }}
        />
      </body>
    </html>
  );
}
