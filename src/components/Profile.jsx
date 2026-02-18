import { useEffect, useState } from 'react';
import { ArrowLeft, Save, User } from 'lucide-react';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../contexts/AuthContext.jsx';

export function Profile({ onBack }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [learningStyle, setLearningStyle] = useState('visual');
  const [preferredPace, setPreferredPace] = useState('moderate');
  const [goals, setGoals] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('learning_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (data) {
        setProfile(data);
        setLearningStyle(data.learning_style);
        setPreferredPace(data.preferred_pace);
        setGoals(data.goals);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setMessage('');

    try {
      if (profile) {
        await supabase
          .from('learning_profiles')
          .update({
            learning_style: learningStyle,
            preferred_pace: preferredPace,
            goals,
            updated_at: new Date().toISOString(),
          })
          .eq('id', profile.id);
      } else {
        await supabase.from('learning_profiles').insert({
          user_id: user.id,
          learning_style: learningStyle,
          preferred_pace: preferredPace,
          goals,
        });
      }

      setMessage('Profile saved successfully!');
      setTimeout(() => setMessage(''), 3000);
      loadProfile();
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex items-center space-x-3 mb-2">
              <User size={32} />
              <h1 className="text-3xl font-bold">Learning Profile</h1>
            </div>
            <p className="text-blue-100">
              Customize your learning experience by telling us how you learn best
            </p>
          </div>

          <form onSubmit={handleSave} className="p-8 space-y-8">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                What's your preferred learning style?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: 'visual', label: 'Visual', description: 'I learn best through images, diagrams, and videos' },
                  { value: 'auditory', label: 'Auditory', description: 'I prefer listening to explanations and discussions' },
                  { value: 'kinesthetic', label: 'Kinesthetic', description: 'I learn by doing and hands-on practice' },
                  { value: 'reading', label: 'Reading/Writing', description: 'I prefer reading text and taking notes' },
                ].map((style) => (
                  <label
                    key={style.value}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      learningStyle === style.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="learningStyle"
                      value={style.value}
                      checked={learningStyle === style.value}
                      onChange={(e) => setLearningStyle(e.target.value)}
                      className="sr-only"
                    />
                    <div className="font-semibold text-gray-900 mb-1">{style.label}</div>
                    <div className="text-sm text-gray-600">{style.description}</div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                What's your preferred learning pace?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'slow', label: 'Relaxed', description: 'Take time to absorb everything' },
                  { value: 'moderate', label: 'Moderate', description: 'Balanced and steady progress' },
                  { value: 'fast', label: 'Fast', description: 'Quick learner, move rapidly' },
                ].map((pace) => (
                  <label
                    key={pace.value}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      preferredPace === pace.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferredPace"
                      value={pace.value}
                      checked={preferredPace === pace.value}
                      onChange={(e) => setPreferredPace(e.target.value)}
                      className="sr-only"
                    />
                    <div className="font-semibold text-gray-900 mb-1">{pace.label}</div>
                    <div className="text-sm text-gray-600">{pace.description}</div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="goals" className="block text-lg font-semibold text-gray-900 mb-2">
                What are your learning goals?
              </label>
              <p className="text-sm text-gray-600 mb-3">
                Share what you hope to achieve. This helps us personalize your experience.
              </p>
              <textarea
                id="goals"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="e.g., I want to become a web developer, learn data science for my career, or explore new topics for personal growth..."
              />
            </div>

            {message && (
              <div className={`p-4 rounded-lg ${
                message.includes('success')
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Save size={20} />
              <span>{saving ? 'Saving...' : 'Save Profile'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
