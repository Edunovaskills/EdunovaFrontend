// src/entities/component/CertificateDetailModal.tsx
import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Paper,
  Button,
} from '@mui/material';
import { Close as CloseIcon, Download as DownloadIcon } from '@mui/icons-material';
import type { Certificate } from 'entities/model/certificate.model';
import { useDownloadCertificate } from 'entities/query'; // Use the download hook

interface CertificateDetailModalProps {
  open: boolean;
  onClose: () => void;
  certificate: Certificate | null;
  loading: boolean;
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '70%', md: '50%' },
  bgcolor: 'background.paper',
  borderRadius: '1rem',
  boxShadow: 24,
  p: { xs: 2, sm: 4 },
  outline: 'none',
  maxHeight: '90vh',
  overflowY: 'auto',
};

export const CertificateDetailModal: React.FC<CertificateDetailModalProps> = ({
  open,
  onClose,
  certificate,
  loading,
}) => {
  const { download } = useDownloadCertificate();

  const handleDownloadClick = () => {
    if (certificate?.key) {
      download(certificate.key);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="certificate-detail-modal-title"
      aria-describedby="certificate-detail-modal-description"
    >
      <Box sx={modalStyle}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="certificate-detail-modal-title" variant="h5" component="h2" gutterBottom>
          Certificate Details
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : certificate ? (
          <Paper elevation={0} sx={{ p: 2, mt: 2, bgcolor: '#f8fafc' }}>
            <Typography variant="body1" color="text.secondary">
              <strong>Key:</strong> {certificate.key}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              <strong>PDF URL:</strong>{' '}
              <a href={certificate.certificatePdf} target="_blank" rel="noopener noreferrer" style={{ wordBreak: 'break-all' }}>
                {certificate.certificatePdf}
              </a>
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              <strong>Status:</strong> {certificate.isActive ? 'Active' : 'Inactive'}
            </Typography>
            {certificate.uploadedBy && typeof certificate.uploadedBy === 'object' && (
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                <strong>Uploaded By:</strong> {(certificate.uploadedBy as any).name} ({(certificate.uploadedBy as any).email})
              </Typography>
            )}
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              <strong>Uploaded At:</strong> {new Date(certificate.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              <strong>Last Updated:</strong> {new Date(certificate.updatedAt).toLocaleString()}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadClick}
              sx={{ mt: 3 }}
            >
              Download PDF
            </Button>
          </Paper>
        ) : (
          <Typography variant="body1" color="text.secondary">
            No certificate data available.
          </Typography>
        )}
      </Box>
    </Modal>
  );
};
