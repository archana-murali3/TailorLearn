/*
  # Add More Sample Courses

  1. New Courses Added
    - Data Science Fundamentals
    - Mobile App Development
    - Machine Learning Basics
    - Digital Marketing Essentials
    - UI/UX Design Principles
    - Cloud Computing with AWS

  2. Each course includes
    - 3 lessons with progressively advanced content
    - Multiple choice assessments for knowledge validation
    - Varied difficulty levels and categories
*/

-- Insert additional courses
INSERT INTO courses (id, title, description, difficulty_level, category, image_url, created_by, created_at) VALUES
(
  '550e8400-e29b-41d4-a716-446655440004'::uuid,
  'Data Science Fundamentals',
  'Explore data analysis, statistics, and visualization. Learn how to work with datasets and extract meaningful insights.',
  'intermediate',
  'data_science',
  'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=600',
  NULL,
  now()
),
(
  '550e8400-e29b-41d4-a716-446655440005'::uuid,
  'Mobile App Development',
  'Build cross-platform mobile applications using modern frameworks. Learn responsive design and mobile best practices.',
  'intermediate',
  'mobile_development',
  'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600',
  NULL,
  now()
),
(
  '550e8400-e29b-41d4-a716-446655440006'::uuid,
  'Machine Learning Basics',
  'Introduction to machine learning concepts, algorithms, and applications. Build your first ML models with practical examples.',
  'advanced',
  'machine_learning',
  'https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=600',
  NULL,
  now()
),
(
  '550e8400-e29b-41d4-a716-446655440007'::uuid,
  'Digital Marketing Essentials',
  'Master digital marketing strategies including SEO, social media, email marketing, and analytics for online success.',
  'beginner',
  'marketing',
  'https://images.pexels.com/photos/3388617/pexels-photo-3388617.jpeg?auto=compress&cs=tinysrgb&w=600',
  NULL,
  now()
),
(
  '550e8400-e29b-41d4-a716-446655440008'::uuid,
  'UI/UX Design Principles',
  'Learn user interface and user experience design principles. Create beautiful, usable, and accessible digital products.',
  'beginner',
  'design',
  'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600',
  NULL,
  now()
),
(
  '550e8400-e29b-41d4-a716-446655440009'::uuid,
  'Cloud Computing with AWS',
  'Get started with Amazon Web Services. Learn about EC2, S3, databases, and deploying applications in the cloud.',
  'intermediate',
  'cloud_computing',
  'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600',
  NULL,
  now()
);

-- Insert lessons for Data Science Fundamentals
INSERT INTO lessons (id, course_id, title, content, lesson_order, duration_minutes, lesson_type, created_at) VALUES
(
  '660e8400-e29b-41d4-a716-446655440010'::uuid,
  '550e8400-e29b-41d4-a716-446655440004'::uuid,
  'Data Analysis Basics',
  'Learn fundamental concepts of data analysis including data types, distributions, and exploratory data analysis techniques.',
  1,
  25,
  'text',
  now()
),
(
  '660e8400-e29b-41d4-a716-446655440011'::uuid,
  '550e8400-e29b-41d4-a716-446655440004'::uuid,
  'Statistical Methods',
  'Understand probability, hypothesis testing, correlation, and regression analysis for data-driven decisions.',
  2,
  30,
  'text',
  now()
),
(
  '660e8400-e29b-41d4-a716-446655440012'::uuid,
  '550e8400-e29b-41d4-a716-446655440004'::uuid,
  'Data Visualization',
  'Master tools and techniques for visualizing data using charts, graphs, and dashboards for better insights.',
  3,
  28,
  'text',
  now()
);

