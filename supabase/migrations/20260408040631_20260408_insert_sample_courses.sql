/*
  # Insert Sample Courses and Lessons

  1. Sample Courses
    - Web Development Fundamentals
    - Introduction to React
    - Python Basics

  2. Sample Lessons
    - Each course includes 3 sample lessons with content and assessments

  3. Sample Assessments
    - Multiple choice questions for each lesson

  4. Data Structure
    - Courses are inserted with public system user ID (NULL created_by for platform courses)
    - Lessons are attached to courses in order
    - Assessments are attached to lessons for knowledge checks
    - No user progress data initially (users create their own)
*/

-- Insert sample courses
INSERT INTO courses (id, title, description, difficulty_level, category, image_url, created_by, created_at) VALUES
(
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  'Web Development Fundamentals',
  'Learn the basics of HTML, CSS, and JavaScript. Perfect for beginners looking to start their web development journey.',
  'beginner',
  'web_development',
  'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
  NULL,
  now()
),
(
  '550e8400-e29b-41d4-a716-446655440002'::uuid,
  'Introduction to React',
  'Master React fundamentals including components, hooks, and state management. Build modern web applications.',
  'intermediate',
  'web_development',
  'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600',
  NULL,
  now()
),
(
  '550e8400-e29b-41d4-a716-446655440003'::uuid,
  'Python Basics',
  'Start your programming journey with Python. Learn variables, loops, functions, and basic algorithms.',
  'beginner',
  'programming',
  'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600',
  NULL,
  now()
);

-- Insert lessons for Web Development Fundamentals
INSERT INTO lessons (id, course_id, title, content, lesson_order, duration_minutes, lesson_type, created_at) VALUES
(
  '660e8400-e29b-41d4-a716-446655440001'::uuid,
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  'HTML Basics',
  'HTML (HyperText Markup Language) is the standard markup language for creating web pages. Learn about tags, elements, and structure.',
  1,
  20,
  'text',
  now()
),
(
  '660e8400-e29b-41d4-a716-446655440002'::uuid,
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  'CSS Styling',
  'CSS (Cascading Style Sheets) is used to style and layout web pages. Learn selectors, properties, and responsive design.',
  2,
  25,
  'text',
  now()
),
(
  '660e8400-e29b-41d4-a716-446655440003'::uuid,
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  'JavaScript Essentials',
  'JavaScript brings interactivity to web pages. Learn variables, functions, DOM manipulation, and event handling.',
  3,
  30,
  'text',
  now()
);

-- Insert lessons for Introduction to React
INSERT INTO lessons (id, course_id, title, content, lesson_order, duration_minutes, lesson_type, created_at) VALUES
(
  '660e8400-e29b-41d4-a716-446655440004'::uuid,
  '550e8400-e29b-41d4-a716-446655440002'::uuid,
  'React Components',
  'Components are the building blocks of React applications. Learn about functional components, props, and component composition.',
  1,
  25,
  'text',
  now()
),
(
  '660e8400-e29b-41d4-a716-446655440005'::uuid,
  '550e8400-e29b-41d4-a716-446655440002'::uuid,
  'Hooks and State',
  'Hooks allow you to use state and other React features in functional components. Master useState, useEffect, and custom hooks.',
  2,
  30,
  'text',
  now()
),
(
  '660e8400-e29b-41d4-a716-446655440006'::uuid,
  '550e8400-e29b-41d4-a716-446655440002'::uuid,
  'State Management',
  'Learn advanced state management patterns using Context API and best practices for managing application state.',
  3,
  35,
  'text',
  now()
);

