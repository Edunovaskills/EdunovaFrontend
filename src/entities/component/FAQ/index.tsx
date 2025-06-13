import React, { useState } from 'react'
import {
  Typography,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Box,
  useTheme,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { AccordionStyled, StackStyled } from './styles.component'

type Props = {
  data: { question: string; answer: string }[]
}

export const FAQ = ({ data }: Props) => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const theme = useTheme()

  const handleToggle = (panel: string) => {
    setExpanded((prev) => (prev === panel ? false : panel))
  }

  return (
    <StackStyled>
      <Box>
        <Typography variant="h5" fontWeight="700" textAlign={'center'}>
          <Typography component="span" variant="h5.700" color="primary.main">
            FAQs
          </Typography>{' '}
          – Quick Answers at Your Fingertips
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginTop: '8px' }}
          textAlign={'center'}
        >
          Queries that people ask most often
        </Typography>
      </Box>

      <div>
        {data.map((faq, index) => (
          <AccordionStyled
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={() => handleToggle(`panel${index}`)}
          >
            <AccordionSummary
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Typography variant="body1">{faq.question}</Typography>
                <IconButton size="small">
                  {expanded === `panel${index}` ? (
                    <RemoveIcon fontSize="extraSmall" />
                  ) : (
                    <AddIcon fontSize="extraSmall" />
                  )}
                </IconButton>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" color="#808080">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </AccordionStyled>
        ))}
      </div>
    </StackStyled>
  )
}
