import { Brain, Target, TrendingUp, Sparkles } from 'lucide-react';

export function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Personalized Learning.<br />
            <span className="text-blue-600">Designed for You.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            TailorLearn is an intelligent tutoring platform built to adapt to how you learn best.
            Whether you're a student, professional, or lifelong learner, experience education
            tailored to your unique style, pace, and goals.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Learning Today
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
          <FeatureCard
            icon={<Brain className="text-blue-600" size={40} />}
            title="Adaptive Learning"
            description="Our AI adapts to your learning style, ensuring concepts are presented in ways that work best for you."
          />
          <FeatureCard
            icon={<Target className="text-blue-600" size={40} />}
            title="Goal-Oriented"
            description="Set your objectives and let TailorLearn create a personalized path to help you achieve them."
          />
          <FeatureCard
            icon={<TrendingUp className="text-blue-600" size={40} />}
            title="Track Progress"
            description="Monitor your learning journey with detailed analytics and celebrate your milestones."
          />
          <FeatureCard
            icon={<Sparkles className="text-blue-600" size={40} />}
            title="Engaging Content"
            description="Learn through interactive lessons, quizzes, and hands-on projects that keep you motivated."
          />
        </div>

        <div className="py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Learn at Your Own Pace
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you prefer to move quickly through familiar topics or take your time
            with new concepts, TailorLearn adjusts to match your preferred learning speed.
          </p>
        </div>

        <div className="py-16 bg-blue-600 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who have discovered a better way to master new skills.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
