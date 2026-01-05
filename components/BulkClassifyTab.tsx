import React, { useState, useRef } from 'react';
import { getClassification } from '../services/geminiService';
import { ClassificationResult } from '../types';
import ResultsTable from './ResultsTable';
import { ArrowDownTrayIcon } from './icons/Icons';

declare const Papa: any;

interface BulkResult {
  inputDescription: string;
  classifications: ClassificationResult[] | null;
  error?: string;
}

const BulkClassifyTab: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [bulkResults, setBulkResults] = useState<BulkResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
          setError("Please upload a valid CSV file.");
          setFile(null);
          if(fileInputRef.current) fileInputRef.current.value = "";
          return;
      }
      setFile(selectedFile);
      setError(null);
      setBulkResults([]);
    }
  };

  const handleProcessFile = async () => {
    if (!file) {
      setError('Please select a file to process.');
      return;
    }

    setLoading(true);
    setError(null);
    setBulkResults([]);
    setProgress(0);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results: any) => {
        const descriptions = results.data
            .map((row: any) => row.description || row.Description)
            .filter((d: string | undefined) => d && d.trim() !== '');

        if (descriptions.length === 0) {
            setError("No valid 'description' column found in the CSV file.");
            setLoading(false);
            return;
        }

        const newBulkResults: BulkResult[] = [];
        for (let i = 0; i < descriptions.length; i++) {
          const desc = descriptions[i];
          try {
            const classifications = await getClassification(desc, 'Auto Detect');
            newBulkResults.push({ inputDescription: desc, classifications });
          } catch (err) {
            newBulkResults.push({ inputDescription: desc, classifications: null, error: err instanceof Error ? err.message : 'Unknown error' });
          }
          setProgress(((i + 1) / descriptions.length) * 100);
        }
        setBulkResults(newBulkResults);
        setLoading(false);
      },
      error: (err: any) => {
          setError(`CSV parsing error: ${err.message}`);
          setLoading(false);
      }
    });
  };
  
  const downloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8,description\n\"Manufacturing of leather shoes\"\n\"IT consulting services\"";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="mb-6">
             <h2 className="text-2xl font-bold text-slate-900 mb-2">Bulk Classification</h2>
             <p className="text-slate-500">Classify massive inventories or service lists in seconds by uploading a CSV.</p>
        </div>

        <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-100 transition-colors">
            <div className="mx-auto h-12 w-12 text-slate-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            </div>
            <p className="text-sm text-slate-500 mb-4">
                Upload a CSV with a <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-700 font-mono text-xs">description</code> column.
            </p>
            
            <div className="flex flex-col items-center gap-4">
                 <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="block w-full max-w-xs text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                    disabled={loading}
                />
                 {file && (
                    <button
                        onClick={handleProcessFile}
                        disabled={loading}
                        className="px-8 py-2.5 bg-indigo-600 text-white font-bold rounded-full shadow-md hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all"
                    >
                        {loading ? 'Processing...' : 'Start Batch Processing'}
                    </button>
                 )}
            </div>
             <div className="mt-6">
                <button onClick={downloadTemplate} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center">
                    <ArrowDownTrayIcon />
                    Download Sample Template
                </button>
            </div>
        </div>
        
        {loading && (
            <div className="mt-6">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        )}

        {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm">
                <p><span className="font-bold">Error:</span> {error}</p>
            </div>
        )}
      </div>

      {bulkResults.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Batch Results</h3>
            <div className="space-y-8">
            {bulkResults.map((result, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="mb-4 pb-4 border-b border-slate-100">
                         <h4 className="text-sm uppercase tracking-wide text-slate-500 font-bold mb-1">Input Description</h4>
                         <p className="text-lg text-slate-900">{result.inputDescription}</p>
                    </div>
                    {result.classifications && <ResultsTable results={result.classifications} />}
                    {result.error && (
                        <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
                            <p>Could not process: {result.error}</p>
                        </div>
                    )}
                </div>
            ))}
            </div>
          </div>
      )}
    </div>
  );
};

export default BulkClassifyTab;