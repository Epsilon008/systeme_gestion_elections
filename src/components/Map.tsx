'use client';
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet';
import { LatLngBounds, Layer, Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  mode: 'voters' | 'results';
}

interface GeoFeature {
  properties: {
    name: string;
    id: string;
    voterCount: number;
    results: {
      [key: string]: number;
    };
    ISO_A3?: string;
  };
  geometry: any;
}

export default function Map({ mode }: MapProps) {
  const [geoData, setGeoData] = useState<any>(null);
  const [currentLevel, setCurrentLevel] = useState<string>('countries');
  const [parentId, setParentId] = useState<string | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<Array<{level: string, parentId: string | null}>>([]);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    const fetchGeoData = async () => {
      const queryParams = new URLSearchParams({
        level: currentLevel,
      });

      if (parentId) {
        queryParams.append('parentId', parentId);
      }

      try {
        const response = await fetch(`/api/geo?${queryParams}`);
        const data = await response.json();
        setGeoData(data);
      } catch (error) {
        console.error('Failed to fetch GeoJSON:', error);
      }
    };

    fetchGeoData();
  }, [currentLevel, parentId]);

  const getWinningCandidate = (results: { [key: string]: number }) => {
    return Object.entries(results).reduce((a, b) => 
      results[a[0]] > results[b[0]] ? a : b
    )[0];
  };

  const getColor = (feature: GeoFeature) => {
    if (mode === 'voters') {
      const count = feature.properties.voterCount;
      return count > 1000000 ? '#800026' :
             count > 500000 ? '#BD0026' :
             count > 200000 ? '#E31A1C' :
             count > 100000 ? '#FC4E2A' :
             count > 50000 ? '#FD8D3C' :
             '#FFEDA0';
    } else {
      const winner = getWinningCandidate(feature.properties.results);
      return winner === 'Candidat1' ? '#ff0000' :
             winner === 'Candidat2' ? '#0000ff' :
             '#00ff00';
    }
  };

  const style = (feature: GeoFeature) => {
    return {
      fillColor: getColor(feature),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };

  const navigateToLevel = (newLevel: string, newParentId: string | null) => {
    setNavigationHistory(prev => [...prev, { level: currentLevel, parentId }]);
    setCurrentLevel(newLevel);
    setParentId(newParentId);
  };

  const navigateBack = () => {
    const previousState = navigationHistory[navigationHistory.length - 1];
    if (previousState) {
      setCurrentLevel(previousState.level);
      setParentId(previousState.parentId);
      setNavigationHistory(prev => prev.slice(0, -1));
    }
  };

  const onEachFeature = (feature: GeoFeature, layer: Layer) => {
    layer.on({
      mouseover: (e) => {
        const target = e.target;
        target.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
        });

        const props = feature.properties;
        const popupContent = `
          <div class="p-4">
            <h3 class="font-bold text-lg">${props.name}</h3>
            <p class="text-gray-700">Électeurs: ${props.voterCount.toLocaleString()}</p>
            <div class="mt-4">
              ${Object.entries(props.results)
                .map(([candidate, votes]) => {
                  const percentage = Math.round(votes as number);
                  const color = `hsl(${Math.random() * 360}, 70%, 60%)`; // Couleurs dynamiques
                  return `
                    <div class="mb-2">
                      <p class="font-medium">${candidate}: ${percentage}%</p>
                      <div class="w-full bg-gray-200 rounded h-4">
                        <div 
                          class="h-4 rounded" 
                          style="width: ${percentage}%; background-color: ${color};">
                        </div>
                      </div>
                    </div>
                  `;
                })
                .join('')}
            </div>
          </div>
        `;

        
        target.bindPopup(popupContent).openPopup();
      },
      mouseout: (e) => {
        const target = e.target;
        target.setStyle(style(feature));
      },
      dblclick: (e) => {
        const nextLevel = 
          currentLevel === 'countries' ? 'regions' :
          currentLevel === 'regions' ? 'departments' :
          currentLevel === 'departments' ? 'arrondissements' :
          null;

        if (nextLevel) {
          navigateToLevel(nextLevel, feature.properties.id || feature.properties.ISO_A3);
          const target = e.target;
          const bounds = target.getBounds();
          mapRef.current?.flyToBounds(bounds as LatLngBounds);
        }
      }
    });
  };

  return (
    <div className="relative h-full">
      <div className="absolute top-2 right-2 z-[1000] bg-white p-2 rounded shadow">
        <button
          onClick={navigateBack}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={navigationHistory.length === 0}
        >
          Retour
        </button>
      </div>

      <MapContainer
        center={[7.3697, 12.3547]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        ref={mapRef}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData && (
          <GeoJSON
            data={geoData}
            style={style}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>

      <div className="absolute bottom-2 left-2 z-[1000] bg-white p-2 rounded shadow">
        <div className="text-sm font-medium">
          Niveau actuel: {currentLevel}
        </div>
      </div>
    </div>
  );
}