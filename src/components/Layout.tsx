import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Analytics from './Analytics';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Layout() {
  usePageTitle();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
      <ScrollRestoration />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
