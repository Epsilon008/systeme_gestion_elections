'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HomeIcon, UserGroupIcon, DocumentTextIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { MapPinIcon, SearchIcon, PlusIcon, ChevronDownIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    { name: 'Bureaux de vote', href: '/admin/voting-offices', icon: DocumentTextIcon },
    { name: 'Candidats', href: '/admin/candidates', icon: UserGroupIcon },
    { name: 'Enrolleurs', href: '/admin/enrollers', icon: UserGroupIcon },
    { name: 'Scrutateurs', href: '/admin/scrutineers', icon: UserGroupIcon },
    { name: 'Historique', href: '/admin/history', icon: ClockIcon },
  ];

export default function VotingOfficeManagement() {
  const [formData, setFormData] = useState({
    country: '',
    region: '',
    department: '',
    district: '',
    votingCenter: '',
    officeName: '',
    latitude: '',
    longitude: ''
  });

  const [votingOffices, setVotingOffices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Toutes les régions');

  const regions = ['Toutes les régions', 'Nord', 'Sud', 'Est', 'Ouest', 'Centre'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setVotingOffices([...votingOffices, { ...formData, id: Date.now() }]);
    setFormData({
      country: '',
      region: '',
      department: '',
      district: '',
      votingCenter: '',
      officeName: '',
      latitude: '',
      longitude: ''
    });
    setShowForm(false);
  };

  const filteredOffices = votingOffices.filter(office => {
    const matchesSearch = Object.values(office).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesRegion = selectedRegion === 'Toutes les régions' || office.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div>
    {/* Sidebar */}
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-white text-xl font-bold">Admin Portal</span>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <item.icon className="mr-3 h-6 w-6" aria-hidden="true" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>

    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gestion des Bureaux de Vote
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-colors"
            onClick={() => setShowForm(!showForm)}
          >
            <PlusIcon size={20} />
            <span>Nouveau Bureau</span>
          </motion.button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un bureau de vote..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-md p-6 mb-8"
            >
              <h2 className="text-xl font-semibold mb-6">Ajouter un nouveau bureau de vote</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Form fields */}
                {[
                  { name: 'country', label: 'Pays' },
                  { name: 'region', label: 'Région' },
                  { name: 'department', label: 'Département' },
                  { name: 'district', label: 'Arrondissement' },
                  { name: 'votingCenter', label: 'Centre de vote' },
                  { name: 'officeName', label: 'Nom du bureau' },
                  { name: 'latitude', label: 'Latitude' },
                  { name: 'longitude', label: 'Longitude' }
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={formData[field.name]}
                      onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
                
                <div className="col-span-full flex justify-end gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Enregistrer
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Voting Offices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffices.map((office) => (
            <motion.div
              key={office.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{office.officeName}</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {office.region}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Centre:</span> {office.votingCenter}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Localisation:</span> {office.department}, {office.district}
                  </p>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{office.latitude}, {office.longitude}</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Voir les détails
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOffices.length === 0 && (
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500"
            >
              <MapPinIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun bureau de vote trouvé</h3>
              <p className="text-gray-500">
                Modifiez vos critères de recherche ou ajoutez un nouveau bureau de vote.
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}