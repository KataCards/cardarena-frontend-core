"use client";
import React from "react";
import Sidebar from "./Sidebar";
import ProfileTab from "@/components/composed/ProfileTab";
import AccountTab from "@/components/composed/AccountTab";
import CardGamesTab from "@/components/composed/CardGamesTab";
import SecurityTab from "@/components/composed/SecurityTab";
import LicenseTab from "@/components/composed/LicenseTab";
import FeedbackTab from "@/components/composed/FeedbackTab";
import {
  UserCircle,
  Settings,
  Shield,
  FileText,
  MessageSquare,
  Gamepad2,
} from "lucide-react";

export type TabName =
  | "profile"
  | "cardgame"
  | "account"
  | "security"
  | "license"
  | "feedback";

interface TabButtonProps {
  tabName: TabName;
  label: string;
  icon: React.ReactNode;
  activeTab: TabName;
  onClick: (tabName: TabName) => void;
}

function TabButton({
  tabName,
  label,
  icon,
  activeTab,
  onClick,
}: TabButtonProps) {
  return (
    <button
      onClick={() => onClick(tabName)}
      className={`flex items-center space-x-2 px-4 py-2.5 text-sm font-medium rounded-md transition-colors
        ${
          activeTab === tabName
            ? "bg-red-600 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
        }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

interface SettingsPresenterProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
  // Tab Props
  profileProps: React.ComponentProps<typeof ProfileTab>;
  accountProps: React.ComponentProps<typeof AccountTab>;
  cardGamesProps: React.ComponentProps<typeof CardGamesTab>;
  securityProps: React.ComponentProps<typeof SecurityTab>;
  licenseProps: React.ComponentProps<typeof LicenseTab>;
  feedbackProps: React.ComponentProps<typeof FeedbackTab>;
}

/**
 * SettingsPresenter - The "Skin" for the Settings Page.
 * Responsible for the layout and tab navigation structure.
 */
export function SettingsPresenter({
  activeTab,
  onTabChange,
  profileProps,
  accountProps,
  cardGamesProps,
  securityProps,
  licenseProps,
  feedbackProps,
}: SettingsPresenterProps) {
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab {...profileProps} />;
      case "cardgame":
        return <CardGamesTab {...cardGamesProps} />;
      case "account":
        return <AccountTab {...accountProps} />;
      case "security":
        return <SecurityTab {...securityProps} />;
      case "license":
        return <LicenseTab {...licenseProps} />;
      case "feedback":
        return <FeedbackTab {...feedbackProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4 overflow-auto">
        <div className="w-full mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Einstellungen
            </h1>
            <p className="text-gray-600">
              Verwalte dein Konto, Sicherheit und App-Einstellungen
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200 px-4 py-3">
              <div className="flex flex-wrap gap-2">
                <TabButton
                  tabName="profile"
                  label="Profil"
                  icon={<UserCircle className="w-4 h-4" />}
                  activeTab={activeTab}
                  onClick={onTabChange}
                />
                <TabButton
                  tabName="cardgame"
                  label="Kartenspiele"
                  icon={<Gamepad2 className="w-4 h-4" />}
                  activeTab={activeTab}
                  onClick={onTabChange}
                />
                <TabButton
                  tabName="account"
                  label="Konto"
                  icon={<Settings className="w-4 h-4" />}
                  activeTab={activeTab}
                  onClick={onTabChange}
                />
                <TabButton
                  tabName="security"
                  label="Sicherheit"
                  icon={<Shield className="w-4 h-4" />}
                  activeTab={activeTab}
                  onClick={onTabChange}
                />
                <TabButton
                  tabName="license"
                  label="Lizenz"
                  icon={<FileText className="w-4 h-4" />}
                  activeTab={activeTab}
                  onClick={onTabChange}
                />
                <TabButton
                  tabName="feedback"
                  label="Feedback"
                  icon={<MessageSquare className="w-4 h-4" />}
                  activeTab={activeTab}
                  onClick={onTabChange}
                />
              </div>
            </div>

            <div className="p-4">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
