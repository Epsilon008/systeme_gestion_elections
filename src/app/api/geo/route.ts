import { NextResponse } from 'next/server';
import regions from "../assets/gadm41_CMR_1.json";

const GEOJSON_URLS = {
  countries: 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson',
  cameroon: 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson',
  regions: '/home/marco/Documents/leaflet/src/assets/gadm41_CMR_1.json'
};



const VOTER_DATA = {
  countries: {
    CMR: { voterCount: 7500000 },
    FRA: { voterCount: 48000000 },
    CHN: { voterCount: 1400000000 },
    USA: { voterCount: 240000000 },
    DEU: { voterCount: 60000000 },
    NGA: { voterCount: 85000000 },
    BEL: { voterCount: 8500000 },
    TCD: { voterCount: 7000000 },
    RUS: { voterCount: 110000000 },
    BRA: { voterCount: 150000000 },
    SEN: { voterCount: 7000000 },
  },
  regions: {
    centre: { voterCount: 1200000 },
    littoral: { voterCount: 1500000 },
    ouest: { voterCount: 1000000 },
    nordouest: { voterCount: 800000 },
    sudouest: { voterCount: 700000 },
    sud: { voterCount: 500000 },
    est: { voterCount: 400000 },
    adamaoua: { voterCount: 300000 },
    nord: { voterCount: 600000 },
    extremenord: { voterCount: 900000 },
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Mapping des niveaux pour gérer des noms alternatifs
  const LEVELS_MAPPING: { [key: string]: string } = {
    country: 'countries',
    region: 'regions',
    cameroon: 'cameroon',
  };

  const levelParam = searchParams.get('level') || 'countries';
  const level = LEVELS_MAPPING[levelParam] || levelParam; // Convertir avec le mapping

  try {
    // Vérifiez si le niveau est valide
    if (!GEOJSON_URLS[level as keyof typeof GEOJSON_URLS]) {
      return NextResponse.json({ error: `Invalid level: ${levelParam}` }, { status: 400 });
    }

    // Récupérer l'URL associée
    const url = GEOJSON_URLS[level as keyof typeof GEOJSON_URLS];
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch GeoJSON from ${url}. Status: ${response.status}`);
    }

    let geoJson = await response.json();

    // Filtrer les pays pour le niveau "countries"
    if (level === 'countries') {
      geoJson.features = geoJson.features.filter((f: any) =>
        ['CMR', 'FRA', 'DEU', 'CAN', 'USA', 'CHN', 'BEL', 'GBR', 'RUS'].includes(f.properties.ISO_A3)
      );
    }
   /* if (level === 'regions') {
      geoJson.features = geoJson.features.filter((f: any) =>
        ['centre', 'adamaoua', 'est', 'ouest', 'littoral'].includes(f.properties.ISO_A3)
      );
    } */

    if (level === 'regions') {
      geoJson.features = geoJson.features.filter((f) =>
        ['centre', 'adamaoua', 'est', 'ouest', 'litoral'].includes(f.properties.name.toLowerCase())
      );
    }
    

    // Ajouter les données de vote
    geoJson.features = geoJson.features.map((feature: any) => {
      const voterData = VOTER_DATA[level as keyof typeof VOTER_DATA][feature.properties.ISO_A3 || feature.properties.id] || {};

      return {
        ...feature,
        properties: {
          ...feature.properties,
          voterCount: voterData.voterCount || 0, // Valeur par défaut si non trouvé
          results: {
            Candidat1: Math.floor(Math.random() * 100),
            Candidat2: Math.floor(Math.random() * 100),
            Candidat3: Math.floor(Math.random() * 100),
          },
        },
      };
    });

    return NextResponse.json(geoJson);
  } catch (error) {
    console.error('Error in /api/geo:', error);
    return NextResponse.json({ error: 'Failed to fetch GeoJSON data', details: error.message }, { status: 500 });
  }
}

