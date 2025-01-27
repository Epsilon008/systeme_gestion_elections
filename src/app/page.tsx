'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CandidatesSection, {Footer} from '@/components/CandidatesSection';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Image 
                  src="/images/logo.png" 
                  alt="Logo" 
                  width={40} 
                  height={40}
                />
                <span className="ml-2 text-xl font-bold text-gray-800">
                  Élections Cameroun
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <Link 
                href="/admin/login"
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Portail Administratif
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Bienvenue sur le portail</span>
                  <span className="block text-green-600">des élections au Cameroun</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Suivez en temps réel les résultats des élections, consultez les statistiques
                  et restez informé du processus électoral.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/public/dashboard"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
                    >
                      Continuer la visite
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

       

      {/* Informations Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">
              Processus Électoral
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Comment voter au Cameroun
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {/* Carte d'information */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900">Conditions de vote</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Découvrez les conditions requises pour participer aux élections.
                  </p>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900">Conditions de vote</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Découvrez les conditions requises pour participer aux élections.
                  </p>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900">Conditions de vote</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Découvrez les conditions requises pour participer aux élections.
                  </p>
                </div>
              </div>
              {/* Répéter pour d'autres cartes */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
