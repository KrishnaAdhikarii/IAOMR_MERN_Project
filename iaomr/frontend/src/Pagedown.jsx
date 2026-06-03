import React from "react";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-10 text-center">
        <div className="text-6xl mb-6">🔧</div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Website Temporarily Unavailable
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          We're sorry for the inconvenience. Our team is currently working to
          restore service and get everything back online as quickly as possible.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            Thank you for your patience and understanding while we resolve the
            issue.
          </p>
        </div>

        <p className="text-sm text-gray-500">
          Please check back again shortly.
        </p>
      </div>
    </div>
  );
}