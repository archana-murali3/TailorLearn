import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../contexts/AuthContext.jsx';

export function LessonViewer({ lessonId, onBack }) {
  const { user } = useAuth();
  const [lesson, setLesson] = useState(null);
  const [allLessons, setAllLessons] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadLesson();
  }, [lessonId, user]);

  const loadLesson = async () => {
    try {
      const { data: lessonData } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .maybeSingle();

      if (lessonData) {
        setLesson(lessonData);

        const { data: allLessonsData } = await supabase
          .from('lessons')
          .select('*')
          .eq('course_id', lessonData.course_id)
          .order('lesson_order', { ascending: true });

        if (allLessonsData) {
          setAllLessons(allLessonsData);
        }

        if (user) {
          const { data: progressData } = await supabase
            .from('user_progress')
            .select('completed')
            .eq('user_id', user.id)
            .eq('lesson_id', lessonId)
            .maybeSingle();

          if (progressData) {
            setIsCompleted(progressData.completed);
          }
        }
      }
    } catch (error) {
      console.error('Error loading lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsComplete = async () => {
    if (!user || !lesson) return;

    setSaving(true);
    try {
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('id')
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)
        .maybeSingle();

      if (existingProgress) {
        await supabase
          .from('user_progress')
          .update({
            completed: true,
            progress_percentage: 100,
            completed_at: new Date().toISOString(),
            last_accessed: new Date().toISOString(),
          })
          .eq('id', existingProgress.id);
      } else {
        await supabase.from('user_progress').insert({
          user_id: user.id,
          lesson_id: lessonId,
          course_id: lesson.course_id,
          completed: true,
          progress_percentage: 100,
          completed_at: new Date().toISOString(),
          time_spent_minutes: lesson.duration_minutes,
        });
      }

      setIsCompleted(true);
    } catch (error) {
      console.error('Error marking lesson as complete:', error);
    } finally {
      setSaving(false);
    }
  };

  const getCurrentLessonIndex = () => {
    return allLessons.findIndex((l) => l.id === lessonId);
  };

  const goToNextLesson = () => {
    const currentIndex = getCurrentLessonIndex();
    if (currentIndex < allLessons.length - 1) {
      window.location.hash = `lesson-${allLessons[currentIndex + 1].id}`;
      window.location.reload();
    }
  };

  const goToPreviousLesson = () => {
    const currentIndex = getCurrentLessonIndex();
    if (currentIndex > 0) {
      window.location.hash = `lesson-${allLessons[currentIndex - 1].id}`;
      window.location.reload();
    }
  };

  const currentIndex = getCurrentLessonIndex();
  const hasNext = currentIndex < allLessons.length - 1;
  const hasPrevious = currentIndex > 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Lesson not found</p>
          <button
            onClick={onBack}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Course</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 border-b">
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Lesson {lesson.lesson_order}
              </span>
              <span className="flex items-center space-x-1 text-gray-600">
                <Clock size={16} />
                <span className="text-sm">{lesson.duration_minutes} min</span>
              </span>
              {isCompleted && (
                <span className="flex items-center space-x-1 text-green-600">
                  <CheckCircle size={16} />
                  <span className="text-sm font-medium">Completed</span>
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
          </div>

          <div className="p-8">
            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                {lesson.content}
              </div>
            </div>

            {lesson.lesson_type === 'interactive' && (
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Practice</h3>
                <p className="text-gray-700 mb-4">
                  This is an interactive lesson. Practice what you've learned by applying these concepts
                  in your own projects or exercises.
                </p>
                <div className="flex items-center space-x-2 text-blue-600">
                  <span className="font-medium">Ready to practice?</span>
                </div>
              </div>
            )}

            {user && !isCompleted && (
              <div className="mt-8 pt-8 border-t">
                <button
                  onClick={markAsComplete}
                  disabled={saving}
                  className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <CheckCircle size={20} />
                  <span>{saving ? 'Saving...' : 'Mark as Complete'}</span>
                </button>
              </div>
            )}

            {isCompleted && (
              <div className="mt-8 pt-8 border-t text-center">
                <div className="inline-flex items-center space-x-2 text-green-600 bg-green-50 px-6 py-3 rounded-lg">
                  <CheckCircle size={24} />
                  <span className="font-semibold text-lg">Lesson Completed!</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-gray-50 border-t flex items-center justify-between">
            <button
              onClick={goToPreviousLesson}
              disabled={!hasPrevious}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
              <span>Previous Lesson</span>
            </button>
            <span className="text-gray-600 text-sm">
              Lesson {currentIndex + 1} of {allLessons.length}
            </span>
            <button
              onClick={goToNextLesson}
              disabled={!hasNext}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next Lesson</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
