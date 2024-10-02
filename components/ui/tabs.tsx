"use client"

import React, { useState, ReactNode } from 'react'

interface TabProps {
  label: string
  children: ReactNode
  onClick?: () => void
}

interface TabsProps {
  children: ReactNode
}

export const Tab: React.FC<TabProps> = ({ children }) => {
    return <div className="tab-content">{children}</div>
  }
  
  export const Tabs: React.FC<TabsProps> = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0)
    const tabs = React.Children.toArray(children) as React.ReactElement<TabProps>[]
  
    return (
      <div className="tabs-container">
        <div className="tabs-header flex space-x-4 border-b mb-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab-button py-2 px-4 text-sm font-medium ${
                index === activeTab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-blue-500'
              }`}
              onClick={() => {
                setActiveTab(index)
                tab.props.onClick?.()
              }}
            >
              {tab.props.label}
            </button>
          ))}
        </div>
        <div className="tabs-content p-4">
          {tabs[activeTab]}
        </div>
      </div>
    )
  }
  