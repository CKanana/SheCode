import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ChamaDiscovery = () => {
  const navigate = useNavigate();
  return (
    <div className="p-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"><ArrowLeft /> Back</button>
      <h1 className="text-3xl font-bold">Chama Discovery (Placeholder)</h1>
      <p className="mt-2 text-gray-500">This page will feature the AI-powered matching to help users find the perfect Chama.</p>
    </div>
  );
};

export default ChamaDiscovery;