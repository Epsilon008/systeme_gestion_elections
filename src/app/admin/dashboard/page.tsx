'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HomeIcon, UserGroupIcon, DocumentTextIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';
import {
  BarChart, Bar, PieChart, Pie, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer
} from 'recharts';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Bureaux de vote', href: '/admin/voting-offices', icon: DocumentTextIcon },
  { name: 'Candidats', href: '/admin/candidates', icon: UserGroupIcon },
  { name: 'Enrolleurs', href: '/admin/enrollers', icon: UserGroupIcon },
  { name: 'Scrutateurs', href: '/admin/scrutineers', icon: UserGroupIcon },
  { name: 'Historique', href: '/admin/history', icon: ClockIcon },
];

const regionData = [
  { name: 'Nord', participants: 4000, total: 6000 },
  { name: 'Sud', participants: 3500, total: 5000 },
  { name: 'Est', participants: 2800, total: 4000 },
  { name: 'Ouest', participants: 3200, total: 4500 },
  { name: 'Centre', participants: 4200, total: 5500 },
];

const ageDistributionData = [
  { name: '18-25', value: 2400 },
  { name: '26-35', value: 4567 },
  { name: '36-45', value: 1398 },
  { name: '46-55', value: 3908 },
  { name: '56+', value: 2000 },
];

const participationTrendData = [
  { hour: 8, participation: 35 },
  { hour: 10, participation: 45 },
  { hour: 12, participation: 58 },
  { hour: 14, participation: 72 },
  { hour: 16, participation: 88 },
  { hour: 18, participation: 95 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Statistiques */}
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <ChartBarIcon className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Total Électeurs
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            12,345
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphiques */}
              <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
                {/* Graphique en barres */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Participation par région
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={regionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="participants" fill="#8884d8" name="Participants" />
                          <Bar dataKey="total" fill="#82ca9d" name="Total" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Graphique en camembert */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Distribution par âge
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={ageDistributionData}
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label
                          >
                            {ageDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Nuage de points */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Tendance de participation
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="hour" name="Heure" />
                          <YAxis dataKey="participation" name="Participation (%)" />
                          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                          <Scatter name="Participation" data={participationTrendData} fill="#8884d8" />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Tableau des dernières activités */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Dernières activités
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Heure
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {participationTrendData.map((item, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.hour}:00
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Participation: {item.participation}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}