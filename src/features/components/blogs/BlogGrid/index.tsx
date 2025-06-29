import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react'; // Import ArrowLeft for BlogDetail's back button
import { Card } from 'shared/components/card';
import { Typography } from '@mui/material'; // Assuming this is from your setup

import {
  GridContainer,
  SectionHeader,
  SectionSubtitle,
  Grid,
  LoadMoreContainer,
  LoadMoreButton
} from './BlogGrid.styles'; 

import { BlogDetail } from '../BlogDetail/index';

// Define the BlogPost interface - updated to only include fields from backend
interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface BlogGridProps {
  posts: BlogPost[];
  loading?: boolean;
  onPostSelect: (postId: number) => void; // New prop for selecting a post
}

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, text.lastIndexOf(' ', maxLength)) + '...';
};

// --- START: BlogGrid Component (Updated) ---
export const BlogGrid: React.FC<BlogGridProps> = ({ posts, loading = false, onPostSelect }) => {
  const [displayCount, setDisplayCount] = useState(6);

  const displayedPosts = posts.slice(0, displayCount);
  const hasMorePosts = displayCount < posts.length;

  const handleCardClick = (post: BlogPost) => {
    console.log("Opening blog post:", post.title);
    onPostSelect(post.id); // Call the new prop to select the post
  };

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 6);
  };

  // If loading is true, you might want to show a skeleton loader here
  if (loading) {
    return (
      <GridContainer>
        <SectionHeader>
          <Typography variant='h4.600'>Latest Articles</Typography>
          <SectionSubtitle>
            Discover insights, tutorials, and stories from our community of experts
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
              actionText="Read Article"
              onClick={() => {}}
              onActionClick={() => {}}
              loading={true} // Assuming your Card component can handle a loading state for visuals
            />
          ))}
        </Grid>
      </GridContainer>
    );
  }

  return (
    <GridContainer>
      <SectionHeader>
        <Typography variant='h4.600'>Latest Articles</Typography>
        <SectionSubtitle>
          Discover insights, tutorials, and stories from our community of experts
        </SectionSubtitle>
      </SectionHeader>

      <Grid>
        {displayedPosts.map(post => (
          <Card
            key={post.id}
            title={post.title}
            description={truncateText(post.description, 150)} 
            image={post.image}
            type="blog"
            actionText="Read Article"
            onClick={() => handleCardClick(post)}
            onActionClick={(e) => {
              e.stopPropagation();
              handleCardClick(post);
            }}
          />
        ))}
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
  );
};
