import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LocationButton from '../components/LocationButton';

describe('LocationButton Component', () => {
  const mockOnClick = jest.fn();

  it('should render the location name', () => {
    render(<LocationButton location="Los Angeles" onClick={mockOnClick} isActive={false} />);
    
    expect(screen.getByText('Los Angeles')).toBeInTheDocument();
  });

  it('should call the onClick handler when clicked', () => {
    render(<LocationButton location="Los Angeles" onClick={mockOnClick} isActive={false} />);
    
    fireEvent.click(screen.getByText('Los Angeles'));
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should have bold text when isActive is true', () => {
    render(<LocationButton location="Los Angeles" onClick={mockOnClick} isActive={true} />);
    
    const button = screen.getByText('Los Angeles');
    
    expect(button).toHaveStyle('font-weight: bold');
  });

  it('should have normal text when isActive is false', () => {
    render(<LocationButton location="Los Angeles" onClick={mockOnClick} isActive={false} />);
    
    const button = screen.getByText('Los Angeles');
    
    expect(button).toHaveStyle('font-weight: normal');
  });
});
