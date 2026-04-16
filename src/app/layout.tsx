import type { Metadata } from "next";
import "./globals.css";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "CardArena",
  description: "Tournament management solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider>
          {children}
          <div className="fixed right-4 bottom-4 z-60 sm:right-6 sm:bottom-6">
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
