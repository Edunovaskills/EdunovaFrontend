import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import { publicImages } from 'shared/config'
import { appPaths } from 'entities/config'

type Props = {
  noText?: boolean
}
export const Logo = ({ noText = false }: Props) => {
  return (
    <Link
      to={appPaths['/']}
      style={{
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img
        src={publicImages.EdunovaLog}
        alt="brand-logo"
        style={{
          width: 'auto',
          height: '48px',
          objectFit: 'contain',
          marginRight: '8px',
        }}
        onError={(e) => {
          console.error('Logo failed to load:', publicImages.EdunovaLog)
          e.currentTarget.src =
            'https://placehold.co/48x48/eeeeee/000000?text=Error'
        }}
      />
      {!noText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Georgia", "Times New Roman", serif',
              fontWeight: 'bold',
              color: '#000',
              lineHeight: 1.2,
            }}
          >
            Edunova
          </Typography>
          <Typography
            variant="caption2"
            sx={{
              textDecoration: 'none',
            }}
          >
            UPGRADE YOUR SKILLS, UPGRADE YOUR FUTURE
          </Typography>
        </div>
      )}
    </Link>
  )
}
