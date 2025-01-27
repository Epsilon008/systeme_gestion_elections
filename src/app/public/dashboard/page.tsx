'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import dynamique de la carte Leaflet pour éviter les erreurs SSR
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function PublicDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/* Icône */}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Bureaux de vote
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      26,893
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          {/* Répéter pour les autres stats */}
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Carte des résultats
          </h2>
          <div className="h-96">
            <Map mode="results"/>
          </div>
        </div>
      </div>

      {/* Results History */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Historique des résultats
          </h2>
          {/* Table des résultats */}
        </div>
      </div>

      {/* Message Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Laisser un message
          </h2>
          <form>
            <textarea
              rows={4}
              className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder="Votre message..."
            />
            <button
              type="submit"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}