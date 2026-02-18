import { GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

export function Navbar({ onSignInClick, onSignUpClick, onDashboardClick }) {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={onDashboardClick}>
            <GraduationCap className="text-blue-600" size={32} />
            <span className="text-2xl font-bold text-gray-900">TailorLearn</span>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={onDashboardClick}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onSignInClick}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={onSignUpClick}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
