export default function SecuritySettings() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Seguridad
        </h2>
      </div>

      <div className="space-y-6">
        {/* Change Password */}
        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white/90">
                Cambiar contraseña
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Última actualización hace 3 meses
              </p>
            </div>
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5">
              Cambiar
            </button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white/90">
                Autenticación de dos factores
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Agrega una capa extra de seguridad
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-brand-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:border-gray-600 dark:bg-gray-700"></div>
            </label>
          </div>
        </div>

        {/* Active Sessions */}
        <div>
          <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">
            Sesiones activas
          </h3>
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                    <span className="text-xl">💻</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white/90">
                      Windows • Chrome
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Phoenix, Arizona • Activo ahora
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                  Actual
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                    <span className="text-xl">📱</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white/90">
                      iPhone • Safari
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Phoenix, Arizona • Hace 2 días
                    </p>
                  </div>
                </div>
                <button className="text-sm text-red-500 hover:text-red-600">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/10">
          <h3 className="mb-2 font-semibold text-red-700 dark:text-red-400">
            Zona de peligro
          </h3>
          <p className="mb-4 text-sm text-red-600 dark:text-red-400">
            Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, confirma.
          </p>
          <button className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600">
            Eliminar cuenta
          </button>
        </div>
      </div>
    </div>
  );
}
