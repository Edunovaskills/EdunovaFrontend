import { useQuery } from '@tanstack/react-query'
import { authApi } from 'entities/api'
import { getUserId } from 'shared/data-providers'

export const UserQueryKey = 'user-query'
export const useUserQuery = () => {
  const validUserId = !!getUserId() && getUserId() !== 'undefined'
  return useQuery({
    enabled: validUserId,
    queryKey: [UserQueryKey],
    queryFn: async () => {
      const response = await authApi.getUser()
      return response.data
    },
  })
}
export {
  useGetAllCoursesQuery,
  getAllCoursesQueryKey,
} from './courses/get-all-courses.query'

export {
  useCourseByIdQuery,
  GetCourseByIdQueryKey,
} from './courses/get-course-by-id.query'

export {
  useAllEventsQuery,
  AllEventsQueryKey,
} from './events/get-all-events.query'

export {
  useEventByIdQuery,
  EventByIdQueryKey,
} from './events/get-event-by-id.query'

export {
  useAllCoursesForAdminQuery,
  AllCoursesForAdminQueryKey,
} from './courses/get-all-cources-for-admin.query'

export {
  useCourseByIdAdminQuery,
  GetCourseByIdAdminQueryKey,
} from './courses/get-course-by-id.query'

export {
  useAllBlogsForAdminQuery,
  AllBlogsForAdminQueryKey,
} from './blogs/get-all-blogs-for-admin.query'

export {
  useBlogByIdAdminQuery,
  GetBlogByIdAdminQueryKey,
} from './blogs/get-blog-by-id-admin.query'

export {
  useAllEventsForAdminQuery,
  AllEventsForAdminQueryKey,
} from './events/get-all-events-for-admin.query'

export {
  useEventByIdAdminQuery,
  GetEventByIdAdminQueryKey,
} from './events/get-event-by-id-admin.query'
export {
  useAllCertificatesForAdminQuery,
  AllCertificatesForAdminQueryKey,
} from './certificates/get-all-certificates-for-admin.query'

export {
  useCertificateByKeyQuery,
  GetCertificateByKeyQueryKey,
  useDownloadCertificate,
} from './certificates/get-certificate-by-key.query'

export { useAllUsersQuery, AllUsersQueryKey } from './user/get-all-user.query'
export {
  useAllEnquiryAdminQuery,
  AllEnquiryForAdminKey,
} from './enquiry/get-all-enquiry-admin.query'

export {
  useEnquiryByIdQuery,
  EnquiryByIdKey,
} from './enquiry/get-enquiry-by-id.query'

export {
  useTestimonialsForAdminQuery,
  AllTestimonialForAdminQueryKey,
} from './testimonial/get-testimonial-admin.query'

export {
  useTestimonialsQuery,
  TestimonialQueryKey,
} from './testimonial/get-testimonial-admin.query'
