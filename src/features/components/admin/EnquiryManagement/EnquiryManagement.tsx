import React, { useState, useMemo } from 'react'
import { useAllEnquiryAdminQuery } from 'entities/query/enquiry/get-all-enquiry-admin.query'
import { useMakeEnquiryResolvedMutation } from 'entities/mutation/enquiry/make-enquiry-resolve.mutation'
import { adminStyles } from '../AdminStyles'
import { EnquiryDetailModal } from './EnquiryDetailModal'
import type { Enquiry } from 'entities/model'

// Inline styles for the enquiry management component
const enquiryStyles = {
  header: {
    marginBottom: '32px',
    textAlign: 'start' as const,
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '8px',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  subtitle: {
    fontSize: '16px',
    color: '#64748b',
    margin: '0',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  searchContainer: {
    marginBottom: '24px',
    marginLeft: 'auto',
  },
  searchWrapper: {
    position: 'relative' as const,
    maxWidth: '400px',
    marginLeft: 'auto',
  },
  searchInput: {
    width: '100%',
    padding: '16px 48px 16px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '16px',
    color: '#1e293b',
    backgroundColor: '#ffffff',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  searchIcon: {
    position: 'absolute' as const,
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    color: '#64748b',
    pointerEvents: 'none' as const,
  },
  tableContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  tableHeader: {
    backgroundColor: '#f8fafc',
    borderBottom: '2px solid #e2e8f0',
  },
  tableHeaderCell: {
    padding: '20px 16px',
    textAlign: 'left' as const,
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  tableRow: {
    borderBottom: '1px solid #f1f5f9',
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f8fafc',
    },
  },
  tableCell: {
    padding: '16px',
    fontSize: '14px',
    color: '#374151',
    verticalAlign: 'middle' as const,
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: '600',
    flexShrink: 0,
  },
  emailLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  phoneLink: {
    color: '#059669',
    textDecoration: 'none',
    fontWeight: '500',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  messageCell: {
    maxWidth: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  statusCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  switch: {
    position: 'relative' as const,
    display: 'inline-block',
    width: '50px',
    height: '24px',
  },
  switchInput: {
    opacity: 0,
    width: 0,
    height: 0,
  },
  slider: {
    position: 'absolute' as const,
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#cbd5e1',
    transition: '0.3s',
    borderRadius: '24px',
  },
  sliderBefore: {
    position: 'absolute' as const,
    content: '""',
    height: '18px',
    width: '18px',
    left: '3px',
    bottom: '3px',
    backgroundColor: '#ffffff',
    transition: '0.3s',
    borderRadius: '50%',
  },
  sliderChecked: {
    backgroundColor: '#10b981',
  },
  sliderBeforeChecked: {
    transform: 'translateX(26px)',
  },
  statusText: {
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  noDataCell: {
    textAlign: 'center' as const,
    padding: '48px 16px',
    color: '#64748b',
    fontSize: '16px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 16px',
    gap: '16px',
  },
  loadingSpinner: {
    width: '32px',
    height: '32px',
    border: '3px solid #e2e8f0',
    borderTop: '3px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  errorContainer: {
    textAlign: 'center' as const,
    padding: '48px 16px',
    color: '#dc2626',
  },
  paginationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '24px 16px',
    borderTop: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
  },
  paginationButton: {
    padding: '8px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    color: '#374151',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#f3f4f6',
      borderColor: '#9ca3af',
    },
    '&:disabled': {
      backgroundColor: '#f9fafb',
      color: '#9ca3af',
      cursor: 'not-allowed',
      borderColor: '#e5e7eb',
    },
  },
  paginationButtonDisabled: {
    backgroundColor: '#f9fafb',
    color: '#9ca3af',
    cursor: 'not-allowed',
    borderColor: '#e5e7eb',
  },
  pageNumbers: {
    display: 'flex',
    gap: '8px',
  },
  pageButton: {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    color: '#374151',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '36px',
    '&:hover': {
      backgroundColor: '#f3f4f6',
      borderColor: '#9ca3af',
    },
  },
  pageButtonActive: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    borderColor: '#3b82f6',
    '&:hover': {
      backgroundColor: '#2563eb',
      borderColor: '#2563eb',
    },
  },
  summary: {
    padding: '16px',
    textAlign: 'center' as const,
    color: '#64748b',
    fontSize: '14px',
    borderTop: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
  },
}

export const EnquiryManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [limit] = useState(10)
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<
    string | undefined
  >(undefined)

  const { data, isLoading, error } = useAllEnquiryAdminQuery({
    page: currentPage,
    limit,
  })

  const makeEnquiryResolvedMutation = useMakeEnquiryResolvedMutation()

  // Filter enquiries based on search term
  const filteredEnquiries = useMemo(() => {
    if (!data?.data?.enquiries) return []

    if (!searchTerm.trim()) return data.data.enquiries

    const searchLower = searchTerm.toLowerCase()
    return data.data.enquiries.filter(
      (enquiry: Enquiry) =>
        enquiry.fullName.toLowerCase().includes(searchLower) ||
        enquiry.email.toLowerCase().includes(searchLower) ||
        enquiry.phone.includes(searchTerm)
    )
  }, [data?.data?.enquiries, searchTerm])

  const handleStatusToggle = async (
    enquiryId: string,
    currentStatus: boolean,
    e: React.MouseEvent
  ) => {
    e.stopPropagation() // Prevent row click when clicking the switch
    if (!currentStatus) {
      // Only call mutation if status is currently false (unresolved)
      await makeEnquiryResolvedMutation.mutateAsync(enquiryId)
    }
  }

  const handleRowClick = (enquiryId: string) => {
    setSelectedEnquiryId(enquiryId)
  }

  const handleCloseModal = () => {
    setSelectedEnquiryId(undefined)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const totalPages = data?.data?.totalPages || 1

  if (error) {
    return (
      <div style={adminStyles.container}>
        <div style={enquiryStyles.errorContainer}>
          <h2>Error loading enquiries</h2>
          <p>Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={adminStyles.container}>
      <div style={enquiryStyles.header}>
        <h1 style={enquiryStyles.title}>Enquiry Management</h1>
        <p style={enquiryStyles.subtitle}>
          Manage and resolve customer enquiries
        </p>
      </div>

      {/* Search Bar */}
      <div style={enquiryStyles.searchContainer}>
        <div style={enquiryStyles.searchWrapper}>
          <input
            type="text"
            placeholder="Search by name, email, or phone number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={enquiryStyles.searchInput}
          />
          <div style={enquiryStyles.searchIcon}>🔍</div>
        </div>
      </div>

      {/* Data Table */}
      <div style={enquiryStyles.tableContainer}>
        {isLoading ? (
          <div style={enquiryStyles.loadingContainer}>
            <div style={enquiryStyles.loadingSpinner}></div>
            <p>Loading enquiries...</p>
          </div>
        ) : (
          <>
            <table style={enquiryStyles.table}>
              <thead>
                <tr style={enquiryStyles.tableHeader}>
                  <th style={enquiryStyles.tableHeaderCell}>Name</th>
                  <th style={enquiryStyles.tableHeaderCell}>Email</th>
                  <th style={enquiryStyles.tableHeaderCell}>Phone</th>
                  <th style={enquiryStyles.tableHeaderCell}>Message</th>
                  <th style={enquiryStyles.tableHeaderCell}>Status</th>
                  <th style={enquiryStyles.tableHeaderCell}>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={enquiryStyles.noDataCell}>
                      No enquiries found
                    </td>
                  </tr>
                ) : (
                  filteredEnquiries.map((enquiry: Enquiry) => (
                    <tr
                      key={enquiry._id}
                      style={enquiryStyles.tableRow}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRowClick(enquiry._id)
                      }}
                    >
                      <td style={enquiryStyles.tableCell}>
                        <div style={enquiryStyles.nameCell}>
                          <div style={enquiryStyles.avatar}>
                            {enquiry.fullName.charAt(0).toUpperCase()}
                          </div>
                          <span>{enquiry.fullName}</span>
                        </div>
                      </td>
                      <td style={enquiryStyles.tableCell}>
                        <a
                          href={`mailto:${enquiry.email}`}
                          style={enquiryStyles.emailLink}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {enquiry.email}
                        </a>
                      </td>
                      <td style={enquiryStyles.tableCell}>
                        <a
                          href={`tel:${enquiry.phone}`}
                          style={enquiryStyles.phoneLink}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {enquiry.phone}
                        </a>
                      </td>
                      <td style={enquiryStyles.tableCell}>
                        <div style={enquiryStyles.messageCell}>
                          {enquiry.message.length > 50
                            ? `${enquiry.message.substring(0, 50)}...`
                            : enquiry.message}
                        </div>
                      </td>
                      <td
                        style={enquiryStyles.tableCell}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div style={enquiryStyles.statusCell}>
                          <label style={enquiryStyles.switch}>
                            <input
                              type="checkbox"
                              checked={enquiry.isResolved}
                              onChange={(e) => {
                                e.stopPropagation()
                                handleStatusToggle(
                                  enquiry._id,
                                  enquiry.isResolved,
                                  {} as React.MouseEvent
                                )
                              }}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleStatusToggle(
                                  enquiry._id,
                                  enquiry.isResolved,
                                  e
                                )
                              }}
                              disabled={makeEnquiryResolvedMutation.isPending}
                              style={enquiryStyles.switchInput}
                            />
                            <span
                              style={{
                                ...enquiryStyles.slider,
                                ...(enquiry.isResolved &&
                                  enquiryStyles.sliderChecked),
                              }}
                            >
                              <span
                                style={{
                                  ...enquiryStyles.sliderBefore,
                                  ...(enquiry.isResolved &&
                                    enquiryStyles.sliderBeforeChecked),
                                }}
                              ></span>
                            </span>
                          </label>
                          <span
                            style={{
                              ...enquiryStyles.statusText,
                              color: enquiry.isResolved ? '#10b981' : '#6b7280',
                            }}
                          >
                            {enquiry.isResolved ? 'Resolved' : 'Pending'}
                          </span>
                        </div>
                      </td>
                      <td style={enquiryStyles.tableCell}>
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={enquiryStyles.paginationContainer}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    ...enquiryStyles.paginationButton,
                    ...(currentPage === 1 &&
                      enquiryStyles.paginationButtonDisabled),
                  }}
                >
                  Previous
                </button>

                <div style={enquiryStyles.pageNumbers}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        style={{
                          ...enquiryStyles.pageButton,
                          ...(currentPage === page &&
                            enquiryStyles.pageButtonActive),
                        }}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    ...enquiryStyles.paginationButton,
                    ...(currentPage === totalPages &&
                      enquiryStyles.paginationButtonDisabled),
                  }}
                >
                  Next
                </button>
              </div>
            )}

            {/* Summary */}
            <div style={enquiryStyles.summary}>
              <p>
                Showing {filteredEnquiries.length} of {data?.data?.total || 0}{' '}
                enquiries
                {searchTerm && ` (filtered by "${searchTerm}")`}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Enquiry Detail Modal */}
      <EnquiryDetailModal
        enquiryId={selectedEnquiryId}
        onClose={handleCloseModal}
      />

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )
}
