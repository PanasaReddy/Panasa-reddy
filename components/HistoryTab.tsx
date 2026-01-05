import React from 'react';
import { HistoryItem } from '../types';

interface HistoryTabProps {
  history: HistoryItem[];
}

const HistoryTab: React.FC<HistoryTabProps> = ({ history }) => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900">Search History</h2>
                <p className="text-slate-500 mt-1">Access your recent 15 queries and classifications.</p>
            </div>

            {history.length === 0 ? (
                <div className="p-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-slate-500 font-medium">No search history yet.</p>
                    <p className="text-slate-400 text-sm mt-1">Your recent searches will appear here.</p>
                </div>
            ) : (
                <ul role="list" className="divide-y divide-slate-100">
                    {history.map((item) => (
                    <li key={item.id} className="p-6 hover:bg-slate-50 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 border border-indigo-100">
                                    <svg className="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-base font-semibold text-slate-900">
                                        {item.query}
                                    </p>
                                    <div className="flex items-center mt-1 gap-2">
                                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="whitespace-nowrap text-sm text-slate-400 font-medium pl-14 sm:pl-0">
                                {item.timestamp}
                            </div>
                        </div>
                    </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
  );
};

export default HistoryTab;