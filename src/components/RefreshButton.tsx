import React from 'react';

type RefreshButtonProps = {
  onClick: () => void;
};

function RefreshButton({ onClick }: RefreshButtonProps) {
  return (
    <button onClick={onClick}>
      Refresh Data
    </button>
  );
}

export default RefreshButton;
