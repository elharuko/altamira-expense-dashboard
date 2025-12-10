import Lottie from 'lottie-react';
import musicAnimation from '../../assets/animations/music-animation.json';

export default function PreferencesSettings() {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                    Preferencias
                </h2>
            </div>

            {/* Ilustración de preferencias */}
            <div className="mb-8 flex justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-12 dark:from-blue-600/80 dark:to-blue-700/80">
                <div className="relative">
                    {/* Animación de música */}
                    <div className="text-center">
                        <div className="mb-4 inline-flex h-64 w-124 items-center justify-center">
                            <Lottie
                                animationData={musicAnimation}
                                loop={true}
                                className="h-full w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Preferencias de la aplicación */}
            <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
                    Preferencias de la aplicación
                </h3>

                {/* Toggle 1 - Recibir noticias */}
                <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
                    <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            Recibir noticias sobre Expensify y actualizaciones del producto
                        </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" defaultChecked className="peer sr-only" />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-emerald-800"></div>
                    </label>
                </div>

                {/* Toggle 2 - Silenciar sonidos */}
                <div className="mb-6 flex items-center justify-between pb-2">
                    <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            Silenciar todos los sonidos de Expensify
                        </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" className="peer sr-only" />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-emerald-800"></div>
                    </label>
                </div>

                {/* Modo prioridad */}
                <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Modo prioridad</p>
                        <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">Más recientes</p>
                    </div>
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>

                {/* Idioma */}
                <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Idioma</p>
                        <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">Español</p>
                    </div>
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>

                {/* Moneda de pago */}
                <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Moneda de pago</p>
                        <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">PEN - S/.</p>
                    </div>
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>

                {/* Tema */}
                <div className="flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Tema</p>
                        <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">Utiliza los ajustes del dispositivo</p>
                    </div>
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
