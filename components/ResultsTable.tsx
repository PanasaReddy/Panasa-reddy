import React, { useState } from 'react';
import { ClassificationResult } from '../types';
import { ArrowDownTrayIcon, DocumentDuplicateIcon } from './icons/Icons';

declare const jsPDF: any;
declare const XLSX: any;

interface ResultsTableProps {
  results: ClassificationResult[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };
  
  const headers = ['Code', 'Category', 'GST Rate (%)', 'Description', 'Reason for Match'];
  const data = results.map(r => [r.code, r.category, r.gstRate, r.description, r.reason]);

  const downloadPDF = () => {
    const doc = new jsPDF.default();
    doc.autoTable({
        head: [headers],
        body: data,
        styles: { fontSize: 9, cellPadding: 6, font: 'helvetica' },
        headStyles: { fillColor: [67, 56, 202], textColor: 255, fontStyle: 'bold', halign: 'left' }, // Indigo 700
        alternateRowStyles: { fillColor: [249, 250, 251] },
        columnStyles: { 0: { fontStyle: 'bold' } }
    });
    doc.save('hsn-sac-results.pdf');
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Results");
    XLSX.writeFile(wb, "hsn-sac-results.xlsx");
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden animate-fade-in ring-1 ring-black/5">
        {/* Toolbar */}
        <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-sm">
            <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                <div className="text-sm text-slate-600 font-medium">
                    Found <span className="text-slate-900 font-bold">{results.length}</span> matches
                </div>
            </div>
            <div className="flex gap-3">
                <button onClick={downloadPDF} className="group flex items-center justify-center px-4 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm hover:shadow-md">
                    <span className="mr-2 group-hover:-translate-y-0.5 transition-transform"><ArrowDownTrayIcon /></span> PDF
                </button>
                <button onClick={downloadExcel} className="group flex items-center justify-center px-4 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 hover:border-emerald-200 hover:text-emerald-600 transition-all shadow-sm hover:shadow-md">
                    <span className="mr-2 group-hover:-translate-y-0.5 transition-transform"><ArrowDownTrayIcon /></span> Excel
                </button>
            </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50/80">
                    <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Code</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">GST Rate</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-1/3">Reasoning</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-50">
                {results.map((result, index) => (
                    <tr key={index} className="hover:bg-indigo-50/30 transition-colors duration-150 group">
                        <td className="px-6 py-5 whitespace-nowrap align-top">
                            <div className="flex items-center">
                                <span className="font-mono text-lg font-bold text-indigo-700 bg-indigo-50/80 px-3 py-1 rounded-lg border border-indigo-100">{result.code}</span>
                                <button 
                                    onClick={() => handleCopy(result.code)} 
                                    className="ml-2 p-2 rounded-lg text-slate-300 hover:text-indigo-600 hover:bg-white hover:shadow-sm transition-all" 
                                    title="Copy code"
                                >
                                    {copiedCode === result.code ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-emerald-500">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    ) : (
                                        <DocumentDuplicateIcon />
                                    )}
                                </button>
                            </div>
                        </td>
                        <td className="px-6 py-5 align-top">
                            <div className="text-sm text-slate-800 font-medium leading-relaxed">{result.description}</div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap align-top">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border ${
                                result.category === 'Goods' 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                : 'bg-blue-50 text-blue-700 border-blue-100'
                            }`}>
                                {result.category === 'Goods' ? (
                                    <svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                ) : (
                                    <svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                )}
                                {result.category}
                            </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap align-top">
                            <div className="text-base font-bold text-slate-800">{result.gstRate}%</div>
                        </td>
                        <td className="px-6 py-5 align-top">
                            <div className="text-sm text-slate-500 leading-relaxed italic bg-slate-50 p-3 rounded-lg border border-slate-100">
                                "{result.reason}"
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default ResultsTable;