import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ProgressProvider } from '@/context/ProgressContext';

export const metadata: Metadata = {
  title: 'ZFA Lernapp | Bilinguale E-Learning Web-App (DE / FR)',
  description: 'Interaktive E-Learning-Plattform für Zahnmedizinische Fachangestellte (1. Lehrjahr) in einfacher deutscher Sprache und Französisch.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🦷</text></svg>',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ZFA Lernapp',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#020617',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="dark h-full">
      <body className="bg-[#020617] text-slate-100 min-h-screen min-h-[100dvh] font-sans antialiased selection:bg-sky-500/30 selection:text-sky-200 overflow-x-hidden overscroll-y-none">
        <ProgressProvider>
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}
