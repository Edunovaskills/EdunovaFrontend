import React from 'react'
import { useEnquiryByIdQuery } from 'entities/query/enquiry/get-enquiry-by-id.query'

interface EnquiryDetailModalProps {
  enquiryId?: string
  onClose: () => void
}

const modalStyles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'hidden',
    position: 'relative' as const,
    animation: 'modalSlideIn 0.3s ease-out',
  },
  header: {
    padding: '24px 32px 16px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: '#64748b',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    '&:hover': {
      backgroundColor: '#f1f5f9',
      color: '#1e293b',
    },
  },
  content: {
    padding: '32px',
    maxHeight: 'calc(90vh - 120px)',
    overflowY: 'auto' as const,
  },
  section: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    marginBottom: '8px',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  sectionContent: {
    fontSize: '16px',
    color: '#1e293b',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
    padding: '20px',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: '600',
    flexShrink: 0,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '4px',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  userEmail: {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '4px',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  userPhone: {
    fontSize: '14px',
    color: '#64748b',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  messageContainer: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '20px',
    maxHeight: '150px',
    overflowY: 'auto' as const,
  },
  messageText: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#374151',
    whiteSpace: 'pre-wrap' as const,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  statusResolved: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  statusPending: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  dateInfo: {
    display: 'flex',
    gap: '24px',
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #e2e8f0',
  },
  dateItem: {
    flex: 1,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 32px',
    gap: '16px',
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 32px',
    gap: '16px',
    color: '#dc2626',
  },
}

export const EnquiryDetailModal: React.FC<EnquiryDetailModalProps> = ({
  enquiryId,
  onClose,
}) => {
  const { data: enquiry, isLoading, error } = useEnquiryByIdQuery(enquiryId)

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }
  if (!enquiryId) return null

  return (
    <div
      style={modalStyles.overlay}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div style={modalStyles.modal}>
        <div style={modalStyles.header}>
          <h2 style={modalStyles.title}>Enquiry Details</h2>
          <button
            onClick={onClose}
            style={modalStyles.closeButton}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div style={modalStyles.content}>
          {isLoading ? (
            <div style={modalStyles.loadingContainer}>
              <div style={modalStyles.loadingSpinner}></div>
              <p>Loading enquiry details...</p>
            </div>
          ) : error ? (
            <div style={modalStyles.errorContainer}>
              <h3>Error loading enquiry</h3>
              <p>Please try again later.</p>
            </div>
          ) : enquiry ? (
            <>
              {/* User Information */}
              <div style={modalStyles.userInfo}>
                <div style={modalStyles.avatar}>
                  {enquiry?.data?.enquiryById?.fullName
                    ?.charAt(0)
                    .toUpperCase()}
                </div>
                <div style={modalStyles.userDetails}>
                  <div style={modalStyles.userName}>
                    {enquiry?.data?.enquiryById?.fullName}
                  </div>
                  <div style={modalStyles.userEmail}>
                    {enquiry?.data?.enquiryById?.email}
                  </div>
                  <div style={modalStyles.userPhone}>
                    {enquiry?.data?.enquiryById?.phone}
                  </div>
                </div>
                <div
                  style={{
                    ...modalStyles.statusBadge,
                    ...(enquiry?.data?.enquiryById?.isResolved
                      ? modalStyles.statusResolved
                      : modalStyles.statusPending),
                  }}
                >
                  {enquiry?.data?.enquiryById?.isResolved
                    ? 'Resolved'
                    : 'Pending'}
                </div>
              </div>

              {/* Message */}
              <div style={modalStyles.section}>
                <div style={modalStyles.sectionTitle}>Message</div>
                <div style={modalStyles.messageContainer}>
                  <div style={modalStyles.messageText}>
                    {enquiry?.data?.enquiryById?.message}
                  </div>
                </div>
              </div>

              {/* Date Information */}
              <div style={modalStyles.dateInfo}>
                <div style={modalStyles.dateItem}>
                  <div style={modalStyles.sectionTitle}>Created</div>
                  <div style={modalStyles.sectionContent}>
                    {new Date(
                      enquiry?.data?.enquiryById?.createdAt || ''
                    ).toLocaleString()}
                  </div>
                </div>
                <div style={modalStyles.dateItem}>
                  <div style={modalStyles.sectionTitle}>Last Updated</div>
                  <div style={modalStyles.sectionContent}>
                    {new Date(
                      enquiry?.data?.enquiryById?.updatedAt || ''
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <style>
        {`
          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(-20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )
}
