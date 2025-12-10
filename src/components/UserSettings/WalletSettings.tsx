import Lottie from 'lottie-react';
import paymentAnimation from '../../assets/animations/payment-animation.json';

export default function WalletSettings() {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                    Billetera
                </h2>
            </div>

            {/* Imagen de animación de billetera */}
            <div className="mb-8 flex justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 p-12 dark:from-amber-900/20 dark:to-amber-950/30">
                <div className="relative">
                    {/* Animación Lottie de billetera */}
                    <div className="text-center">
                        <div className="mb-4 inline-flex h-[280px] w-[500px] items-center justify-center">
                            <Lottie
                                animationData={paymentAnimation}
                                loop={true}
                                className="h-full w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Cuentas bancarias */}
            <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
                    Cuentas bancarias
                </h3>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Añade una cuenta bancaria para hacer o recibir pagos.
                </p>

                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-white/5">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Añadir cuenta bancaria
                </button>
            </div>

            {/* Billetera Expensify (Beta) */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-white/[0.02]">
                <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
                    Billetera Expensify (Beta)
                </h3>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Envía y recibe dinero desde tu Billetera Expensify. Solo cuentas bancarias de EE. UU.
                </p>

                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-white/5">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Habilitar billetera
                </button>
            </div>
        </div>
    );
}
