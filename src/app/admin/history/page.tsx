'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HomeIcon, UserGroupIcon, DocumentTextIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { SearchIcon, CalendarIcon, FilterIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    { name: 'Bureaux de vote', href: '/admin/voting-offices', icon: DocumentTextIcon },
    { name: 'Candidats', href: '/admin/candidates', icon: UserGroupIcon },
    { name: 'Enrolleurs', href: '/admin/enrollers', icon: UserGroupIcon },
    { name: 'Scrutateurs', href: '/admin/scrutineers', icon: UserGroupIcon },
    { name: 'Historique', href: '/admin/history', icon: ClockIcon },
];

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Exemple de données d'historique
  const [historyData] = useState([
    {
      id: 1,
      type: 'inscription',
      description: "Inscription d'un nouvel électeur",
      user: 'ENR001',
      timestamp: '2024-01-19T10:30:00',
      details: 'Jean Dupont - Centre A'
    },
    {
      id: 2,
      type: 'enrolleur',
      description: "Création d'un nouvel enrolleur",
      user: 'ADMIN',
      timestamp: '2024-01-19T09:15:00',
      details: 'Marie Martin'
    },
    {
      id: 3,
      type: 'bureau',
      description: 'Ajout d\'un nouveau bureau de vote',
      user: 'ADMIN',
      timestamp: '2024-01-18T16:45:00',
      details: 'Bureau 12 - Zone Nord'
    }
  ]);

  const getTypeColor = (type) => {
    const colors = {
      inscription: 'bg-green-100 text-green-800',
      enrolleur: 'bg-blue-100 text-blue-800',
      bureau: 'bg-purple-100 text-purple-800',
      default: 'bg-gray-100 text-gray-800'
    };
    return colors[type] || colors.default;
  };

  const filteredHistory = historyData.filter(item => {
    const matchesSearch = 
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = !selectedDate || item.timestamp.startsWith(selectedDate);
    const matchesType = selectedType === 'all' || item.type === selectedType;

    return matchesSearch && matchesDate && matchesType;
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Historique des Activités
          </h1>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher dans l'historique..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Date Filter */}
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">Tous les types</option>
                <option value="inscription">Inscriptions</option>
                <option value="enrolleur">Enrolleurs</option>
                <option value="bureau">Bureaux de vote</option>
              </select>
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {filteredHistory.map((item) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          par {item.user}
                        </span>
                      </div>
                      <p className="text-gray-900 font-medium">{item.description}</p>
                      <p className="text-sm text-gray-600 mt-1">{item.details}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(item.timestamp).toLocaleString('fr-FR', {
                        dateStyle: 'long',
                        timeStyle: 'short'
                      })}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Empty State */}
          {filteredHistory.length === 0 && (
            <div className="p-12 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-500"
              >
                <p className="text-lg font-medium text-gray-900 mb-2">Aucune activité trouvée</p>
                <p className="text-gray-500">
                  Modifiez vos filtres pour voir plus de résultats
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}