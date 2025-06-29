import { Typography } from '@mui/material'
import { BuzInfoSection } from 'entities/component'
import { publicImages } from 'shared/config'
import { useScreenSize } from 'shared/hooks'

// Data array for WhyChooseUs cards
const whyChooseData = [
  {
    title: 'Why Choose',
    textPrimary: 'Edunova',
    subTitle: '?',
    description:
      'Hybrid Learning Model: Blend of online courses with optional offline exposure through our academic partners. Hands-On Projects: Courses powered by practical work designed with top companies and experts. Diploma Programs: Industry-recognized diplomas that add credibility and value to your profile. Beyond Certification: Support with interview prep, resume building, and job placements till you succeed. Expert Mentors & Lifetime Access: Learn from industry veterans and access updated content anytime.',
    img: publicImages.whyChooseUs,
  },
  {
    title: 'Our',
    textPrimary: 'Impact',
    description:
      'With over 50,000 learners trained across India, we have facilitated more than 1,000 industry-level internships. Our strong collaborations with leading institutions and startups, combined with a commitment to excellence, have earned us a high reputation for student satisfaction and career advancement.',
    img: publicImages.ourImpact,
  },
]

const TopInfoSection = ({
  title,
  subTitle,
  textPrimary,
}: {
  title?: string
  textPrimary?: string
  subTitle?: string
}) => {
  if (title && (subTitle || textPrimary)) {
    return (
      <>
        <Typography variant="h5.700">
          {title}{' '}
          {textPrimary && (
            <Typography variant="h5.700" color="primary.main">
              {textPrimary}{' '}
            </Typography>
          )}
          {subTitle}
        </Typography>
      </>
    )
  }
  return (
    <>
      <Typography variant="h5.700">
        Why Choose{' '}
        <Typography variant="h5.700" color="primary.main">
          Edunova{' '}
        </Typography>
        ?
      </Typography>
      <Typography variant="body2">
        Discover reliable, safe, and efficient education tailored to your goals
        at Edunova, guiding you seamlessly on your academic journey.
      </Typography>
    </>
  )
}

const Cards = ({ img, description }: { img: string; description: string }) => {
  const { smallScreen } = useScreenSize()
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: smallScreen ? 'column' : 'row',
        gap: '10px',
        width: '100%',
        justifyContent: smallScreen ? 'center' : 'space-between',
        alignItems: 'center',
        rowGap: '20px',
      }}
    >
      <div
        style={{
          width: smallScreen ? '100%' : '400px',
          height: smallScreen ? '300px' : '400px',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <img src={img} alt="why choose us" width={'100%'} height={'100%'} />
      </div>
      <Typography
        variant="body2.700"
        maxWidth={'800px'}
        style={{ whiteSpace: 'pre-line' }}
      >
        {description}
      </Typography>
    </div>
  )
}

export const WhyChooseUs = () => {
  return (
    <>
      {whyChooseData.map((item, index) => (
        <BuzInfoSection
          key={index}
          topInfo={
            <TopInfoSection
              title={item.title}
              textPrimary={item.textPrimary}
              subTitle={item.subTitle}
            />
          }
          showcaseSection={
            <Cards img={item.img} description={item.description} />
          }
          wrapperStyle={{
            marginBottom: index === 0 ? '-80px' : '-100px',
          }}
        />
      ))}
    </>
  )
}
