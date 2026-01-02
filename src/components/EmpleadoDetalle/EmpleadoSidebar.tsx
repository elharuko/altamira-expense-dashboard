type EmpleadoSidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function EmpleadoSidebar({
  activeTab,
  setActiveTab,
}: EmpleadoSidebarProps) {
  const menuItems = [
    { id: "perfil", label: "Datos personales", icon: "👤" },
    { id: "comprobantes", label: "Invoices", icon: "🧾" },
  ];

  return (
    <div className="w-80 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
        Empleado
      </h3>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
                activeTab === item.id
                  ? "bg-gray-100 text-gray-900 dark:bg-white/10 dark:text-white"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/5"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
