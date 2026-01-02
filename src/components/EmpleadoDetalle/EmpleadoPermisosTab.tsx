type EmpleadoPermisosTabProps = {
  empleadoId: string;
};

export default function EmpleadoPermisosTab({ empleadoId }: EmpleadoPermisosTabProps) {
  const permisos = [
    { id: "gastos", label: "Puede crear gastos", activo: true },
    { id: "aprobar", label: "Puede aprobar gastos", activo: false },
    { id: "reportes", label: "Puede ver reportes", activo: true },
    { id: "exportar", label: "Puede exportar datos", activo: true },
    { id: "empleados", label: "Puede gestionar empleados", activo: false },
    { id: "configuracion", label: "Puede modificar configuración", activo: false },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Permisos y Accesos
      </h3>
      
      {/* Rol */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Rol del Empleado
        </label>
        <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
          <option value="empleado">Empleado</option>
          <option value="supervisor">Supervisor</option>
          <option value="gerente">Gerente</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      {/* Lista de permisos */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800 dark:text-white/90">
          Permisos Específicos
        </h4>
        {permisos.map((permiso) => (
          <div
            key={permiso.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
          >
            <span className="text-gray-700 dark:text-gray-300">{permiso.label}</span>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                defaultChecked={permiso.activo}
                className="peer sr-only"
              />
              <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700"></div>
            </label>
          </div>
        ))}
      </div>

      {/* Botón guardar */}
      <div className="mt-6 flex justify-end">
        <button className="rounded-lg bg-teal-500 px-6 py-2.5 font-medium text-white hover:bg-teal-600 transition-colors">
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}
