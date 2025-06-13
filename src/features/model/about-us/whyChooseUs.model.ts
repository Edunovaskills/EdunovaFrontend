import { publicImages } from 'shared/config'
import { CardDataType } from 'shared/model'

export const whyChooseUseCardDataForAbout: CardDataType[] = [
  {
    title: 'Safety & Trust',
    desc: 'We prioritize your safety with driver background checks and vehicles.',
    iconUrl: publicImages.safety,
  },
  {
    title: 'Convenience',
    desc: 'With our app, booking a ride is effortless. Get location in few clicks.',
    iconUrl: publicImages.location,
  },
  {
    title: 'Affordability',
    desc: 'We ensure fair pricing with competitive rates and no hidden charges.',
    iconUrl: publicImages.rupees,
  },
  {
    title: 'Customer Support',
    desc: 'Our 24/7 support team is always available to assist you.',
    iconUrl: publicImages['24HrsImage'],
  },
]
