// src/features/components/admin/AddCourse/mock/mockCourses.ts

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  category: string;
  price: number;
  maxStudents: number;
  prerequisites: string;
  syllabus: string;
  // thumbnailUrl?: string; // Add this if your backend will return it
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Python Programming',
    description: 'Learn the fundamentals of Python for beginners.',
    instructor: 'Dr. Alice Smith',
    duration: '6 weeks',
    level: 'beginner',
    category: 'programming',
    price: 199.99,
    maxStudents: 50,
    prerequisites: 'None',
    syllabus: 'Variables, Loops, Functions, Data Structures',
  },
  {
    id: '2',
    title: 'Advanced JavaScript and React',
    description: 'Master modern JavaScript and build apps with React.',
    instructor: 'Prof. Bob Johnson',
    duration: '8 weeks',
    level: 'intermediate',
    category: 'programming',
    price: 299.99,
    maxStudents: 40,
    prerequisites: 'Basic JavaScript',
    syllabus: 'ES6, React Hooks, State Management',
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    description: 'Design user-friendly interfaces with Figma.',
    instructor: 'Emma Davis',
    duration: '5 weeks',
    level: 'beginner',
    category: 'design',
    price: 249.99,
    maxStudents: 30,
    prerequisites: 'None',
    syllabus: 'Wireframing, Prototyping, Usability Testing',
  },
  {
    id: '4',
    title: 'Digital Marketing Strategies',
    description: 'Learn SEO, SEM, and social media marketing.',
    instructor: 'Mark Wilson',
    duration: '7 weeks',
    level: 'intermediate',
    category: 'marketing',
    price: 279.99,
    maxStudents: 45,
    prerequisites: 'Basic marketing knowledge',
    syllabus: 'SEO, PPC, Content Marketing',
  },
  {
    id: '5',
    title: 'Data Science with R',
    description: 'Analyze data using R and statistical methods.',
    instructor: 'Dr. Sarah Lee',
    duration: '10 weeks',
    level: 'advanced',
    category: 'data-science',
    price: 349.99,
    maxStudents: 35,
    prerequisites: 'Statistics, Basic Programming',
    syllabus: 'Data Wrangling, Visualization, Machine Learning',
  },
  {
    id: '6',
    title: 'Cybersecurity Essentials',
    description: 'Protect systems from cyber threats.',
    instructor: 'James Brown',
    duration: '6 weeks',
    level: 'beginner',
    category: 'cybersecurity',
    price: 229.99,
    maxStudents: 50,
    prerequisites: 'None',
    syllabus: 'Network Security, Encryption, Ethical Hacking',
  },
  {
    id: '7',
    title: 'Full Stack Web Development',
    description: 'Build web apps with Node.js and MongoDB.',
    instructor: 'Laura Martinez',
    duration: '12 weeks',
    level: 'intermediate',
    category: 'programming',
    price: 399.99,
    maxStudents: 40,
    prerequisites: 'HTML, CSS, JavaScript',
    syllabus: 'Frontend, Backend, APIs, Databases',
  },
  {
    id: '8',
    title: 'Graphic Design with Adobe Suite',
    description: 'Create stunning visuals with Photoshop and Illustrator.',
    instructor: 'Michael Chen',
    duration: '5 weeks',
    level: 'beginner',
    category: 'design',
    price: 199.99,
    maxStudents: 30,
    prerequisites: 'None',
    syllabus: 'Typography, Color Theory, Image Editing',
  },
  {
    id: '9',
    title: 'Business Analytics',
    description: 'Make data-driven business decisions.',
    instructor: 'Dr. Rachel Kim',
    duration: '8 weeks',
    level: 'intermediate',
    category: 'business',
    price: 299.99,
    maxStudents: 45,
    prerequisites: 'Basic Excel',
    syllabus: 'Data Analysis, Reporting, Forecasting',
  },
  {
    id: '10',
    title: 'Machine Learning with TensorFlow',
    description: 'Build ML models using TensorFlow.',
    instructor: 'Prof. David Patel',
    duration: '10 weeks',
    level: 'advanced',
    category: 'data-science',
    price: 349.99,
    maxStudents: 35,
    prerequisites: 'Python, Linear Algebra',
    syllabus: 'Neural Networks, Deep Learning, Model Evaluation',
  },
  {
    id: '11',
    title: 'Ethical Hacking Masterclass',
    description: 'Learn penetration testing and security auditing.',
    instructor: 'Lisa Thompson',
    duration: '7 weeks',
    level: 'intermediate',
    category: 'cybersecurity',
    price: 279.99,
    maxStudents: 40,
    prerequisites: 'Basic Networking',
    syllabus: 'Vulnerability Assessment, Exploitation, Reporting',
  },
  {
    id: '12',
    title: 'Mobile App Development with Flutter',
    description: 'Build cross-platform apps with Flutter.',
    instructor: 'Carlos Rivera',
    duration: '8 weeks',
    level: 'intermediate',
    category: 'programming',
    price: 299.99,
    maxStudents: 40,
    prerequisites: 'Basic Programming',
    syllabus: 'Dart, Widgets, State Management',
  },
  {
    id: '13',
    title: 'Product Management Essentials',
    description: 'Learn to build and launch successful products.',
    instructor: 'Anna Nguyen',
    duration: '6 weeks',
    level: 'beginner',
    category: 'business',
    price: 249.99,
    maxStudents: 50,
    prerequisites: 'None',
    syllabus: 'Roadmapping, User Stories, Agile',
  },
  {
    id: '14',
    title: 'Cloud Computing with AWS',
    description: 'Master AWS services for cloud solutions.',
    instructor: 'Dr. John Lee',
    duration: '9 weeks',
    level: 'intermediate',
    category: 'programming',
    price: 329.99,
    maxStudents: 35,
    prerequisites: 'Basic IT Knowledge',
    syllabus: 'EC2, S3, Lambda, VPC',
  },
  {
    id: '15',
    title: 'Content Creation for Social Media',
    description: 'Create engaging content for social platforms.',
    instructor: 'Sophie Evans',
    duration: '5 weeks',
    level: 'beginner',
    category: 'marketing',
    price: 199.99,
    maxStudents: 50,
    prerequisites: 'None',
    syllabus: 'Content Planning, Video Editing, Analytics',
  },
  {
    id: '16',
    title: 'Blockchain Development',
    description: 'Build decentralized apps with Ethereum.',
    instructor: 'Dr. Amit Sharma',
    duration: '10 weeks',
    level: 'advanced',
    category: 'programming',
    price: 349.99,
    maxStudents: 30,
    prerequisites: 'JavaScript, Cryptography',
    syllabus: 'Smart Contracts, DApps, Solidity',
  },
  {
    id: '17',
    title: 'Motion Graphics with After Effects',
    description: 'Create animations for video and web.',
    instructor: 'Olivia Clark',
    duration: '6 weeks',
    level: 'intermediate',
    category: 'design',
    price: 259.99,
    maxStudents: 35,
    prerequisites: 'Basic Video Editing',
    syllabus: 'Keyframes, Effects, Compositing',
  },
  {
    id: '18',
    title: 'Financial Modeling',
    description: 'Build financial models for business analysis.',
    instructor: 'William Harris',
    duration: '8 weeks',
    level: 'intermediate',
    category: 'business',
    price: 299.99,
    maxStudents: 40,
    prerequisites: 'Basic Finance',
    syllabus: 'Excel Modeling, Valuation, Forecasting',
  },
  {
    id: '19',
    title: 'Big Data with Hadoop',
    description: 'Process large datasets with Hadoop.',
    instructor: 'Dr. Emily Wong',
    duration: '10 weeks',
    level: 'advanced',
    category: 'data-science',
    price: 349.99,
    maxStudents: 30,
    prerequisites: 'Java, Linux',
    syllabus: 'HDFS, MapReduce, Hive',
  },
  {
    id: '20',
    title: 'Network Security Fundamentals',
    description: 'Secure networks against threats.',
    instructor: 'Daniel Kim',
    duration: '7 weeks',
    level: 'intermediate',
    category: 'cybersecurity',
    price: 279.99,
    maxStudents: 40,
    prerequisites: 'Basic Networking',
    syllabus: 'Firewalls, VPNs, IDS/IPS',
  },
  {
    id: '21',
    title: 'Game Development with Unity',
    description: 'Create 2D and 3D games with Unity.',
    instructor: 'Thomas Baker',
    duration: '8 weeks',
    level: 'intermediate',
    category: 'programming',
    price: 299.99,
    maxStudents: 35,
    prerequisites: 'Basic C#',
    syllabus: 'Game Physics, UI, Scripting',
  },
  {
    id: '22',
    title: 'SEO and Content Strategy',
    description: 'Optimize content for search engines.',
    instructor: 'Clara Lopez',
    duration: '6 weeks',
    level: 'beginner',
    category: 'marketing',
    price: 229.99,
    maxStudents: 50,
    prerequisites: 'None',
    syllabus: 'Keyword Research, On-Page SEO, Link Building',
  },
];

interface FetchCoursesResponse {
  courses: Course[];
  nextCursor: string | null;
  hasMore: boolean;
}

export const fetchCourses = async (
  limit: number = 10,
  cursor: string | null = null
): Promise<FetchCoursesResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay

  // Ensure mockCourses is consistently sorted for pagination logic
  const sortedCourses = [...mockCourses].sort((a, b) => a.id.localeCompare(b.id));

  let startIndex = 0;
  if (cursor) {
    // Find the index of the cursor, and start from the next element
    const cursorIndex = sortedCourses.findIndex((course) => course.id === cursor);
    if (cursorIndex !== -1) {
      startIndex = cursorIndex + 1;
    }
  }

  const endIndex = startIndex + limit;
  const paginatedCourses = sortedCourses.slice(startIndex, endIndex);

  // The next cursor should be the ID of the last item returned on the current page,
  // or null if there are no more items after this page.
  const nextCursor = paginatedCourses.length > 0 && endIndex < sortedCourses.length
    ? paginatedCourses[paginatedCourses.length - 1].id
    : null;

  const hasMore = endIndex < sortedCourses.length;

  return {
    courses: paginatedCourses,
    nextCursor,
    hasMore,
  };
};