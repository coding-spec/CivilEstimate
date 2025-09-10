// src/pages/Estimate.jsx
import React, { useEffect, useState } from "react";
import "../styles/estimate.css";
import { db } from "../firebase";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function Estimate() {
  const [mounted, setMounted] = useState(false);
  useEffect(()=>{ const t = setTimeout(()=>setMounted(true), 60); return ()=>clearTimeout(t); }, []);

  // rows = BOQ rows
  const [rows, setRows] = useState([
    { id: Date.now(), desc: "Plain cement concrete", unit: "m3", qty: 0, wastage: 0, rate: 0, amount: 0 }
  ]);
  const [project, setProject] = useState("");
  const [savedMsg, setSavedMsg] = useState("");

  function updateRow(idx, key, value) {
  setRows(prev => {
    const copy = [...prev];
    copy[idx] = { ...copy[idx], [key]: value };
    const q = Number(copy[idx].qty) || 0;
    const r = Number(copy[idx].rate) || 0;
    const w = copy[idx].wastage ? Number(copy[idx].wastage) : 0; // optional
    copy[idx].amount = q && r ? +(q * r * (1 + w/100)).toFixed(2) : 0;

      return copy;
    });
  }

  function addRow() {
    setRows(prev => [...prev, { id: Date.now()+Math.random(), desc: "", unit: "unit", qty: 0, wastage: 0, rate: 0, amount: 0 }]);
  }
  function removeRow(idx) {
    setRows(prev => { const copy = prev.filter((_,i)=>i!==idx); return copy.length ? copy : [{ id: Date.now(), desc: "", unit: "unit", qty: 0, wastage: 0, rate: 0, amount: 0 }]; });
  }

  const total = rows.reduce((s,r)=> s + Number(r.amount || 0), 0);

  async function saveEstimate(e) {
    e.preventDefault();
    if (!project) { alert("Enter project name"); return; }
    try {
      await addDoc(collection(db, "estimates"), {
        project,
        rows,
        total,
        createdAt: Timestamp.now()
      });
      setSavedMsg("Saved ✓");
      setTimeout(()=>setSavedMsg(""), 3000);
      setProject("");
      setRows([{ id: Date.now(), desc: "Plain cement concrete", unit: "m3", qty: 0, wastage: 0, rate: 0, amount: 0 }]);
    } catch (err) {
      console.error(err);
      alert("Save failed — check console");
    }
  }

  // Download PDF
function downloadPDF(project, rows, total) {
  const doc = new jsPDF();
  doc.text(`Estimate Report - ${project}`, 14, 10);

  const tableColumn = ["Sr", "Description", "Qty", "Rate", "Wastage %", "Amount"];
  const tableRows = [];

  rows.forEach((r, idx) => {
    tableRows.push([
      idx + 1,
      r.desc,
      r.qty,
      r.rate,
      r.wastage || "-",
      r.amount,
    ]);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.text(`Total: ₹ ${total}`, 14, doc.lastAutoTable.finalY + 10);
  doc.save("estimate.pdf");
}

// Download Excel
function downloadExcel(project, rows, total) {
  const data = rows.map((r, idx) => ({
    Sr: idx + 1,
    Description: r.desc,
    Quantity: r.qty,
    Rate: r.rate,
    "Wastage %": r.wastage || "-",
    Amount: r.amount,
  }));

  data.push({ Sr: "", Description: "Total", Quantity: "", Rate: "", "Wastage %": "", Amount: total });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Estimate");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, "estimate.xlsx");
}


  return (
    <section className={`estimate page ${mounted ? "enter" : ""}`}>
      <div className="container">
        <h2 className="section-title">Create Estimate</h2>
        <form className="estimate-form" onSubmit={saveEstimate}>
          <div className="project-row">
            <input className="input" value={project} onChange={(e)=>setProject(e.target.value)} placeholder="Project name" />
            <div className="muted">Total: <strong>₹ {total.toLocaleString(undefined, {maximumFractionDigits:2})}</strong></div>
          </div>

          <div className="rows-table">
            <div className="table-head">
              <div>Sr</div><div>Description</div><div>Qty</div><div>Rate (₹)</div><div>Wastage %</div><div>Amount</div><div></div>
            </div>

            {rows.map((r, idx) => (
              <div className="table-row" key={r.id} style={{ animationDelay: `${0.06 * idx}s` }}>
                <div className="col sr">{idx+1}</div>

                <div className="col desc">
                  <input className="cell" value={r.desc} onChange={(e)=>updateRow(idx,'desc',e.target.value)} placeholder="Item description" />
                </div>


                <div className="col qty">
                  <input type="number" className="cell" value={r.qty} onChange={(e)=>updateRow(idx,'qty',e.target.value)} />
                </div>
                
                <div className="col rate">
                  <input type="number" className="cell" value={r.rate} onChange={(e)=>updateRow(idx,'rate',e.target.value)} />
                </div>

                 <div className="col wastage">
                  <input type="number" className="cell" value={r.wastage} onChange={(e)=>updateRow(idx,'wastage',e.target.value)} />
                </div>

                <div className="col amount">₹ {Number(r.amount || 0).toLocaleString(undefined, {maximumFractionDigits:2})}</div>

                <div className="col act">
                  <button type="button" className="btn small danger" onClick={()=>removeRow(idx)}>Delete</button>
                </div>
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" className="btn" onClick={addRow}>+ Add Row</button>
            <button type="submit" className="btn primary">Save Estimate</button>
            <div className={`save-msg ${savedMsg ? "show" : ""}`}>{savedMsg}</div>
          </div>
        </form>
{/* New Download Buttons */}
<div className="download-buttons">
  <button
    type="button"
    className="btn pdf"
    onClick={() => downloadPDF(project, rows, total)}
  >
    Download PDF
  </button>
  <button
    type="button"
    className="btn excel"
    onClick={() => downloadExcel(project, rows, total)}
  >
    Download Excel
  </button>
</div>

      </div>
    </section>
  );
}
