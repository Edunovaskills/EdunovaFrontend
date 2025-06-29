import React from 'react';
import { ArrowLeft, Calendar, BookOpen, User, Share2 } from 'lucide-react';
import {
  DetailsContainer,
  Header,
  HeaderContent,
  BackButton,
  MainContent,
  ContentGrid,
  LeftColumn,
  RightColumn,
  HeroImageContainer,
  HeroContent,
  HeroTitle,
  InfoCard,
  SectionTitle,
  DescriptionText,
  SidebarCard,
  ActionButtons,
  SecondaryButton,
  InfoGrid,
  InfoItem,
  InfoIcon,
  InfoDetails,
  AuthorSection,
  AuthorAvatar,
  AuthorInfo,
  RelatedPostsSection,
  RelatedPostsGrid,
  RelatedPostCard,
  CategoryBadge, 
  BadgeContainer 
} from './BlogDetail.styles'; 



// Define the BlogPost interface (matches simplified backend data)
interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface BlogDetailProps {
  post: BlogPost;
  onBack: () => void; // Function to navigate back to the blog list
}

// Mock related posts (since we don't have a backend query for them)
// In a real application, you'd fetch these based on the current post's category or tags
const mockRelatedPosts: BlogPost[] = [
  {
    id: 101,
    title: "Understanding CSS Grid Layouts",
    description: "A quick guide to mastering CSS Grid for modern web design.",
    image: "https://placehold.co/400x250/F0F0F0/333333?text=Related+Post+1",
  },
  {
    id: 102,
    title: "JavaScript ES6 Features You Should Know",
    description: "Dive into the essential features introduced in ECMAScript 2015.",
    image: "https://placehold.co/400x250/E0E0E0/444444?text=Related+Post+2",
  },
];

