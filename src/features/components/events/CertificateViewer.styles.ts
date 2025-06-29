import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const Container = styled.div`
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

export const Header = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  padding: 3rem 0;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 1;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const LogoText = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const HeaderDescription = styled.p`
  font-size: 1.3rem;
  opacity: 0.9;
  margin: 0;
  font-weight: 300;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

export const MainSection = styled.section`
  padding: 4rem 2rem;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

export const DownloadContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 4rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.8s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.3);

  @media (max-width: 768px) {
    padding: 2.5rem;
    border-radius: 20px;
  }
`;

export const DownloadTitle = styled.h2`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const DownloadSubtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CertificateInput = styled.input`
  flex: 1;
  padding: 1.2rem 1.8rem;
  border: 2px solid #e1e5e9;
  border-radius: 15px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
  font-weight: 500;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #6c757d;
    font-weight: 400;
  }
`;

export const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.2rem 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 180px;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    animation: ${pulse} 0.6s ease-in-out;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    animation: none;
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }
`;

export const LoadingSpinner = styled.div`
  width: 22px;
  height: 22px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #dc3545;
  background: linear-gradient(135deg, #fff5f5 0%, #fef2f2 100%);
  border: 2px solid #fed7d7;
  border-radius: 12px;
  padding: 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  animation: ${fadeIn} 0.3s ease-out;
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.1);
`;

export const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #28a745;
  background: linear-gradient(135deg, #f0fff4 0%, #f7fffa 100%);
  border: 2px solid #c3e6cb;
  border-radius: 12px;
  padding: 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  animation: ${fadeIn} 0.3s ease-out;
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.1);
`;

export const InfoSection = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  border-left: 4px solid #667eea;
`;

export const InfoTitle = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 600;
`;

export const InfoText = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 0.8rem;
  font-size: 0.95rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SampleKeys = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 10px;
  border: 1px solid #e1e5e9;
`;

export const SampleTitle = styled.h4`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 600;
`;

export const SampleKey = styled.code`
  display: inline-block;
  background: #f8f9fa;
  color: #667eea;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  margin: 0.2rem 0.5rem 0.2rem 0;
  border: 1px solid #e1e5e9;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-1px);
  }
`;

export const DownloadProgress = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  border-radius: 10px;
  text-align: center;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ProgressText = styled.p`
  color: #667eea;
  font-weight: 600;
  margin: 0;
  font-size: 1rem;
`;