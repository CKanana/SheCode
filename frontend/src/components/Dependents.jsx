import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Heart,
  Calendar,
  PiggyBank,
  TrendingUp,
  DollarSign,
  ArrowLeft,
  LogOut,
  Settings,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Dependents() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDependent, setEditingDependent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { currentUser, updateUserData, logout } = useAuth();
  const navigate = useNavigate();

  const dependents = currentUser?.dependents || [];
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAddDependent = (dependentData) => {
    const newDependent = {
      id: Date.now().toString(),
      ...dependentData,
      trustFund: {
        totalAmount: 0,
        monthlyContribution: 0,
        goalAmount: dependentData.goalAmount || 10000,
        transactions: []
      },
      createdAt: new Date().toISOString()
    };

    const updatedDependents = [...dependents, newDependent];
    updateUserData({ dependents: updatedDependents });
    setShowAddModal(false);
  };

  const handleEditDependent = (dependentData) => {
    const updatedDependents = dependents.map(dep => 
      dep.id === editingDependent.id 
        ? { ...dep, ...dependentData }
        : dep
    );
    updateUserData({ dependents: updatedDependents });
    setEditingDependent(null);
  };

  const handleDeleteDependent = (dependentId) => {
    const updatedDependents = dependents.filter(dep => dep.id !== dependentId);
    updateUserData({ dependents: updatedDependents });
    setDeleteConfirm(null);
  };

  const getTotalTrustFunds = () => {
    return dependents.reduce((total, dep) => total + (dep.trustFund?.totalAmount || 0), 0);
  };

  const getMonthlyContributions = () => {
    return dependents.reduce((total, dep) => total + (dep.trustFund?.monthlyContribution || 0), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 font-poppins">
      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              SheFund
            </Link>
            <nav className="hidden md:flex gap-4">
              <Link to="/main" className="flex items-center gap-2 text-gray-700 hover:text-pink-600">
                <Heart className="w-4 h-4" /> Dashboard
              </Link>
              <Link to="/dependents" className="flex items-center gap-2 text-pink-600 font-semibold">
                <Users className="w-4 h-4" /> Dependents
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/main")}
              className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden md:inline">Back to Dashboard</span>
            </button>
            <Settings className="w-5 h-5 text-gray-600 cursor-pointer hover:text-pink-600" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">
            Manage Dependents & Trust Funds
          </h1>
          <p className="text-gray-600 text-lg">
            Set up and manage trust funds for your loved ones
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-pink-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-600">Total Dependents</h3>
              <Users className="w-5 h-5 text-pink-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{dependents.length}</h2>
            <p className="text-sm text-gray-500 mt-1">People you're caring for</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-pink-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-600">Total Trust Funds</h3>
              <PiggyBank className="w-5 h-5 text-pink-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">KES{getTotalTrustFunds().toLocaleString()}</h2>
            <p className="text-sm text-gray-500 mt-1">Across all dependents</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-pink-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-600">Monthly Contributions</h3>
              <TrendingUp className="w-5 h-5 text-pink-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">KES{getMonthlyContributions().toLocaleString()}</h2>
            <p className="text-sm text-gray-500 mt-1">Total monthly savings</p>
          </div>
        </div>

        {/* Add Dependent Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-3 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-200"
          >
            <Plus className="w-5 h-5" />
            Add New Dependent
          </button>
        </div>

        {/* Dependents List */}
        <div className="space-y-6">
          {dependents.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Dependents Yet</h3>
              <p className="text-gray-500 mb-6">Start by adding a dependent to set up their trust fund</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-200"
              >
                Add Your First Dependent
              </button>
            </div>
          ) : (
            dependents.map((dependent) => (
              <div key={dependent.id} className="bg-white rounded-2xl shadow-md p-6 border border-pink-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {dependent.firstName} {dependent.lastName}
                        </h3>
                        <p className="text-gray-600">{dependent.relationship}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Born: {dependent.dateOfBirth}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-pink-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-4 h-4 text-pink-600" />
                          <span className="text-sm font-medium text-gray-600">Current Fund</span>
                        </div>
                        <p className="text-lg font-bold text-pink-600">
                          KES{(dependent.trustFund?.totalAmount || 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-gray-600">Goal Amount</span>
                        </div>
                        <p className="text-lg font-bold text-purple-600">
                          KES{(dependent.trustFund?.goalAmount || 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-fuchsia-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <PiggyBank className="w-4 h-4 text-fuchsia-600" />
                          <span className="text-sm font-medium text-gray-600">Monthly Save</span>
                        </div>
                        <p className="text-lg font-bold text-fuchsia-600">
                          KES{(dependent.trustFund?.monthlyContribution || 0).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {dependent.notes && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">
                          <strong>Notes:</strong> {dependent.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => setEditingDependent(dependent)}
                      className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors p-2 rounded-lg hover:bg-pink-50"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(dependent.id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingDependent) && (
        <AddDependentModal
          dependent={editingDependent}
          onSave={editingDependent ? handleEditDependent : handleAddDependent}
          onClose={() => {
            setShowAddModal(false);
            setEditingDependent(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <DeleteConfirmModal
          dependentName={dependents.find(d => d.id === deleteConfirm)?.firstName}
          onConfirm={() => handleDeleteDependent(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}

// Add Dependent Modal Component
function AddDependentModal({ dependent, onSave, onClose }) {
  const [formData, setFormData] = useState({
    firstName: dependent?.firstName || "",
    lastName: dependent?.lastName || "",
    relationship: dependent?.relationship || "",
    dateOfBirth: dependent?.dateOfBirth || "",
    goalAmount: dependent?.trustFund?.goalAmount || 10000,
    notes: dependent?.notes || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-pink-600">
              {dependent ? "Edit Dependent" : "Add New Dependent"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relationship
              </label>
              <select
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              >
                <option value="">Select relationship</option>
                <option value="Child">Child</option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Spouse">Spouse</option>
                <option value="Grandchild">Grandchild</option>
                <option value="Nephew/Niece">Nephew/Niece</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trust Fund Goal Amount (KES)
              </label>
              <input
                type="number"
                name="goalAmount"
                value={formData.goalAmount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                min="1000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Any additional notes about this dependent..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                {dependent ? "Update" : "Add"} Dependent
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Delete Confirmation Modal
function DeleteConfirmModal({ dependentName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Delete Dependent</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete <strong>{dependentName}</strong>'s profile and all associated trust fund data? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
