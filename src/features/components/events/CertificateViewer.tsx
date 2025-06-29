import React, { useState } from 'react';
import { Download, FileText, CheckCircle, AlertCircle, Award } from 'lucide-react';
import * as S from './CertificateViewer.styles';
import { Typography } from '@mui/material';

interface Certificate {
  id: string;
  recipientName: string;
  courseName: string;
  completionDate: string;
  issueDate: string;
  instructor: string;
  institution: string;
  certificateNumber: string;
  grade?: string;
}

// Mock certificate database
const certificateDatabase: Record<string, Certificate> = {
  'CERT-2024-001': {
    id: 'CERT-2024-001',
    recipientName: 'John Smith',
    courseName: 'Advanced React Development',
    completionDate: '2024-01-15',
    issueDate: '2024-01-20',
    instructor: 'Dr. Sarah Johnson',
    institution: 'TechEdu Academy',
    certificateNumber: 'CERT-2024-001',
    grade: 'A+'
  },
  'CERT-2024-002': {
    id: 'CERT-2024-002',
    recipientName: 'Emily Davis',
    courseName: 'Full Stack Web Development',
    completionDate: '2024-02-10',
    issueDate: '2024-02-15',
    instructor: 'Prof. Michael Chen',
    institution: 'Digital Learning Institute',
    certificateNumber: 'CERT-2024-002',
    grade: 'A'
  },
  'CERT-2024-003': {
    id: 'CERT-2024-003',
    recipientName: 'Alex Rodriguez',
    courseName: 'Machine Learning Fundamentals',
    completionDate: '2024-03-05',
    issueDate: '2024-03-10',
    instructor: 'Dr. Lisa Wang',
    institution: 'AI Education Center',
    certificateNumber: 'CERT-2024-003',
    grade: 'A-'
  }
};

