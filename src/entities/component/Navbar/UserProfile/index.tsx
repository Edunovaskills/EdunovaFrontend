import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useUserQuery } from 'entities/query'
import { useState } from 'react'
import { useScreenSize } from 'shared/hooks'
import { LogoutPopup } from '../LogoutPopup'

export const UserProfile = () => {
  const { data } = useUserQuery()
  const user = data?.data?.user
  const { smallScreen } = useScreenSize()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const [openLogout, setOpenLogout] = useState(false)

  const handleLogout = () => {
    setOpenLogout(true)
    // userSessionInactive()
    // window.location.reload()
  }

  const open = Boolean(anchorEl)

  if (smallScreen) {
    return (
      <Box>
        <LogoutPopup open={openLogout} onClose={() => setOpenLogout(false)} />
        <Typography variant="h6" sx={{ mb: 1 }}>
          User Actions
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              width: 48,
              height: 48,
              fontSize: '1.2rem',
            }}
          >
            {user?.name?.[0]?.toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="body1" fontWeight="bold">
              {user?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </Stack>
        <Button fullWidth onClick={handleLogout} startIcon={<LogoutIcon />}>
          Logout
        </Button>
      </Box>
    )
  }

  return (
    <>
      <LogoutPopup open={openLogout} onClose={() => setOpenLogout(false)} />

      <IconButton onClick={handleOpen}>
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            width: 40,
            height: 40,
          }}
        >
          {user?.name?.[0]?.toUpperCase()}
        </Avatar>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            borderRadius: 2,
            boxShadow:
              'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
          },
        }}
      >
        <Box sx={{ p: 1, minWidth: 220 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                width: 40,
                height: 40,
              }}
            >
              {user?.name?.[0]?.toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="body1" fontWeight="bold" noWrap>
                {user?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {user?.email}
              </Typography>
            </Box>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Button
            variant="text"
            color="inherit"
            fullWidth
            onClick={handleLogout}
            sx={{ justifyContent: 'flex-start' }}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  )
}
