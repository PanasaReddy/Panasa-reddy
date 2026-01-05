
import React from 'react';

const SettingsTab: React.FC = () => {
  return (
    <div className="animate-fade-in">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Settings</h2>
            <p className="text-slate-600">
            This is a placeholder for future settings. Possible options could include:
            </p>
            <ul className="list-disc list-inside mt-4 text-slate-600 space-y-2">
                <li>API Key Management</li>
                <li>Email Notification Preferences</li>
                <li>Google Sheets Integration Setup</li>
                <li>Theme Customization (Light/Dark Mode)</li>
            </ul>
        </div>
    </div>
  );
};

export default SettingsTab;
