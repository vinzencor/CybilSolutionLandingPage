import './globals.css';
import type { Metadata } from 'next';
import { Poppins, Open_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
// import FloatingCTA from '@/components/floating-cta';

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
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MK5ZBWB6');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${poppins.variable} ${openSans.variable} font-sans`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MK5ZBWB6"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {/* <FloatingCTA /> */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}