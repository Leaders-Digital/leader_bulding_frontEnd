import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

const PDFGenerator = ({ formData }) => {
  const generatePDF = () => {
    const doc = new jsPDF({ format: "a4", orientation: "portrait" });

    formData.sections.forEach((section, idx) => {
      if (idx > 0) doc.addPage();

      doc.setFontSize(16);
      doc.text(section.title, 14, 20);

      if (section.description) {
        doc.setFontSize(11);
        doc.text(section.description, 14, 30);
      }

      const SectionRows =[
        [section.title,"","","",""],
        ["MODES D'EVALUATION ET SPECIFICATIONS GENERALES","","","",""],
        [section.description,"","","",""],
      ]

   const itemRows = section.items.map(item => [
    { title: item.title, description: item.description || "" },
    item.unite,
    item.qte,
    item.puHT,
    item.ptHT
  ]);
const rows =[...SectionRows,...itemRows]
      autoTable(doc, {
        startY: section.description ? 40 : 30,
        head: [["Désignation", "Unité", "Quantité", "PU HT", "PT HT"]],
        body: rows,
        styles: {
            cellPadding: 4,       // Add slight padding to all cells
            rowHeight: 10,       // Default row height for all rows
          }
        ,
        columnStyles: {
          0: { cellWidth: 80 }, // Désignation (make as wide as possible for A4 portrait)
          1: { cellWidth: 22 }, // Unité
          2: { cellWidth: 22 }, // Quantité
          3: { cellWidth: 32 }, // PU HT
          4: { cellWidth: 32 }  // PT HT
        },
        didParseCell: function (data) {
          // SectionRows: first and second row (bold)
          if (
            data.section === "body" &&
            data.column.index === 0 &&
            (data.row.index === 0 || data.row.index === 1)
          ) {
            data.row.height = 12; // Adjust as needed for your font size
            data.cell.text = [""]; // Suppress default rendering
          }
          // Only suppress and custom render if the value is an object (item rows), not for section rows
          else if (
            data.section === "body" &&
            data.column.index === 0 &&
            typeof data.cell.raw === "object" &&
            data.cell.raw !== null
          ) {
            const value = data.cell.raw;
            if (value.description) {
              data.row.height = 18;
            }
            data.cell.text = [""];
          }
        },
        didDrawCell: function (data) {
          const colIndex = data.column.index;
          const rowIndex = data.row.index;
          const value = data.row.raw[colIndex];
          const x = data.cell.x + 2;
          let y = data.cell.y + 6;

          // Bold for SectionRows: first row (section title) and second row (static phrase)
          if (
            data.section === "body" &&
            colIndex === 0 &&
            (rowIndex === 0 || rowIndex === 1)
          ) {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            // Wrap text if necessary
            const lines = doc.splitTextToSize(String(value), data.cell.width - 4);
            lines.forEach((line, i) => {
              doc.text(line, x, y + i * 6);
            });
          }

          // Custom rendering for item rows (object)
          if (
            data.section === "body" &&
            colIndex === 0 &&
            typeof value === "object" &&
            value !== null &&
            value.title
          ) {
            // Bold title, wrapped
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            const titleLines = doc.splitTextToSize(String(value.title), data.cell.width - 4);
            titleLines.forEach((line, i) => {
              doc.text(line, x, y + i * 6);
            });
            let descOffset = y + titleLines.length * 6;

            // Description, wrapped
            if (value.description) {
              doc.setFont("helvetica", "normal");
              doc.setFontSize(10);
              const descLines = doc.splitTextToSize(String(value.description), data.cell.width - 4);
              descLines.forEach((line, i) => {
                doc.text(line, x, descOffset + i * 5);
              });
            }
          }
        }
      });

      doc.setFontSize(12);
      doc.text(`Total HT: ${section.ptHT} TND`, 14, doc.lastAutoTable.finalY + 10);
    });

    doc.save("devis.pdf");
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Télécharger le Devis
    </button>
  );
};

export default PDFGenerator;
