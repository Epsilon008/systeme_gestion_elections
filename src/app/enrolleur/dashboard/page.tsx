'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EnrollerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">
            Tableau de bord Enrolleur
          </h1>
          
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Bouton Ajouter Électeur */}
            <Link
              href="/enrolleur/add-voter"
              className="relative block w-full p-12 text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <div className="flex flex-col items-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="mt-2 block text-lg font-medium text-gray-900">
                  Ajouter un électeur
                </span>
              </div>
            </Link>

            {/* Bouton Consulter Liste */}
            <Link
              href="/enrolleur/voter-list"
              className="relative block w-full p-12 text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <div className="flex flex-col items-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <span className="mt-2 block text-lg font-medium text-gray-900">
                  Consulter la liste des électeurs
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}