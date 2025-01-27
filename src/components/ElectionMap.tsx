import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ElectionMap: React.FC<{
  level: 'country' | 'region' | 'department' | 'district';
  selectedRegion?: string;
  onRegionSelect: (region: string) => void;
}> = ({ level, selectedRegion, onRegionSelect }) => {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    const fetchGeoData = async () => {
      const response = await fetch(`/api/geo?level=${level}&region=${selectedRegion || ''}`);
      const data = await response.json();
      setGeoData(data);
    };
    fetchGeoData();
  }, [level, selectedRegion]);

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        onRegionSelect(feature.properties.code);
      }
    });

    if (feature.properties.results) {
      layer.bindPopup(() => {
        return createPopupContent(feature.properties);
      });
    }
  };

  return (
    <MapContainer
      center={[7.369722, 12.354722]}
      zoom={6}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {geoData && (
        <GeoJSON
          data={geoData}
          onEachFeature={onEachFeature}
          style={(feature) => ({
            fillColor: getFillColor(feature),
            weight: 2,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
          })}
        />
      )}
    </MapContainer>
  );
};

export default ElectionMap;