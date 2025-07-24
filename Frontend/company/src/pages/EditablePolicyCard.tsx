// src/components/services/EditablePolicyCard.jsx
import React, { useState } from "react";
import { Edit, Trash2, Save, XCircle } from "lucide-react";

interface Policy {
  id: number | string;
  type: string;
  amount: number;
  description?: string;
  coverage?: number;  // Changed from string to number
  due_date?: string;
  status?: string;
  clients?: number;
  // Add other fields as needed
}

const EditablePolicyCard = ({ policies, onUpdate, onDelete }: {
  policies: Policy[];
  onUpdate: (policy: Policy) => void;
  onDelete: (id: number | string) => void;
}) => {
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editedPolicy, setEditedPolicy] = useState<Partial<Policy>>({});

  const handleEditClick = (policy) => {
    setEditingId(policy.id);
    setEditedPolicy({ ...policy });
  };

  const handleSaveClick = () => {
    onUpdate(editedPolicy as Policy);
    setEditingId(null);
    setEditedPolicy({});
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditedPolicy({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Convert to number if the field is a numeric field
    const numericFields = ['coverage', 'amount', 'clients'];
    const newValue = numericFields.includes(name) ? parseFloat(value) || 0 : value;
    setEditedPolicy((prev) => ({ ...prev, [name]: newValue }));
  };

  return (
    <div className="divide-y divide-gray-100 ">
      {policies.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No policies available. Click "Add New Policy" to get started!
        </div>
      ) : (
        policies.map((policy) => (
          <div key={policy.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-gray-50 transition-colors ">
            {editingId === policy.id ? (
              // Edit mode
              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div>
                  <label htmlFor={`type-${policy.id}`} className="block text-xs font-medium text-gray-500">Policy Type</label>
                  <input
                    type="text"
                    id={`type-${policy.id}`}
                    name="type"
                    value={editedPolicy.type || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor={`amount-${policy.id}`} className="block text-xs font-medium text-gray-500">Amount</label>
                  <input
                    type="number"
                    id={`amount-${policy.id}`}
                    name="amount"
                    value={editedPolicy.amount !== undefined && editedPolicy.amount !== null ? editedPolicy.amount : ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor={`description-${policy.id}`} className="block text-xs font-medium text-gray-500">Description</label>
                  <textarea
                    id={`description-${policy.id}`}
                    name="description"
                    value={editedPolicy.description || ''}
                    onChange={handleChange}
                    rows="2"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor={`coverage-${policy.id}`} className="block text-xs font-medium text-gray-500">Coverage</label>
                  <input
                    type="number"
                    id={`coverage-${policy.id}`}
                    name="coverage"
                    value={editedPolicy.coverage !== undefined && editedPolicy.coverage !== null ? editedPolicy.coverage : ''}

                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor={`due_date-${policy.id}`} className="block text-xs font-medium text-gray-500">Due Date</label>
                  <input
                    type="date"
                    id={`due_date-${policy.id}`}
                    name="due_date"
                    value={editedPolicy.due_date || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor={`status-${policy.id}`} className="block text-xs font-medium text-gray-500">Status</label>
                  <select
                    id={`status-${policy.id}`}
                    name="status"
                    value={editedPolicy.status || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label htmlFor={`clients-${policy.id}`} className="block text-xs font-medium text-gray-500">Clients</label>
                  <input
                    type="number"
                    id={`clients-${policy.id}`}
                    name="clients"
                    value={editedPolicy.clients || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                  />
                </div>
                <div className="flex justify-end space-x-2 md:col-span-2 mt-4">
                  <button
                    onClick={handleSaveClick}
                    className="btn-primary flex items-center text-sm px-4 py-2"
                  >
                    <Save className="w-4 h-4 mr-1" /> Save
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="btn-outline-secondary flex items-center text-sm px-4 py-2"
                  >
                    <XCircle className="w-4 h-4 mr-1" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View mode
              <>
                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-insurance-neutral-dark mb-1">
                    {policy.type}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {policy.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    <div>
                      <span className="font-semibold">Premium:</span> {policy.amount} / month
                    </div>
                    <div>
                      <span className="font-semibold">Coverage:</span> {policy.coverage}
                    </div>
                    <div>
                      <span className="font-semibold">Due Date:</span> {new Date(policy.due_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div>
                      <span className="font-semibold">Clients:</span> {policy.clients}
                    </div>
                    <div>
                      <span className="font-semibold">Status:</span>{" "}
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          policy.status === "Active" ? "bg-green-100 text-green-700" :
                          policy.status === "Inactive" ? "bg-red-100 text-red-700" :
                          "bg-yellow-100 text-yellow-700"
                      }`}>
                        {policy.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                  <button
                    onClick={() => handleEditClick(policy)}
                    className="p-2 rounded-full text-insurance-neutral-dark hover:bg-gray-200"
                    title="Edit Policy"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(policy.id)}
                    className="p-2 rounded-full text-red-600 hover:bg-red-100"
                    title="Delete Policy"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default EditablePolicyCard;