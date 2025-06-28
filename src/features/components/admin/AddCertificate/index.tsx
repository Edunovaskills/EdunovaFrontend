// src/features/components/admin/AddCertificate/index.tsx
import React, { useState, useEffect, useRef } from 'react'
import { addCertificateStyles } from './styles.component'
import { useAllCertificatesForAdminQuery } from 'entities/query/certificates/get-all-certificates-for-admin.query'
import { useForm } from 'react-hook-form'
import {
  certificateSchema,
  type CertificateSchema,
} from 'features/schema/certificate.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useCreateCertificateMutation } from 'entities/mutation/certificates/create-certificate.mutation'
import { useDeleteCertificateMutation } from 'entities/mutation/certificates/delete-certificate.mutation'
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  IconButton,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  InputAdornment,
  Chip,
} from '@mui/material'
import {
  CloudUpload,
  Delete,
  Visibility,
  Search,
  PictureAsPdf,
  Close,
} from '@mui/icons-material'
import type { Certificate } from 'entities/model/certificate.model'
import { CertificateDetailModal } from 'entities/component/CertificateDetailModal'
import { ConfirmDialog } from 'entities/component/ConfirmDialog'
import { useSnackBar } from 'entities/state'
import { keyframes } from '@mui/system'

interface AddCertificateProps {}

// New CertificateInfoPanel component
interface CertificateInfoPanelProps {
  pdfName: string | null
  certKey: string | null
  onCopyKey: () => void
  onClose: () => void
  isCopyDisabled: boolean
}

const slideDownFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`

const CertificateInfoPanel: React.FC<CertificateInfoPanelProps> = ({
  pdfName,
  certKey,
  onCopyKey,
  onClose,
  isCopyDisabled,
}) => (
  <Box
    sx={{
      p: 3,
      border: '1px solid #e0e0e0',
      borderRadius: 2,
      background: '#fafbfc',
      minWidth: 260,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 2,
      animation: `${slideDownFadeIn} 0.5s cubic-bezier(0.4,0,0.2,1)`,
    }}
  >
    {certKey ? (
      <>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Certificate Info
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PictureAsPdf color="error" />
          <Typography variant="body2">{pdfName}</Typography>
        </Box>
        {certKey && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Key:
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
              {certKey}
            </Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ContentCopyIcon />}
            onClick={onCopyKey}
            disabled={isCopyDisabled}
          >
            Copy Cert Key
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </>
    ) : (
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Upload a certificate to see the details
      </Typography>
    )}
  </Box>
)

export const AddCertificate: React.FC<AddCertificateProps> = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [previewPdfName, setPreviewPdfName] = useState<string | null>(null)
  const [uploadedCertKey, setUploadedCertKey] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null)

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [certificateToDeleteKey, setCertificateToDeleteKey] = useState<
    string | null
  >(null)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

  const {
    data: certificatesData,
    isLoading: isLoadingCertificates,
    isError: isErrorCertificates,
    error: certificatesError,
    refetch: refetchCertificates,
  } = useAllCertificatesForAdminQuery({
    page: page + 1,
    limit: rowsPerPage,
    search: searchQuery,
  })

  const createCertificateMutation = useCreateCertificateMutation()
  const deleteCertificateMutation = useDeleteCertificateMutation()

  const { show: showSnackbar } = useSnackBar()

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isValid },
    register,
  } = useForm<CertificateSchema>({
    resolver: yupResolver(certificateSchema),
    defaultValues: {
      certificatePdf: undefined,
      email: '',
    },
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    // Reset form and PDF preview
    reset()
    setPreviewPdfName(null)
    setPdfFile(null)
    // Explicitly clear form field value
    setValue('certificatePdf', null as any)
  }, [reset, setValue])

  // Reset file input utility
  const resetFileInput = () => {
    setPdfFile(null)
    setPreviewPdfName(null)
    setUploadedCertKey(null)
    setValue('certificatePdf', null as any)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setPdfFile(file)
      setPreviewPdfName(file.name)
      setValue('certificatePdf', file)
      setUploadedCertKey(null)
    } else {
      resetFileInput()
    }
  }

  const onSubmit = async (data: CertificateSchema) => {
    if (!pdfFile) {
      showSnackbar({
        title: 'Please select a PDF file for the certificate.',
        color: 'Error',
      })
      return
    }
    // Only send the pdfFile, as the key is now generated by the backend
    const result = await createCertificateMutation.mutateAsync({
      pdfFile: pdfFile,
      email: data.email,
    })
    reset()
    setPdfFile(null)
    setPreviewPdfName(null)
    setValue('certificatePdf', null as any)
    if (fileInputRef.current) fileInputRef.current.value = ''
    // Show the uploaded key if available
    if (result?.certificate?.certificateKey) {
      setUploadedCertKey(result.certificate.certificateKey)
      setPreviewPdfName(pdfFile.name)
    }
  }

  const handleViewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate)
    setModalOpen(true)
  }

  const handleDeleteCertificateClick = (certificateKey: string) => {
    // Changed parameter name
    setCertificateToDeleteKey(certificateKey)
    setDeleteConfirmOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (certificateToDeleteKey) {
      await deleteCertificateMutation.mutateAsync(certificateToDeleteKey) // Changed argument
      setDeleteConfirmOpen(false)
      setCertificateToDeleteKey(null)
      refetchCertificates()
    }
  }

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false)
    setCertificateToDeleteKey(null)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const certificates = certificatesData?.data?.certificates || []
  const filteredCertificates = certificates.filter((certificate) => {
    const query = searchQuery.toLowerCase().trim()
    return (
      certificate.certificateKey?.toLowerCase().includes(query) ||
      certificate.userEmail?.toLowerCase().includes(query)
    )
  })

  const totalCertificates = certificatesData?.data?.certificates?.length || 0
  // const totalPages = certificatesData?.totalPages || 1; // Not used with MUI pagination
  const dataToRender = debouncedSearchQuery
    ? filteredCertificates
    : certificatesData?.data?.certificates

  return (
    <Box sx={addCertificateStyles.container}>
      <Typography variant="h4" component="h1" sx={addCertificateStyles.header}>
        Add New Certificate
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          alignItems: 'flex-start',
          mb: 3,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            ...addCertificateStyles.formContainer,
            flex: 1,
            minHeight: 280,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#fafbfc',
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <TextField
              {...register('email')}
              label="Email"
              variant="outlined"
              size="small"
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 2 }}
            />
            <Box
              sx={{ ...addCertificateStyles.pdfUploadContainer, width: '100%' }}
            >
              <input
                accept="application/pdf"
                style={{ display: 'none' }}
                id="certificate-pdf-upload"
                type="file"
                {...register('certificatePdf', {
                  onChange: handlePdfChange,
                })}
                ref={fileInputRef}
              />
              <label htmlFor="certificate-pdf-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUpload />}
                  sx={addCertificateStyles.uploadButton}
                  disabled={createCertificateMutation.isPending || !!pdfFile}
                >
                  Upload PDF
                </Button>
              </label>
              {errors.certificatePdf && (
                <Typography color="error" variant="caption1" sx={{ mt: 1 }}>
                  {errors.certificatePdf.message as string}
                </Typography>
              )}
            </Box>
            {/* PDF Preview with Remove Button */}
            {pdfFile && previewPdfName && (
              <Box
                sx={{
                  mt: 2,
                  mb: 1,
                  p: 1.5,
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  background: '#f9f9f9',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <PictureAsPdf color="error" />
                <a
                  href={URL.createObjectURL(pdfFile)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'underline',
                    color: '#1976d2',
                    fontWeight: 500,
                    wordBreak: 'break-all',
                  }}
                >
                  {previewPdfName}
                </a>
                <IconButton
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    background: '#fff',
                    boxShadow: 1,
                  }}
                  onClick={resetFileInput}
                  aria-label="Remove PDF"
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ ...addCertificateStyles.submitButton, mt: 2 }}
              disabled={
                !isValid ||
                isSubmitting ||
                createCertificateMutation.isPending ||
                !pdfFile
              }
              loading={isSubmitting || createCertificateMutation.isPending}
            >
              Upload Certificate
            </Button>
          </form>
        </Paper>
        {/* Always render the right box to prevent layout shift */}
        <Box
          sx={{
            minWidth: 280,
            minHeight: 280,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fafbfc',
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            borderRadius: 2,
            ml: { md: 0.5 },
            mt: { xs: 2, md: 0 },
          }}
        >
          <CertificateInfoPanel
            pdfName={previewPdfName}
            certKey={uploadedCertKey}
            onCopyKey={() => {
              if (uploadedCertKey) {
                navigator.clipboard.writeText(uploadedCertKey)
                showSnackbar({
                  title: 'Certificate key copied to clipboard',
                  color: 'Success',
                })
              }
            }}
            onClose={resetFileInput}
            isCopyDisabled={!uploadedCertKey}
          />
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={addCertificateStyles.subHeader}
        >
          Existing Certificates
        </Typography>

        <Box sx={addCertificateStyles.searchAndSwitchContainer}>
          <TextField
            label="Search by Key"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={addCertificateStyles.searchField}
          />
        </Box>

        {isLoadingCertificates ? (
          <Box sx={addCertificateStyles.loadingBox}>
            <CircularProgress />
          </Box>
        ) : isErrorCertificates ? (
          <Alert severity="error" sx={addCertificateStyles.alert}>
            Error loading certificates: {certificatesError?.message}
          </Alert>
        ) : certificates.length === 0 ? (
          <Alert severity="info" sx={addCertificateStyles.alert}>
            No certificates found.
          </Alert>
        ) : (
          <TableContainer
            component={Paper}
            sx={addCertificateStyles.tableContainer}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={addCertificateStyles.tableHeader}>
                    Key
                  </TableCell>
                  <TableCell sx={addCertificateStyles.tableHeader}>
                    PDF
                  </TableCell>
                  <TableCell sx={addCertificateStyles.tableHeader}>
                    User
                  </TableCell>
                  <TableCell sx={addCertificateStyles.tableHeader}>
                    Status
                  </TableCell>
                  <TableCell
                    sx={addCertificateStyles.tableHeader}
                    align="right"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataToRender?.map((certificate) => (
                  <TableRow
                    key={certificate._id}
                    sx={addCertificateStyles.tableRow}
                  >
                    <TableCell sx={addCertificateStyles.tableCell}>
                      {certificate.certificateKey}
                      <IconButton
                        onClick={() => {
                          navigator.clipboard.writeText(
                            certificate.certificateKey
                          )
                          showSnackbar({
                            title: 'Certificate key copied to clipboard',
                            color: 'Success',
                          })
                        }}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </TableCell>{' '}
                    {/* Used certificateKey */}
                    <TableCell sx={addCertificateStyles.tableCell}>
                      <a
                        href={certificate.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          wordBreak: 'break-all',
                        }}
                      >
                        <PictureAsPdf sx={addCertificateStyles.tablePdfIcon} />
                        View PDF
                      </a>
                    </TableCell>
                    <TableCell sx={addCertificateStyles.tableCell}>
                      {certificate.userEmail}
                    </TableCell>
                    <TableCell sx={addCertificateStyles.tableCell}>
                      <Chip
                        label={certificate.isActive ? 'Active' : 'Inactive'}
                        color={certificate.isActive ? 'success' : 'error'}
                      />
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={addCertificateStyles.tableCell}
                    >
                      <Box sx={addCertificateStyles.tableActions}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewCertificate(certificate)}
                          aria-label="view certificate"
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleDeleteCertificateClick(
                              certificate.certificateKey
                            )
                          } // Used certificateKey
                          aria-label="delete certificate"
                          disabled={
                            deleteCertificateMutation.isPending ||
                            !certificate.isActive
                          } // Can only soft-delete if active
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalCertificates}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}
      </Box>

      <CertificateDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        certificate={selectedCertificate}
        loading={false}
      />

      <ConfirmDialog
        open={deleteConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConfirm}
        title="Confirm Deletion"
        description="Are you sure you want to soft-delete this certificate? It will become inactive."
        loading={deleteCertificateMutation.isPending}
      />
    </Box>
  )
}
