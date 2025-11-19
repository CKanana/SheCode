
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CreateChamaForm from './components/CreateChamaForm';

const CreateChama = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="w-full max-w-md">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"><ArrowLeft /> Back</button>
        <CreateChamaForm />
      </div>
    </div>
  );
};

export default CreateChama;