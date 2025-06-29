import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react' // Import ArrowLeft for BlogDetail's back button
import { Card } from 'shared/components/card'
import { Typography } from '@mui/material' // Assuming this is from your setup

import {
  GridContainer,
  SectionHeader,
  SectionSubtitle,
  Grid,
  LoadMoreContainer,
  LoadMoreButton,
} from './BlogGrid.styles'

import { useAllBlogsQuery } from 'entities/query'
import type { Blog } from 'entities/model/blog.model'

// Define the BlogPost interface - updated to only include fields from backend
interface BlogPost {
  id: number
  title: string
  description: string
  image: string
}

interface BlogGridProps {
  posts: BlogPost[]
  loading?: boolean
  onPostSelect: (postId: string) => void // New prop for selecting a post
}

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text
  }
  return text.substring(0, text.lastIndexOf(' ', maxLength)) + '...'
}

// --- START: BlogGrid Component (Updated) ---
export const BlogGrid: React.FC<BlogGridProps> = ({ onPostSelect }) => {
  const { data: posts, isLoading } = useAllBlogsQuery()

  const [displayCount, setDisplayCount] = useState(6)
  const [expanded, setExpanded] = useState<{ [id: string]: boolean }>({})

  const displayedPosts = posts?.data?.blogs?.slice(0, displayCount)
  const hasMorePosts = displayCount < (posts?.data?.blogs?.length ?? 0) || false

  const handleCardClick = (post: Blog) => {
    onPostSelect(post._id) // Call the new prop to select the post
  }

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 6)
  }

  const handleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // If loading is true, you might want to show a skeleton loader here
  if (isLoading) {
    return (
      <GridContainer>
        <SectionHeader>
          <Typography variant="h4.600">Latest Articles</Typography>
          <SectionSubtitle>
            Discover insights, tutorials, and stories from our community of
            experts
          </SectionSubtitle>
        </SectionHeader>
        <Grid>
          {/* Render skeleton cards if loading */}
          {Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={`skeleton-${index}`}
              title="Loading..."
              description="Fetching content..."
              image="https://placehold.co/400x250/e0e0e0/ffffff?text=Loading"
              type="blog"
            />
          ))}
        </Grid>
      </GridContainer>
    )
  }

  return (
    <GridContainer>
      <SectionHeader>
        <Typography variant="h4.600">Latest Articles</Typography>
        <SectionSubtitle>
          Discover insights, tutorials, and stories from our community of
          experts
        </SectionSubtitle>
      </SectionHeader>

      <Grid>
        {displayedPosts?.map((post) => {
          const isExpanded = expanded[post._id]
          const truncated = post.description.length > 150 && !isExpanded
          const description = truncated
            ? post.description.substring(0, 150) + '...'
            : post.description
          return (
            <Card
              key={post._id}
              title={post.title}
              description={
                <div
                  style={{
                    maxHeight: isExpanded ? 180 : 60,
                    overflowY: isExpanded ? 'auto' : 'hidden',
                    transition: 'max-height 0.3s',
                    position: 'relative',
                  }}
                >
                  {description}
                  {truncated && (
                    <span
                      style={{
                        color: '#ea580c',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginLeft: 4,
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleExpand(post._id)
                      }}
                    >
                      Read More
                    </span>
                  )}
                </div>
              }
              image={post.image}
              type="blog"
              onClick={() => handleCardClick(post)}
            />
          )
        })}
      </Grid>

      {hasMorePosts && (
        <LoadMoreContainer>
          <LoadMoreButton onClick={handleLoadMore}>
            Load More Articles
            <ChevronDown />
          </LoadMoreButton>
        </LoadMoreContainer>
      )}
    </GridContainer>
  )
}
