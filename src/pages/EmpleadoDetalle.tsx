import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import EmpleadoSidebar from "../components/EmpleadoDetalle/EmpleadoSidebar";
import EmpleadoPerfilTab from "../components/EmpleadoDetalle/EmpleadoPerfilTab";
import EmpleadoComprobantesTab from "../components/EmpleadoDetalle/EmpleadoComprobantesTab";

export default function EmpleadoDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("perfil");

  return (
    <>
      <PageMeta
        title="Detalle de Empleado | Altamira Expense Dashboard"
        description="Vista detallada del empleado"
      />
      
      {/* Header con botón de regresar */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate("/empleados")}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
            Detalle del Empleado
          </h1>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar izquierdo */}
        <EmpleadoSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Contenido principal */}
        <div className="flex-1">
          {activeTab === "perfil" && <EmpleadoPerfilTab empleadoId={id || ""} />}
          {activeTab === "comprobantes" && <EmpleadoComprobantesTab empleadoId={id || ""} />}
        </div>
      </div>
    </>
  );
}
