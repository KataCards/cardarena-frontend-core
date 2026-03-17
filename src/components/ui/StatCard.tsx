import React from "react";
import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  isLoading?: boolean;
  error?: string | null;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  isLoading = false,
  error = null,
}: StatCardProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center text-red-600 mb-2">
        <Icon size={24} />
        <h3 className="ml-2 text-lg font-semibold text-gray-700">{title}</h3>
      </div>
      {isLoading ? (
        <p className="text-3xl font-bold text-gray-500 animate-pulse">...</p>
      ) : error ? (
        <p className="text-sm text-red-500">Fehler</p>
      ) : (
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      )}
    </div>
  );
}
