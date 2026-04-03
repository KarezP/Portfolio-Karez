import './globals.css';

import { portfolioContent } from '../lib/content/portfolioContent';

export const metadata = {
  title: portfolioContent.en.meta.siteTitle,
  description: portfolioContent.en.meta.siteDescription,
  icons: {
    icon: '/favicon.svg',
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
