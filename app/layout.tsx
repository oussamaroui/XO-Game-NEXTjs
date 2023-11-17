import Head from 'next/head';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from './nav/page';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tic Tac Toe',
  description: 'Play the classic Tic Tac Toe game online. Challenge a friend. Enjoy a timeless and strategic two-player experience!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <body className={inter.className}>
        <Nav/>
        {children}
      </body>
    </html>
  )
}