export const BlogDetail: React.FC<BlogDetailProps> = ({ post, onBack }) => {

  const handleShare = () => {
    if (navigator.share && post) {
      navigator
        .share({
          title: post.title,
          text: post.description, // Use full description for sharing
          url: window.location.href,
        })
        .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      // Using document.execCommand('copy') as navigator.clipboard.writeText() may not work in iframes
      const dummyTextArea = document.createElement('textarea');
      dummyTextArea.value = window.location.href;
      document.body.appendChild(dummyTextArea);
      dummyTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(dummyTextArea);
      alert('Link copied to clipboard!'); // Using alert as a temporary fallback, consider a custom modal
    }
  };

  if (!post) {
    return (
      <DetailsContainer>
        <Header>
          <HeaderContent>
            <BackButton onClick={onBack}>
              <ArrowLeft />
              Back to Articles
            </BackButton>
          </HeaderContent>
        </Header>
        <MainContent>
          <InfoCard style={{ maxWidth: '32rem', margin: '2rem auto', padding: '2rem', textAlign: 'center' }}>
            <SectionTitle style={{ color: '#dc2626', marginBottom: '1rem' }}>
              Blog Post Not Found
            </SectionTitle>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <SecondaryButton onClick={onBack} style={{ background: '#2563eb', color: 'white', border: 'none' }}>
              Back to Articles
            </SecondaryButton>
          </InfoCard>
        </MainContent>
      </DetailsContainer>
    );
  }

  // Mock data for author, published date, read time (since not from backend)
  const mockAuthor = "Jane Doe";
  const mockPublishedDate = "2024-06-25"; // A fixed mock date
  const mockReadTime = "5 min"; // A fixed mock read time
  const mockCategory = "Technology"; // A fixed mock category

  return (
    <DetailsContainer>
      <Header>
        <HeaderContent>
          <BackButton onClick={onBack}>
            <ArrowLeft />
            Back to Articles
          </BackButton>
        </HeaderContent>
      </Header>

      <MainContent>
        <ContentGrid>
          <LeftColumn>
            <HeroImageContainer>
              <img
                src={post.image || 'https://placehold.co/800x450/F0F0F0/333333?text=Blog+Image'}
                alt={post.title}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/800x450/F0F0F0/333333?text=Blog+Image';
                }}
              />
              <HeroContent>
                <BadgeContainer>
                  <CategoryBadge>{mockCategory}</CategoryBadge>
                </BadgeContainer>
                <HeroTitle>{post.title}</HeroTitle>
              </HeroContent>
            </HeroImageContainer>

            <InfoCard>
              <InfoGrid>
                <InfoItem>
                  <InfoIcon $color={theme.colors.blue[100]}> {/* Use theme colors */}
                    <Calendar />
                  </InfoIcon>
                  <InfoDetails>
                    <p>Published</p>
                    <p>{new Date(mockPublishedDate).toLocaleDateString()}</p>
                  </InfoDetails>
                </InfoItem>
                <InfoItem>
                  <InfoIcon $color={theme.colors.green[100]}> {/* Use theme colors */}
                    <BookOpen />
                  </InfoIcon>
                  <InfoDetails>
                    <p>Read Time</p>
                    <p>{mockReadTime}</p>
                  </InfoDetails>
                </InfoItem>
                <InfoItem>
                  <InfoIcon $color={theme.colors.purple[100]}> {/* Use theme colors */}
                    <User />
                  </InfoIcon>
                  <InfoDetails>
                    <p>Author</p>
                    <p>{mockAuthor}</p>
                  </InfoDetails>
                </InfoItem>
              </InfoGrid>

              <div>
                <SectionTitle>About This Article</SectionTitle>
                <DescriptionText>
                  {/*
                    The description from the backend is now the main content.
                    If you expect paragraphs, ensure your backend provides line breaks
                    or rich text format, and parse it accordingly (e.g., dangerouslySetInnerHTML
                    if it's HTML, or a Markdown parser if it's Markdown).
                    For now, it's treated as a single block of text or split by newline.
                  */}
                  {post.description.split('\n').map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  {/* Add more mock content here to fill out the page similar to an event */}
                  <p>This is a placeholder for the extended content of the blog post. In a real-world scenario, this section would contain the full article fetched from your backend, potentially including rich text, images, code snippets, and more. For demonstration purposes, we are using the `description` field as the primary content source.</p>
                  <h3>Key Takeaways</h3>
                  <ul>
                      <li>Understanding the fundamentals of web technologies.</li>
                      <li>Importance of responsive design for all devices.</li>
                      <li>Best practices for clean and maintainable code.</li>
                      <li>Community engagement and continuous learning.</li>
                  </ul>
                  <p>We hope this article provided valuable insights. Stay tuned for more content from our team of experts!</p>
                </DescriptionText>
              </div>
            </InfoCard>

            <AuthorSection>
              <AuthorAvatar src="https://placehold.co/100x100/A0A0A0/FFFFFF?text=JD" alt={mockAuthor} />
              <AuthorInfo>
                <h3>{mockAuthor}</h3>
                <p>Lead Web Developer & Tech Enthusiast</p>
                <p>Specializes in React, Node.js, and modern web architectures. Passionate about sharing knowledge and fostering developer communities.</p>
              </AuthorInfo>
            </AuthorSection>
          </LeftColumn>

          <RightColumn>
            <SidebarCard>
              <ActionButtons>
                <SecondaryButton onClick={handleShare}>
                  <Share2 />
                  Share Article
                </SecondaryButton>
              </ActionButtons>

              <RelatedPostsSection>
                <h3>More Articles You Might Like</h3>
                <RelatedPostsGrid>
                  {mockRelatedPosts.map(relatedPost => (
                    <RelatedPostCard key={relatedPost.id} onClick={() => alert(`Navigating to related post: ${relatedPost.title}`)}>
                      <h4>{relatedPost.title}</h4>
                      <p>{truncateText(relatedPost.description, 70)}</p>
                    </RelatedPostCard>
                  ))}
                </RelatedPostsGrid>
              </RelatedPostsSection>
            </SidebarCard>
          </RightColumn>
        </ContentGrid>
      </MainContent>
    </DetailsContainer>
  );
};
