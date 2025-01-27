'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';

// Import dynamique de la carte pour éviter les erreurs SSR
const Map = dynamic(() => import('@/components/LocationPicker'), { ssr: false });

interface VotingOfficeFormData {
  country: string;
  region: string;
  department: string;
  district: string;
  centerName: string;
  officeName: string;
  latitude: number;
  longitude: number;
}

const regions = [
  "Adamaoua",
  "Centre",
  "Est",
  "Extrême-Nord",
  "Littoral",
  "Nord",
  "Nord-Ouest",
  "Ouest",
  "Sud",
  "Sud-Ouest"
];

export default function AddVotingOffice() {
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<VotingOfficeFormData>({
    defaultValues: {
      country: 'Cameroun'
    }
  });

  const selectedRegion = watch('region');

  const onSubmit = async (data: VotingOfficeFormData) => {
    if (!selectedLocation) {
      toast.error('Veuillez sélectionner un emplacement sur la carte');
      return;
    }

    try {
      const response = await fetch('/api/voting-offices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création du bureau de vote');
      }

      toast.success('Bureau de vote créé avec succès');
    } catch (error) {
      toast.error('Une erreur est survenue');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-8">Ajouter un bureau de vote</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pays
            </label>
            <input
              type="text"
              disabled
              {...register('country')}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Région
            </label>
            <select
              {...register('region', { required: 'La région est requise' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="">Sélectionner une région</option>
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            {errors.region && (
              <p className="mt-1 text-sm text-red-600">{errors.region.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Département
            </label>
            <input
              type="text"
              {...register('department', { required: 'Le département est requis' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            {errors.department && (
              <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Arrondissement
            </label>
            <input
              type="text"
              {...register('district', { required: 'L\'arrondissement est requis' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            {errors.district && (
              <p className="mt-1 text-sm text-red-600">{errors.district.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom du centre de vote
            </label>
            <input
              type="text"
              {...register('centerName', { required: 'Le nom du centre est requis' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom du bureau de vote
            </label>
            <input
              type="text"
              {...register('officeName', { required: 'Le nom du bureau est requis' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Position géographique
          </label>
          <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-300">
            <Map onLocationSelect={setSelectedLocation} />
          </div>
          {!selectedLocation && (
            <p className="mt-1 text-sm text-red-600">Veuillez sélectionner un emplacement sur la carte</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Enregistrer le bureau de vote
        </button>
      </form>
    </div>
  );
}