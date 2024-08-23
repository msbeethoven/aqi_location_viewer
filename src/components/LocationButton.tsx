import React from 'react';

type LocationButtonProps = {
  location: string;
  onClick: () => void;
  isActive: boolean;
};

function LocationButton({ location, onClick, isActive }: LocationButtonProps) {
  return (
    <button 
      onClick={onClick} 
      style={{ fontWeight: isActive ? 'bold' : 'normal' }}
    >
      {location}
    </button>
  );
}

export default LocationButton;
