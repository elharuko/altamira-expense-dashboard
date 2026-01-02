type EmpleadoDocumentosTabProps = {
  empleadoId: string;
};

export default function EmpleadoDocumentosTab({ empleadoId }: EmpleadoDocumentosTabProps) {
  const documentos = [
    { id: 1, nombre: "Contrato Laboral", tipo: "PDF", fecha: "15/03/2022" },
    { id: 2, nombre: "Identificación Oficial", tipo: "PDF", fecha: "15/03/2022" },
    { id: 3, nombre: "Comprobante de Domicilio", tipo: "PDF", fecha: "15/03/2022" },
    { id: 4, nombre: "RFC", tipo: "PDF", fecha: "15/03/2022" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="mb-5 flex items-center justify-between lg:mb-7">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Documentos
        </h3>
        <button className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600 transition-colors">
          + Subir Documento
        </button>
      </div>
      
      <div className="space-y-3">
        {documentos.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30">
                📄
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">{doc.nombre}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {doc.tipo} • Subido el {doc.fecha}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                Ver
              </button>
              <button className="rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                Descargar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
