"use client";

import { useActionState } from "react";
import { User, Mail, Save } from "lucide-react";
import { type CardArenaUser } from "@/types/models/user";
import { TabSection } from "@/components/composed/TabSection";

interface AccountTabProps {
  initialData: CardArenaUser;
  updateAction: (
    prevState: { error: string | null; success: string | null },
    formData: FormData
  ) => Promise<{ error: string | null; success: string | null }>;
}

export default function AccountTab({ initialData, updateAction }: AccountTabProps) {
  const [state, formAction, isPending] = useActionState(updateAction, {
    error: null,
    success: null,
  });

  return (
    <TabSection
      title="Account Information"
      description="Update your personal details and account settings."
      error={state.error}
      success={state.success}
    >
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            id="username"
            label="Username"
            icon={User}
            defaultValue={initialData.username}
            disabled={isPending}
            required
          />

          <FormField
            id="email"
            label="Email Address"
            type="email"
            icon={Mail}
            defaultValue={initialData.email}
            disabled={isPending}
            required
          />

          <FormField
            id="first_name"
            label="First Name"
            defaultValue={initialData.first_name}
            disabled={isPending}
          />

          <FormField
            id="last_name"
            label="Last Name"
            defaultValue={initialData.last_name}
            disabled={isPending}
          />
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed transition-all"
          >
            {isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </TabSection>
  );
}

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  icon?: React.ComponentType<{ className?: string }>;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
}

function FormField({
  id,
  label,
  type = "text",
  icon: Icon,
  defaultValue,
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
        {label} {required && "*"}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors disabled:bg-slate-50 disabled:text-slate-500"
      />
    </div>
  );
}
