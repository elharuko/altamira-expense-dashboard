import { useState } from "react";
import PageMeta from "../components/common/PageMeta";
import PageBreadCrumb from "../components/common/PageBreadCrumb";
import ConciergeChat from "../components/Inbox/ConciergeChat";

export default function Recibidos() {
    const [activeTab, setActiveTab] = useState("chat");

    const tabs = [
        { id: "chat", label: "Chat Concierge", icon: "💬" },
        { id: "inbox", label: "Bandeja de entrada", icon: "📥" },
        { id: "archive", label: "Archivados", icon: "📦" },
    ];

    return (
        <>
            <PageMeta
                title="Recibidos | Dashboard"
                description="Gestiona tus mensajes y conversaciones"
            />
            <PageBreadCrumb pageTitle="Recibidos" />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Sidebar */}
                <div className="lg:col-span-3">
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
                            Recibidos
                        </h2>
                        <nav className="space-y-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${activeTab === tab.id
                                        ? "bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400"
                                        : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
                                        }`}
                                >
                                    <span className="text-lg">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                    {tab.id === "inbox" && (
                                        <span className="ml-auto rounded-full bg-teal-600 px-2 py-0.5 text-xs text-white">
                                            2
                                        </span>
                                    )}
                                </button>
                            ))}
                        </nav>

                        {/* Lista de conversaciones */}
                        <div className="mt-6">
                            <h3 className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                Conversaciones
                            </h3>
                            <div className="space-y-1">
                                <div className="flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-3 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10">
                                    <div className="relative">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600">
                                            <span className="text-sm text-white">⛰</span>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-gray-900"></div>
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
                                                Concierge
                                            </p>
                                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        </div>
                                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                                            ¡Hola! 👋 ¿En qué puedo ayudar...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="lg:col-span-9">
                    {activeTab === "chat" && <ConciergeChat />}
                    {activeTab === "inbox" && (
                        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-white/[0.03]">
                            <div className="mb-4 text-6xl">📥</div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
                                Bandeja de entrada
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                No tienes mensajes nuevos
                            </p>
                        </div>
                    )}
                    {activeTab === "archive" && (
                        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-white/[0.03]">
                            <div className="mb-4 text-6xl">📦</div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
                                Archivados
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                No hay conversaciones archivadas
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
