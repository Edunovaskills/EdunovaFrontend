export type CareerOpeningData = {
  jobTitle: string
  location: string
  responsibilities: string
  whyWe?: {
    title: string
    subTitle: string
  }[]
}

export const careerDataMock: CareerOpeningData[] = [
  {
    jobTitle: 'Apply as a Roadie (Driver)',
    location: 'Anywhere in India',
    responsibilities:
      'Transport passengers or goods efficiently while ensuring safety and professionalism.',
    whyWe: [
      {
        title: 'Flexible Hours',
        subTitle: 'Set your own schedule and work when it suits you best.',
      },
      {
        title: 'Competitive Earnings',
        subTitle:
          'Earn more with our attractive commission structure and incentives.',
      },
      {
        title: 'Supportive Community',
        subTitle: 'Be part of a team that values and supports its drivers.',
      },
    ],
  },
  {
    jobTitle: 'Customer Support Specialist',
    location: 'Remote',
    responsibilities:
      'Provide exceptional customer service and resolve inquiries in a timely manner.',
    whyWe: [
      {
        title: 'Work from Anywhere',
        subTitle: 'Enjoy the flexibility of remote work opportunities.',
      },
      {
        title: 'Career Growth',
        subTitle: 'We provide regular training and professional development.',
      },
      {
        title: 'Collaborative Environment',
        subTitle: 'Join a team that fosters open communication and innovation.',
      },
    ],
  },
  {
    jobTitle: 'Software Engineer',
    location: 'Bangalore, India',
    responsibilities:
      'Design, develop, and maintain software solutions for our platform.',
    whyWe: [
      {
        title: 'Innovative Projects',
        subTitle: 'Work on cutting-edge technology and impactful projects.',
      },
      {
        title: 'Competitive Salary',
        subTitle: 'We offer industry-leading compensation packages.',
      },
      {
        title: 'Supportive Team',
        subTitle: 'Be part of a highly skilled and collaborative team.',
      },
    ],
  },
  {
    jobTitle: 'Marketing Specialist',
    location: 'Delhi, India',
    responsibilities:
      'Develop and execute marketing strategies to promote our brand.',
    whyWe: [
      {
        title: 'Creative Freedom',
        subTitle:
          'We value and encourage out-of-the-box thinking and creativity.',
      },
      {
        title: 'Performance Bonuses',
        subTitle: 'Get rewarded for achieving and exceeding targets.',
      },
      {
        title: 'Global Reach',
        subTitle: 'Be part of a brand with a worldwide impact.',
      },
    ],
  },
  {
    jobTitle: 'Data Analyst',
    location: 'Hyderabad, India',
    responsibilities:
      'Analyze large datasets to drive business insights and decisions.',
    whyWe: [
      {
        title: 'Data-Driven Culture',
        subTitle: 'Work in an organization that values data-driven decisions.',
      },
      {
        title: 'Cutting-Edge Tools',
        subTitle: 'Access to modern analytics tools and platforms.',
      },
      {
        title: 'Learning Opportunities',
        subTitle: 'Continuous learning and growth are part of our culture.',
      },
    ],
  },
  {
    jobTitle: 'UX Designer',
    location: 'Remote',
    responsibilities:
      'Create intuitive and visually appealing user experiences for our products.',
    whyWe: [
      {
        title: 'Creative Challenges',
        subTitle: 'Design solutions that solve real-world user problems.',
      },
      {
        title: 'Flexible Work Environment',
        subTitle: 'Enjoy working remotely with a supportive team.',
      },
      {
        title: 'Recognition for Excellence',
        subTitle: 'Get recognized for your creative contributions.',
      },
    ],
  },
  {
    jobTitle: 'Product Manager',
    location: 'Mumbai, India',
    responsibilities:
      'Define product roadmaps and coordinate with teams to deliver features.',
    whyWe: [
      {
        title: 'Leadership Opportunities',
        subTitle: 'Take charge of impactful projects.',
      },
      {
        title: 'Collaborative Teams',
        subTitle: 'Work alongside cross-functional teams to create products.',
      },
      {
        title: 'Career Growth',
        subTitle:
          'Advance your career in a supportive and fast-paced environment.',
      },
    ],
  },
  {
    jobTitle: 'Content Writer',
    location: 'Kolkata, India',
    responsibilities:
      'Write high-quality content for blogs, social media, and marketing campaigns.',
    whyWe: [
      {
        title: 'Creative Expression',
        subTitle: 'We value your unique voice and perspective.',
      },
      {
        title: 'Wide Reach',
        subTitle: 'Your work will reach a large and diverse audience.',
      },
      {
        title: 'Dynamic Environment',
        subTitle: 'Work in a fast-paced, creative environment.',
      },
    ],
  },
  {
    jobTitle: 'HR Specialist',
    location: 'Pune, India',
    responsibilities:
      'Recruit, onboard, and manage employee engagement programs.',
    whyWe: [
      {
        title: 'People-Centric Culture',
        subTitle: 'Join a company that values its people above all.',
      },
      {
        title: 'Opportunities for Impact',
        subTitle: 'Make a meaningful impact on company culture.',
      },
      {
        title: 'Growth-Oriented',
        subTitle: 'We prioritize personal and professional development.',
      },
    ],
  },
  {
    jobTitle: 'Sales Executive',
    location: 'Chennai, India',
    responsibilities:
      'Identify potential clients, pitch solutions, and close deals.',
    whyWe: [
      {
        title: 'Attractive Commissions',
        subTitle: 'Earn competitive commissions and bonuses.',
      },
      {
        title: 'Target-Oriented Incentives',
        subTitle: 'Get rewarded for achieving and exceeding goals.',
      },
      {
        title: 'Networking Opportunities',
        subTitle: 'Build relationships with industry leaders.',
      },
    ],
  },
]
