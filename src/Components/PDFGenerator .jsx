import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

const PDFGenerator = ({ formData }) => {
  const generatePDF = () => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/logo_building.png"; // Must be in the public folder (public/logo_building.png)
    img.onload = function () {
      const doc = new jsPDF({ format: "a4", orientation: "portrait" });

      let lastY = 20;

      // Title
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.text("DEVIS ESTIMATIF DES TRAVEAUX GROS & SECONDE ŒUVRE", 13, lastY);

      // Client info box
      const clientBoxWidth = 90;
      const clientBoxHeight = 28;
      const clientBoxX = 8;
      const clientBoxY = lastY + 4;

      doc.setFillColor(245, 245, 245);
      doc.roundedRect(clientBoxX, clientBoxY, clientBoxWidth, clientBoxHeight, 3, 3, "F");

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      const clientInfoLines = [
        `Nom: ${""}`,
        `Prénom: ${""}`,
        `Entreprise: ${""}`,
      ];

      clientInfoLines.forEach((line, i) => {
        doc.text(line, clientBoxX + 3, clientBoxY + 6 + i * 7);
      });

      // Add the logo to the right of the client box
      // Maintain logo aspect ratio within max dimensions
      const maxLogoWidth = 50;
      const maxLogoHeight = 27.5;
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      let logoWidth = maxLogoWidth;
      let logoHeight = (naturalHeight * logoWidth) / naturalWidth;
      if (logoHeight > maxLogoHeight) {
        logoHeight = maxLogoHeight;
        logoWidth = (naturalWidth * logoHeight) / naturalHeight;
      }

      // Compute table right edge and align logo
      const marginLeft = 8;
      const tableColumnWidths = [90, 22, 22, 25, 32];
      const tableEndX = marginLeft + tableColumnWidths.reduce((sum, w) => sum + w, 0);
      // Position logo so its right touches table and bottom aligns with client box
      const logoX = tableEndX - logoWidth;
      const logoY = clientBoxY + clientBoxHeight - logoHeight;

      doc.addImage(img, "PNG", logoX, logoY, logoWidth, logoHeight);

      lastY = clientBoxY + clientBoxHeight + 8;

      // Generate table section-by-section
      formData.sections.forEach((section, idx) => {
        const sectionRows = [
          [section.title, "", "", "", ""],
          ["MODES D'EVALUATION ET SPECIFICATIONS GENERALES", "", "", "", ""],
          [section.description, "", "", "", ""],
        ];

        const itemRows = section.items.flatMap((item) => {
          const rows = [];

          rows.push([
            { content: item.title, styles: { fontStyle: "bold" } },
            "", "", "", ""
          ]);

          if (item.description) {
            const grayBg = { fillColor: [245, 245, 245] };

            rows.push([
              { content: `  ${item.description}`, styles: { ...grayBg, fontStyle: "normal", halign: "left" } },
              { content: "", styles: grayBg },
              { content: "", styles: grayBg },
              { content: "", styles: grayBg },
              { content: "", styles: grayBg },
            ]);

            rows.push([
              { content: "  Calcule :", styles: { ...grayBg, fontStyle: "italic" } },
              { content: item.unite, styles: grayBg },
              { content: item.qte, styles: grayBg },
              { content: item.puHT, styles: grayBg },
              { content: item.ptHT, styles: grayBg },
            ]);
          } else {
            rows.push([
              { content: item.title, styles: { fontStyle: "bold" } },
              item.unite,
              item.qte,
              item.puHT,
              item.ptHT
            ]);
          }

          return rows;
        });

        const rows = [...sectionRows, ...itemRows];

        autoTable(doc, {
          startY: lastY,
          margin: { left: 8 },
          head: [["Désignation", "Unité", "Quantité", "PU HT", "PT HT"]],
          body: rows,
          styles: {
            cellPadding: 3,
            fontSize: 10,
            valign: "middle",
            lineColor: [200, 200, 200],
            lineWidth: 0.3,
          },
          headStyles: {
            fillColor: [30, 60, 120],
            textColor: [255, 255, 255],
            fontStyle: "bold",
            halign: "center",
            lineColor: [30, 60, 120],
            lineWidth: 0.6,
          },
          columnStyles: {
            0: { cellWidth: 90, valign: "top" },
            1: { cellWidth: 22, halign: "center" },
            2: { cellWidth: 22, halign: "center" },
            3: { cellWidth: 25, halign: "center" },
            4: { cellWidth: 32, halign: "center" },
          },
          theme: "grid",
        });

        const finalY = doc.lastAutoTable.finalY || lastY + 60;

        const boxWidth = 180;
        const boxHeight = 10;
        const pageWidth = doc.internal.pageSize.getWidth();
        const boxX = (pageWidth - boxWidth) / 2;
        const boxY = finalY + 6;

        doc.setFillColor(245, 245, 245);
        doc.roundedRect(boxX, boxY, boxWidth, boxHeight, 3, 3, 'F');

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        doc.text(`Total de ${section.title} HT: ${section.ptHT} TND`, pageWidth / 2, boxY + 7, {
          align: "center",
        });

        lastY = boxY + boxHeight + 8;
      });

      doc.save("devis.pdf");
    };
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
