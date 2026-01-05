import React, { useState } from 'react';
import FindCodeTab from './components/FindCodeTab';
import BulkClassifyTab from './components/BulkClassifyTab';
import HistoryTab from './components/HistoryTab';
import SettingsTab from './components/SettingsTab';
import LatestAmendmentsTab from './components/LatestAmendmentsTab';
import { HistoryItem } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { CodeBracketSquareIcon, DocumentTextIcon, ClockIcon, Cog6ToothIcon, Bars3Icon, NewspaperIcon } from './components/icons/Icons';

interface TabProps {
  id: string;
  name: string;
  icon: React.ReactElement;
  isActive: boolean;
  onClick: () => void;
}

// Refined Tab Component with subtle animations
const Tab: React.FC<TabProps> = ({ id, name, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`group relative flex items-center px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ease-out ${
      isActive
        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 ring-1 ring-black/5'
        : 'text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm'
    }`}
  >
    <span className={`transition-colors duration-300 ${isActive ? 'text-indigo-300' : 'text-slate-400 group-hover:text-indigo-500'}`}>
      {icon}
    </span>
    <span className="ml-2.5 tracking-tight">{name}</span>
  </button>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('find');
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('hsn-sac-history', []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToHistory = (item: HistoryItem) => {
    setHistory(prevHistory => [item, ...prevHistory.slice(0, 15)]);
  };
  
  const TABS = [
    { id: 'find', name: 'Smart Search', icon: <CodeBracketSquareIcon /> },
    { id: 'bulk', name: 'Bulk Classify', icon: <DocumentTextIcon /> },
    { id: 'amendments', name: 'GST Updates', icon: <NewspaperIcon /> },
    { id: 'history', name: 'History', icon: <ClockIcon /> },
    { id: 'settings', name: 'Settings', icon: <Cog6ToothIcon /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'find':
        return <FindCodeTab addToHistory={addToHistory} />;
      case 'bulk':
        return <BulkClassifyTab />;
      case 'amendments':
        return <LatestAmendmentsTab />;
      case 'history':
        return <HistoryTab history={history} />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <FindCodeTab addToHistory={addToHistory} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Sophisticated Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-indigo-100/40 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob"></div>
        <div className="absolute top-[10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-100/40 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[45rem] h-[45rem] bg-slate-100/60 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      {/* Premium Glass Header */}
      <header className="sticky top-0 z-30 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex items-center flex-shrink-0 cursor-pointer group" onClick={() => setActiveTab('find')}>
              <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-2 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <div className="ml-3.5 flex flex-col">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                  HSN & SAC <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Classifier</span>
                </h1>
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mt-1">AI-Powered Tax Assistant</span>
              </div>
            </div>

            {/* Desktop Navigation - Floating Pill Style */}
            <nav className="hidden md:flex items-center p-1.5 space-x-1 bg-slate-100/50 rounded-full border border-white/50 shadow-inner backdrop-blur-sm">
              {TABS.map(tab => (
                <Tab 
                  key={tab.id} 
                  id={tab.id}
                  name={tab.name} 
                  icon={tab.icon} 
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-2.5 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors active:scale-95"
              >
                <Bars3Icon />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl px-4 pt-2 pb-4 shadow-xl absolute w-full">
            <div className="flex flex-col space-y-2">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className={`mr-3.5 ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {tab.icon}
                  </span>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="transition-all duration-500 ease-out">
          {renderTabContent()}
        </div>
      </main>

      <footer className="relative z-10 mt-auto py-10 border-t border-slate-200/60 bg-slate-50/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://www.gst.gov.in/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors text-sm">GST Portal</a>
            <span className="text-slate-300">•</span>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors text-sm">Terms of Use</a>
            <span className="text-slate-300">•</span>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors text-sm">Privacy Policy</a>
          </div>
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} HSN & SAC Smart Classifier. Powered by Google Gemini.
          </p>
        </div>
      </footer>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}} />
    </div>
  );
};

export default App;