/*
  # TailorLearn Platform Schema

  1. New Tables
    - `learning_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `learning_style` (text) - visual, auditory, kinesthetic, reading
      - `preferred_pace` (text) - slow, moderate, fast
      - `goals` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `difficulty_level` (text) - beginner, intermediate, advanced
      - `category` (text)
      - `image_url` (text)
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `lessons`
      - `id` (uuid, primary key)
      - `course_id` (uuid, references courses)
      - `title` (text)
      - `content` (text)
      - `lesson_order` (integer)
      - `duration_minutes` (integer)
      - `lesson_type` (text) - video, text, interactive, quiz
      - `created_at` (timestamptz)
    
    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `lesson_id` (uuid, references lessons)
      - `course_id` (uuid, references courses)
      - `completed` (boolean)
      - `progress_percentage` (integer)
      - `time_spent_minutes` (integer)
      - `last_accessed` (timestamptz)
      - `completed_at` (timestamptz)
      - `created_at` (timestamptz)
    
    - `assessments`
      - `id` (uuid, primary key)
      - `lesson_id` (uuid, references lessons)
      - `question` (text)
      - `options` (jsonb)
      - `correct_answer` (text)
      - `created_at` (timestamptz)
    
    - `user_responses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `assessment_id` (uuid, references assessments)
      - `response` (text)
      - `is_correct` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for course access and progress tracking
*/

-- Create learning_profiles table
CREATE TABLE IF NOT EXISTS learning_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL UNIQUE,
  learning_style text DEFAULT 'visual',
  preferred_pace text DEFAULT 'moderate',
  goals text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE learning_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own learning profile"
  ON learning_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own learning profile"
  ON learning_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own learning profile"
  ON learning_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  difficulty_level text DEFAULT 'beginner',
  category text DEFAULT 'general',
  image_url text DEFAULT '',
  created_by uuid REFERENCES auth.users,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create courses"
  ON courses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Course creators can update own courses"
  ON courses FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text DEFAULT '',
  lesson_order integer DEFAULT 0,
  duration_minutes integer DEFAULT 15,
  lesson_type text DEFAULT 'text',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view lessons"
  ON lessons FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Course creators can manage lessons"
  ON lessons FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = lessons.course_id
      AND courses.created_by = auth.uid()
    )
  );

CREATE POLICY "Course creators can update lessons"
  ON lessons FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = lessons.course_id
      AND courses.created_by = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = lessons.course_id
      AND courses.created_by = auth.uid()
    )
  );

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  lesson_id uuid REFERENCES lessons ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES courses ON DELETE CASCADE NOT NULL,
  completed boolean DEFAULT false,
  progress_percentage integer DEFAULT 0,
  time_spent_minutes integer DEFAULT 0,
  last_accessed timestamptz DEFAULT now(),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons ON DELETE CASCADE NOT NULL,
  question text NOT NULL,
  options jsonb DEFAULT '[]'::jsonb,
  correct_answer text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view assessments"
  ON assessments FOR SELECT
  TO authenticated
  USING (true);

-- Create user_responses table
CREATE TABLE IF NOT EXISTS user_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  assessment_id uuid REFERENCES assessments ON DELETE CASCADE NOT NULL,
  response text NOT NULL,
  is_correct boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own responses"
  ON user_responses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own responses"
  ON user_responses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_course_id ON user_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_assessments_lesson_id ON assessments(lesson_id);
CREATE INDEX IF NOT EXISTS idx_user_responses_user_id ON user_responses(user_id);