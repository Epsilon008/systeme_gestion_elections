'use client';

import React, { useState, useEffect } from 'react';
import { Menu } from '@headlessui/react';
import { Eye, Save, Printer, UserPlus } from 'lucide-react';

const AddVoter = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '', 
    birthDate: '',
    birthPlace: '',
    cniNumber: '',
    phoneNumber: '',
    votingCenter: '',
    votingOffice: ''
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(false);
  const [votingCenters] = useState([
    { id: 1, name: 'Centre A' },
    { id: 2, name: 'Centre B' }
  ]);
  const [votingOffices] = useState([
    { id: 1, centerId: 1, name: 'Bureau 1' },
    { id: 2, centerId: 1, name: 'Bureau 2' },
    { id: 3, centerId: 2, name: 'Bureau 3' }
  ]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulating API call
    console.log({
      ...formData,
      photo,
      registeredBy: 'current-user-id', // Add current user ID
      registeredAt: new Date().toISOString()
    });
  };

  const filteredOffices = votingOffices.filter(
    office => office.centerId === parseInt(formData.votingCenter)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Ajouter un nouvel électeur
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                {/* Photo upload */}
                <div className="sm:col-span-2">
                  <div className="flex items-center space-x-6">
                    <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100">
                      {photo ? (
                        <img 
                          src={photo}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <UserPlus className="h-12 w-12 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <label className="block">
                      <span className="sr-only">Choisir une photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-green-50 file:text-green-700
                          hover:file:bg-green-100"
                      />
                    </label>
                  </div>
                </div>

                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                {/* Prénom */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                {/* Date de naissance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date de naissance
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                {/* Lieu de naissance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Lieu de naissance
                  </label>
                  <input
                    type="text"
                    value={formData.birthPlace}
                    onChange={(e) => setFormData({...formData, birthPlace: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                {/* Numéro CNI */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Numéro CNI
                  </label>
                  <input
                    type="text"
                    value={formData.cniNumber}
                    onChange={(e) => setFormData({...formData, cniNumber: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                {/* Numéro de téléphone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                {/* Centre de vote */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Centre de vote
                  </label>
                  <select
                    value={formData.votingCenter}
                    onChange={(e) => setFormData({...formData, votingCenter: e.target.value, votingOffice: ''})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="">Sélectionner un centre</option>
                    {votingCenters.map(center => (
                      <option key={center.id} value={center.id}>
                        {center.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bureau de vote */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bureau de vote
                  </label>
                  <select
                    value={formData.votingOffice}
                    onChange={(e) => setFormData({...formData, votingOffice: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    disabled={!formData.votingCenter}
                  >
                    <option value="">Sélectionner un bureau</option>
                    {filteredOffices.map(office => (
                      <option key={office.id} value={office.id}>
                        {office.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setPreview(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Aperçu
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Modal de prévisualisation */}
        {preview && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <h3 className="text-lg font-medium mb-4">Aperçu de la carte d'électeur</h3>
              
              <div className="border rounded p-4 space-y-4">
                <div className="flex space-x-4">
                  {photo && (
                    <img src={photo} alt="Photo" className="h-32 w-32 rounded-full object-cover" />
                  )}
                  <div>
                    <p><strong>Nom:</strong> {formData.lastName}</p>
                    <p><strong>Prénom:</strong> {formData.firstName}</p>
                    <p><strong>Date de naissance:</strong> {formData.birthDate}</p>
                    <p><strong>Lieu de naissance:</strong> {formData.birthPlace}</p>
                    <p><strong>CNI:</strong> {formData.cniNumber}</p>
                    <p><strong>Téléphone:</strong> {formData.phoneNumber}</p>
                    <p><strong>Centre de vote:</strong> {votingCenters.find(c => c.id === parseInt(formData.votingCenter))?.name}</p>
                    <p><strong>Bureau de vote:</strong> {votingOffices.find(o => o.id === parseInt(formData.votingOffice))?.name}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => setPreview(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Fermer
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddVoter;