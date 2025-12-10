import { useState } from "react";
import { useNavigate } from "react-router";
import PageMeta from "../components/common/PageMeta";
import PageBreadCrumb from "../components/common/PageBreadCrumb";

interface Espacio {
    id: number;
    nombre: string;
    dueno: {
        nombre: string;
        email: string;
        avatar: string;
    };
    tipo: {
        nombre: string;
        icono: string;
    };
    estado: "Predeterminado" | "Activo" | "Archivado";
}

export default function Espacios() {
    const navigate = useNavigate();
    const [espacios] = useState<Espacio[]>([
        {
            id: 1,
            nombre: "Espacio de trabajo 1 de Diego paulino",
            dueno: {
                nombre: "Diego paulino",
                email: "themasterpc24@gmail.com",
                avatar: "👤"
            },
            tipo: {
                nombre: "Recopilar",
                icono: "📋"
            },
            estado: "Predeterminado"
        }
    ]);

    const [showNewEspacioModal, setShowNewEspacioModal] = useState(false);

    return (
        <>
            <PageMeta
                title="Espacios de trabajo | Dashboard"
                description="Gestiona tus espacios de trabajo"
            />
            <PageBreadCrumb pageTitle="Espacios de trabajo" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Espacios de trabajo
                    </h1>
                    <button
                        onClick={() => setShowNewEspacioModal(true)}
                        className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700"
                    >
                        <span className="text-lg">+</span>
                        Nuevo espacio de trabajo
                    </button>
                </div>

                {/* Tabla de espacios */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.02]">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Nombre del espacio de trabajo
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Dueño
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Tipo de espacio de trabajo
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                {espacios.map((espacio) => (
                                    <tr
                                        key={espacio.id}
                                        onClick={() => navigate(`/espacios/${espacio.id}`)}
                                        className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-xl dark:bg-teal-900/30">
                                                    E
                                                </div>
                                                <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                                                    {espacio.nombre}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                                    <span className="text-sm">{espacio.dueno.avatar}</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                                        {espacio.dueno.nombre}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {espacio.dueno.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg">{espacio.tipo.icono}</span>
                                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                                    {espacio.tipo.nombre}
                                                </span>
                                                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                                    Plan
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <span className="rounded-full border border-teal-600 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 dark:border-teal-500 dark:bg-teal-900/20 dark:text-teal-400">
                                                    {espacio.estado}
                                                </span>
                                                <button
                                                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/5 dark:hover:text-gray-300"
                                                    title="Más opciones"
                                                >
                                                    ⋮
                                                </button>
                                                <button
                                                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/5 dark:hover:text-gray-300"
                                                    title="Ver detalles"
                                                >
                                                    →
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Estado vacío (cuando no hay espacios) */}
                {espacios.length === 0 && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-4 text-6xl">📁</div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
                            No hay espacios de trabajo
                        </h3>
                        <p className="mb-6 text-gray-500 dark:text-gray-400">
                            Crea tu primer espacio de trabajo para comenzar
                        </p>
                        <button
                            onClick={() => setShowNewEspacioModal(true)}
                            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-700"
                        >
                            <span className="text-lg">+</span>
                            Nuevo espacio de trabajo
                        </button>
                    </div>
                )}
            </div>

            {/* Modal para nuevo espacio (placeholder) */}
            {showNewEspacioModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                                Nuevo espacio de trabajo
                            </h2>
                            <button
                                onClick={() => setShowNewEspacioModal(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Nombre del espacio
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                                    placeholder="Mi espacio de trabajo"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Tipo de espacio
                                </label>
                                <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90">
                                    <option value="recopilar">📋 Recopilar</option>
                                    <option value="proyecto">📊 Proyecto</option>
                                    <option value="equipo">👥 Equipo</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    onClick={() => setShowNewEspacioModal(false)}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => setShowNewEspacioModal(false)}
                                    className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
                                >
                                    Crear espacio
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