-- Insert lessons for Mobile App Development
INSERT INTO lessons (id, course_id, title, content, lesson_order, duration_minutes, lesson_type, created_at) VALUES
(
  '660e8400-e29b-41d4-a716-446655440013'::uuid,
  '550e8400-e29b-41d4-a716-446655440005'::uuid,
  'Mobile Development Fundamentals',
  'Explore mobile platforms, development environments, and best practices for building apps for iOS and Android.',
  1,
  22,
  'text',
  now()
),
(
  '660e8400-e29b-41d4-a716-446655440014'::uuid,
  '550e8400-e29b-41d4-a716-446655440005'::uuid,
  'User Interface for Mobile',
  'Design responsive and touch-friendly interfaces. Learn mobile UI patterns, navigation, and accessibility.',
  2,
  26,
  'text',
  now()
),
(
  '660e8400-e29b-41d4-a716-446655440015'::uuid,
  '550e8400-e29b-41d4-a716-446655440005'::uuid,
  'Mobile Performance Optimization',
  'Optimize app performance, battery usage, memory management, and network efficiency for mobile devices.',
  3,
  32,
  'text',
  now()
);

-- Insert lessons for Machine Learning Basics
INSERT INTO lessons (id, course_id, title, content, lesson_order, duration_minutes, lesson_type, created_at) VALUES
(
  '660e8400-e29b-41d4-a716-446655440016'::uuid,
  '550e8400-e29b-41d4-a716-446655440006'::uuid,
  'ML Concepts and Algorithms',
  'Learn supervised and unsupervised learning, classification, regression, clustering, and model evaluation metrics.',
  1,
  35,
  'text',
  now()
),
(
  '660e8400-e29b-41d4-a716-446655440017'::uuid,
  '550e8400-e29b-41d4-a716-446655440006'::uuid,
  'Feature Engineering',
  'Transform raw data into useful features. Learn techniques for selecting, creating, and scaling features for models.',
  2,
  33,
  'text',
  now()
),
(
  '660e8400-e29b-41d4-a716-446655440018'::uuid,
  '550e8400-e29b-41d4-a716-446655440006'::uuid,
  'Model Training and Deployment',
  'Train, validate, and deploy ML models. Learn about hyperparameter tuning, cross-validation, and production deployment.',
  3,
  40,
  'text',
  now()
);

-- Insert lessons for Digital Marketing Essentials
INSERT INTO lessons (id, course_id, title, content, lesson_order, duration_minutes, lesson_type, created_at) VALUES
(
  '660e8400-e29b-41d4-a716-446655440019'::uuid,
  '550e8400-e29b-41d4-a716-446655440007'::uuid,
  'Digital Marketing Fundamentals',
  'Understand digital marketing channels, customer journey, and marketing strategy in the digital age.',
  1,
  20,
  'text',
  now()
),
(
  '660e8400-e29b-41d4-a716-446655440020'::uuid,
  '550e8400-e29b-41d4-a716-446655440007'::uuid,
  'SEO and Content Strategy',
  'Master search engine optimization, keyword research, content creation, and organic traffic growth strategies.',
  2,
  27,
  'text',
  now()
),
(
  '660e8400-e29b-41d4-a716-446655440021'::uuid,
  '550e8400-e29b-41d4-a716-446655440007'::uuid,
  'Social Media and Analytics',
  'Build effective social media campaigns, engage audiences, and measure performance using analytics tools.',
  3,
  24,
  'text',
  now()
);

-- Insert lessons for UI/UX Design Principles
INSERT INTO lessons (id, course_id, title, content, lesson_order, duration_minutes, lesson_type, created_at) VALUES
(
  '660e8400-e29b-41d4-a716-446655440022'::uuid,
  '550e8400-e29b-41d4-a716-446655440008'::uuid,
  'Design Fundamentals',
  'Learn design principles including balance, contrast, emphasis, hierarchy, and unity in visual design.',
  1,
  23,
  'text',
  now()
),
(
  '660e8400-e29b-41d4-a716-446655440023'::uuid,
  '550e8400-e29b-41d4-a716-446655440008'::uuid,
  'User Research and Testing',
  'Conduct user research, create personas, perform usability testing, and iterate designs based on feedback.',
  2,
  28,
  'text',
  now()
),
(
  '660e8400-e29b-41d4-a716-446655440024'::uuid,
  '550e8400-e29b-41d4-a716-446655440008'::uuid,
  'Prototyping and Wireframing',
  'Create wireframes and prototypes using modern design tools. Learn interaction design and animation principles.',
  3,
  25,
  'text',
  now()
);

