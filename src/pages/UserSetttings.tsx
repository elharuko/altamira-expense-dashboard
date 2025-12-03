import { useState } from "react";
import SettingsSidebar from "../components/UserSettings/SettingsSidebar";
import ProfileSettings from "../components/UserSettings/ProfileSettings";
import WalletSettings from "../components/UserSettings/WalletSettings";
import PreferencesSettings from "../components/UserSettings/PreferencesSettings";
import SecuritySettings from "../components/UserSettings/SecuritySettings";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";

export default function UserSettings() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <>
            <PageMeta
                title="User Settings | TailAdmin - React.js Admin Dashboard"
                description="User Settings page for TailAdmin"
            />
            <PageBreadcrumb pageTitle="User Settings" />
            <div className="flex gap-6">
                {/* Sidebar izquierdo */}
                <SettingsSidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                {/* Contenido principal */}
                <div className="flex-1">
                    {activeTab === "profile" && <ProfileSettings />}
                    {activeTab === "wallet" && <WalletSettings />}
                    {activeTab === "preferences" && <PreferencesSettings />}
                    {activeTab === "security" && <SecuritySettings />}
                </div>
            </div>
        </>
    );
}