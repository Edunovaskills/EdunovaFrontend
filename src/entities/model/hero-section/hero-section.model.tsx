import { ReactNode } from 'react';
import { publicImages } from 'shared/config'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import VerifiedIcon from '@mui/icons-material/Verified';

export type SitePromise = {
  label: string
  url?: string
  Icon?:JSX.Element
}

export const sitePromisesData: SitePromise[] = [
  { label: '24/7 Access', url: publicImages['24HrsImage'] },
  { label: 'Real-Time Updates', Icon:<NotificationsActiveIcon sx={{color:'neutral.white'}}/> },
  { label: 'Affordable Resources', url: publicImages['rupees'] },
  { label: 'Quality First',Icon:<VerifiedIcon  sx={{color:'neutral.white'}}/>},
]
