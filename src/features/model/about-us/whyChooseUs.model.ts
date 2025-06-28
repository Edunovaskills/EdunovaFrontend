import { publicImages } from 'shared/config'
import { CardDataType } from 'shared/model'

export const whyChooseUseCardDataForAbout: CardDataType[] = [
  {
    title: 'Quality & Trust',
    desc: 'We prioritize your learning experience with accredited courses and expert instructors, ensuring a trusted educational journey.',
    iconUrl: publicImages.safety,
  },
  {
    title: 'Convenience',
    desc: 'Access our platform effortlessly, with intuitive navigation to explore courses and resources in just a few clicks.',
    iconUrl: publicImages.location,
  },
  {
    title: 'Affordability',
    desc: 'We offer competitive pricing for our programs, with transparent costs and accessible options for all learners.',
    iconUrl: publicImages.rupees,
  },
  {
    title: 'Student Support',
    desc: 'Our dedicated support team is available 24/7 to assist with your academic needs and queries.',
    iconUrl: publicImages['24HrsImage'],
  },
]