-- Insert lessons for Cloud Computing with AWS
INSERT INTO lessons (id, course_id, title, content, lesson_order, duration_minutes, lesson_type, created_at) VALUES
(
  '660e8400-e29b-41d4-a716-446655440025'::uuid,
  '550e8400-e29b-41d4-a716-446655440009'::uuid,
  'AWS Fundamentals',
  'Explore AWS services, regions, availability zones, and core services like EC2, S3, and RDS.',
  1,
  26,
  'text',
  now()
),
(
  '660e8400-e29b-41d4-a716-446655440026'::uuid,
  '550e8400-e29b-41d4-a716-446655440009'::uuid,
  'Computing and Storage Services',
  'Deep dive into EC2 instances, S3 storage, EBS volumes, and other AWS compute and storage solutions.',
  2,
  31,
  'text',
  now()
),
(
  '660e8400-e29b-41d4-a716-446655440027'::uuid,
  '550e8400-e29b-41d4-a716-446655440009'::uuid,
  'Networking and Security',
  'Learn VPC, security groups, IAM policies, and best practices for securing cloud applications.',
  3,
  29,
  'text',
  now()
);

-- Insert assessments for Data Science Fundamentals
INSERT INTO assessments (id, lesson_id, question, options, correct_answer, created_at) VALUES
(
  '770e8400-e29b-41d4-a716-446655440010'::uuid,
  '660e8400-e29b-41d4-a716-446655440010'::uuid,
  'What is exploratory data analysis?',
  '["Initial investigation to understand data", "Machine learning model training", "Creating databases", "Writing SQL queries"]'::jsonb,
  'Initial investigation to understand data',
  now()
),
(
  '770e8400-e29b-41d4-a716-446655440011'::uuid,
  '660e8400-e29b-41d4-a716-446655440011'::uuid,
  'What measures the strength of relationship between variables?',
  '["Correlation", "Deviation", "Mode", "Range"]'::jsonb,
  'Correlation',
  now()
),
(
  '770e8400-e29b-41d4-a716-446655440012'::uuid,
  '660e8400-e29b-41d4-a716-446655440012'::uuid,
  'Which type of chart is best for showing trends over time?',
  '["Line chart", "Pie chart", "Bar chart", "Scatter plot"]'::jsonb,
  'Line chart',
  now()
);

-- Insert assessments for Mobile App Development
INSERT INTO assessments (id, lesson_id, question, options, correct_answer, created_at) VALUES
(
  '770e8400-e29b-41d4-a716-446655440013'::uuid,
  '660e8400-e29b-41d4-a716-446655440013'::uuid,
  'What does a responsive design ensure?',
  '["Works on all screen sizes", "Runs faster", "Uses less memory", "Prevents errors"]'::jsonb,
  'Works on all screen sizes',
  now()
),
(
  '770e8400-e29b-41d4-a716-446655440014'::uuid,
  '660e8400-e29b-41d4-a716-446655440014'::uuid,
  'What is the primary consideration for mobile UI design?',
  '["Touch interaction and screen size", "Keyboard shortcuts", "Mouse precision", "Font colors"]'::jsonb,
  'Touch interaction and screen size',
  now()
),
(
  '770e8400-e29b-41d4-a716-446655440015'::uuid,
  '660e8400-e29b-41d4-a716-446655440015'::uuid,
  'Which factor is critical for mobile apps?',
  '["Battery efficiency", "Processor power", "Graphics cards", "RAM size"]'::jsonb,
  'Battery efficiency',
  now()
);

-- Insert assessments for Machine Learning Basics
INSERT INTO assessments (id, lesson_id, question, options, correct_answer, created_at) VALUES
(
  '770e8400-e29b-41d4-a716-446655440016'::uuid,
  '660e8400-e29b-41d4-a716-446655440016'::uuid,
  'What is supervised learning?',
  '["Learning from labeled data", "Learning without labels", "Self-learning", "Learning from images only"]'::jsonb,
  'Learning from labeled data',
  now()
),
(
  '770e8400-e29b-41d4-a716-446655440017'::uuid,
  '660e8400-e29b-41d4-a716-446655440017'::uuid,
  'What is the purpose of feature engineering?',
  '["Improve model performance", "Clean raw data", "Train models", "Deploy models"]'::jsonb,
  'Improve model performance',
  now()
),
(
  '770e8400-e29b-41d4-a716-446655440018'::uuid,
  '660e8400-e29b-41d4-a716-446655440018'::uuid,
  'What is cross-validation used for?',
  '["Assess model generalization", "Reduce model size", "Speed up training", "Prevent coding errors"]'::jsonb,
  'Assess model generalization',
  now()
);

