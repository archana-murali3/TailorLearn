import { useEffect, useState } from 'react';
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../contexts/AuthContext.jsx';

export function CourseDetail({ courseId, onBack, onLessonClick }) {
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourseData();
  }, [courseId, user]);

  const loadCourseData = async () => {
    try {
      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .maybeSingle();

      if (courseData) {
        setCourse(courseData);
      }

      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('lesson_order', { ascending: true });

      if (lessonsData) {
        setLessons(lessonsData);
      }

      if (user) {
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('lesson_id, completed, progress_percentage')
          .eq('user_id', user.id)
          .eq('course_id', courseId);

        if (progressData) {
          setProgress(progressData);
        }
      }
    } catch (error) {
      console.error('Error loading course:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLessonProgress = (lessonId) => {
    return progress.find((p) => p.lesson_id === lessonId);
  };

  const completedLessons = progress.filter((p) => p.completed).length;
  const totalLessons = lessons.length;
  const courseProgressPercentage = totalLessons > 0
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Course not found</p>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div
            className="h-64 bg-cover bg-center"
            style={{ backgroundImage: `url(${course.image_url})` }}
          >
            <div className="h-full bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-8 text-white">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-3">
                  {course.difficulty_level}
                </span>
                <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
                <p className="text-lg text-gray-100">{course.description}</p>
              </div>
            </div>
          </div>

          {user && totalLessons > 0 && (
            <div className="p-6 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Your Progress</span>
                <span className="text-gray-900 font-semibold">{completedLessons} / {totalLessons} lessons</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${courseProgressPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Lessons</h2>
          <div className="space-y-4">
            {lessons.map((lesson) => {
              const lessonProgress = getLessonProgress(lesson.id);
              const isCompleted = lessonProgress?.completed || false;

              return (
                <div
                  key={lesson.id}
                  onClick={() => onLessonClick(lesson.id)}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <div
                      className={`p-3 rounded-lg ${isCompleted ? 'bg-green-100' : 'bg-blue-100'} group-hover:scale-110 transition-transform`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="text-green-600" size={24} />
                      ) : (
                        <Play className="text-blue-600" size={24} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{lesson.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{lesson.content}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="flex items-center space-x-1 text-sm text-gray-500">
                          <Clock size={16} />
                          <span>{lesson.duration_minutes} min</span>
                        </span>
                        <span className="flex items-center space-x-1 text-sm text-gray-500">
                          <BookOpen size={16} />
                          <span>{lesson.lesson_type}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  {isCompleted && (
                    <span className="text-green-600 font-medium text-sm ml-4">Completed</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
