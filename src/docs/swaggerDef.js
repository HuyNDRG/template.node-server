import { version } from '../../package.json'
import config from '../config/config'

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'template.node-server API documentation',
    version,
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
}

export default swaggerDef

