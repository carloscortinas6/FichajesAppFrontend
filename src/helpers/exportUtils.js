import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';

// Función para exportar a PDF
export const exportToPDF = (fichajes, nombreUsuario) => {
    const doc = new jsPDF();

    // Título del documento
    doc.setFontSize(18);
    doc.text('Reporte de Fichajes', 14, 22);

    // Columnas de la tabla
    const columns = ["Usuario", "Fecha", "Hora", "Tipo", "Tiempo Trabajado en el Día"];
    const rows = [];

    // Llenar las filas de la tabla
    fichajes.forEach(fichaje => {
        const usuario = nombreUsuario; // Usamos el nombre del usuario pasado como parámetro
        const fecha = new Date(fichaje.fecha).toLocaleDateString();
        const hora = new Date(fichaje.fecha).toLocaleTimeString();
        const tipo = fichaje.tipoFichaje;
        const tiempoTrabajado = fichaje.tiempoTrabajado ? fichaje.tiempoTrabajado : '-';
        rows.push([usuario, fecha, hora, tipo, tiempoTrabajado]);
    });

    // Añadir la tabla al PDF
    doc.autoTable({
        head: [columns],
        body: rows,
        startY: 30,
    });

    // Guardar el PDF
    doc.save('reporte_fichajes.pdf');
};

// Función para exportar a Excel
export const exportToExcel = (fichajes, nombreUsuario) => {
    // Crear una hoja de trabajo
    const ws = XLSX.utils.json_to_sheet(fichajes.map(fichaje => ({
        Usuario: nombreUsuario, // Usamos el nombre del usuario pasado como parámetro
        Fecha: new Date(fichaje.fecha).toLocaleDateString(),
        Hora: new Date(fichaje.fecha).toLocaleTimeString(),
        Tipo: fichaje.tipoFichaje,
        'Tiempo Trabajado en el Día': fichaje.tiempoTrabajado ? fichaje.tiempoTrabajado : '-'
    })));

    // Crear el libro de Excel
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Fichajes');

    // Generar archivo Excel
    XLSX.writeFile(wb, 'reporte_fichajes.xlsx');
};
