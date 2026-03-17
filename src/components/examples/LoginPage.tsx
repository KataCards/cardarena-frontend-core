"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";

interface LoginPageProps {
  /** Optional logo image source */
  logoSrc?: string;
  /** Application name displayed in header */
  appName?: string;
  /** Welcome message below the app name */
  welcomeMessage?: string;
  /** Form heading text */
  formHeading?: string;
  /** Username field label */
  usernameLabel?: string;
  /** Password field label */
  passwordLabel?: string;
  /** Submit button text */
  submitText?: string;
  /** Loading state button text */
  loadingText?: string;
  /** Signup link text */
  signupText?: string;
  /** Signup link href */
  signupHref?: string;
  /** Footer copyright text */
  footerText?: string;
  /** Server action or async function to handle login */
  onLogin?: (username: string, password: string) => Promise<{ error?: string }>;
}

/**
 * LoginPage Example
 * 
 * A complete, production-ready login page demonstrating form handling,
 * loading states, error display, and password visibility toggle.
 * 
 * This is an example component showing how to compose UI primitives
 * into a full authentication flow. Customize text, branding, and
 * authentication logic via props.
 * 
 * @example
 * // Basic usage with default styling
 * <LoginPage 
 *   onLogin={async (username, password) => {
 *     const result = await signIn(username, password);
 *     if (!result.success) return { error: "Invalid credentials" };
 *     return {};
 *   }}
 * />
 * 
 * @example
 * // Custom branding and text
 * <LoginPage
 *   logoSrc="/my-logo.png"
 *   appName="MyApp"
 *   welcomeMessage="Welcome back to your dashboard"
 *   formHeading="Sign In"
 *   signupHref="/register"
 *   onLogin={handleLogin}
 * />
 * 
 * @example
 * // With Next.js Server Actions
 * <LoginPage
 *   onLogin={async (username, password) => {
 *     'use server';
 *     const session = await authenticate(username, password);
 *     if (!session) return { error: "Authentication failed" };
 *     redirect('/dashboard');
 *   }}
 * />
 */
export function LoginPage({
  logoSrc = "/CardArena.webp",
  appName = "CardArena",
  welcomeMessage = "Welcome back! Sign in to your account.",
  formHeading = "Sign In",
  usernameLabel = "Username",
  passwordLabel = "Password",
  submitText = "Sign In",
  loadingText = "Signing in...",
  signupText = "Don't have an account? Sign up",
  signupHref = "/signup",
  footerText = "© 2025 CardArena. All rights reserved.",
  onLogin,
}: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (onLogin) {
        const result = await onLogin(username, password);
        if (result.error) {
          setError(result.error);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-red-50 flex items-center justify-center p-4">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-red-200 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-red-300 rounded-full opacity-15 blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Branding Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <Image
              src={logoSrc}
              alt={`${appName} Logo`}
              width={200}
              height={80}
              className="h-16 w-auto object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{appName}</h1>
          <p className="text-gray-600">{welcomeMessage}</p>
        </header>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              {formHeading}
            </h2>
            <div className="w-16 h-1 bg-red-600 rounded-full mx-auto" />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              id="username"
              label={usernameLabel}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              required
              placeholder={`Enter your ${usernameLabel.toLowerCase()}`}
            />

            <FormField
              id="password"
              label={passwordLabel}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
              placeholder={`Enter your ${passwordLabel.toLowerCase()}`}
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{loadingText}</span>
                </>
              ) : (
                <>
                  <span>{submitText}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href={signupHref}
              className="text-sm text-gray-600 hover:text-red-600 font-medium transition-colors"
            >
              {signupText}
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-gray-500">{footerText}</p>
        </footer>
      </div>
    </div>
  );
}

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

function FormField({
  id,
  label,
  type,
  value,
  onChange,
  disabled,
  required,
  placeholder,
  showPasswordToggle,
  showPassword,
  onTogglePassword,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500 outline-none"
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            disabled={disabled}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}