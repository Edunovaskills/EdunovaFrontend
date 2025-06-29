import { Typography } from '@mui/material'
import { BuzInfoSection } from 'entities/component'
import { BuzCard } from 'shared/components'
import { publicImages } from 'shared/config'

const OurOfferingCardData = [
  {
    title: 'Diploma Course',
    description:
      'We offer a wide range of courses to help you achieve your goals.Our courses are designed to help you achieve your goals',
    iconUrl: publicImages['diploma'],
  },
  {
    title: 'Offline workshop',
    description:
      'We provide offline workshops to help you achieve your goals.Our workshops are designed to help you achieve your goals',
    iconUrl: publicImages['workshop'],
  },
  {
    title: 'Training Sessions & Certifications',
    description:
      'We provide training sessions and certifications to help you achieve your goals.Our training sessions and certifications are designed to help you achieve your goals',
    iconUrl: publicImages['training'],
  },
]
export const TopInfo = () => {
  return (
    <>
      <Typography variant="h5.700">
        OUR{' '}
        <Typography variant="h5.700" color="primary.main">
          OFFERINGS{' '}
        </Typography>
      </Typography>

      <Typography variant="body2" textAlign={'center'}>
        We offer a wide range of courses to help you achieve your goals.Our
        courses are designed to help you achieve your goals
      </Typography>
    </>
  )
}

export const ServicesShowcase = () => {
  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {OurOfferingCardData.map((item) => (
        <BuzCard
          cardTitle={item.title}
          cardDescription={item.description}
          iconUrl={item.iconUrl}
        />
      ))}
    </div>
  )
}
export const OurOffering = () => {
  return (
    <BuzInfoSection
      topInfo={<TopInfo />}
      showcaseSection={<ServicesShowcase />}
    />
  )
}
