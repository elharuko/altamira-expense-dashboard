type EmpleadoPerfilTabProps = {
  empleadoId: string;
};

export default function EmpleadoPerfilTab({ empleadoId }: EmpleadoPerfilTabProps) {
  // Datos de ejemplo - aquí podrías cargar datos reales según el ID
  const empleado = {
    nombre: "Juan García López",
    dni: "12345678",
    telefono: "+51 999 123 456",
    correo: "juan.garcia@gmail.com",
    correoCoporativo: "juan.garcia@techsolutions.com",
    banco: "BCP",
    moneda: "PEN",
    numCuenta: "123-456789-0-12",
    numCuentaInter: "002-123-456789012345-67",
  };

  const bancos = ["Interbank", "BCP", "BBVA", "Scotiabank", "BanBif", "Pichincha"];
  const monedas = ["PEN", "USD"];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Datos Personales
      </h3>
      <div className="space-y-6">
        {/* Información personal */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nombre
            </label>
            <input
              type="text"
              defaultValue={empleado.nombre}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              DNI
            </label>
            <input
              type="text"
              defaultValue={empleado.dni}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Teléfono
          </label>
          <input
            type="text"
            defaultValue={empleado.telefono}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Correo
            </label>
            <input
              type="email"
              defaultValue={empleado.correo}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Correo Corporativo
            </label>
            <input
              type="email"
              defaultValue={empleado.correoCoporativo}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* Información bancaria */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Banco
            </label>
            <select
              defaultValue={empleado.banco}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Seleccionar banco</option>
              {bancos.map((banco) => (
                <option key={banco} value={banco}>
                  {banco}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Moneda
            </label>
            <select
              defaultValue={empleado.moneda}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Seleccionar moneda</option>
              {monedas.map((moneda) => (
                <option key={moneda} value={moneda}>
                  {moneda}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Número de Cuenta
            </label>
            <input
              type="text"
              defaultValue={empleado.numCuenta}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Número de Cuenta Interbancaria
            </label>
            <input
              type="text"
              defaultValue={empleado.numCuentaInter}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Botón guardar */}
        <div className="flex justify-end pt-4">
          <button className="rounded-lg bg-teal-500 px-6 py-2.5 font-medium text-white hover:bg-teal-600 transition-colors">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
