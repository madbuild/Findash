import React, { useState, useRef, useEffect } from 'react';
import { Search, Moon, Sun, Bell, Menu, X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { UserRole } from '../types';
import { cn } from '../lib/utils';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../contexts/ToastContext';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
  onMenuOpen: () => void;
}

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Large Transaction',
    description: 'A transaction of $1,200.00 was detected at Apple Store.',
    time: '2 mins ago',
    type: 'alert',
    read: false,
  },
  {
    id: '2',
    title: 'Monthly Report Ready',
    description: 'Your financial summary for March 2025 is now available.',
    time: '1 hour ago',
    type: 'info',
    read: false,
  },
  {
    id: '3',
    title: 'Budget Goal Reached',
    description: 'Congratulations! You stayed under your $500 food budget.',
    time: '5 hours ago',
    type: 'success',
    read: true,
  },
];

export function Header({ role, onRoleChange, onMenuOpen }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { addToast } = useToast();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const notificationRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="text-green-500" size={18} />;
      case 'alert': return <AlertCircle className="text-orange-500" size={18} />;
      default: return <Info className="text-blue-500" size={18} />;
    }
  };

  return (
    <header className="h-20 border-b border-border-subtle flex items-center justify-between px-4 md:px-8 sticky top-0 bg-bg/80 backdrop-blur-md z-30 transition-colors duration-300 gap-4">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button 
          onClick={onMenuOpen}
          className="p-2 text-text-muted hover:text-text-main lg:hidden shrink-0"
        >
          <Menu size={24} />
        </button>
        <div className="relative hidden sm:block w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-surface/50 border border-border-subtle rounded-xl py-2.5 pl-12 pr-4 text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6 shrink-0">
        <div className="flex items-center bg-surface/80 dark:bg-surface/50 rounded-xl p-1 border border-border-subtle shadow-sm">
          <button 
            onClick={() => onRoleChange('viewer')}
            className={cn(
              "px-2 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all",
              role === 'viewer' ? "bg-blue-500 text-white shadow-md shadow-blue-500/20" : "text-text-muted hover:text-text-main"
            )}
          >
            Viewer
          </button>
          <button 
            onClick={() => onRoleChange('admin')}
            className={cn(
              "px-2 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all",
              role === 'admin' ? "bg-blue-500 text-white shadow-md shadow-blue-500/20" : "text-text-muted hover:text-text-main"
            )}
          >
            Admin
          </button>
        </div>

        <div className="flex items-center gap-1 bg-surface/80 dark:bg-surface/50 rounded-xl p-1 border border-border-subtle shadow-sm">
          <button 
            onClick={() => setTheme('dark')}
            className={cn(
              "p-2 rounded-lg transition-all",
              theme === 'dark' ? "bg-blue-500/10 text-blue-400 shadow-sm" : "text-text-muted hover:text-text-main"
            )}
          >
            <Moon size={18} />
          </button>
          <button 
            onClick={() => setTheme('light')}
            className={cn(
              "p-2 rounded-lg transition-all",
              theme === 'light' ? "bg-blue-500/10 text-blue-600 shadow-sm" : "text-text-muted hover:text-text-main"
            )}
          >
            <Sun size={18} />
          </button>
        </div>

        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={cn(
              "relative p-2.5 bg-surface/50 rounded-xl border border-border-subtle text-text-muted hover:text-text-main transition-all",
              isNotificationsOpen && "text-text-main border-blue-500/50 bg-surface"
            )}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-bg animate-pulse"></span>
            )}
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-80 md:w-96 bg-surface border border-border-subtle rounded-2xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-4 border-b border-border-subtle flex items-center justify-between bg-bg/30">
                  <h3 className="font-bold text-text-main">Notifications</h3>
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-border-subtle">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={cn(
                            "p-4 flex gap-3 hover:bg-bg/50 transition-colors cursor-pointer",
                            !notification.read && "bg-blue-500/5"
                          )}
                        >
                          <div className="mt-1 shrink-0">
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className={cn("text-sm font-semibold truncate", notification.read ? "text-text-main" : "text-blue-600 dark:text-blue-400")}>
                                {notification.title}
                              </p>
                              <span className="text-[10px] text-text-muted whitespace-nowrap">{notification.time}</span>
                            </div>
                            <p className="text-xs text-text-muted mt-0.5 line-clamp-2 leading-relaxed">
                              {notification.description}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Bell className="mx-auto text-text-muted mb-2 opacity-20" size={32} />
                      <p className="text-sm text-text-muted">No new notifications</p>
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-border-subtle text-center bg-bg/30">
                  <button 
                    onClick={() => {
                      addToast('Navigating to all notifications...', 'info');
                      setIsNotificationsOpen(false);
                    }}
                    className="text-xs font-semibold text-text-muted hover:text-text-main transition-colors"
                  >
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
