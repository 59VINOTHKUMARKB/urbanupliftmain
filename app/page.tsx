"use client"
import React, { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import IssueGrid from './components/IssueGrid'

export default function UrbanUplift() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} />
        <main className="flex-1 p-4 overflow-y-auto">
          <IssueGrid />
        </main>
      </div>
    </div>
  )
}