export const CertificateViewer: React.FC = () => {
  const [certificateKey, setCertificateKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const generateCertificatePDF = (certificate: Certificate): string => {
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate - ${certificate.recipientName}</title>
          <style>
            @page {
              size: A4 landscape;
              margin: 0;
            }
            body {
              font-family: 'Georgia', serif;
              margin: 0;
              padding: 40px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              height: 100vh;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
            }
            .certificate-container {
              width: 100%;
              max-width: 900px;
              padding: 60px;
              border: 8px solid rgba(255, 255, 255, 0.3);
              border-radius: 20px;
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
              position: relative;
            }
            .certificate-container::before {
              content: '';
              position: absolute;
              top: 20px;
              left: 20px;
              right: 20px;
              bottom: 20px;
              border: 2px solid rgba(255, 255, 255, 0.2);
              border-radius: 15px;
            }
            .certificate-header {
              margin-bottom: 40px;
              position: relative;
              z-index: 1;
            }
            .certificate-title {
              font-size: 48px;
              font-weight: bold;
              margin-bottom: 15px;
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
              letter-spacing: 2px;
            }
            .certificate-subtitle {
              font-size: 20px;
              opacity: 0.9;
              font-style: italic;
              margin: 0;
            }
            .certificate-content {
              margin: 40px 0;
              line-height: 1.8;
              position: relative;
              z-index: 1;
            }
            .recipient-name {
              font-size: 42px;
              font-weight: bold;
              margin: 25px 0;
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
              text-decoration: underline;
              text-decoration-color: rgba(255, 255, 255, 0.5);
              text-underline-offset: 10px;
            }
            .course-name {
              font-size: 32px;
              font-weight: 600;
              margin: 25px 0;
              color: #ffd700;
              text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
            }
            .certificate-text {
              font-size: 18px;
              margin: 15px 0;
              opacity: 0.95;
            }
            .grade-text {
              font-size: 22px;
              font-weight: 600;
              margin: 20px 0;
              color: #ffd700;
              text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
            }
            .certificate-details {
              display: flex;
              justify-content: space-between;
              margin-top: 50px;
              padding-top: 30px;
              border-top: 2px solid rgba(255, 255, 255, 0.3);
              position: relative;
              z-index: 1;
            }
            .detail-section {
              text-align: center;
              flex: 1;
            }
            .detail-label {
              font-size: 14px;
              opacity: 0.8;
              margin-bottom: 8px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .detail-value {
              font-size: 16px;
              font-weight: 600;
              line-height: 1.4;
            }
            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 120px;
              opacity: 0.05;
              font-weight: bold;
              z-index: 0;
              pointer-events: none;
            }
          </style>
        </head>
        <body>
          <div class="certificate-container">
           
            <div class="certificate-content">
              <div class="recipient-name">${certificate.recipientName}</div>
              <div class="certificate-text">has successfully completed the course</div>
              <div class="course-name">${certificate.courseName}</div>
              <div class="certificate-text">and has demonstrated proficiency in the subject matter</div>
              ${certificate.grade ? `<div class="grade-text">with a grade of ${certificate.grade}</div>` : ''}
            </div>
            <div class="certificate-details">
              <div class="detail-section">
                <div class="detail-label">Completion Date</div>
                <div class="detail-value">${new Date(certificate.completionDate).toLocaleDateString()}</div>
              </div>
              <div class="detail-section">
                <div class="detail-label">Instructor</div>
                <div class="detail-value">${certificate.instructor}</div>
              </div>
              <div class="detail-section">
                <div class="detail-label">Institution</div>
                <div class="detail-value">${certificate.institution}</div>
              </div>
              <div class="detail-section">
                <div class="detail-label">Certificate No.</div>
                <div class="detail-value">${certificate.certificateNumber}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    return certificateHTML;
  };

  const handleDownload = async () => {
    if (!certificateKey.trim()) {
      setError('Please enter a certificate key');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    // Simulate API call delay
    setTimeout(() => {
      const foundCertificate = certificateDatabase[certificateKey.toUpperCase()];
      
      if (foundCertificate) {
        setIsDownloading(true);
        
        // Simulate download preparation time
        setTimeout(() => {
          const certificateHTML = generateCertificatePDF(foundCertificate);
          
          // Create a new window for printing/downloading
          const printWindow = window.open('', '_blank');
          if (printWindow) {
            printWindow.document.write(certificateHTML);
            printWindow.document.close();
            printWindow.focus();
            
            // Trigger print dialog which allows saving as PDF
            setTimeout(() => {
              printWindow.print();
            }, 500);
          }
          
          setSuccessMessage(`Certificate for ${foundCertificate.recipientName} has been prepared for download!`);
          setIsDownloading(false);
        }, 1500);
        
        setError('');
      } else {
        setError('Certificate not found. Please check your certificate key and try again.');
        setIsDownloading(false);
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDownload();
    }
  };

  const handleSampleKeyClick = (key: string) => {
    setCertificateKey(key);
    setError('');
    setSuccessMessage('');
  };

  return (
    <S.Container>
      
      <S.MainSection>
        <S.DownloadContainer>
          <Typography variant='h4.600'>Download Your Certificate</Typography>
          <S.DownloadSubtitle>
            Enter your unique certificate key below to download your official certificate as a PDF document.
          </S.DownloadSubtitle>
          
          <S.InputContainer>
            <S.CertificateInput
              type="text"
              placeholder="Enter your certificate key (e.g., CERT-2024-001)"
              value={certificateKey}
              onChange={(e) => setCertificateKey(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading || isDownloading}
            />
            <S.DownloadButton 
              onClick={handleDownload} 
              disabled={isLoading || !certificateKey.trim() || isDownloading}
            >
              {isLoading ? (
                <>
                  <S.LoadingSpinner />
                  Searching...
                </>
              ) : isDownloading ? (
                <>
                  <S.LoadingSpinner />
                  Preparing...
                </>
              ) : (
                <>
                  <Download size={20} />
                  Download
                </>
              )}
            </S.DownloadButton>
          </S.InputContainer>
          
          {error && (
            <S.ErrorMessage>
              <AlertCircle size={18} />
              {error}
            </S.ErrorMessage>
          )}

          {successMessage && (
            <S.SuccessMessage>
              <CheckCircle size={18} />
              {successMessage}
            </S.SuccessMessage>
          )}

          {isDownloading && (
            <S.DownloadProgress>
              <S.ProgressText>
                Preparing your certificate for download...
              </S.ProgressText>
            </S.DownloadProgress>
          )}

          <S.InfoSection>
            <S.InfoTitle>
              <FileText size={20} style={{ display: 'inline', marginRight: '8px' }} />
              How it works
            </S.InfoTitle>
            <S.InfoText>
              • Enter your unique certificate key in the field above
            </S.InfoText>
            <S.InfoText>
              • Click the "Download" button to search for your certificate
            </S.InfoText>
            <S.InfoText>
              • Your certificate will open in a new window ready for download as PDF
            </S.InfoText>
            <S.InfoText>
              • Use your browser's print function and select "Save as PDF" to download
            </S.InfoText>

            <S.SampleKeys>
              <S.SampleTitle>Try these sample certificate keys:</S.SampleTitle>
              <S.SampleKey onClick={() => handleSampleKeyClick('CERT-2024-001')}>
                CERT-2024-001
              </S.SampleKey>
              <S.SampleKey onClick={() => handleSampleKeyClick('CERT-2024-002')}>
                CERT-2024-002
              </S.SampleKey>
              <S.SampleKey onClick={() => handleSampleKeyClick('CERT-2024-003')}>
                CERT-2024-003
              </S.SampleKey>
            </S.SampleKeys>
          </S.InfoSection>
        </S.DownloadContainer>
      </S.MainSection>
    </S.Container>
  );
};