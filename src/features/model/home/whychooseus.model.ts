import { publicImages } from 'shared/config'
import { CardDataType } from 'shared/model'


export const whyChooseUseCardData: CardDataType[] = [
  {
    title: 'Instant Course Enrollment',
    desc: 'No more waiting. Enroll in your desired courses instantly and start learning right away.',
    iconUrl: publicImages.clock,
  },
  {
    title: 'Real-Time Progress Tracking',
    desc: 'Stay informed at every step. Track your learning progress in real-time, from start to completion.',
    iconUrl: publicImages.location,
  },
  {
    title: 'Affordable Course Fees',
    desc: 'We offer competitive, transparent pricing with no hidden fees and extra charges.',
    iconUrl: publicImages.rupees,
  },
  {
    title: 'Quality Education',
    desc: 'Your education is our top priority. All our courses are designed by industry experts.',
    iconUrl: publicImages.safety,
  },
  {
    title: '24/7 Course Access',
    desc: 'Access your courses anytime, anywhere. Learn at your own pace with 24/7 availability.',
    iconUrl: publicImages['24HrsImage'],
  },
  {
    title: 'Diverse Course Options',
    desc: 'Choose the course that fits your needs. From beginner to advanced levels, we have it all.',
    iconUrl: publicImages.bike,
  },
]
