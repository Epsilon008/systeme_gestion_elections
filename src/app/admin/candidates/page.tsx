'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HomeIcon, UserGroupIcon, DocumentTextIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { SearchIcon, PlusIcon, ChevronDownIcon, UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    { name: 'Bureaux de vote', href: '/admin/voting-offices', icon: DocumentTextIcon },
    { name: 'Candidats', href: '/admin/candidates', icon: UserGroupIcon },
    { name: 'Enrolleurs', href: '/admin/enrollers', icon: UserGroupIcon },
    { name: 'Scrutateurs', href: '/admin/scrutineers', icon: UserGroupIcon },
    { name: 'Historique', href: '/admin/history', icon: ClockIcon },
  ];


export default function CandidateManagement() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    politicalParty: '',
    partyAcronym: '',
    partyCreationDate: '',
    partyDescription: '',
    photoUrl: '',
  });

  const [candidates, setCandidates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParty, setSelectedParty] = useState('Tous les partis');
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, photoUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCandidates([...candidates, { ...formData, id: Date.now() }]);
    setFormData({
      firstName: '',
      lastName: '',
      birthDate: '',
      birthPlace: '',
      politicalParty: '',
      partyAcronym: '',
      partyCreationDate: '',
      partyDescription: '',
      photoUrl: '',
    });
    setPreviewImage(null);
    setShowForm(false);
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = Object.values(candidate).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesParty = selectedParty === 'Tous les partis' || candidate.politicalParty === selectedParty;
    return matchesSearch && matchesParty;
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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gestion des Candidats
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-colors"
            onClick={() => setShowForm(!showForm)}
          >
            <PlusIcon size={20} />
            <span>Nouveau Candidat</span>
          </motion.button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un candidat..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedParty}
                onChange={(e) => setSelectedParty(e.target.value)}
              >
                <option value="Tous les partis">Tous les partis</option>
                {[...new Set(candidates.map(c => c.politicalParty))].map(party => (
                  <option key={party} value={party}>{party}</option>
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
              <h2 className="text-xl font-semibold mb-6">Ajouter un nouveau candidat</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Photo Upload Section */}
                <div className="col-span-full flex justify-center mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-32 h-32 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                          <UserIcon size={48} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <label className="mt-4 cursor-pointer inline-block">
                      <span className="text-blue-600 hover:text-blue-700">Choisir une photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Personal Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lieu de naissance</label>
                  <input
                    type="text"
                    value={formData.birthPlace}
                    onChange={(e) => setFormData({...formData, birthPlace: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Political Party Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parti politique</label>
                  <input
                    type="text"
                    value={formData.politicalParty}
                    onChange={(e) => setFormData({...formData, politicalParty: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Acronyme du parti</label>
                  <input
                    type="text"
                    value={formData.partyAcronym}
                    onChange={(e) => setFormData({...formData, partyAcronym: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de création du parti</label>
                  <input
                    type="date"
                    value={formData.partyCreationDate}
                    onChange={(e) => setFormData({...formData, partyCreationDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description du parti</label>
                  <textarea
                    value={formData.partyDescription}
                    onChange={(e) => setFormData({...formData, partyDescription: e.target.value})}
                    rows="4"
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

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  {candidate.photoUrl ? (
                    <img
                      src={candidate.photoUrl}
                      alt={`${candidate.firstName} ${candidate.lastName}`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserIcon size={32} className="text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {candidate.firstName} {candidate.lastName}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {candidate.politicalParty} ({candidate.partyAcronym})
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Né(e) le:</span> {new Date(candidate.birthDate).toLocaleDateString()} à {candidate.birthPlace}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Parti créé le:</span> {new Date(candidate.partyCreationDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {candidate.partyDescription}
                  </p>
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
        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500"
            >
              <UserIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun candidat trouvé</h3>
              <p className="text-gray-500">
                Modifiez vos critères de recherche ou ajoutez un nouveau candidat.
              </p>
            </motion.div>
          </div>
        )}

        {/* Confirmation Modal - Pour les futures fonctionnalités de suppression */}
        <AnimatePresence>
          {/* Le modal de confirmation pourra être ajouté ici */}
        </AnimatePresence>

        {/* Success Toast Notification - Pour les actions réussies */}
        <AnimatePresence>
          {/* Les notifications de succès pourront être ajoutées ici */}
        </AnimatePresence>
      </div>
    </div>
    </div>
  );
}

// Composant utilitaire pour afficher les dates formatées
function FormattedDate({ date }) {
  if (!date) return null;
  return (
    <time dateTime={date}>
      {new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
    </time>
  );
}

// Fonction utilitaire pour valider les données du formulaire
function validateFormData(data) {
  const errors = {};
  
  if (!data.firstName?.trim()) {
    errors.firstName = 'Le prénom est requis';
  }
  
  if (!data.lastName?.trim()) {
    errors.lastName = 'Le nom est requis';
  }
  
  if (!data.birthDate) {
    errors.birthDate = 'La date de naissance est requise';
  } else if (new Date(data.birthDate) > new Date()) {
    errors.birthDate = 'La date de naissance ne peut pas être dans le futur';
  }
  
  if (!data.birthPlace?.trim()) {
    errors.birthPlace = 'Le lieu de naissance est requis';
  }
  
  if (!data.politicalParty?.trim()) {
    errors.politicalParty = 'Le parti politique est requis';
  }
  
  if (!data.partyAcronym?.trim()) {
    errors.partyAcronym = "L'acronyme du parti est requis";
  }
  
  if (!data.partyCreationDate) {
    errors.partyCreationDate = 'La date de création du parti est requise';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Fonction utilitaire pour formater les données avant la soumission
function formatFormData(data) {
  return {
    ...data,
    firstName: data.firstName?.trim(),
    lastName: data.lastName?.trim(),
    birthPlace: data.birthPlace?.trim(),
    politicalParty: data.politicalParty?.trim(),
    partyAcronym: data.partyAcronym?.trim().toUpperCase(),
    partyDescription: data.partyDescription?.trim()
  };
}

export  function CandidateManagementWithUtils() {
  // Wrapper component pour inclure toutes les fonctionnalités utilitaires
  return (
    <ErrorBoundary fallback={<div>Une erreur est survenue. Veuillez réessayer.</div>}>
      <CandidateManagement />
    </ErrorBoundary>
  );
}

// Composant ErrorBoundary pour gérer les erreurs
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Ici, vous pourriez envoyer l'erreur à un service de monitoring
    console.error('Error in candidate management:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}