"use client";
import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import ProfileTab from "./ProfileTab";
import AccountTab from "./AccountTab";
import CardGamesTab from "./CardGamesTab";
import SecurityTab from "./SecurityTab";
import LicenseTab from "./LicenseTab";
import FeedbackTab from "./FeedbackTab";
import { UserCircle, Settings, Shield, FileText, MessageSquare, Gamepad2 } from "lucide-react";

type TabName = "profile" | "cardgame" | "account" | "security" | "license" | "feedback";
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabName>("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "cardgame":
        return <CardGamesTab />;
      case "account":
        return <AccountTab />;
      case "security":
        return <SecurityTab />;
      case "license":
        return <LicenseTab />;
      case "feedback":
        return <FeedbackTab />;
      default:
        return null;
    }
  };

  const TabButton = ({ tabName, label, icon }: { tabName: TabName; label: string; icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center space-x-2 px-4 py-2.5 text-sm font-medium rounded-md transition-colors
        ${activeTab === tabName
          ? "bg-red-600 text-white shadow-md"
          : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
        }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4 overflow-auto">
        <div className="w-full mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Einstellungen</h1>
            <p className="text-gray-600">Verwalte dein Konto, Sicherheit und App-Einstellungen</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 px-4 py-3">
              <div className="flex flex-wrap gap-2">
                <TabButton tabName="profile" label="Profil" icon={<UserCircle className="w-4 h-4" />} />
                <TabButton tabName="cardgame" label="Kartenspiele" icon={<Gamepad2 className="w-4 h-4" />} />
                <TabButton tabName="account" label="Konto" icon={<Settings className="w-4 h-4" />} />
                <TabButton tabName="security" label="Sicherheit" icon={<Shield className="w-4 h-4" />} />
                <TabButton tabName="license" label="Lizenz" icon={<FileText className="w-4 h-4" />} />
                <TabButton tabName="feedback" label="Feedback" icon={<MessageSquare className="w-4 h-4" />} />
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-4">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}