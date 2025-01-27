'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HomeIcon, UserGroupIcon, DocumentTextIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { SearchIcon, PlusIcon, ChevronDownIcon, UserIcon, KeyIcon, IdCardIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Fonction pour générer un ID unique basé sur le nom et prénom
function generateEnrollerId(firstName, lastName) {
  const prefix = 'SCR';
  const namePart = `${lastName.substring(0, 3)}${firstName.substring(0, 2)}`.toUpperCase();
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${namePart}${randomNum}`;
}

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    { name: 'Bureaux de vote', href: '/admin/voting-offices', icon: DocumentTextIcon },
    { name: 'Candidats', href: '/admin/candidates', icon: UserGroupIcon },
    { name: 'Enrolleurs', href: '/admin/enrollers', icon: UserGroupIcon },
    { name: 'Scrutateurs', href: '/admin/scrutineers', icon: UserGroupIcon },
    { name: 'Historique', href: '/admin/history', icon: ClockIcon },
  ];
  

// Fonction pour générer un mot de passe sécurisé
function generateSecurePassword() {
  const length = 12;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export default function EnrollerManagement() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    enrollerId: '',
    password: '',
  });

  const [enrollers, setEnrollers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);
  const [newEnrollerCredentials, setNewEnrollerCredentials] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Générer l'ID et le mot de passe
    const enrollerId = generateEnrollerId(formData.firstName, formData.lastName);
    const password = generateSecurePassword();
    
    const newEnroller = {
      ...formData,
      id: Date.now(),
      enrollerId,
      password,
      createdAt: new Date().toISOString(),
    };

    setEnrollers([...enrollers, newEnroller]);
    setNewEnrollerCredentials(newEnroller);
    setShowCredentials(true);
    
    // Réinitialiser le formulaire
    setFormData({
      firstName: '',
      lastName: '',
      birthDate: '',
      birthPlace: '',
      enrollerId: '',
      password: '',
    });
  };

  const filteredEnrollers = enrollers.filter(enroller => 
    Object.values(enroller).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gestion des Scructateurs
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-colors"
            onClick={() => setShowForm(!showForm)}
          >
            <PlusIcon size={20} />
            <span>Nouveau Scructateur</span>
          </motion.button>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un scructateur..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
              <h2 className="text-xl font-semibold mb-6">Ajouter un nouveau scructateur</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                  <input
                    type="date"
                    required
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lieu de naissance</label>
                  <input
                    type="text"
                    required
                    value={formData.birthPlace}
                    onChange={(e) => setFormData({...formData, birthPlace: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

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

        {/* Credentials Modal */}
        <AnimatePresence>
          {showCredentials && newEnrollerCredentials && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-xl p-6 max-w-md w-full"
              >
                <h3 className="text-xl font-semibold mb-4">Identifiants du scructateur</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Identifiant</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={newEnrollerCredentials.enrollerId}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={newEnrollerCredentials.password}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      setShowCredentials(false);
                      setShowForm(false);
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Fermer
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enrollers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEnrollers.map((enroller) => (
            <motion.div
              key={enroller.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <UserIcon size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {enroller.firstName} {enroller.lastName}
                    </h3>
                    <span className="text-sm text-gray-500">
                      ID: {enroller.enrollerId}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Né(e) le:</span>{' '}
                    {new Date(enroller.birthDate).toLocaleDateString('fr-FR')}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Lieu:</span> {enroller.birthPlace}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Créé le:</span>{' '}
                    {new Date(enroller.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEnrollers.length === 0 && (
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500"
            >
              <UserIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun scructateur trouvé</h3>
              <p className="text-gray-500">
                Ajoutez un nouvel scructateur pour commencer
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}