import React, { useState } from 'react';
import { getClassification } from '../services/geminiService';
import { ClassificationCategory, ClassificationResult, HistoryItem } from '../types';
import ResultsTable from './ResultsTable';

interface FindCodeTabProps {
  addToHistory: (item: HistoryItem) => void;
}

const FindCodeTab: React.FC<FindCodeTabProps> = ({ addToHistory }) => {
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<ClassificationCategory>('Auto Detect');
  const [results, setResults] = useState<ClassificationResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Please enter a valid description to proceed.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const classificationResults = await getClassification(description, category);
      setResults(classificationResults);
      addToHistory({
        id: new Date().toISOString(),
        timestamp: new Date().toLocaleString(),
        query: description,
        category: category,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const CategoryOption = ({ value, label, subLabel, icon }: { value: ClassificationCategory, label: string, subLabel: string, icon: React.ReactNode }) => (
    <div 
      onClick={() => !loading && setCategory(value)}
      className={`group relative cursor-pointer rounded-2xl border p-5 flex flex-col items-start transition-all duration-300 ease-out ${
        category === value 
          ? 'border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-600' 
          : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md hover:shadow-slate-200/50'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className="flex items-center w-full justify-between mb-3">
        <div className={`p-2 rounded-lg transition-colors duration-300 ${category === value ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'}`}>
            {icon}
        </div>
        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
          category === value ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 group-hover:border-indigo-400'
        }`}>
          {category === value && <div className="h-2 w-2 bg-white rounded-full" />}
        </div>
      </div>
      <span className={`font-bold text-sm ${category === value ? 'text-indigo-900' : 'text-slate-700'}`}>
        {label}
      </span>
      <span className="text-xs text-slate-500 mt-1 font-medium leading-tight">{subLabel}</span>
    </div>
  );

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      {/* Hero Search Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/60 border border-white/60 overflow-hidden relative">
        {/* Decorative gradient line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500"></div>
        
        <div className="p-8 sm:p-10">
          <div className="mb-10 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4 border border-indigo-100">
                AI-Powered GST Classification
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
              Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Codes & Rates</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Instantly identify accurate HSN/SAC codes with the latest GST rates by simply describing your product or service.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <div className="flex justify-between items-end mb-3 ml-1">
                  <label htmlFor="description" className="block text-sm font-bold text-slate-700">
                    Product or Service Description
                  </label>
                  <span className="text-xs text-slate-400 font-medium">Detailed inputs yield better results</span>
              </div>
              <div className="relative group">
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="E.g., 'Construction services for a commercial complex with composite supply' or 'Frozen seasoned french fries retail pack'"
                  className="w-full h-40 p-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all duration-300 resize-none shadow-inner text-lg leading-relaxed"
                  disabled={loading}
                />
                <div className="absolute bottom-4 right-4 flex items-center gap-2 pointer-events-none opacity-70">
                    <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                </div>
              </div>
            </div>

            <div>
              <span className="block text-sm font-bold text-slate-700 mb-3 ml-1">Refine Search Scope</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <CategoryOption 
                  value="Auto Detect" 
                  label="Auto Detect" 
                  subLabel="AI intelligently selects the best fit" 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>}
                />
                <CategoryOption 
                  value="Goods" 
                  label="Goods (HSN)" 
                  subLabel="Tangible products & commodities" 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>}
                />
                <CategoryOption 
                  value="Services" 
                  label="Services (SAC)" 
                  subLabel="Professional services & labor" 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" /></svg>}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/30 transform transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center text-lg"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="animate-pulse">Analyzing Regulatory Framework...</span>
                </>
              ) : (
                <>
                  <span>Find Correct Codes</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-6 p-5 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center shadow-sm animate-fade-in">
          <div className="p-2 bg-red-100 rounded-full mr-4 flex-shrink-0">
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
          </div>
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}

      {/* Results Section */}
      {results.length > 0 && (
         <div className="mt-12 animate-fade-in">
            <div className="flex items-end justify-between mb-6 px-2">
              <div>
                  <h3 className="text-2xl font-bold text-slate-900">Top Recommendations</h3>
                  <p className="text-sm text-slate-500 mt-1">Verified against <span className="font-semibold text-indigo-600">Dec 2024</span> amendments</p>
              </div>
            </div>
            <ResultsTable results={results} />
         </div>
      )}
    </div>
  );
};

export default FindCodeTab;