'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Facebook, Instagram, Twitter } from 'lucide-react';

const CandidateCard = ({ candidate }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer transform transition-transform hover:scale-105">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden">
                <img 
                  src="/images/Candidat1.jpg"
                  alt={candidate.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{candidate.name}</h3>
              <p className="text-sm text-gray-600 text-center">{candidate.party}</p>
              <p className="text-sm text-gray-500 mt-2 text-center line-clamp-2">
                {candidate.shortBio}
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{candidate.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="flex items-center space-x-4">
            <img 
              src="/images/" 
              alt={candidate.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div>
              <p className="text-lg font-semibold">{candidate.party}</p>
              <p className="text-gray-600">Âge: {candidate.age} ans</p>
              <p className="text-gray-600">Fonction actuelle: {candidate.currentRole}</p>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">Parcours professionnel</h4>
            <p className="text-gray-700">{candidate.professionalBackground}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">Principales promesses</h4>
            <ul className="list-disc pl-5 space-y-1">
              {candidate.promises.map((promise, index) => (
                <li key={index} className="text-gray-700">{promise}</li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Données des candidats
const candidates = [
  {
    name: "Candidat 1",
    party: "Parti 1",
    age: 58,
    currentRole: "Ministre de l'Économie",
    shortBio: "Expert en économie avec 25 ans d'expérience dans la fonction publique.",
    professionalBackground: "Ancien directeur de la Banque Centrale, Consultant international en développement économique, Professeur d'économie à l'Université de Yaoundé",
    promises: [
      "Création de 500 000 emplois en 5 ans",
      "Modernisation du système éducatif",
      "Développement des infrastructures rurales",
    ],
    image:"/images/Candidat1.jpg",
  },
  {
    name: "Candidat 2",
    party: "Parti 2",
    age: 37,
    currentRole: "Ministre de la défense",
    shortBio: "Expert en économie avec 25 ans d'expérience dans la fonction publique.",
    professionalBackground: "Ancien directeur de la Banque Centrale, Consultant international en développement économique, Professeur d'économie à l'Université de Yaoundé",
    promises: [
      "Création de 500 000 emplois en 5 ans",
      "Modernisation du système éducatif",
      "Développement des infrastructures rurales",
    ],
    image:"/images/Candidat2.jpg",
  },
  {
    name: "Candidat 3",
    party: "Parti Démocratique du Cameroun",
    age: 58,
    currentRole: "Ministre des finances",
    shortBio: "Expert en économie avec 25 ans d'expérience dans la fonction publique.",
    professionalBackground: "Ancien directeur de la Banque Centrale, Consultant international en développement économique, Professeur d'économie à l'Université de Yaoundé",
    promises: [
      "Création de 500 000 emplois en 5 ans",
      "Modernisation du système éducatif",
      "Développement des infrastructures rurales",
    ]
  },
  
];

export const Footer = () => {
  return (
    <footer className="bg-white shadow-lg mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-4">
            <a href="#" className="text-gray-600 hover:text-green-600">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600">
              <Twitter size={24} />
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 Élections Cameroun. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

const CandidatesSection = () => {
  return (
    <>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Candidats à l'élection présidentielle
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Découvrez les candidats et leurs projets pour le Cameroun
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {candidates.map((candidate, index) => (
              <CandidateCard key={index} candidate={candidate} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidatesSection;