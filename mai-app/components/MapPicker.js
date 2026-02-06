"use client";
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// (Mantenha a configuração do ícone igual ao anterior...)
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function LocationMarker({ position, setPosition, onLocationSelect }) {
  const map = useMapEvents({
    click(e) {
      const newPos = { lat: e.latlng.lat, lng: e.latlng.lng };
      setPosition(newPos);
      if (onLocationSelect) onLocationSelect(newPos);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return position === null ? null : <Marker position={position} icon={icon} />;
}

const MapPicker = ({ onLocationChange }) => {
  const [position, setPosition] = useState({ lat: -10.9252, lng: -37.1026 });

  return (
    // MUDANÇA 1: Usar h-full e w-full explicitamente no container
    <div className="h-full w-full relative z-0">
      <MapContainer 
        center={position} 
        zoom={15} 
        // MUDANÇA 2: Forçar 100% de altura via style inline
        style={{ height: '100%', width: '100%', minHeight: '100vh' }} 
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker 
          position={position} 
          setPosition={setPosition} 
          onLocationSelect={onLocationChange} 
        />
      </MapContainer>
    </div>
  );
};

export default MapPicker;