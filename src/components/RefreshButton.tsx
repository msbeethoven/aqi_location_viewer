import React from 'react';
import '../styles/RefreshButton.css';

type RefreshButtonProps = {
  onClick: () => void;
};

function RefreshButton({ onClick }: RefreshButtonProps) {
  return (
    <button className="refresh-button" onClick={onClick}>
      Refresh Data
    </button>
  );
}

export default RefreshButton;
