import Lottie from "lottie-react";

interface SearchFilterLayoutProps {
    searchPlaceholder?: string;
    showTypeFilter?: boolean;
    typeFilterLabel?: string;
    emptyMessage?: string;
    emptyIcon?: string;
    emptySubtitle?: string;
    showButton?: boolean;
    buttonText?: string;
    useAnimation?: boolean;
    animationData?: any;
}

export default function SearchFilterLayout({
    searchPlaceholder = "Busca algo",
    showTypeFilter = true,
    typeFilterLabel = "Tipo: Gastos",
    emptyMessage = "No se encontraron resultados",
    emptyIcon = "📋",
    emptySubtitle = "",
    showButton = false,
    buttonText = "Crear",
    useAnimation = false,
    animationData = null
}: SearchFilterLayoutProps) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/50">
            {/* Barra de búsqueda y filtros */}
            <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="mb-4 flex items-center gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
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
                </div>

                {/* Filtros */}
                <div className="flex items-center gap-2">
                    {showTypeFilter && (
                        <button className="flex items-center gap-2 rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-medium text-white">
                            {typeFilterLabel}
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    )}
                    <button className="flex items-center gap-2 rounded-lg bg-gray-600 px-3 py-1.5 text-sm font-medium text-white">
                        Estado
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-gray-600 px-3 py-1.5 text-sm font-medium text-white">
                        Fecha
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-gray-600 px-3 py-1.5 text-sm font-medium text-white">
                        De
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <button className="ml-auto flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filtros
                    </button>
                </div>
            </div>

            {/* Mensaje de sin resultados */}
            <div className="flex min-h-[400px] flex-col items-center justify-center p-12 text-center">
                {useAnimation && animationData ? (
                    <div className="mb-6 inline-flex h-48 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-900 to-gray-900 p-8">
                        <Lottie
                            animationData={animationData}
                            loop={true}
                            className="h-full w-full"
                        />
                    </div>
                ) : (
                    <div className="mb-4 text-6xl opacity-50">{emptyIcon}</div>
                )}

                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                    {emptyMessage}
                </h3>

                {emptySubtitle && (
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                        {emptySubtitle}
                    </p>
                )}

                {showButton && (
                    <button className="rounded-lg bg-teal-500 px-8 py-3 font-medium text-white transition-colors hover:bg-teal-600">
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
}
