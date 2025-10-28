import React from 'react';
import { cn } from '@/lib/utils';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className,
  onClick,
  delay = 0,
}) => {
  return (
    <div
      className={cn(
        'card-interactive animate-fade-up',
        onClick && 'cursor-pointer',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default InteractiveCard;