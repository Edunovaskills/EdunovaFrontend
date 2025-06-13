import { RouterProvider as ReactRouterProvider } from 'react-router-dom'

import Router from '../Router'

export function RouterProvider() {
  return <ReactRouterProvider router={Router} />
}
