import NavigationBar from '../NavigationBar';
import { useState } from 'react';

export default function NavigationBarExample() {
  const [currentPage, setCurrentPage] = useState('home');
  
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Current Page: {currentPage}</h1>
        <p className="text-muted-foreground">Click navigation items to see the page change.</p>
      </div>
    </div>
  );
}