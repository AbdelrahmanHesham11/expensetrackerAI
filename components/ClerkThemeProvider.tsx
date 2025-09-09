'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from '@/contexts/ThemeContext';

interface ClerkThemeProviderProps {
  children: React.ReactNode;
}

export default function ClerkThemeProvider({
  children,
}: ClerkThemeProviderProps) {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
        variables: {
          colorPrimary: theme === 'dark' ? '#3b82f6' : '#2563eb', // blue-500/600
          colorBackground: theme === 'dark' ? '#1e293b' : '#ffffff', // slate-800
          colorInputBackground: theme === 'dark' ? '#334155' : '#f8fafc', // slate-700/slate-50
          colorInputText: theme === 'dark' ? '#f1f5f9' : '#1e293b', // slate-100/slate-800
          borderRadius: '0.75rem',
        },
        elements: {
          formButtonPrimary: {
            backgroundColor: theme === 'dark' ? '#3b82f6' : '#2563eb', // blue-500/600
            '&:hover': {
              backgroundColor: theme === 'dark' ? '#2563eb' : '#1d4ed8', // blue-600/700
            },
          },
          card: {
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(16px)',
            backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)', // slate-800/white
            border:
              theme === 'dark'
                ? '1px solid rgba(51, 65, 85, 0.3)' // slate-700
                : '1px solid rgba(226, 232, 240, 0.3)', // slate-200
          },
          headerTitle: {
            color: theme === 'dark' ? '#f1f5f9' : '#1e293b', // slate-100/slate-800
          },
          headerSubtitle: {
            color: theme === 'dark' ? '#94a3b8' : '#64748b', // slate-400/slate-500
          },
          socialButtonsBlockButton: {
            border:
              theme === 'dark'
                ? '1px solid rgba(51, 65, 85, 0.3)' // slate-700
                : '1px solid rgba(226, 232, 240, 0.3)', // slate-200
            backgroundColor:
              theme === 'dark'
                ? 'rgba(51, 65, 85, 0.5)' // slate-700
                : 'rgba(248, 250, 252, 0.5)', // slate-50
            backdropFilter: 'blur(8px)',
            '&:hover': {
              backgroundColor:
                theme === 'dark'
                  ? 'rgba(71, 85, 105, 0.5)' // slate-600
                  : 'rgba(241, 245, 249, 0.5)', // slate-100
            },
          },
          dividerLine: {
            backgroundColor:
              theme === 'dark'
                ? 'rgba(51, 65, 85, 0.3)' // slate-700
                : 'rgba(226, 232, 240, 0.3)', // slate-200
          },
          formFieldInput: {
            backgroundColor:
              theme === 'dark'
                ? 'rgba(51, 65, 85, 0.5)' // slate-700
                : 'rgba(248, 250, 252, 0.8)', // slate-50
            backdropFilter: 'blur(8px)',
            border:
              theme === 'dark'
                ? '1px solid rgba(71, 85, 105, 0.3)' // slate-600
                : '1px solid rgba(203, 213, 225, 0.3)', // slate-300
            '&:focus': {
              borderColor: theme === 'dark' ? '#3b82f6' : '#2563eb', // blue-500/600
              boxShadow: theme === 'dark' 
                ? '0 0 0 1px #3b82f6' 
                : '0 0 0 1px #2563eb',
            },
          },
          footerActionLink: {
            color: theme === 'dark' ? '#3b82f6' : '#2563eb', // blue-500/600
            '&:hover': {
              color: theme === 'dark' ? '#60a5fa' : '#1d4ed8', // blue-400/700
            },
          },
          footerActionText: {
            color: theme === 'dark' ? '#94a3b8' : '#64748b', // slate-400/slate-500
          },
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}