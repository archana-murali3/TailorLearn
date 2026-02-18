# TailorLearn

An intelligent tutoring platform designed to adapt to individual learning styles, pace, and goals.

## Overview

TailorLearn is a personalized learning management system that provides adaptive learning experiences. The platform allows users to:

- Create personalized learning profiles
- Browse and enroll in courses
- Track progress through interactive lessons
- Customize learning pace and style preferences
- Monitor achievements and learning statistics

## Features

- **Personalized Learning Profiles**: Users can define their learning style (visual, auditory, kinesthetic, reading/writing), preferred pace, and personal goals
- **Course Management**: Browse courses organized by category and difficulty level
- **Progress Tracking**: Real-time tracking of lesson completion, time spent, and course progress
- **Interactive Lessons**: Engage with various lesson types including text, video, and interactive content
- **Adaptive Dashboard**: View learning statistics and continue from where you left off
- **Secure Authentication**: Email/password authentication powered by Supabase

## Tech Stack

- **Frontend**: React with JSX
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## Database Schema

The application uses the following main tables:

- `learning_profiles`: User learning preferences and goals
- `courses`: Course catalog with metadata
- `lessons`: Individual lessons within courses
- `user_progress`: Tracks user completion and progress
- `assessments`: Quiz questions for lessons
- `user_responses`: User answers to assessments

## Getting Started

### Prerequisites

- Node.js (latest version)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # React components
│   ├── AuthModal.jsx    # Sign in/sign up modal
│   ├── CourseDetail.jsx # Course details view
│   ├── Dashboard.jsx    # Main dashboard
│   ├── LandingPage.jsx  # Landing page for non-authenticated users
│   ├── LessonViewer.jsx # Lesson content viewer
│   ├── Navbar.jsx       # Navigation bar
│   └── Profile.jsx      # Learning profile editor
├── contexts/            # React contexts
│   └── AuthContext.jsx  # Authentication context
├── lib/                 # Utilities and configuration
│   ├── supabase.js      # Supabase client
│   └── database.types.js # Database type definitions
├── App.jsx              # Main app component
├── main.jsx             # App entry point
└── index.css            # Global styles
```

## Key Features Implementation

### Authentication
The app uses Supabase Auth for secure user authentication with email and password. Session management is handled through React Context.

### Learning Profiles
Users can customize their learning experience by selecting:
- Learning style preferences
- Preferred learning pace
- Personal learning goals

### Course Navigation
- Browse all available courses
- View detailed course information
- Navigate between lessons within a course
- Track completion status

### Progress Tracking
- Automatic progress updates when lessons are completed
- Dashboard statistics showing total courses, lessons completed, and time spent
- Visual progress bars for each course

## Deployment

The application is configured for deployment to GitHub Pages via GitHub Actions. The workflow automatically builds and deploys on push to the master branch.

## Security

- Row Level Security (RLS) policies ensure users can only access their own data
- Authentication required for all personalized features
- Secure API key management through environment variables

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.
