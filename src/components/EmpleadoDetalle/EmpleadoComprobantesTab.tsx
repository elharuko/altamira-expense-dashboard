import { useState, useEffect } from "react";
import { getElectronicInvoices, searchInvoicesByBusinessName, ElectronicInvoice } from "../../services/electronicInvoiceService";
import { getElectronicReceipts, searchReceiptsByBusinessName, ElectronicReceipt } from "../../services/electronicReceiptService";

type EmpleadoComprobantesTabProps = {
  empleadoId: string;
};

export default function EmpleadoComprobantesTab({ empleadoId }: EmpleadoComprobantesTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<"factura" | "boleta">("factura");
  
  // Estados para facturas
  const [invoices, setInvoices] = useState<ElectronicInvoice[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [invoiceSearchTerm, setInvoiceSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<ElectronicInvoice | null>(null);

  // Estados para boletas
  const [receipts, setReceipts] = useState<ElectronicReceipt[]>([]);
  const [loadingReceipts, setLoadingReceipts] = useState(false);
  const [receiptSearchTerm, setReceiptSearchTerm] = useState("");
  const [selectedReceipt, setSelectedReceipt] = useState<ElectronicReceipt | null>(null);

  // Cargar datos cuando cambia el subtab
  useEffect(() => {
    if (activeSubTab === "factura") {
      loadInvoices();
    } else if (activeSubTab === "boleta") {
      loadReceipts();
    }
  }, [activeSubTab]);

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

  const loadReceipts = async () => {
    setLoadingReceipts(true);
    const data = await getElectronicReceipts();
    if (data) {
      setReceipts(data);
    }
    setLoadingReceipts(false);
  };

  const handleReceiptSearch = async (searchTerm: string) => {
    setReceiptSearchTerm(searchTerm);
    if (searchTerm.trim() === "") {
      loadReceipts();
      return;
    }
    setLoadingReceipts(true);
    const data = await searchReceiptsByBusinessName(searchTerm);
    if (data) {
      setReceipts(data);
    }
    setLoadingReceipts(false);
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

  const openProductsModal = (invoice: ElectronicInvoice) => {
    setSelectedInvoice(invoice);
  };

  const closeProductsModal = () => {
    setSelectedInvoice(null);
  };

  const openReceiptProductsModal = (receipt: ElectronicReceipt) => {
    setSelectedReceipt(receipt);
  };

  const closeReceiptProductsModal = () => {
    setSelectedReceipt(null);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Header con tabs */}
      <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700 lg:px-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
          Comprobantes
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveSubTab("factura")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeSubTab === "factura"
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            <span>🧾</span>
            Facturas
          </button>
          <button
            onClick={() => setActiveSubTab("boleta")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeSubTab === "boleta"
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            <span>🎫</span>
            Boletas
          </button>
        </div>
      </div>

      {/* Contenido de Facturas */}
      {activeSubTab === "factura" && (
        <div>
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
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {invoices.length} factura(s) encontrada(s)
            </span>
          </div>

          {/* Contenido */}
          {loadingInvoices ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Cargando facturas...</span>
              </div>
            </div>
          ) : invoices.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center p-12 text-center">
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
                      Total
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Fecha Emisión
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
                          className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-teal-700 transition-colors"
                        >
                          Ver Productos
                          <span className="inline-flex items-center justify-center rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
                            {Array.isArray(invoice.items) ? invoice.items.length : 0}
                          </span>
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-right font-semibold text-gray-800 dark:text-white">
                        S/ {invoice.total_amount?.toFixed(2) ?? '0.00'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-center">
                        <span className="inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          Pagado
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {invoice.issue_date ? formatDate(invoice.issue_date) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Contenido de Boletas */}
      {activeSubTab === "boleta" && (
        <div>
          {/* Barra de búsqueda */}
          <div className="border-b border-gray-200 p-4 dark:border-gray-700">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Buscar por empresa..."
                  value={receiptSearchTerm}
                  onChange={(e) => handleReceiptSearch(e.target.value)}
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
                onClick={loadReceipts}
                className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
              >
                Actualizar
              </button>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {receipts.length} boleta(s) encontrada(s)
            </span>
          </div>

          {/* Contenido */}
          {loadingReceipts ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Cargando boletas...</span>
              </div>
            </div>
          ) : receipts.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center p-12 text-center">
              <div className="mb-4 text-6xl opacity-50">🎫</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">No se encontraron boletas</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Aún no tienes boletas registradas.</p>
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
                      Total
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Fecha Emisión
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {receipts.map((receipt) => (
                    <tr key={receipt.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-800 dark:text-white">
                        <div className="max-w-xs truncate font-medium" title={receipt.business_name}>
                          {receipt.business_name}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-gray-800 dark:text-white">
                        {receipt.issuer_ruc}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-center">
                        <button
                          onClick={() => openReceiptProductsModal(receipt)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-teal-700 transition-colors"
                        >
                          Ver Productos
                          <span className="inline-flex items-center justify-center rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
                            {Array.isArray(receipt.items) ? receipt.items.length : 0}
                          </span>
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-right font-semibold text-gray-800 dark:text-white">
                        S/ {receipt.total_amount?.toFixed(2) ?? '0.00'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-center">
                        <span className="inline-flex rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                          Pendiente
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {receipt.issue_date ? formatDate(receipt.issue_date) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal de Productos - Factura */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeProductsModal}
          ></div>
          <div className="relative z-10 w-full max-w-2xl rounded-xl bg-white shadow-2xl dark:bg-gray-800">
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
            <div className="max-h-[60vh] overflow-y-auto p-6">
              {Array.isArray(selectedInvoice.items) && selectedInvoice.items.length > 0 ? (
                <div className="space-y-3">
                  {selectedInvoice.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-600">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{item.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Cantidad: {item.quantity} | Precio unit.: S/ {item.unit_price?.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        S/ {item.total_price?.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">No hay productos</p>
              )}
            </div>
            <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-700">
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-gray-800 dark:text-white">Total:</span>
                <span className="text-teal-600 dark:text-teal-400">
                  S/ {selectedInvoice.total_amount?.toFixed(2) ?? '0.00'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Productos - Boleta */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeReceiptProductsModal}
          ></div>
          <div className="relative z-10 w-full max-w-2xl rounded-xl bg-white shadow-2xl dark:bg-gray-800">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Productos de la Boleta
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedReceipt.business_name}
                </p>
              </div>
              <button
                onClick={closeReceiptProductsModal}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-6">
              {Array.isArray(selectedReceipt.items) && selectedReceipt.items.length > 0 ? (
                <div className="space-y-3">
                  {selectedReceipt.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-600">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{item.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Cantidad: {item.quantity} | Precio unit.: S/ {item.unit_price?.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        S/ {item.total_price?.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">No hay productos</p>
              )}
            </div>
            <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-700">
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-gray-800 dark:text-white">Total:</span>
                <span className="text-teal-600 dark:text-teal-400">
                  S/ {selectedReceipt.total_amount?.toFixed(2) ?? '0.00'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
