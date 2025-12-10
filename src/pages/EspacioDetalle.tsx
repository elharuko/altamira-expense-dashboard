import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import PageMeta from "../components/common/PageMeta";
import Lottie from "lottie-react";
import paymentAnimation from "../assets/animations/payment-animation.json";

type MenuItem = {
    id: string;
    label: string;
    icon: string;
    iconBg: string;
};

const menuItems: MenuItem[] = [
    { id: "resumen", label: "Resumen", icon: "📄", iconBg: "bg-teal-600" },
    { id: "miembros", label: "Miembros", icon: "👥", iconBg: "bg-gray-700" },
    { id: "informes", label: "Informes", icon: "📊", iconBg: "bg-blue-600" },
    { id: "categorias", label: "Categorías", icon: "📁", iconBg: "bg-yellow-600" },
    { id: "flujos", label: "Flujos de trabajo", icon: "🔄", iconBg: "bg-blue-500" },
    { id: "tarjetas", label: "Tarjetas de empresa", icon: "💳", iconBg: "bg-yellow-500" },
    { id: "mas", label: "Más características", icon: "⚙️", iconBg: "bg-gray-600" },
];

export default function EspacioDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("resumen");
    const [showBanner, setShowBanner] = useState(true);
    const [showMasDropdown, setShowMasDropdown] = useState(false);

    // Datos de ejemplo - en producción vendrían de una API
    const espacioData = {
        id: id || "1",
        nombre: "Espacio de trabajo 1 de Diego paulino",
        descripcion: "Un solo lugar para todos tus recibos y gastos.",
        moneda: "PEN - S/.",
        direccion: "",
        tipoPlan: "Recopilar",
        dueno: "Diego paulino's gastos",
        avatar: "E"
    };

    return (
        <>
            <PageMeta
                title={`${espacioData.nombre} | Dashboard`}
                description="Detalles del espacio de trabajo"
            />

            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Sidebar izquierdo */}
                <aside className="relative w-64 bg-white dark:bg-gray-900">
                    {/* Botón de regreso y Header del espacio */}
                    <div className="border-b border-gray-200 p-4 dark:border-gray-800">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => navigate("/espacios")}
                                className="flex items-center justify-center pb-5 text-8xl leading-none text-gray-800 transition-colors hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                            >
                                ‹
                            </button>
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white">
                                {espacioData.avatar}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <h2 className="truncate text-sm font-semibold text-gray-800 dark:text-white/90">
                                    Espacio de trabajo 1...
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Menú de navegación */}
                    <nav className="p-3">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors ${activeSection === item.id
                                    ? "bg-teal-600 text-white dark:bg-teal-600"
                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                    }`}
                            >
                                <div className={`flex h-6 w-6 items-center justify-center rounded text-sm ${activeSection === item.id ? "bg-white/20" : item.iconBg
                                    }`}>
                                    <span className={activeSection === item.id ? "brightness-200" : ""}>{item.icon}</span>
                                </div>
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Footer del sidebar */}
                    <div className="absolute bottom-0 left-0 w-64 border-t border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">Envía tus gastos a continuación:</p>
                            <button
                                className="flex w-full items-center gap-2 rounded-lg bg-gray-50 p-2 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                                    {espacioData.avatar}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-xs font-semibold text-gray-800 dark:text-white/90">
                                        {espacioData.dueno}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Espacio de trabajo
                                    </p>
                                </div>
                                <span className="text-gray-400">→</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Contenido principal */}
                <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
                    {/* Contenido */}
                    <div className="p-8">
                        {/* Vista Resumen */}
                        {activeSection === "resumen" && (
                            <div>
                                {/* Título */}
                                <div className="mb-6 flex items-center gap-2">
                                    <span className="text-2xl">📋</span>
                                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">Resumen</h1>
                                </div>

                                {/* Banner promocional */}
                                {showBanner && (
                                    <div className="mb-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 p-3 text-white">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                                                🚗
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">Expensify + Uber para empresas</h3>
                                                <p className="text-sm opacity-90">
                                                    Conecta Uber for Business para automatizar los gastos de viajes y entrega de comidas en toda su organización.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-teal-700 transition-opacity hover:opacity-90">
                                                Conéctate ahora
                                            </button>
                                            <button
                                                onClick={() => setShowBanner(false)}
                                                className="text-white/80 transition-colors hover:text-white"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Imagen de portada */}
                                <div className="mb-4 h-40 overflow-hidden rounded-xl bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900">
                                    <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwZmZmZmYxMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
                                </div>

                                {/* Sección de avatar y botones */}
                                <div className="mb-6 flex items-start justify-between">
                                    <div className="relative -mt-16">
                                        <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-blue-600 text-4xl font-bold text-white shadow-xl">
                                            {espacioData.avatar}
                                        </div>
                                        <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-white transition-colors hover:bg-gray-600">
                                            ✏️
                                        </button>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                                            👥 Invitar
                                        </button>
                                        <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                                            🔗 Compartir
                                        </button>
                                        <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                                            🗑️ Eliminar
                                        </button>
                                    </div>
                                </div>

                                {/* Información del espacio */}
                                <div className="space-y-3">
                                    {/* Nombre del espacio de trabajo */}
                                    <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-gray-700">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    Nombre del espacio de trabajo
                                                </label>
                                                <p className="text-base font-medium text-gray-800 dark:text-white/90">
                                                    {espacioData.nombre}
                                                </p>
                                            </div>
                                            <span className="text-gray-400 transition-colors group-hover:text-gray-600">→</span>
                                        </div>
                                    </div>

                                    {/* Descripción */}
                                    <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-gray-700">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    Descripción
                                                </label>
                                                <p className="text-base font-medium text-gray-800 dark:text-white/90">
                                                    {espacioData.descripcion}
                                                </p>
                                            </div>
                                            <span className="text-gray-400 transition-colors group-hover:text-gray-600">→</span>
                                        </div>
                                    </div>

                                    {/* Moneda por defecto */}
                                    <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-gray-700">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    Moneda por defecto
                                                </label>
                                                <p className="text-base font-medium text-gray-800 dark:text-white/90">
                                                    {espacioData.moneda}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                    Todas los gastos en este espacio de trabajo serán convertidos a esta moneda.
                                                </p>
                                            </div>
                                            <span className="text-gray-400 transition-colors group-hover:text-gray-600">→</span>
                                        </div>
                                    </div>

                                    {/* Dirección física de la empresa */}
                                    <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-gray-700">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    Dirección física de la empresa
                                                </label>
                                                <p className="text-base font-medium text-gray-400 dark:text-gray-500">
                                                    {espacioData.direccion || "No configurada"}
                                                </p>
                                            </div>
                                            <span className="text-gray-400 transition-colors group-hover:text-gray-600">→</span>
                                        </div>
                                    </div>

                                    {/* Tipo de plan */}
                                    <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-gray-700">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    Tipo de plan
                                                </label>
                                                <p className="text-base font-medium text-gray-800 dark:text-white/90">
                                                    {espacioData.tipoPlan}
                                                </p>
                                            </div>
                                            <span className="text-gray-400 transition-colors group-hover:text-gray-600">→</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Vista de Miembros */}
                        {activeSection === "miembros" && (
                            <div>
                                {/* Título */}
                                <div className="mb-6 flex items-center gap-2">
                                    <span className="text-2xl">👥</span>
                                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">Miembros</h1>
                                </div>

                                <div className="mb-6 flex items-center justify-between">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Total de miembros del espacio de trabajo: 1
                                    </p>
                                    <button className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700">
                                        <span>+</span>
                                        Invitar miembros
                                    </button>
                                </div>

                                {/* Tabla de miembros */}
                                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.02]">
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                    Miembro
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                    Role
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-gray-200 dark:border-gray-800">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300"
                                                        />
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                                                            D
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                                                Diego paulino
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                themasterpro32@gmail.com
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Dueño
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Vista de Informes */}
                        {activeSection === "informes" && (
                            <div>
                                {/* Título */}
                                <div className="mb-6 flex items-center gap-2">
                                    <span className="text-2xl">📊</span>
                                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">Informes</h1>
                                </div>

                                <div className="space-y-6">
                                    {/* Bloque 1: El título del informe */}
                                    <div className="rounded-xl bg-gray-800 p-6">
                                        <h2 className="mb-2 text-lg font-semibold text-white">
                                            El título del informe.
                                        </h2>
                                        <p className="mb-4 text-sm text-gray-400">
                                            Personaliza los títulos de los informes usando nuestras{" "}
                                            <a href="#" className="text-blue-400 hover:underline">
                                                amplias fórmulas
                                            </a>
                                            .
                                        </p>

                                        {/* Título de informe predeterminado */}
                                        <div className="cursor-pointer rounded-lg bg-gray-900/50 p-3 transition-all hover:bg-gray-700">
                                            <div className="mb-1">
                                                <label className="block text-xs font-medium text-gray-400">
                                                    Título de informe predeterminado
                                                </label>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="font-mono text-ms font-medium text-white">
                                                    {"{reporttype} {reportstartdate}"}
                                                </p>
                                                <span className="text-2xl text-gray-400">&gt;</span>
                                            </div>
                                        </div>

                                        {/* Toggle - Evitar cambios */}
                                        <div className="mt-4 flex items-center justify-between">
                                            <p className="text-sm font-medium text-white">
                                                Evitar que los miembros cambien los nombres personalizados de los informes
                                            </p>
                                            <button className="relative ml-4 inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-gray-600 transition-colors">
                                                <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition-transform"></span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Bloque 2: Campos de informe */}
                                    <div className="rounded-xl bg-gray-800 p-6">
                                        <h3 className="mb-2 text-base font-semibold text-white">
                                            Campos de informe
                                        </h3>
                                        <div className="flex items-start justify-between">
                                            <p className="flex-1 text-sm text-gray-400">
                                                Los campos de informe se aplican a todos los gastos y pueden ser útiles cuando quieras solicitar información adicional.
                                            </p>
                                            <button className="relative ml-4 inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-gray-600 transition-colors">
                                                <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition-transform"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Vista de Categorías */}
                        {activeSection === "categorias" && (
                            <div>
                                {/* Título */}
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">📁</span>
                                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">Categorías</h1>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">
                                            + Añadir categoría
                                        </button>
                                        <div className="relative">
                                            <button
                                                onClick={() => setShowMasDropdown(!showMasDropdown)}
                                                className="flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
                                            >
                                                Más
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>

                                            {/* Dropdown */}
                                            {showMasDropdown && (
                                                <div className="absolute right-0 top-full z-10 mt-2 w-64 rounded-lg border border-gray-700 bg-gray-800 shadow-xl">
                                                    <button className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white transition-colors hover:bg-gray-700">
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        Configuración
                                                    </button>
                                                    <button className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white transition-colors hover:bg-gray-700">
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        Importar hoja de cálculo
                                                    </button>
                                                    <button className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white transition-colors hover:bg-gray-700">
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                        </svg>
                                                        Descargar CSV
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Descripción */}
                                <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                                    Obtén una visión general de dónde te gastas el dinero. Utiliza las categorías predeterminadas o añade las tuyas propias.
                                </p>

                                {/* Buscador */}
                                <div className="mb-6">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Encontrar categoría"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-sm text-gray-800 placeholder-gray-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                                        />
                                        <svg
                                            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Tabla de categorías */}
                                <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                                            <tr>
                                                <th className="px-4 py-3 text-left">
                                                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400">
                                                    Nombre
                                                </th>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400">
                                                    Habilitado
                                                </th>
                                                <th className="w-12"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {[
                                                "Advertising",
                                                "Benefits",
                                                "Car",
                                                "Equipment",
                                                "Fees",
                                                "Home Office",
                                                "Insurance",
                                                "Interest",
                                                "Labor",
                                                "Maintenance",
                                                "Materials",
                                                "Meals and Entertainment",
                                                "Office Supplies",
                                                "Other",
                                                "Professional Services",
                                                "Rent",
                                                "Taxes",
                                                "Travel",
                                                "Utilities",
                                            ].map((categoria, index) => (
                                                <tr
                                                    key={index}
                                                    className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                                >
                                                    <td className="px-4 py-3">
                                                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                                    </td>
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white">
                                                        {categoria}
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-teal-600 transition-colors">
                                                            <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition-transform"></span>
                                                        </button>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <span className="text-2xl text-gray-400">&gt;</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Vista de Flujos de trabajo */}
                        {activeSection === "flujos" && (
                            <div>
                                {/* Título */}
                                <div className="mb-6 flex items-center gap-2">
                                    <span className="text-2xl">🔄</span>
                                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">Flujos de trabajo</h1>
                                </div>

                                <div className="space-y-6">
                                    {/* Bloque 1: Frecuencia de envíos */}
                                    <div className="rounded-xl bg-gray-800 p-6">
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex-1">
                                                <h2 className="mb-2 text-lg font-semibold text-white">Frecuencia de envíos</h2>
                                                <p className="text-sm text-gray-400">
                                                    Elige un horario personalizado para enviar los gastos.
                                                </p>
                                            </div>
                                            <button className="relative ml-4 inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-teal-600 transition-colors">
                                                <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition-transform"></span>
                                            </button>
                                        </div>

                                        {/* Frecuencia */}
                                        <div className="cursor-pointer rounded-lg bg-gray-900/50 p-3 transition-all hover:bg-gray-700">
                                            <div className="mb-1">
                                                <label className="block text-xs font-medium text-gray-400">Frecuencia</label>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-white">Manualmente</p>
                                                <span className="text-2xl text-gray-400">&gt;</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bloque 2: Aprobaciones */}
                                    <div className="rounded-xl bg-gray-800 p-6">
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex-1">
                                                <h2 className="mb-2 text-lg font-semibold text-white">Aprobaciones</h2>
                                                <p className="text-sm text-gray-400">
                                                    Requiere una aprobación adicional antes de autorizar un pago.
                                                </p>
                                            </div>
                                            <button className="relative ml-4 inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-teal-600 transition-colors">
                                                <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition-transform"></span>
                                            </button>
                                        </div>

                                        {/* Info */}
                                        <div className="mb-4 rounded-lg border border-gray-700 bg-gray-900/30 p-4">
                                            <div className="flex items-start gap-3">
                                                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="text-sm text-gray-400">
                                                    Este flujo de trabajo por defecto se aplica a todos los miembros, a menos que exista un flujo de trabajo más específico.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Gastos de */}
                                        <div className="mb-3 cursor-pointer rounded-lg bg-gray-900/50 p-3 transition-all hover:bg-gray-700">
                                            <div className="mb-1 flex items-center gap-2">
                                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                <label className="block text-xs font-medium text-gray-400">Gastos de</label>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-white">Todos</p>
                                                <span className="text-2xl text-gray-400">&gt;</span>
                                            </div>
                                        </div>

                                        {/* Aprobador */}
                                        <div className="cursor-pointer rounded-lg bg-gray-900/50 p-3 transition-all hover:bg-gray-700">
                                            <div className="mb-1 flex items-center gap-2">
                                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <label className="block text-xs font-medium text-gray-400">Aprobador</label>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-white">Diego paulino</p>
                                                <span className="text-2xl text-gray-400">&gt;</span>
                                            </div>
                                        </div>

                                        {/* Añadir flujo de aprobación */}
                                        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-600 bg-transparent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700">
                                            <span className="text-lg">+</span>
                                            Añadir flujo de aprobación
                                        </button>
                                    </div>

                                    {/* Bloque 3: Realizar o seguir pagos */}
                                    <div className="rounded-xl bg-gray-800 p-6">
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex-1">
                                                <h2 className="mb-2 text-lg font-semibold text-white">Realizar o seguir pagos</h2>
                                                <p className="text-sm text-gray-400">
                                                    Añade un pagador autorizado para los pagos realizados en Expensify o realiza un seguimiento de los pagos realizados en otro lugar.
                                                </p>
                                            </div>
                                            <button className="relative ml-4 inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-teal-600 transition-colors">
                                                <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition-transform"></span>
                                            </button>
                                        </div>

                                        {/* Añadir cuenta bancaria */}
                                        <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-600 bg-transparent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700">
                                            <span className="text-lg">+</span>
                                            Añadir cuenta bancaria
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Vista de Tarjetas de empresa */}
                        {activeSection === "tarjetas" && (
                            <div>
                                {/* Título */}
                                <div className="mb-6 flex items-center gap-2">
                                    <span className="text-2xl">💳</span>
                                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">Tarjetas de empresa</h1>
                                </div>

                                {/* Banner promocional */}
                                <div className="mb-6 rounded-xl bg-teal-700 p-6">
                                    <div className="flex items-start justify-between gap-6">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <svg className="h-12 w-12 text-teal-300" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h2 className="mb-2 text-lg font-semibold text-white">
                                                    Obtén la Tarjeta Expensify
                                                </h2>
                                                <p className="text-sm text-teal-100">
                                                    Disfruta de una devolución en cada compra en Estados Unidos, hasta un 50% de descuento en tu factura de Expensify, tarjetas virtuales ilimitadas y mucho más.
                                                </p>
                                            </div>
                                        </div>
                                        <button className="flex-shrink-0 rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-600">
                                            Más información
                                        </button>
                                    </div>
                                </div>

                                {/* Imagen ilustrativa con animación */}
                                <div className="mb-6 flex justify-center rounded-xl bg-gradient-to-br from-blue-800 to-blue-900 p-12">
                                    <div className="inline-flex h-[280px] w-[500px] items-center justify-center">
                                        <Lottie
                                            animationData={paymentAnimation}
                                            loop={true}
                                            className="h-full w-full"
                                        />
                                    </div>
                                </div>

                                {/* Sección de importar tarjetas */}
                                <div className="mb-6">
                                    <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">
                                        Importar tarjetas de empresa
                                    </h2>
                                    <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                                        Importar gastos de las tarjetas de empresa existentes.
                                    </p>

                                    {/* Lista de características */}
                                    <div className="mb-6 space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <svg className="h-8 w-8 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="mb-1 font-medium text-gray-800 dark:text-white">
                                                    Compatibilidad con los principales proveedores de tarjetas
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <svg className="h-8 w-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="mb-1 font-medium text-gray-800 dark:text-white">
                                                    Asignar tarjetas a todo el equipo
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <svg className="h-8 w-8 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="mb-1 font-medium text-gray-800 dark:text-white">
                                                    Importación automática de transacciones
                                                </h3>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Botón de añadir tarjetas */}
                                    <button className="w-full rounded-lg bg-teal-600 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-teal-700">
                                        Añadir tarjetas
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Vista de Más características */}
                        {activeSection === "mas" && (
                            <div>
                                {/* Título */}
                                <div className="mb-6 flex items-center gap-2">
                                    <span className="text-2xl">⚙️</span>
                                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">Más características</h1>
                                </div>

                                <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                                    Utiliza los botones de abajo para activar más funciones a medida que creces. Cada función aparecerá en el menú de navegación para una mayor personalización.
                                </p>

                                {/* Integrar */}
                                <div className="mb-6">
                                    <h2 className="mb-4 text-base font-semibold text-gray-600 dark:text-gray-500">Integrar</h2>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {/* Contabilidad */}
                                        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">📊</div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800 dark:text-white">Contabilidad</h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Sincroniza tu plan de cuentas y otras opciones.</p>
                                                </div>
                                            </div>
                                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-gray-300 transition-colors dark:bg-gray-600">
                                                <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition-transform"></span>
                                            </button>
                                        </div>

                                        {/* Socios de recibos */}
                                        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">🧾</div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800 dark:text-white">Socios de recibos</h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Importación automática de recibos.</p>
                                                </div>
                                            </div>
                                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-gray-300 transition-colors dark:bg-gray-600">
                                                <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition-transform"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Organizar */}
                                <div className="mb-6">
                                    <h2 className="mb-4 text-base font-semibold text-gray-600 dark:text-gray-500">Organizar</h2>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {/* Categorías */}
                                        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">📁</div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800 dark:text-white">Categorías</h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Monitoriza y organiza tus gastos.</p>
                                                </div>
                                            </div>
                                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-teal-600 transition-colors">
                                                <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition-transform"></span>
                                            </button>
                                        </div>

                                        {/* Etiquetas */}
                                        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">🏷️</div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800 dark:text-white">Etiquetas</h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Clasifica costes y rastrea gastos facturables.</p>
                                                </div>
                                            </div>
                                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-gray-300 transition-colors dark:bg-gray-600">
                                                <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition-transform"></span>
                                            </button>
                                        </div>

                                        {/* Impuestos */}
                                        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">💰</div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800 dark:text-white">Impuestos</h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Documenta y reclama los impuestos aplicables.</p>
                                                </div>
                                            </div>
                                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-gray-300 transition-colors dark:bg-gray-600">
                                                <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition-transform"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Gestionar */}
                                <div className="mb-6">
                                    <h2 className="mb-4 text-base font-semibold text-gray-600 dark:text-gray-500">Gestionar</h2>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {/* Flujos de trabajo */}
                                        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">🔄</div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800 dark:text-white">Flujos de trabajo</h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Configura cómo se aprueban y paga los gastos.</p>
                                                </div>
                                            </div>
                                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-teal-600 transition-colors">
                                                <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition-transform"></span>
                                            </button>
                                        </div>

                                        {/* Reglas */}
                                        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">📋</div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800 dark:text-white">Reglas</h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Solicita recibos, resulta gastos de alto importe y mucho más.</p>
                                                </div>
                                            </div>
                                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-gray-300 transition-colors dark:bg-gray-600">
                                                <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition-transform"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Gasto */}
                                <div className="mb-6">
                                    <h2 className="mb-4 text-base font-semibold text-gray-600 dark:text-gray-500">Gasto</h2>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {/* Tasas de distancia */}
                                        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">🚗</div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800 dark:text-white">Tasas de distancia</h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Añade, actualiza y haz cumplir las tasas.</p>
                                                </div>
                                            </div>
                                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-gray-300 transition-colors dark:bg-gray-600">
                                                <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition-transform"></span>
                                            </button>
                                        </div>

                                        {/* Tarjeta Expensify */}
                                        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">💳</div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800 dark:text-white">Tarjeta Expensify</h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Obtén información y control sobre tus gastos.</p>
                                                </div>
                                            </div>
                                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-gray-300 transition-colors dark:bg-gray-600">
                                                <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition-transform"></span>
                                            </button>
                                        </div>

                                        {/* Tarjetas de empresa */}
                                        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">💳</div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800 dark:text-white">Tarjetas de empresa</h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Importar gastos de las tarjetas de empresa existentes.</p>
                                                </div>
                                            </div>
                                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-teal-600 transition-colors">
                                                <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition-transform"></span>
                                            </button>
                                        </div>

                                        {/* Per diem */}
                                        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">📅</div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800 dark:text-white">Per diem</h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Establece las tasas per diem para controlar los gastos diarios de los empleados.</p>
                                                </div>
                                            </div>
                                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-gray-300 transition-colors dark:bg-gray-600">
                                                <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition-transform"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Gane */}
                                <div className="mb-6">
                                    <h2 className="mb-4 text-base font-semibold text-gray-600 dark:text-gray-500">Gane</h2>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {/* Facturas */}
                                        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">🧾</div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800 dark:text-white">Facturas</h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Enviar y recibir facturas.</p>
                                                </div>
                                            </div>
                                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-gray-300 transition-colors dark:bg-gray-600">
                                                <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition-transform"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
