import { useEffect, useState } from 'react';
import { Clock, BookOpen, Award, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../contexts/AuthContext.jsx';

export function Dashboard({ onCourseClick, onProfileClick }) {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const { data: coursesData } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (coursesData) {
        setCourses(coursesData);
      }

      if (user) {
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('course_id, completed, time_spent_minutes')
          .eq('user_id', user.id);

        if (progressData) {
          const progressMap = progressData.reduce((acc, item) => {
            if (!acc[item.course_id]) {
              acc[item.course_id] = { total: 0, completed: 0, time: 0 };
            }
            acc[item.course_id].total++;
            if (item.completed) acc[item.course_id].completed++;
            acc[item.course_id].time += item.time_spent_minutes;
            return acc;
          }, {});

          const progressArray = Object.entries(progressMap).map(([course_id, stats]) => ({
            course_id,
            total_lessons: stats.total,
            completed_lessons: stats.completed,
            total_time: stats.time,
          }));

          setProgress(progressArray);
        }
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCourseProgress = (courseId) => {
    return progress.find((p) => p.course_id === courseId);
  };

  const totalCoursesStarted = progress.length;
  const totalLessonsCompleted = progress.reduce((sum, p) => sum + p.completed_lessons, 0);
  const totalTimeSpent = progress.reduce((sum, p) => sum + p.total_time, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {user && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<BookOpen className="text-blue-600" size={24} />}
              label="Courses Started"
              value={totalCoursesStarted}
            />
            <StatCard
              icon={<Award className="text-green-600" size={24} />}
              label="Lessons Completed"
              value={totalLessonsCompleted}
            />
            <StatCard
              icon={<Clock className="text-orange-600" size={24} />}
              label="Minutes Learned"
              value={totalTimeSpent}
            />
            <div
              onClick={onProfileClick}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-3 mb-2">
                <TrendingUp className="text-blue-600" size={24} />
                <span className="text-gray-600 font-medium">Learning Profile</span>
              </div>
              <p className="text-sm text-blue-600 font-semibold">View & Edit</p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const courseProgress = getCourseProgress(course.id);
              const progressPercentage = courseProgress
                ? Math.round((courseProgress.completed_lessons / courseProgress.total_lessons) * 100)
                : 0;

              return (
                <div
                  key={course.id}
                  onClick={() => onCourseClick(course.id)}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-all hover:shadow-xl"
                >
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${course.image_url})` }}
                  >
                    <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                          {course.difficulty_level}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600 font-medium">{course.category}</span>
                      {courseProgress && (
                        <span className="text-sm text-gray-600">{progressPercentage}% complete</span>
                      )}
                    </div>
                    {courseProgress && progressPercentage > 0 && (
                      <div className="mt-3 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center space-x-3 mb-2">
        {icon}
        <span className="text-gray-600 font-medium">{label}</span>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
