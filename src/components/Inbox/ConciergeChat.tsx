import { useState } from 'react';

export default function ConciergeChat() {
    const [messages] = useState([
        {
            id: 1,
            sender: 'Concierge',
            text: '¡Hola! 👋 ¿En qué puedo ayudarte?',
            time: 'Ayer a las 1:41 AM',
            isUser: false
        }
    ]);

    const [welcomeMessage] = useState({
        title: '¡Saluda!',
        description: 'Este chat es con Concierge. Haz preguntas y obtén soporte en tiempo real las 24/7.',
        mainText: 'Bienvenido a Expensify',
        subText: '👋 ¡Hola! Soy Concierge. Si tienes alguna pregunta sobre Expensify, siempre puedes chatear conmigo aquí 24/7 para obtener soporte rápido y confiable. ¡Estoy feliz de ayudarte!',
        helpText: 'Aquí tienes cómo organizar tus gastos en unos pocos clics.',
        quickActions: [
            {
                id: 1,
                text: 'Haz una prueba',
                icon: '🔵',
                responses: '2 Respuestas',
                time: 'Hoy a las 4:41 PM'
            },
            {
                id: 2,
                text: 'Organiza un gasto',
                icon: '🔵',
            }
        ],
        footer: '¡Es un placer conocerte!'
    });

    return (
        <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            {/* Header del chat */}
            <div className="flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-800">
                <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600">
                        <span className="text-lg font-bold text-white">⛰</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500 dark:border-gray-900"></div>
                </div>
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                        Concierge
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Soporte 24/7
                    </p>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Área de mensajes */}
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
                {/* Avatar y mensaje de bienvenida */}
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-teal-600">
                        <span className="text-4xl text-white">⛰</span>
                    </div>
                    <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white/90">
                        {welcomeMessage.title}
                    </h2>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                        {welcomeMessage.description}
                    </p>
                </div>

                {/* Mensaje principal de Concierge */}
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal-600">
                            <span className="text-sm text-white">⛰</span>
                        </div>
                        <div className="flex-1">
                            <div className="mb-1 flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-800 dark:text-white/90">
                                    Concierge
                                </span>
                                <span className="text-xs text-gray-400">
                                    Ayer a las 1:41 AM
                                </span>
                            </div>
                            <div className="rounded-lg rounded-tl-none bg-gray-100 p-3 dark:bg-gray-800/50">
                                <p className="mb-2 font-semibold text-gray-800 dark:text-white/90">
                                    {welcomeMessage.mainText}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {welcomeMessage.subText}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Texto de ayuda */}
                    <div className="flex items-start gap-3">
                        <div className="h-8 w-8 flex-shrink-0"></div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {welcomeMessage.helpText}
                            </p>
                        </div>
                    </div>

                    {/* Acciones rápidas */}
                    <div className="flex items-start gap-3">
                        <div className="h-8 w-8 flex-shrink-0"></div>
                        <div className="flex-1 space-y-2">
                            {welcomeMessage.quickActions.map((action) => (
                                <div
                                    key={action.id}
                                    className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-3 transition-all hover:border-teal-500 hover:bg-teal-50 dark:border-gray-700 dark:bg-gray-800/30 dark:hover:border-teal-600 dark:hover:bg-teal-900/20"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 dark:border-gray-600">
                                            <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-blue-500 group-hover:text-blue-600">
                                            {action.icon}
                                        </span>
                                        <span className="flex-1 text-sm font-medium text-gray-800 group-hover:text-teal-600 dark:text-white/90 dark:group-hover:text-teal-400">
                                            {action.text}
                                        </span>
                                    </div>
                                    {action.responses && (
                                        <div className="mt-2 flex items-center gap-2 pl-7">
                                            <div className="flex items-center gap-1">
                                                <span className="text-blue-500">🔵</span>
                                                <span className="text-teal-600">⛰</span>
                                            </div>
                                            <span className="text-xs font-medium text-teal-600 dark:text-teal-400">
                                                {action.responses}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {action.time}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mensaje de cierre */}
                    <div className="flex items-start gap-3">
                        <div className="h-8 w-8 flex-shrink-0"></div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {welcomeMessage.footer}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Input de mensaje */}
            <div className="border-t border-gray-200 p-4 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                    </button>
                    <input
                        type="text"
                        placeholder="Escribe un mensaje..."
                        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90 dark:placeholder-gray-500"
                    />
                    <button className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}
