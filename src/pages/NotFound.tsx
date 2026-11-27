import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center px-4">
        <h1 className="text-8xl font-extrabold text-gradient mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
          Page not found
        </p>
        <p className="text-gray-500 dark:text-gray-500 mb-8">
          The page you are looking for may have moved or does not exist.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-105"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
