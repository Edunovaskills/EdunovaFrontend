import React, { useState, useEffect } from 'react'
import { HeroSection } from 'shared/components/HeroSection'
import { BlogGrid } from 'features/components/blogs/BlogGrid'
import { LoadingSpinner } from 'shared/components/LoadingSpinner'
import { BlogPageContainer } from './BlogPage.styles'

interface BlogPost {
  id: number
  title: string
  description: string
  image: string
  category: string
  publishedDate: string
  readTime: number
  author: string
}

// Mock data - replace with actual API call
const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Web Development: Trends to Watch in 2024',
    description:
      'Explore the latest trends shaping the future of web development, from AI integration to progressive web apps and beyond.',
    image:
      'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Technology',
    publishedDate: '2024-01-15',
    readTime: 8,
    author: 'Sarah Johnson',
  },
  {
    id: 2,
    title: 'Mastering React Hooks: A Complete Guide',
    description:
      'Deep dive into React Hooks with practical examples and best practices for modern React development.',
    image:
      'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Programming',
    publishedDate: '2024-01-12',
    readTime: 12,
    author: 'Mike Chen',
  },
  {
    id: 3,
    title: 'Design Systems: Building Consistent User Experiences',
    description:
      'Learn how to create and maintain design systems that scale across teams and products.',
    image:
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Design',
    publishedDate: '2024-01-10',
    readTime: 6,
    author: 'Emma Davis',
  },
  {
    id: 4,
    title: 'The Art of Code Review: Best Practices for Teams',
    description:
      'Discover effective strategies for conducting code reviews that improve code quality and team collaboration.',
    image:
      'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Programming',
    publishedDate: '2024-01-08',
    readTime: 10,
    author: 'David Wilson',
  },
  {
    id: 5,
    title: 'Mobile-First Design: Creating Responsive Experiences',
    description:
      'Master the principles of mobile-first design and create seamless experiences across all devices.',
    image:
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Design',
    publishedDate: '2024-01-05',
    readTime: 7,
    author: 'Lisa Anderson',
  },
  {
    id: 6,
    title: 'Understanding TypeScript: From Basics to Advanced',
    description:
      'A comprehensive guide to TypeScript that takes you from beginner to advanced concepts.',
    image:
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Programming',
    publishedDate: '2024-01-03',
    readTime: 15,
    author: 'Alex Rodriguez',
  },
  {
    id: 7,
    title: 'The Psychology of User Interface Design',
    description:
      'Explore how psychological principles can be applied to create more intuitive and engaging user interfaces.',
    image:
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Design',
    publishedDate: '2024-01-01',
    readTime: 9,
    author: 'Rachel Green',
  },
  {
    id: 8,
    title: 'Building Scalable APIs with Node.js',
    description:
      'Learn how to design and build robust, scalable APIs using Node.js and modern development practices.',
    image:
      'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Technology',
    publishedDate: '2023-12-28',
    readTime: 11,
    author: 'Tom Brown',
  },
  {
    id: 9,
    title: 'Advanced CSS Animations and Transitions',
    description:
      'Create stunning animations and smooth transitions that enhance user experience without compromising performance.',
    image:
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Design',
    publishedDate: '2023-12-25',
    readTime: 9,
    author: 'Emma Davis',
  },
  {
    id: 10,
    title: 'Microservices Architecture: A Practical Guide',
    description:
      'Understanding when and how to implement microservices architecture for scalable applications.',
    image:
      'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Technology',
    publishedDate: '2023-12-20',
    readTime: 13,
    author: 'David Wilson',
  },
  {
    id: 11,
    title: 'State Management in React: Redux vs Context API',
    description:
      'Compare different state management solutions and learn when to use each approach in your React applications.',
    image:
      'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Programming',
    publishedDate: '2023-12-18',
    readTime: 11,
    author: 'Sarah Johnson',
  },
  {
    id: 12,
    title: 'Accessibility in Web Development: A Complete Guide',
    description:
      'Learn how to build inclusive web applications that work for everyone, including users with disabilities.',
    image:
      'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Design',
    publishedDate: '2023-12-15',
    readTime: 14,
    author: 'Lisa Anderson',
  },
]

export const BlogPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  // Simulate API call
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setBlogPosts(mockBlogPosts)
      setLoading(false)
    }

    fetchBlogPosts()
  }, [])

  if (loading) {
    return (
      <BlogPageContainer>
        <HeroSection
          title="Our Blog"
          subtitle="Insights & Stories"
          description="Discover the latest insights, tutorials, and stories from our team of experts."
          type="blogs"
        />
        <div style={{ padding: '80px 24px' }}>
          <LoadingSpinner message="Loading amazing content..." size="lg" />
        </div>
      </BlogPageContainer>
    )
  }

  return (
    <BlogPageContainer>
      <HeroSection
        title="Our Blog"
        subtitle="Insights & Stories"
        description="Discover the latest insights, tutorials, and stories from our team of experts."
        type="blogs"
      />

      <div style={{ marginTop: '100px' }}>
        <BlogGrid posts={blogPosts} onPostSelect={() => {}} />
      </div>
    </BlogPageContainer>
  )
}
