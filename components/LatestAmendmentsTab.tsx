import React from 'react';

const amendments = [
  {
    id: 1,
    title: "55th GST Council Meeting",
    date: "December 21, 2024",
    type: "Rate Reduction",
    points: [
      {
        heading: "Critical Cancer Drugs",
        description: "GST rate slashed from 12% to 5% on Trastuzumab Deruxtecan, Osimertinib, and Durvalumab to make treatment more affordable."
      },
      {
        heading: "Savory Snacks Alignment",
        description: "Extruded/expanded savory products (HS 1905 90 30) rate reduced from 18% to 12%, putting them on par with namkeens."
      },
      {
        heading: "Co-Insurance Relief",
        description: "Regularization of GST liability on co-insurance premiums for past periods on an 'as is where is' basis."
      }
    ]
  },
  {
    id: 2,
    title: "54th GST Council Meeting",
    date: "September 9, 2024",
    type: "Digital & Compliance",
    points: [
      {
        heading: "B2C E-invoicing Pilot",
        description: "Voluntary pilot project for B2C e-invoicing rolled out to enhance transparency in retail sectors."
      },
      {
        heading: "Import of Services",
        description: "Services imported by foreign airlines from related persons without consideration are now exempt from GST."
      },
       {
        heading: "PLC Clarification",
        description: "Preferential Location Charges (PLC) forms part of composite supply; taxable at the same rate as construction services."
      }
    ]
  },
  {
    id: 3,
    title: "53rd GST Council Meeting",
    date: "June 22, 2024",
    type: "Amnesty & Rates",
    points: [
      {
        heading: "Section 73 Amnesty",
        description: "Waiver of interest and penalties for FY 2017-18 to 2019-20 demands if full tax is paid by March 31, 2025."
      },
      {
        heading: "Carton Boxes Uniformity",
        description: "Uniform 12% GST rate set for all carton boxes (corrugated and non-corrugated) to end classification disputes."
      },
      {
        heading: "Biometric Auth",
        description: "Phased rollout of biometric-based Aadhaar authentication for high-risk registrations."
      }
    ]
  }
];

const LatestAmendmentsTab: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-white/60">
        <div className="mb-10 pb-6 border-b border-slate-100 flex justify-between items-start">
            <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 mb-3 border border-red-100">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    Live Updates
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Regulatory <span className="text-indigo-600">Amendments</span></h2>
                <p className="text-slate-500 mt-3 text-lg leading-relaxed max-w-2xl">
                    Stay compliant with the latest GST Council recommendations, notification summaries, and rate revisions.
                </p>
            </div>
             <a href="https://www.gst.gov.in/" target="_blank" rel="noreferrer" className="hidden sm:flex items-center px-4 py-2 bg-slate-50 text-indigo-600 rounded-xl text-sm font-semibold hover:bg-indigo-50 transition-colors border border-slate-200">
                Official GST Portal
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </a>
        </div>

        <div className="relative space-y-14 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-100 before:via-slate-200 before:to-transparent">
          {amendments.map((amendment, index) => (
            <div key={amendment.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Timeline Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-indigo-100 text-indigo-600 shadow-lg shadow-indigo-500/20 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:scale-110 transition-transform duration-300">
                 <span className="font-bold text-sm">{index + 1}</span>
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group-hover:-translate-y-1">
                <div className="flex flex-col justify-between mb-4">
                   <div className="flex justify-between items-start mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide bg-indigo-50 text-indigo-600 border border-indigo-100">
                            {amendment.type}
                        </span>
                        <time className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            {amendment.date}
                        </time>
                   </div>
                   <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                     {amendment.title}
                   </h3>
                </div>
                
                <ul className="space-y-4">
                  {amendment.points.map((point, pIndex) => (
                    <li key={pIndex} className="bg-slate-50/50 p-3 rounded-xl">
                      <p className="font-bold text-slate-800 text-sm flex items-center mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2"></span>
                        {point.heading}
                      </p>
                      <p className="text-slate-600 text-sm leading-relaxed pl-3.5">
                        {point.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-5 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-200 flex items-start gap-4">
             <div className="p-2 bg-white rounded-lg shadow-sm text-slate-400">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
             </div>
             <p className="text-sm text-slate-500 leading-relaxed pt-1">
                 <span className="font-bold text-slate-700">Compliance Notice:</span> While we incorporate real-time updates from the 53rd, 54th, and 55th GST Council meetings, always verify critical classifications with the official CBIC notifications or a chartered accountant.
             </p>
        </div>
      </div>
    </div>
  );
};

export default LatestAmendmentsTab;