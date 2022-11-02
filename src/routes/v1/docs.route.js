import { Router } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import swaggerDef from '../../docs/swaggerDef'

const docsRoute = Router()

const specs = swaggerJSDoc({
  swaggerDefinition: swaggerDef,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.js'],
})

docsRoute.use('/', swaggerUi.serve)
docsRoute.get('/', swaggerUi.setup(specs, { explorer: true }))

export default docsRoute
