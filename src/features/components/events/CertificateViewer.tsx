import React, { useState } from 'react'
import { Download, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import * as S from './CertificateViewer.styles'
import { Typography } from '@mui/material'
import { useDownloadCertificate } from 'entities/query'

export const CertificateViewer: React.FC = () => {
  const [certificateKey, setCertificateKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isDownloading, setIsDownloading] = useState(false)

  const { download } = useDownloadCertificate()

  const handleDownload = async () => {
    if (!certificateKey.trim()) {
      setError('Please enter a certificate key')
      return
    }

    setIsLoading(true)
    setError('')
    setSuccessMessage('')

    setIsDownloading(true)
    try {
      await download(certificateKey)
      setSuccessMessage('Your certificate download has started!')
      setError('')
    } catch {
      setError(
        'Certificate not found or download failed. Please check your certificate key and try again.'
      )
    } finally {
      setIsLoading(false)
      setIsDownloading(false)
      setCertificateKey('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDownload()
    }
  }

  return (
    <S.Container>
      <S.MainSection>
        <S.DownloadContainer>
          <Typography variant="h4.600">Download Your Certificate</Typography>
          <S.DownloadSubtitle>
            Enter your unique certificate key below to download your official
            certificate as a PDF document.
          </S.DownloadSubtitle>

          <S.InputContainer>
            <S.CertificateInput
              type="text"
              placeholder="Enter your certificate key (e.g., Edunova-2024-001)"
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
              <FileText
                size={20}
                style={{ display: 'inline', marginRight: '8px' }}
              />
              How it works
            </S.InfoTitle>
            <S.InfoText>
              • Enter your unique certificate key in the field above
            </S.InfoText>
            <S.InfoText>
              • Click the "Download" button to search for your certificate
            </S.InfoText>
            <S.InfoText>
              • Your certificate will open in a new window ready for download as
              PDF
            </S.InfoText>
            <S.InfoText>
              • Use your browser's print function and select "Save as PDF" to
              download
            </S.InfoText>
          </S.InfoSection>
        </S.DownloadContainer>
      </S.MainSection>
    </S.Container>
  )
}
