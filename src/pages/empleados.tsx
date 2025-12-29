import { useState } from "react";
import { useNavigate } from "react-router";
import PageMeta from "../components/common/PageMeta";

interface Empleado {
  id: number;
  nombre: string;
  empresa: string;
}

// Datos de ejemplo
const empleadosData: Empleado[] = [
  {
    id: 1,
    nombre: "Juan García López",
    empresa: "Tech Solutions",
  },
  {
    id: 2,
    nombre: "María López Rodríguez",
    empresa: "Digital Innovations",
  },
  {
    id: 3,
    nombre: "Carlos Rodríguez Martínez",
    empresa: "Business Systems",
  },
  {
    id: 4,
    nombre: "Ana Martínez García",
    empresa: "Tech Solutions",
  },
  {
    id: 5,
    nombre: "Pedro Sánchez López",
    empresa: "Cloud Services",
  },
  {
    id: 6,
    nombre: "Laura Fernández García",
    empresa: "Data Analytics",
  },
  {
    id: 7,
    nombre: "Miguel González Pérez",
    empresa: "Digital Innovations",
  },
];

export default function Empleados() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleVerDetalles = (id: number) => {
    navigate(`/empleados/${id}`);
  };

  const filteredEmpleados = empleadosData.filter(
    (empleado) =>
      empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.empresa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <PageMeta
        title="Empleados | Altamira Expense Dashboard"
        description="Lista de empleados registrados en el sistema"
      />
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">Empleados</h1>
      </div>

      {/* Tabla de Empleados */}
      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/50">
        {/* Barra de búsqueda */}
        <div className="border-b border-gray-200 p-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Buscar por nombre o empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
          
          {/* Contador */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredEmpleados.length} empleado(s) encontrado(s)
            </span>
          </div>
        </div>

        {/* Contenido: Tabla o mensaje vacío */}
        {filteredEmpleados.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 text-6xl opacity-50">👥</div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">No se encontraron empleados</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Intenta con otro término de búsqueda.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Nombre del Empleado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Empresa
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredEmpleados.map((empleado) => (
                  <tr key={empleado.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800 dark:text-white">
                      <div className="font-medium">{empleado.nombre}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {empleado.empresa}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleVerDetalles(empleado.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 transition-colors"
                      >
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
