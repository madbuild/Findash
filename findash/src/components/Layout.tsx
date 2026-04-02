import React from 'react';
import { Sidebar, Section } from './Sidebar';
import { Header } from './Header';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function Layout({ 
  children, 
  activeSection, 
  setActiveSection, 
  role, 
  onRoleChange 
}: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-bg text-text-main selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-300">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Header 
          role={role} 
          onRoleChange={onRoleChange} 
          onMenuOpen={() => setIsSidebarOpen(true)}
        />
        
        <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
