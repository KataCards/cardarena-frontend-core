"use client";

import { useState } from "react";
import { User, Mail, Lock, Bell, CreditCard, Info } from "lucide-react";
import { TabSection } from "@/components/composed/TabSection";

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tabs: Tab[] = [
  { id: "account", label: "Account", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
];

/**
 * SettingsPage Example
 * 
 * A complete settings page demonstrating multi-tab navigation with form handling.
 * Shows how to compose TabSection, form fields, and state management into a
 * cohesive user settings interface.
 * 
 * This is an example component showing best practices for:
 * - Tab-based navigation
 * - Form state management
 * - Loading states
 * - Success/error feedback
 * - Responsive layouts
 * 
 * @example
 * // Basic usage
 * <SettingsPage />
 * 
 * @example
 * // With initial data
 * <SettingsPage
 *   initialData={{
 *     username: "johndoe",
 *     email: "john@example.com",
 *     firstName: "John",
 *     lastName: "Doe"
 *   }}
 * />
 */
export function SettingsPage({
  initialData = {
    username: "demo_user",
    email: "demo@example.com",
    firstName: "Demo",
    lastName: "User",
  },
}: {
  initialData?: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}) {
  const [activeTab, setActiveTab] = useState("account");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setMessage({ type: "success", text: "Settings saved successfully!" });

    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Tab Navigation */}
          <nav className="md:w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-red-50 text-red-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Tab Content */}
          <div className="flex-1">
            {activeTab === "account" && (
              <AccountTab
                initialData={initialData}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                message={message}
              />
            )}
            {activeTab === "security" && (
              <SecurityTab onSubmit={handleSubmit} isLoading={isLoading} message={message} />
            )}
            {activeTab === "notifications" && (
              <NotificationsTab onSubmit={handleSubmit} isLoading={isLoading} message={message} />
            )}
            {activeTab === "billing" && (
              <BillingTab onSubmit={handleSubmit} isLoading={isLoading} message={message} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Account Tab
function AccountTab({
  initialData,
  onSubmit,
  isLoading,
  message,
}: {
  initialData: any;
  onSubmit: (e: { preventDefault: () => void }) => void;
  isLoading: boolean;
  message: { type: "success" | "error"; text: string } | null;
}) {
  return (
    <TabSection
      title="Account Information"
      description="Update your personal details and account settings"
      error={message?.type === "error" ? message.text : null}
      success={message?.type === "success" ? message.text : null}
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            id="username"
            label="Username"
            icon={User}
            defaultValue={initialData.username}
            disabled={isLoading}
            required
          />
          <FormField
            id="email"
            label="Email Address"
            type="email"
            icon={Mail}
            defaultValue={initialData.email}
            disabled={isLoading}
            required
          />
          <FormField
            id="firstName"
            label="First Name"
            defaultValue={initialData.firstName}
            disabled={isLoading}
          />
          <FormField
            id="lastName"
            label="Last Name"
            defaultValue={initialData.lastName}
            disabled={isLoading}
          />
        </div>
        <SubmitButton isLoading={isLoading} />
      </form>
    </TabSection>
  );
}

// Security Tab
function SecurityTab({
  onSubmit,
  isLoading,
  message,
}: {
  onSubmit: (e: { preventDefault: () => void }) => void;
  isLoading: boolean;
  message: { type: "success" | "error"; text: string } | null;
}) {
  return (
    <TabSection
      title="Security Settings"
      description="Manage your password and security preferences"
      error={message?.type === "error" ? message.text : null}
      success={message?.type === "success" ? message.text : null}
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <FormField
          id="currentPassword"
          label="Current Password"
          type="password"
          icon={Lock}
          disabled={isLoading}
          required
        />
        <FormField
          id="newPassword"
          label="New Password"
          type="password"
          icon={Lock}
          disabled={isLoading}
          required
        />
        <FormField
          id="confirmPassword"
          label="Confirm New Password"
          type="password"
          icon={Lock}
          disabled={isLoading}
          required
        />
        <SubmitButton isLoading={isLoading} text="Update Password" />
      </form>
    </TabSection>
  );
}

// Notifications Tab
function NotificationsTab({
  onSubmit,
  isLoading,
  message,
}: {
  onSubmit: (e: { preventDefault: () => void }) => void;
  isLoading: boolean;
  message: { type: "success" | "error"; text: string } | null;
}) {
  return (
    <TabSection
      title="Notification Preferences"
      description="Choose how you want to be notified"
      error={message?.type === "error" ? message.text : null}
      success={message?.type === "success" ? message.text : null}
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <CheckboxField
          id="emailNotifications"
          label="Email Notifications"
          description="Receive notifications via email"
          defaultChecked
          disabled={isLoading}
        />
        <CheckboxField
          id="pushNotifications"
          label="Push Notifications"
          description="Receive push notifications in your browser"
          defaultChecked
          disabled={isLoading}
        />
        <CheckboxField
          id="marketingEmails"
          label="Marketing Emails"
          description="Receive updates about new features and promotions"
          disabled={isLoading}
        />
        <SubmitButton isLoading={isLoading} text="Save Preferences" />
      </form>
    </TabSection>
  );
}

// Billing Tab
function BillingTab({
  onSubmit,
  isLoading,
  message,
}: {
  onSubmit: (e: { preventDefault: () => void }) => void;
  isLoading: boolean;
  message: { type: "success" | "error"; text: string } | null;
}) {
  return (
    <TabSection
      title="Billing Information"
      description="Manage your billing details and payment methods"
      error={message?.type === "error" ? message.text : null}
      success={message?.type === "success" ? message.text : null}
    >
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Current Plan: Free</p>
            <p className="text-sm text-blue-700 mt-1">
              Upgrade to Pro for unlimited tournaments and advanced features.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <FormField
            id="cardNumber"
            label="Card Number"
            icon={CreditCard}
            placeholder="1234 5678 9012 3456"
            disabled={isLoading}
          />
          <div className="grid grid-cols-2 gap-6">
            <FormField id="expiry" label="Expiry Date" placeholder="MM/YY" disabled={isLoading} />
            <FormField id="cvc" label="CVC" placeholder="123" disabled={isLoading} />
          </div>
          <SubmitButton isLoading={isLoading} text="Update Payment Method" />
        </form>
      </div>
    </TabSection>
  );
}

// Reusable Form Field Component
interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  icon?: React.ComponentType<{ className?: string }>;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

function FormField({
  id,
  label,
  type = "text",
  icon: Icon,
  defaultValue,
  placeholder,
  disabled,
  required,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className={`${Icon ? "flex items-center" : "block"} text-sm font-medium text-slate-700`}
      >
        {Icon && <Icon className="w-4 h-4 mr-2" />}
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors disabled:bg-slate-50 disabled:text-slate-500"
      />
    </div>
  );
}

// Checkbox Field Component
interface CheckboxFieldProps {
  id: string;
  label: string;
  description?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}

function CheckboxField({ id, label, description, defaultChecked, disabled }: CheckboxFieldProps) {
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        id={id}
        name={id}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 disabled:opacity-50"
      />
      <div className="flex-1">
        <label htmlFor={id} className="text-sm font-medium text-slate-700 cursor-pointer">
          {label}
        </label>
        {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
      </div>
    </div>
  );
}

// Submit Button Component
function SubmitButton({ isLoading, text = "Save Changes" }: { isLoading: boolean; text?: string }) {
  return (
    <div className="pt-4 border-t border-slate-100">
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Saving...
          </>
        ) : (
          <>{text}</>
        )}
      </button>
    </div>
  );
}