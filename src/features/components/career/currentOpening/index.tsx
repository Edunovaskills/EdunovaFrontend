import { SearchSharp } from '@mui/icons-material'
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { CareerOpeningData, careerDataMock } from 'features/model'
import { useMemo, useState } from 'react'
import { publicImages } from 'shared/config'

export const CurrentOpening = () => {
  const theme = useTheme()
  const [searchedTitle, setSearchedTitle] = useState('')
  const [searchedData, setSearchedData] =
    useState<CareerOpeningData[]>(careerDataMock)

  const handleTitleChange = (title: string) => {
    setSearchedTitle(title)

    if (title.trim().length) {
      const filterData = careerDataMock.filter((data) =>
        data.jobTitle.toLowerCase().includes(title.toLowerCase())
      )
      setSearchedData(filterData)
    } else {
      setSearchedData(careerDataMock)
    }
  }

  const noResultFound = useMemo(() => {
    return searchedData.length === 0 && searchedTitle.trim().length > 0
  }, [searchedData, searchedTitle])

  return (
    <Stack>
      <Typography variant="h5.600" textAlign={'center'}>
        Current{' '}
        <Typography variant="h5.600" color="primary.main">
          Openings
        </Typography>
      </Typography>
      <Typography variant="body1.500" textAlign={'center'}>
        Reliable, safe, and rides—Help us transform transportation!
      </Typography>

      <TextField
        size="small"
        placeholder="Search any role, designation..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchSharp />
            </InputAdornment>
          ),
        }}
        value={searchedTitle}
        onChange={(e) => handleTitleChange(e.target.value)}
        sx={{
          marginTop: '1rem',
        }}
      />

      {noResultFound ? (
        <Typography variant="body1.700">Oops! No result found.</Typography>
      ) : (
        searchedData.map(({ jobTitle, location, responsibilities, whyWe }) => (
          <Stack
            marginTop={'20px'}
            sx={{
              background: theme.palette.custom.slate,
              padding: '22px',
              borderRadius: '8px',
            }}
            key={jobTitle}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6.700">{jobTitle}</Typography>
              <Button
                color="secondary"
                endIcon={<img src={publicImages.link} />}
                size="small"
              >
                APPLY NOW
              </Button>
            </div>

            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>
                <Typography variant="body2.600" color="secondary">
                  Location:
                </Typography>
                <Typography
                  variant="body2.600"
                  sx={{ display: 'inline', marginLeft: 1 }}
                >
                  {location}
                </Typography>
              </li>
              <li>
                <Typography
                  variant="body2.600"
                  color="secondary"
                  sx={{ fontWeight: 'bold', display: 'inline' }}
                >
                  Responsibilities:
                </Typography>
                <Typography
                  variant="body2.600"
                  sx={{ display: 'inline', marginLeft: 1 }}
                >
                  {responsibilities}
                </Typography>
              </li>
            </ul>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6.700">Why Drive with Us?</Typography>
            </div>

            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              {whyWe?.map(({ subTitle, title }) => (
                <li key={title}>
                  <Typography variant="body2.600" color="secondary">
                    {title}:
                  </Typography>
                  <Typography
                    variant="body2.600"
                    sx={{ display: 'inline', marginLeft: 1 }}
                  >
                    {subTitle}
                  </Typography>
                </li>
              ))}
            </ul>
          </Stack>
        ))
      )}
    </Stack>
  )
}
