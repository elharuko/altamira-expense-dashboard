import { useState } from "react";
import PageMeta from "../components/common/PageMeta";
import SearchFilterLayout from "../components/common/SearchFilterLayout";
import Lottie from "lottie-react";
import coheteAnimation from "../assets/animations/cohete.json";
import workingAnimation from "../assets/animations/Working.json";
import informationAnimation from "../assets/animations/Information.json";

export default function Informes() {
    const [activeView, setActiveView] = useState("gastos");

    return (
        <>
            <PageMeta title="Informes | Altamira Expense Dashboard" description="Gestiona y visualiza tus informes de gastos" />
            <div className="p-3 pl-1">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">Informes</h1>
                </div>

                {/* Sidebar y contenido */}
                <div className="flex gap-6">
                    {/* Sidebar izquierdo */}
                    <div className="w-64 flex-shrink-0">
                        <div className="rounded-xl bg-white p-4 dark:bg-gray-800/50">
                            {/* Tareas */}
                            <div className="mb-6">
                                <h3 className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Tareas</h3>
                                <button
                                    onClick={() => setActiveView("enviar")}
                                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${activeView === "enviar"
                                        ? "bg-teal-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                        }`}
                                >
                                    <span>✏️</span>
                                    Enviar
                                </button>
                            </div>

                            {/* Explorar */}
                            <div>
                                <h3 className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Explorar</h3>
                                <button
                                    onClick={() => setActiveView("gastos")}
                                    className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${activeView === "gastos"
                                        ? "bg-teal-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                        }`}
                                >
                                    <span>💰</span>
                                    Gastos
                                </button>
                                <button
                                    onClick={() => setActiveView("informes")}
                                    className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${activeView === "informes"
                                        ? "bg-teal-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                        }`}
                                >
                                    <span>📄</span>
                                    Informes
                                </button>
                                <button
                                    onClick={() => setActiveView("chats")}
                                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${activeView === "chats"
                                        ? "bg-teal-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                        }`}
                                >
                                    <span>💬</span>
                                    Chats
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Contenido principal */}
                    <div className="flex-1">
                        {activeView === "enviar" && (
                            <SearchFilterLayout
                                searchPlaceholder="Busca algo"
                                typeFilterLabel="Tipo: Enviar"
                                emptyMessage="No hay gastos para enviar"
                                emptySubtitle="Todo despejado. ¡Date una vuelta de victoria!"
                                showButton={true}
                                buttonText="Crear gasto"
                                useAnimation={true}
                                animationData={coheteAnimation}
                            />
                        )}

                        {activeView === "gastos" && (
                            <SearchFilterLayout
                                searchPlaceholder="Busca algo"
                                typeFilterLabel="Tipo: Gastos"
                                emptyMessage="Aún no has creado ningún gasto"
                                emptySubtitle="Usa el botón verde de abajo para crear un gasto."
                                showButton={true}
                                buttonText="Crear gasto"
                                useAnimation={true}
                                animationData={workingAnimation}
                            />
                        )}

                        {activeView === "informes" && (
                            <SearchFilterLayout
                                searchPlaceholder="Busca algo"
                                typeFilterLabel="Tipo: Informes"
                                emptyMessage="Aún no has creado ningún informe"
                                emptySubtitle="Usa el botón verde de abajo para crear un informe."
                                showButton={true}
                                buttonText="Crear informe"
                                useAnimation={true}
                                animationData={informationAnimation}
                            />
                        )}

                        {activeView === "chats" && (
                            <SearchFilterLayout
                                searchPlaceholder="Busca algo"
                                typeFilterLabel="Tipo: Chats"
                                emptyMessage="No se encontraron chats"
                                emptyIcon="💬"
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
