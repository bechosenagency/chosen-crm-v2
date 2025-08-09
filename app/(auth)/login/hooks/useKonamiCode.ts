import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function useKonamiCode(callback: () => void) {
  const [inputHistory, setInputHistory] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      setInputHistory(prev => {
        const newHistory = [...prev, key].slice(-KONAMI_CODE.length);
        
        // Check if the sequence matches
        const matches = newHistory.join(',') === KONAMI_CODE.map(k => k.toLowerCase()).join(',');
        
        if (matches) {
          callback();
          return [];
        }
        
        return newHistory;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback]);

  return inputHistory;
}