import React from 'react';
import '../styles/LocationButton.css';


type LocationButtonProps = {
  location: string;
  onClick: () => void;
  isActive: boolean;
};

function LocationButton({ location, onClick, isActive }: LocationButtonProps) {
  return (
    <button 
      className="location-button"
      onClick={onClick} 
      style={{ fontWeight: isActive ? 'bold' : 'normal' }}
    >
      {location}
    </button>
  );
}

export default LocationButton;
