import React, { useEffect } from 'react'

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { useLocation } from 'react-router-dom'

import { userSessionInactive } from 'shared/data-providers'

import { DialogBlurredBackdrop } from './styles.component'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
  open: boolean
  onClose: () => void
}

export function LogoutPopup({ onClose, open }: Props) {
  const { pathname } = useLocation()

  useEffect(() => {
    return () => {
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
  return (
    <div>
      <DialogBlurredBackdrop
        onClose={onClose}
        PaperProps={{ sx: { maxWidth: 400 } }}
        open={open}
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="flex-end">
            <IconButton onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={1} mt={1}>
            <Typography variant="body1.500">
              Are you sure you want to logout?
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ mt: 1 }}>
          <Button size="small" fullWidth variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="small"
            color="error"
            fullWidth
            onClick={() => userSessionInactive()}
          >
            Logout
          </Button>
        </DialogActions>
      </DialogBlurredBackdrop>
    </div>
  )
}

export default LogoutPopup
