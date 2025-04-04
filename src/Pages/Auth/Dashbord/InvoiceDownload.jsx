import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Home as InvoicePDF } from "./Home";

const InvoiceDownload = () => {
  return (
    <div className="p-4"> 
      <h2 className="text-2xl mb-4">Invoice Download</h2>
      <PDFDownloadLink document={<InvoicePDF />} fileName="invoice.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download Invoice'
        }
      </PDFDownloadLink>
    </div>
  );
};

export default InvoiceDownload;
