import type { Metadata } from "next";
import "./globals.css";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const metadata: Metadata = {
  title: "CardArena",
  description: "Tournament management solution",
};

const themeScript = `
  (function() {
    try {
      var storedTheme = localStorage.getItem("theme");
      var systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      var theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : systemTheme;
      var root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      root.dataset.theme = theme;
    } catch (error) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        {children}
        <div className="fixed right-4 bottom-4 z-[60] sm:right-6 sm:bottom-6">
          <ThemeToggle />
        </div>
      </body>
    </html>
  );
}
