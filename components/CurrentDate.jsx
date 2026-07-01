'use client';

import { useState, useEffect } from 'react';

export default function CurrentDate() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const options = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };
    
    const formattedDate = new Date().toLocaleDateString('es-DO', options);
    setCurrentDate(formattedDate);
  }, []);

  return (
    <time className="text-sm text-gray-400">
      Hoy: {currentDate || '...'}
    </time>
  );
}