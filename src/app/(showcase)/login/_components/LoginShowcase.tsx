"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AmbientBackground } from "@/components/effects/AmbientBackground";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { PasswordInput } from "@/components/ui/PasswordInput";

export interface LoginShowcaseProps {
  logoSrc?: string;
  appName?: string;
  welcomeMessage?: string;
  formHeading?: string;
  usernameLabel?: string;
  passwordLabel?: string;
  submitText?: string;
  loadingText?: string;
  signupText?: string;
  signupHref?: string;
  footerText?: string;
  onLogin?: (username: string, password: string) => Promise<{ error?: string }>;
}

export function LoginShowcase({
  logoSrc = "/CardArena.webp",
  appName = "CardArena",
  welcomeMessage = "Welcome back. Sign in to continue to the showcase environment.",
  formHeading = "Sign In",
  usernameLabel = "Username",
  passwordLabel = "Password",
  submitText = "Sign In",
  loadingText = "Signing in...",
  signupText = "Need an account? Create one",
  signupHref = "/signup",
  footerText = "Showcase route for authentication patterns.",
  onLogin,
}: LoginShowcaseProps) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (onLogin) {
        const result = await onLogin(username, password);
        if (result.error) {
          setError(result.error);
        }
      }
    } catch {
      setError("Something went wrong while signing in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AmbientBackground
      variant="aurora"
      pattern="grid"
      intensity="medium"
      className="min-h-screen"
      contentClassName="flex min-h-screen items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-md">
        <header className="mb-8 text-center">
          <div className="mb-6 flex items-center justify-center">
            <Image
              src={logoSrc}
              alt={`${appName} logo`}
              width={200}
              height={80}
              className="h-16 w-auto object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{appName}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{welcomeMessage}</p>
        </header>

        <Card className="border-border/80 bg-card/95 backdrop-blur-sm">
          <CardHeader className="pb-4 text-center">
            <CardTitle as="h2" className="text-2xl">
              {formHeading}
            </CardTitle>
            <CardDescription>
              Built with the actual input, label, button, and alert primitives.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error ? (
              <ErrorAlert.Root className="mb-6">
                <ErrorAlert.Title as="h3">Unable to sign in</ErrorAlert.Title>
                <ErrorAlert.Description>{error}</ErrorAlert.Description>
              </ErrorAlert.Root>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="showcase-username" required>
                  {usernameLabel}
                </Label>
                <Input
                  id="showcase-username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder={`Enter your ${usernameLabel.toLowerCase()}`}
                  autoComplete="username"
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <Label htmlFor="showcase-password" required>
                  {passwordLabel}
                </Label>
                <PasswordInput
                  id="showcase-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={`Enter your ${passwordLabel.toLowerCase()}`}
                  autoComplete="current-password"
                  disabled={isLoading}
                  required
                />
              </div>

              <Button
                type="submit"
                fullWidth
                disabled={isLoading}
                icon={ArrowRight}
                iconPosition="right"
              >
                {isLoading ? loadingText : submitText}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href={signupHref}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {signupText}
              </Link>
            </div>
          </CardContent>
        </Card>

        <footer className="mt-8 text-center text-sm text-muted-foreground">
          {footerText}
        </footer>
      </div>
    </AmbientBackground>
  );
}
