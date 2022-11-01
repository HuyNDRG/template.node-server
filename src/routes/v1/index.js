import { Router } from 'express'
import { env } from '../../config/config.js'
import authRoute from './auth.route.js'

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
if (env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route)
  })
}

export default router
