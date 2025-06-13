import { Card, styled } from '@mui/material'

export const CardStyled = styled(Card)(({theme})=>({
    textAlign: 'left',
    p: 1,
    minHeight: '400px',
    maxWidth: '420px',
    maxHeight: '500px',
    display: 'flex',
    gap: '20',
    flexDirection: 'column',
    transition: 'background 0.3s ease',
    [theme.breakpoints.down('sm')]:{
        // flexDirection: 'row',
        minHeight: '250px',
    }
}))
export const ImgWrapperStyled = styled('div')({
  width: '100%',
  height: '200px',
  marginInline: 'auto',
  borderRadius: '8px',
  overflow: 'hidden',
})
