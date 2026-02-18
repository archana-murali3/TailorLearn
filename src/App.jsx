import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { Navbar } from './components/Navbar.jsx';
import { AuthModal } from './components/AuthModal.jsx';
import { LandingPage } from './components/LandingPage.jsx';
import { Dashboard } from './components/Dashboard.jsx';
import { CourseDetail } from './components/CourseDetail.jsx';
import { LessonViewer } from './components/LessonViewer.jsx';
import { Profile } from './components/Profile.jsx';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('landing');
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');

  useEffect(() => {
    if (user) {
      if (currentView === 'landing') {
        setCurrentView('dashboard');
      }
    }

    const hash = window.location.hash.slice(1);
    if (hash.startsWith('course-')) {
      const courseId = hash.replace('course-', '');
      setSelectedCourseId(courseId);
      setCurrentView('course');
    } else if (hash.startsWith('lesson-')) {
      const lessonId = hash.replace('lesson-', '');
      setSelectedLessonId(lessonId);
      setCurrentView('lesson');
    }
  }, [user]);

  const handleSignInClick = () => {
    setAuthMode('signin');
    setAuthModalOpen(true);
  };

  const handleSignUpClick = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  const handleDashboardClick = () => {
    setCurrentView('dashboard');
    setSelectedCourseId(null);
    setSelectedLessonId(null);
    window.location.hash = '';
  };

  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId);
    setCurrentView('course');
    window.location.hash = `course-${courseId}`;
  };

  const handleLessonClick = (lessonId) => {
    setSelectedLessonId(lessonId);
    setCurrentView('lesson');
    window.location.hash = `lesson-${lessonId}`;
  };

  const handleProfileClick = () => {
    setCurrentView('profile');
  };

  const handleBackFromCourse = () => {
    setCurrentView('dashboard');
    setSelectedCourseId(null);
    window.location.hash = '';
  };

  const handleBackFromLesson = () => {
    if (selectedCourseId) {
      setCurrentView('course');
      window.location.hash = `course-${selectedCourseId}`;
    } else {
      setCurrentView('dashboard');
      window.location.hash = '';
    }
    setSelectedLessonId(null);
  };

  const handleBackFromProfile = () => {
    setCurrentView('dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar
        onSignInClick={handleSignInClick}
        onSignUpClick={handleSignUpClick}
        onDashboardClick={handleDashboardClick}
      />

      {currentView === 'landing' && !user && (
        <LandingPage onGetStarted={handleSignUpClick} />
      )}

      {currentView === 'dashboard' && user && (
        <Dashboard
          onCourseClick={handleCourseClick}
          onProfileClick={handleProfileClick}
        />
      )}

      {currentView === 'course' && selectedCourseId && (
        <CourseDetail
          courseId={selectedCourseId}
          onBack={handleBackFromCourse}
          onLessonClick={handleLessonClick}
        />
      )}

      {currentView === 'lesson' && selectedLessonId && (
        <LessonViewer
          lessonId={selectedLessonId}
          onBack={handleBackFromLesson}
        />
      )}

      {currentView === 'profile' && user && (
        <Profile onBack={handleBackFromProfile} />
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
