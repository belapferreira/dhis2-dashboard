import './globals.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['400'] });

export const metadata = {
  title: 'DHIS2 Dashboard',
  description: 'A list of dashboards available to a DHIS2 user',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="bg-app-grey-100 flex min-h-screen w-full flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
