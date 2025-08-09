import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return <div className={`rounded-lg border bg-card ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = '' }: CardProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = '' }: CardProps) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }: CardProps) {
  return <h3 className={`text-2xl font-semibold ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = '' }: CardProps) {
  return <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>;
}