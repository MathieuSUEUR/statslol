import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  noPadding?: boolean;
}

export function Card({ children, className = '', title, noPadding = false }: CardProps) {
  return (
    <div className={`bg-card border border-card-border rounded-xl shadow-sm overflow-hidden flex flex-col ${className}`}>
      {title && (
        <div className="px-5 py-4 border-b border-card-border bg-card/50">
          <h3 className="text-sm font-semibold text-white/90">
            {title}
          </h3>
        </div>
      )}
      <div className={`${noPadding ? '' : 'p-5'} flex-1`}>
        {children}
      </div>
    </div>
  );
}
