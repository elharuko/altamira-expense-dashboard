type EmpleadoNominaTabProps = {
  empleadoId: string;
};

export default function EmpleadoNominaTab({ empleadoId }: EmpleadoNominaTabProps) {
  const historialNomina = [
    { id: 1, periodo: "Diciembre 2025", monto: "$25,000.00", estado: "Pagado", fecha: "15/12/2025" },
    { id: 2, periodo: "Noviembre 2025", monto: "$25,000.00", estado: "Pagado", fecha: "15/11/2025" },
    { id: 3, periodo: "Octubre 2025", monto: "$25,000.00", estado: "Pagado", fecha: "15/10/2025" },
    { id: 4, periodo: "Septiembre 2025", monto: "$25,000.00", estado: "Pagado", fecha: "15/09/2025" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Nómina
      </h3>
      
      {/* Resumen */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-teal-50 p-4 dark:bg-teal-900/20">
          <p className="text-xs text-teal-600 dark:text-teal-400">Salario Mensual</p>
          <p className="text-xl font-bold text-teal-700 dark:text-teal-300">$25,000.00</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <p className="text-xs text-blue-600 dark:text-blue-400">Tipo de Contrato</p>
          <p className="text-xl font-bold text-blue-700 dark:text-blue-300">Indeterminado</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
          <p className="text-xs text-purple-600 dark:text-purple-400">Días de Vacaciones</p>
          <p className="text-xl font-bold text-purple-700 dark:text-purple-300">12 días</p>
        </div>
      </div>

      {/* Historial de pagos */}
      <h4 className="mb-4 font-medium text-gray-800 dark:text-white/90">
        Historial de Pagos
      </h4>
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                Periodo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                Monto
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                Estado
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                Fecha de Pago
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {historialNomina.map((pago) => (
              <tr key={pago.id}>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">
                  {pago.periodo}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white">
                  {pago.monto}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {pago.estado}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  {pago.fecha}
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400">
                    Ver recibo
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
