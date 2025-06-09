import './globals.css';
import type { Metadata } from 'next';
import { Poppins, Open_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import FloatingCTA from '@/components/floating-cta';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: 'Cybil Solutions | UAE Business Setup Consultancy',
  description: 'Expert business setup services in Dubai and UAE. Fast, transparent, and hassle-free company formation with Cybil Solutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${openSans.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <FloatingCTA />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}