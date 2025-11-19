import React, { useState } from "react";
import SidebarNav from "./SidebarNav";
import { Users, Search, PlusCircle, Mail, ArrowLeft, Target, Clock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TabButton = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
      active
        ? 'bg-pink-600 text-white shadow-md'
        : 'text-gray-600 hover:bg-pink-100'
    }`}
  >
    {icon}
    {label}
  </button>
);

const MyChamaCard = ({ name, role, goal, nextContribution, progress, members, onManage }) => (
  <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg shadow-pink-200/50 p-6 border border-pink-100 hover:-translate-y-1 transition-transform duration-300">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs font-semibold text-indigo-600 uppercase">{role}</p>
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Target size={16} />
        <span>{goal}</span>
      </div>
    </div>
    <div className="mt-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">Group Goal Progress</span>
        <span className="text-sm font-bold text-pink-600">{progress}%</span>
      </div>
      <div className="w-full bg-pink-100 rounded-full h-2.5">
        <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
    <div className="mt-6 border-t border-pink-100 pt-4 flex justify-between items-center">
      <div className="text-sm">
        <p className="text-gray-500">Next Contribution</p>
        <p className="font-bold text-lg text-gray-800">KES {nextContribution.toLocaleString()}</p>
      </div>
      <button className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors" onClick={onManage}>
        View Members
      </button>
    </div>
  </div>
);

const InvitationCard = ({ name, inviter, goal }) => (
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg shadow-pink-200/50 p-5 border border-pink-100 flex items-center justify-between">
        <div>
            <h4 className="font-bold text-gray-800">{name}</h4>
            <p className="text-sm text-gray-500">Invited by {inviter} for: <span className="font-medium text-gray-600">{goal}</span></p>
        </div>
        <div className="flex gap-2">
            <button className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300">Decline</button>
            <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600">Accept</button>
        </div>
    </div>
);

const ChamaMain = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my-chamas');

  const [selectedChama, setSelectedChama] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAbout, setEditAbout] = useState("");
  const [paymentForm, setPaymentForm] = useState(null);
  const [paymentFormStatus, setPaymentFormStatus] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [actionMessage, setActionMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const chamaList = [
    {
      name: "Nairobi Business Queens",
      role: "Treasurer",
      goal: "Buy Land",
      nextContribution: 5000,
      progress: 75,
      members: [
        { name: "You", role: "Treasurer" },
        { name: "Jane Mwangi", role: "Chairperson" },
        { name: "Amina Yusuf", role: "Member" },
      ],
    },
    {
      name: "Kilimani Young Mothers",
      role: "Member",
      goal: "School Fees",
      nextContribution: 2000,
      progress: 40,
      members: [
        { name: "Mary Wanjiru", role: "Chairperson" },
        { name: "You", role: "Member" },
        { name: "Grace Njeri", role: "Treasurer" },
      ],
    },
  ];

  const handleManageChama = (chama) => {
    setSelectedChama(chama);
    setIsAdmin(chama.role === "Treasurer");
    setEditName(chama.name);
    setEditAbout(chama.goal);
    setPaymentForm(null);
    setPaymentFormStatus("");
  };

  const handleAppointTreasurer = (memberName) => {
    if (window.confirm(`Are you sure you want to appoint ${memberName} as Treasurer? You will lose admin rights.`)) {
      alert(`${memberName} is now the Treasurer. You lose admin rights.`);
      setIsAdmin(false);
    }
  };

  const handleDeleteMember = (memberName) => {
    if (window.confirm(`Are you sure you want to delete ${memberName} from this Chama? This action cannot be undone.`)) {
      alert(`Deleted ${memberName}`);
    }
  };

  const handleSendInfo = () => {
    alert('Info sent to group!');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'my-chamas':
        return (
          <div>
            {!selectedChama ? (
              <div className="grid md:grid-cols-2 gap-8">
                {chamaList.map((chama, idx) => (
                  <MyChamaCard key={idx} {...chama} onManage={() => handleManageChama(chama)} />
                ))}
              </div>
            ) : (
              <div className="bg-white/80 rounded-xl shadow-lg p-6 border border-pink-100">
                <h3 className="text-xl font-bold text-pink-600 mb-4">{selectedChama.name} Members</h3>
                {isAdmin && (
                  <div className="mb-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Edit Chama Details</h4>
                    <div className="mb-2">
                      <label className="block text-sm text-gray-600 mb-1">Chama Name</label>
                      <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="w-full px-3 py-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200" />
                      {formErrors.name && <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>}
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm text-gray-600 mb-1">About/Goal</label>
                      <textarea value={editAbout} onChange={e => setEditAbout(e.target.value)} className="w-full px-3 py-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200" />
                      {formErrors.about && <p className="text-xs text-red-600 mt-1">{formErrors.about}</p>}
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm text-gray-600 mb-1">Upload Payment Form</label>
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => {
                        setPaymentForm(e.target.files[0]);
                        setPaymentFormStatus("Uploaded: " + e.target.files[0].name);
                        setFormErrors(errors => ({ ...errors, payment: undefined }));
                      }} className="w-full" />
                      {paymentFormStatus && <p className="text-xs text-green-600 mt-1">{paymentFormStatus}</p>}
                      {formErrors.payment && <p className="text-xs text-red-600 mt-1">{formErrors.payment}</p>}
                      {/* Preview/placeholder for uploaded payment form */}
                      {paymentForm && (
                        <div className="mt-2">
                          {paymentForm.type.startsWith('image/') ? (
                            <img src={URL.createObjectURL(paymentForm)} alt="Payment Preview" className="max-h-32 rounded shadow border border-pink-200" />
                          ) : (
                            <p className="text-xs text-gray-700">File: {paymentForm.name}</p>
                          )}
                        </div>
                      )}
                    </div>
                    <button
                      className={`bg-pink-600 text-white px-4 py-2 rounded mt-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                      disabled={loading}
                      onClick={() => {
                        setActionMessage("");
                        let errors = {};
                        if (!editName.trim()) errors.name = "Chama name is required.";
                        if (!editAbout.trim()) errors.about = "About/Goal is required.";
                        if (!paymentForm) errors.payment = "Payment form is required.";
                        setFormErrors(errors);
                        if (Object.keys(errors).length > 0) return;
                        setLoading(true);
                        setTimeout(() => {
                          setLoading(false);
                          setActionMessage("Chama details updated successfully!");
                        }, 1200);
                      }}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    {actionMessage && <p className="text-xs text-green-600 mt-2">{actionMessage}</p>}
                  </div>
                )}
                <ul className="space-y-2 mb-4">
                  {selectedChama.members.map((member, idx) => (
                    <li key={idx} className="flex justify-between items-center bg-pink-50 rounded px-3 py-2">
                      <span>{member.name}</span>
                      <span className="text-xs text-gray-600">{member.role}</span>
                      {isAdmin && member.role !== "Treasurer" && member.name !== "You" && (
                        <button className="bg-indigo-500 text-white px-2 py-1 rounded text-xs ml-2" onClick={() => handleAppointTreasurer(member.name)}>
                          Appoint Treasurer
                        </button>
                      )}
                      {isAdmin && member.name !== "You" && (
                        <button className="bg-red-500 text-white px-2 py-1 rounded text-xs ml-2" onClick={() => handleDeleteMember(member.name)}>
                          Delete
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                {isAdmin && (
                  <div className="mb-4">
                    <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 mr-2" onClick={handleSendInfo}>Send Info</button>
                  </div>
                )}
                <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 w-full font-semibold" onClick={() => setSelectedChama(null)}>
                  Back to My Chamas
                </button>
              </div>
            )}
          </div>
        );
      case 'discover':
        // This would ideally be your ChamaDiscovery component rendered here
        return (
            <div className="text-center bg-white/70 p-10 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800">Find Your Perfect Chama</h3>
                <p className="text-gray-600 mt-2 mb-4">Our AI will help you find groups that match your goals, location, and interests.</p>
                <button onClick={() => navigate('/chama-discovery')} className="bg-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors">
                    Start Discovery
                </button>
            </div>
        );
      case 'invitations':
        return (
            <div className="space-y-4">
                <InvitationCard name="Westlands Hustlers" inviter="Faith Otieno" goal="Start a Business" />
                <p className="text-center text-gray-500 text-sm pt-4">No more pending invitations.</p>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex">
      <SidebarNav />
      <div className="flex-1" style={{ marginLeft: '5rem' }}>
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <button onClick={() => navigate('/main')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-2">
                <ArrowLeft size={16} />
                Back to Dashboard
              </button>
              <h1 className="text-4xl font-bold text-gray-800">Chama Hub</h1>
              <p className="text-gray-500 mt-1">Manage, discover, and create your savings groups.</p>
            </div>
            <button onClick={() => navigate('/create-chama')} className="mt-4 sm:mt-0 flex items-center gap-2 bg-pink-600 text-white font-semibold py-2 px-5 rounded-full shadow-lg hover:bg-pink-700 transition-all">
              <PlusCircle size={20} />
              Create New Chama
            </button>
          </div>

          {/* Tabs */}
          <div className="bg-white/60 backdrop-blur-lg p-2 rounded-full flex items-center justify-start space-x-2 shadow-md mb-8">
            <TabButton label="My Chamas" icon={<Users size={16} />} active={activeTab === 'my-chamas'} onClick={() => setActiveTab('my-chamas')} />
            <TabButton label="Discover" icon={<Search size={16} />} active={activeTab === 'discover'} onClick={() => setActiveTab('discover')} />
            <TabButton label="Invitations" icon={<Mail size={16} />} active={activeTab === 'invitations'} onClick={() => setActiveTab('invitations')} />
          </div>

          {/* Tab Content */}
          <div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChamaMain;
