import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export function Badge({ 
  children, 
  className = '', 
  variant = 'default' 
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors';
  
  const variants = {
    default: 'border-transparent bg-primary text-primary-foreground',
    secondary: 'border-transparent bg-secondary text-secondary-foreground',
    destructive: 'border-transparent bg-destructive text-destructive-foreground',
    outline: 'text-foreground',
  };
  
  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}