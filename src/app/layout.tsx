import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ProgressProvider } from '@/context/ProgressContext';

export const metadata: Metadata = {
  title: 'ZFA Lernapp | Bilinguale E-Learning Web-App (DE / FR)',
  description: 'Interaktive E-Learning-Plattform für Zahnmedizinische Fachangestellte (1. Lehrjahr) in einfacher deutscher Sprache und Französisch.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🦷</text></svg>',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="bg-slate-100 text-slate-900 min-h-screen">
        <ProgressProvider>
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}

