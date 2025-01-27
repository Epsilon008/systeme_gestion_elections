'use client';

import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';

const VotingResults = () => {
  const [votes, setVotes] = useState({
    candidate1: '',
    candidate2: '',
    candidate3: ''
  });
  const [selectedStation, setSelectedStation] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const votingStations = [
    "Bureau 1 - Centre Ville",
    "Bureau 2 - École Primaire",
    "Bureau 3 - Mairie",
    "Bureau 4 - Bibliothèque",
    "Bureau 5 - Gymnase"
  ];

  const handleVoteChange = (candidate, value) => {
    const newValue = value === '' ? '' : parseInt(value, 10);
    setVotes(prev => ({
      ...prev,
      [candidate]: newValue
    }));
    setError('');
  };

  const calculateTotal = () => {
    return Object.values(votes).reduce((acc, curr) => acc + (curr || 0), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = calculateTotal();

    if (total > 129) {
      setError('Le total des votes ne peut pas dépasser 129');
      return;
    }

    if (!selectedStation) {
      setError('Veuillez sélectionner un bureau de vote');
      return;
    }

    if (Object.values(votes).some(v => v === '')) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const newResult = {
      station: selectedStation,
      votes: { ...votes },
      timestamp: new Date().toLocaleString(),
      total
    };

    setResults(prev => [...prev, newResult]);
    setVotes({ candidate1: '', candidate2: '', candidate3: '' });
    setSelectedStation('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Résultats des Élections
        </h1>

        {/* Candidats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map(num => (
            <div key={num} className="bg-white rounded-lg shadow-lg p-4 text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-gray-600">C{num}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Candidat {num}</h3>
            </div>
          ))}
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Object.keys(votes).map((candidate, index) => (
              <div key={candidate} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Votes Candidat {index + 1}
                </label>
                <input
                  type="number"
                  min="0"
                  value={votes[candidate]}
                  onChange={(e) => handleVoteChange(candidate, e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bureau de Vote
            </label>
            <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sélectionner un bureau</option>
              {votingStations.map(station => (
                <option key={station} value={station}>{station}</option>
              ))}
            </select>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Publier les résultats
          </button>
        </form>

        {/* Résultats */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Résultats par Bureau</h2>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{result.station}</h3>
                  <span className="text-sm text-gray-500">{result.timestamp}</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(result.votes).map(([candidate, votes], idx) => (
                    <div key={candidate} className="bg-gray-50 p-3 rounded-md">
                      <div className="text-sm text-gray-600">Candidat {idx + 1}</div>
                      <div className="font-semibold">{votes} votes</div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-right text-sm text-gray-600">
                  Total: {result.total} votes
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingResults;