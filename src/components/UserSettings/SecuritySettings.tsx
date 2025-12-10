import Lottie from 'lottie-react';
import dataSecurityAnimation from '../../assets/animations/data-security.json';

export default function SecuritySettings() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Seguridad
        </h2>
      </div>

      {/* Imagen de animación de seguridad */}
      <div className="mb-8 flex justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-teal-500 p-12 dark:from-teal-600/80 dark:to-teal-700/80">
        <div className="relative">
          {/* Animación Lottie de seguridad */}
          <div className="text-center">
            <div className="mb-4 inline-flex h-[255px] w-[400px] items-center justify-center">
              <Lottie
                animationData={dataSecurityAnimation}
                loop={true}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Opciones de seguridad */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
          Opciones de seguridad
        </h3>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Activa la autenticación de dos factores para mantener tu cuenta segura.
        </p>

        {/* Autenticación de dos factores */}
        <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
              <svg className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">Autenticación de dos factores</p>
            </div>
          </div>
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Fusionar cuentas */}
        <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
              <svg className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">Fusionar cuentas</p>
            </div>
          </div>
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Informar de actividad sospechosa */}
        <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
              <svg className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">Informar de actividad sospechosa</p>
            </div>
          </div>
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Cerrar cuenta */}
        <div className="flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
              <svg className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">Cerrar cuenta</p>
            </div>
          </div>
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Copilot: Acceso delegado */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-white/[0.02]">
        <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
          Copilot: Acceso delegado
        </h3>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Permitir que otros miembros accedan a tu cuenta. <span className="text-blue-500 hover:text-blue-600 cursor-pointer">Más información</span>.
        </p>

        {/* Agregar copiloto */}
        <div className="flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-white dark:border-gray-700 dark:hover:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
              <svg className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">Agregar copiloto</p>
            </div>
          </div>
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