-- Insert lessons for Python Basics
INSERT INTO lessons (id, course_id, title, content, lesson_order, duration_minutes, lesson_type, created_at) VALUES
(
  '660e8400-e29b-41d4-a716-446655440007'::uuid,
  '550e8400-e29b-41d4-a716-446655440003'::uuid,
  'Variables and Data Types',
  'Learn Python variables, data types including strings, numbers, lists, dictionaries, and how to manipulate them.',
  1,
  20,
  'text',
  now()
),
(
  '660e8400-e29b-41d4-a716-446655440008'::uuid,
  '550e8400-e29b-41d4-a716-446655440003'::uuid,
  'Control Flow',
  'Master conditional statements (if/else), loops (for/while), and control flow in Python for building logic.',
  2,
  25,
  'text',
  now()
),
(
  '660e8400-e29b-41d4-a716-446655440009'::uuid,
  '550e8400-e29b-41d4-a716-446655440003'::uuid,
  'Functions and Modules',
  'Learn to write reusable functions, understand scope, and use Python modules and libraries effectively.',
  3,
  30,
  'text',
  now()
);

-- Insert assessments for Web Development Fundamentals lessons
INSERT INTO assessments (id, lesson_id, question, options, correct_answer, created_at) VALUES
(
  '770e8400-e29b-41d4-a716-446655440001'::uuid,
  '660e8400-e29b-41d4-a716-446655440001'::uuid,
  'What does HTML stand for?',
  '["HyperText Markup Language", "High Tech Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"]'::jsonb,
  'HyperText Markup Language',
  now()
),
(
  '770e8400-e29b-41d4-a716-446655440002'::uuid,
  '660e8400-e29b-41d4-a716-446655440002'::uuid,
  'Which CSS property controls text color?',
  '["color", "text-color", "font-color", "text-style"]'::jsonb,
  'color',
  now()
),
(
  '770e8400-e29b-41d4-a716-446655440003'::uuid,
  '660e8400-e29b-41d4-a716-446655440003'::uuid,
  'What is the correct syntax for console.log in JavaScript?',
  '["console.log(message)", "log.console(message)", "print(message)", "output(message)"]'::jsonb,
  'console.log(message)',
  now()
);

-- Insert assessments for React lessons
INSERT INTO assessments (id, lesson_id, question, options, correct_answer, created_at) VALUES
(
  '770e8400-e29b-41d4-a716-446655440004'::uuid,
  '660e8400-e29b-41d4-a716-446655440004'::uuid,
  'What is a React component?',
  '["A reusable piece of UI code", "A CSS stylesheet", "A database table", "An HTML template"]'::jsonb,
  'A reusable piece of UI code',
  now()
),
(
  '770e8400-e29b-41d4-a716-446655440005'::uuid,
  '660e8400-e29b-41d4-a716-446655440005'::uuid,
  'Which Hook allows you to manage component state?',
  '["useState", "useEffect", "useContext", "useReducer"]'::jsonb,
  'useState',
  now()
),
(
  '770e8400-e29b-41d4-a716-446655440006'::uuid,
  '660e8400-e29b-41d4-a716-446655440006'::uuid,
  'What is the Context API used for?',
  '["Managing global state", "Making API calls", "Styling components", "Handling routing"]'::jsonb,
  'Managing global state',
  now()
);

-- Insert assessments for Python lessons
INSERT INTO assessments (id, lesson_id, question, options, correct_answer, created_at) VALUES
(
  '770e8400-e29b-41d4-a716-446655440007'::uuid,
  '660e8400-e29b-41d4-a716-446655440007'::uuid,
  'Which data type stores multiple values?',
  '["list", "integer", "string", "boolean"]'::jsonb,
  'list',
  now()
),
(
  '770e8400-e29b-41d4-a716-446655440008'::uuid,
  '660e8400-e29b-41d4-a716-446655440008'::uuid,
  'What keyword is used for loops in Python?',
  '["for", "loop", "while", "iterate"]'::jsonb,
  'for',
  now()
),
(
  '770e8400-e29b-41d4-a716-446655440009'::uuid,
  '660e8400-e29b-41d4-a716-446655440009'::uuid,
  'How do you define a function in Python?',
  '["def function_name():", "function function_name():", "func function_name():", "define function_name():"]'::jsonb,
  'def function_name():',
  now()
);
