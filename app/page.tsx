"use client";
import React, { useState } from 'react';
import HomePage from './components/HomePage';

export default function UrbanUplift() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 p-4 overflow-y-auto">
        <HomePage />
      </main>
    </div>
  );
}
