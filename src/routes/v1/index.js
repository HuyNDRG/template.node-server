import { Router } from 'express'
import config from '../../config/config'
import authRoute from './auth.route'

const router = Router()

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
]

const devRoutes = [
  // routes available only in development mode
  // {
  //   path: '/docs',
  //   route: docsRoute,
  // },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route)
  })
}

export default router
