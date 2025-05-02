import './globals.css';
import Navigation from '../components/Navigation';

export const metadata = {
  title: 'ChatConnect',
  description: 'A real-time messaging application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen bg-white">
        <Navigation />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}