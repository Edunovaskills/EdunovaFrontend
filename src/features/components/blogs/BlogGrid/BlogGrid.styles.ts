import styled from 'styled-components';

export const GridContainer = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px 60px;
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a202c;
  margin: 0 0 16px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #4a5568;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;
  margin-bottom: 60px;
  // --- START: Added for equal height cards ---
  align-items: stretch; /* Makes direct grid children stretch to the height of the tallest item in the row */
  // --- END: Added for equal height cards ---

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

export const LoadMoreButton = styled.button`
  padding: 16px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
