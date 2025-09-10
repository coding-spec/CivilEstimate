// src/components/DownloadButton.jsx
import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const DownloadButton = () => {
  // Dummy data (replace with your BOQ / estimates data)
  const data = [
    { item: "Cement", quantity: 50, rate: 300, total: 15000 },
    { item: "Sand", quantity: 100, rate: 50, total: 5000 },
    { item: "Bricks", quantity: 1000, rate: 6, total: 6000 },
  ];

  // Excel Download Function
  const downloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Estimates");

    worksheet.columns = [
      { header: "Item", key: "item", width: 20 },
      { header: "Quantity", key: "quantity", width: 15 },
      { header: "Rate", key: "rate", width: 15 },
      { header: "Total", key: "total", width: 15 },
    ];

    // Add rows
    data.forEach((row) => worksheet.addRow(row));

    // Styling (optional)
    worksheet.getRow(1).font = { bold: true };

    // Save file
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "estimate.xlsx");
  };

  // PDF Download Function
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Civil Estimate Report", 20, 20);

    let y = 40;
    data.forEach((row) => {
      doc.text(
        `${row.item} - Qty: ${row.quantity}, Rate: ${row.rate}, Total: ${row.total}`,
        20,
        y
      );
      y += 10;
    });

    doc.save("estimate.pdf");
  };

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <button
        onClick={downloadExcel}
        style={{
          margin: "10px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Download Excel
      </button>
      <button
        onClick={downloadPDF}
        style={{
          margin: "10px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Download PDF
      </button>
    </div>
  );
};

export default DownloadButton;
