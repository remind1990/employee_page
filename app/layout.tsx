import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Inter, Ranga, Roboto_Condensed } from 'next/font/google';

const ranga = Ranga({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-ranga-bold',
});
const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto-condensed',
});

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Sunrise agency app',
  description: 'translators dashboard',
  icons: {
    icon: '/public/logo.png',
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${ranga.variable} ${robotoCondensed.variable}}`}
    >
      <body>
        <Toaster
          position='top-center'
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'white',
              color: 'black',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
