import React from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Lightbulb,
  LogOut,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useToast } from '../contexts/ToastContext';

export type Section = 'dashboard' | 'transactions' | 'insights';

interface SidebarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { id: 'dashboard' as const, icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'transactions' as const, icon: ArrowLeftRight, label: 'Transactions' },
  { id: 'insights' as const, icon: Lightbulb, label: 'Insights' },
];

export function Sidebar({ activeSection, setActiveSection, isOpen, onClose }: SidebarProps) {
  const { addToast } = useToast();

  const handleSignOut = () => {
    addToast('Signed out successfully', 'info');
    // In a real app, you would clear auth state here
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 bg-surface border-r border-border-subtle flex flex-col h-screen z-50 transition-all duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold text-text-main">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-sm text-white">F</span>
            </div>
            Findash
          </div>
          <button onClick={onClose} className="lg:hidden text-text-muted hover:text-text-main">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                onClose();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                activeSection === item.id 
                  ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-blue-500/20" 
                  : "text-text-muted hover:bg-surface/80 hover:text-text-main"
              )}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-border-subtle">
          <div 
            onClick={handleSignOut}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface/80 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shrink-0">
              JG
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-main truncate">Jackob Gerrald</p>
              <p className="text-xs text-text-muted truncate">jacgerrard@gmail.com</p>
            </div>
            <LogOut size={18} className="text-text-muted group-hover:text-text-main transition-colors shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