-- Insert assessments for Digital Marketing Essentials
INSERT INTO assessments (id, lesson_id, question, options, correct_answer, created_at) VALUES
(
  '770e8400-e29b-41d4-a716-446655440019'::uuid,
  '660e8400-e29b-41d4-a716-446655440019'::uuid,
  'What is a customer journey?',
  '["Path a customer takes interacting with brand", "Product purchase", "Website navigation", "Email campaign"]'::jsonb,
  'Path a customer takes interacting with brand',
  now()
),
(
  '770e8400-e29b-41d4-a716-446655440020'::uuid,
  '660e8400-e29b-41d4-a716-446655440020'::uuid,
  'What does SEO stand for?',
  '["Search Engine Optimization", "Social Email Operations", "Sales Enhancement Order", "System Error Output"]'::jsonb,
  'Search Engine Optimization',
  now()
),
(
  '770e8400-e29b-41d4-a716-446655440021'::uuid,
  '660e8400-e29b-41d4-a716-446655440021'::uuid,
  'Which metric measures engagement on social media?',
  '["Likes, shares, comments", "Website speed", "Email opens", "Product sales"]'::jsonb,
  'Likes, shares, comments',
  now()
);

-- Insert assessments for UI/UX Design Principles
INSERT INTO assessments (id, lesson_id, question, options, correct_answer, created_at) VALUES
(
  '770e8400-e29b-41d4-a716-446655440022'::uuid,
  '660e8400-e29b-41d4-a716-446655440022'::uuid,
  'What does visual hierarchy help with?',
  '["Guide user attention", "Reduce colors", "Increase fonts", "Remove elements"]'::jsonb,
  'Guide user attention',
  now()
),
(
  '770e8400-e29b-41d4-a716-446655440023'::uuid,
  '660e8400-e29b-41d4-a716-446655440023'::uuid,
  'What is a user persona?',
  '["Fictional representation of ideal user", "Real customer name", "Product description", "Design template"]'::jsonb,
  'Fictional representation of ideal user',
  now()
),
(
  '770e8400-e29b-41d4-a716-446655440024'::uuid,
  '660e8400-e29b-41d4-a716-446655440024'::uuid,
  'What is wireframing?',
  '["Sketching UI layout and structure", "Choosing colors", "Writing code", "Recording videos"]'::jsonb,
  'Sketching UI layout and structure',
  now()
);

-- Insert assessments for Cloud Computing with AWS
INSERT INTO assessments (id, lesson_id, question, options, correct_answer, created_at) VALUES
(
  '770e8400-e29b-41d4-a716-446655440025'::uuid,
  '660e8400-e29b-41d4-a716-446655440025'::uuid,
  'What is an AWS region?',
  '["Geographic area with multiple data centers", "Single server", "Database instance", "User account"]'::jsonb,
  'Geographic area with multiple data centers',
  now()
),
(
  '770e8400-e29b-41d4-a716-446655440026'::uuid,
  '660e8400-e29b-41d4-a716-446655440026'::uuid,
  'What does S3 stand for?',
  '["Simple Storage Service", "Server Side System", "Storage Security Standard", "System Service Software"]'::jsonb,
  'Simple Storage Service',
  now()
),
(
  '770e8400-e29b-41d4-a716-446655440027'::uuid,
  '660e8400-e29b-41d4-a716-446655440027'::uuid,
  'What does VPC provide?',
  '["Isolated network environment", "Virtual processor", "Video player", "Virtual computer"]'::jsonb,
  'Isolated network environment',
  now()
);
