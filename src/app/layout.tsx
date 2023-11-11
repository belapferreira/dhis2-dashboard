'use client';

import './globals.css';
import { Roboto } from 'next/font/google';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/services/query-client';
import { Header } from './components/Header';

const roboto = Roboto({ subsets: ['latin'], weight: ['400'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>DHIS2 Dashboard</title>
      <meta
        name="description"
        content="A list of dashboards available to a DHIS2 user"
      />

      <QueryClientProvider client={queryClient}>
        <Hydrate>
          <body className={roboto.className}>
            <div className="flex min-h-screen w-full flex-col bg-app-grey-100">
              <Header />

              {children}
            </div>
          </body>
        </Hydrate>
      </QueryClientProvider>
    </html>
  );
}
