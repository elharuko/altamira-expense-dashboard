import { useState, useEffect } from "react";
import PageMeta from "../components/common/PageMeta";
import SearchFilterLayout from "../components/common/SearchFilterLayout";
import Lottie from "lottie-react";
import coheteAnimation from "../assets/animations/cohete.json";
import workingAnimation from "../assets/animations/Working.json";
import informationAnimation from "../assets/animations/Information.json";
import { getElectronicInvoices, searchInvoicesByBusinessName, ElectronicInvoice } from "../services/electronicInvoiceService";

export default function Informes() {
    const [activeView, setActiveView] = useState("gastos");
    const [invoices, setInvoices] = useState<ElectronicInvoice[]>([]);
    const [loadingInvoices, setLoadingInvoices] = useState(false);
    const [invoiceSearchTerm, setInvoiceSearchTerm] = useState("");
    const [selectedInvoice, setSelectedInvoice] = useState<ElectronicInvoice | null>(null);

    const openProductsModal = (invoice: ElectronicInvoice) => {
        setSelectedInvoice(invoice);
    };

    const closeProductsModal = () => {
        setSelectedInvoice(null);
    };

    // Cargar facturas cuando se selecciona la vista de facturas
    useEffect(() => {
        if (activeView === "factura") {
            loadInvoices();
        }
    }, [activeView]);

    const loadInvoices = async () => {
        setLoadingInvoices(true);
        const data = await getElectronicInvoices();
        if (data) {
            setInvoices(data);
        }
        setLoadingInvoices(false);
    };

    const handleInvoiceSearch = async (searchTerm: string) => {
        setInvoiceSearchTerm(searchTerm);
        if (searchTerm.trim() === "") {
            loadInvoices();
            return;
        }
        setLoadingInvoices(true);
        const data = await searchInvoicesByBusinessName(searchTerm);
        if (data) {
            setInvoices(data);
        }
        setLoadingInvoices(false);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-PE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

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
                                    className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${activeView === "chats"
                                        ? "bg-teal-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                        }`}
                                >
                                    <span>💬</span>
                                    Chats
                                </button>
                                <button
                                    onClick={() => setActiveView("factura")}
                                    className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${activeView === "factura"
                                        ? "bg-teal-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                        }`}
                                >
                                    <span>🧾</span>
                                    Factura
                                </button>
                                <button
                                    onClick={() => setActiveView("boleta")}
                                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${activeView === "boleta"
                                        ? "bg-teal-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                        }`}
                                >
                                    <span>🎫</span>
                                    Boleta
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

                        {activeView === "factura" && (
                            <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/50">
                                {/* Barra de búsqueda */}
                                <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                placeholder="Buscar por empresa..."
                                                value={invoiceSearchTerm}
                                                onChange={(e) => handleInvoiceSearch(e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-sm text-gray-800 placeholder-gray-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
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
                                        <button
                                            onClick={loadInvoices}
                                            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
                                        >
                                            Actualizar
                                        </button>
                                    </div>

                                    {/* Filtros */}
                                    <div className="flex items-center gap-2">
                                        <button className="flex items-center gap-2 rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-medium text-white">
                                            Tipo: Facturas
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                                            {invoices.length} factura(s) encontrada(s)
                                        </span>
                                    </div>
                                </div>

                                {/* Contenido: Tabla o mensaje vacío */}
                                {loadingInvoices ? (
                                    <div className="flex min-h-[400px] items-center justify-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></div>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">Cargando facturas...</span>
                                        </div>
                                    </div>
                                ) : invoices.length === 0 ? (
                                    <div className="flex min-h-[400px] flex-col items-center justify-center p-12 text-center">
                                        <div className="mb-4 text-6xl opacity-50">🧾</div>
                                        <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">No se encontraron facturas</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Aún no tienes facturas registradas.</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                        Empresa
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                        RUC Emisor
                                                    </th>
                                                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                        Items
                                                    </th>
                                                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                        Subtotal
                                                    </th>
                                                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                        Total
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                        Fecha Emisión
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                        Fecha Registro
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                {invoices.map((invoice) => (
                                                    <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-white">
                                                            <div className="max-w-xs truncate font-medium" title={invoice.business_name}>
                                                                {invoice.business_name}
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-gray-800 dark:text-white">
                                                            {invoice.issuer_ruc}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-center">
                                                            <button
                                                                onClick={() => openProductsModal(invoice)}
                                                                className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 transition-colors"
                                                            >
                                                                Ver Productos
                                                                <span className="inline-flex items-center justify-center rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
                                                                    {Array.isArray(invoice.items) ? invoice.items.length : 0}
                                                                </span>
                                                            </button>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-right text-gray-600 dark:text-gray-300">
                                                            S/ {invoice.subtotal_amount?.toFixed(2) ?? '0.00'}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-right font-semibold text-gray-800 dark:text-white">
                                                            S/ {invoice.total_amount?.toFixed(2) ?? '0.00'}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                                            {invoice.issue_date ? formatDate(invoice.issue_date) : '-'}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                            {formatDate(invoice.created_at)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeView === "boleta" && (
                            <SearchFilterLayout
                                searchPlaceholder="Busca algo"
                                typeFilterLabel="Tipo: Boletas"
                                emptyMessage="No se encontraron boletas"
                                emptySubtitle="Aún no tienes boletas registradas."
                                emptyIcon="🎫"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de Productos */}
            {selectedInvoice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={closeProductsModal}
                    ></div>

                    {/* Modal */}
                    <div className="relative z-10 w-full max-w-2xl rounded-xl bg-white shadow-2xl dark:bg-gray-800">
                        {/* Header del modal */}
                        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    Productos de la Factura
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {selectedInvoice.business_name}
                                </p>
                            </div>
                            <button
                                onClick={closeProductsModal}
                                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-colors"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Contenido del modal */}
                        <div className="max-h-[60vh] overflow-y-auto p-6">
                            {Array.isArray(selectedInvoice.items) && selectedInvoice.items.length > 0 ? (
                                <div className="rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                                    <table className="w-full">
                                        <thead className="bg-gray-100 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                                                    Producto/Servicio
                                                </th>
                                                <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                                                    Cantidad
                                                </th>
                                                <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                                                    Precio Unit.
                                                </th>
                                                <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                                                    Total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                            {selectedInvoice.items.map((item, index) => (
                                                <tr key={index} className="bg-white dark:bg-gray-800">
                                                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">
                                                        {item.name}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-300">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-300">
                                                        S/ {item.unit_price?.toFixed(2) ?? '0.00'}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-right font-medium text-gray-800 dark:text-white">
                                                        S/ {item.total_price?.toFixed(2) ?? '0.00'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <span className="text-4xl">📦</span>
                                    <p className="mt-2 text-gray-500 dark:text-gray-400">No hay productos en esta factura</p>
                                </div>
                            )}
                        </div>

                        {/* Footer del modal */}
                        <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-700">
                            <button
                                onClick={closeProductsModal}
                                className="w-full rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
