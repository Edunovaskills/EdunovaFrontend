import React from 'react';
import { Loader2 } from 'lucide-react';
import { LoadingContainer, SpinnerIcon, LoadingMessage } from './LoadingSpinner.styles';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading...", 
  size = 'md',
  className = ""
}) => {
  return (
    <LoadingContainer className={className}>
      <SpinnerIcon $size={size}>
        <Loader2 />
      </SpinnerIcon>
      <LoadingMessage>{message}</LoadingMessage>
    </LoadingContainer>
  );
};