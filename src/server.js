/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()
  app.use(cors(corsOptions))
  // enable req.body json data
  app.use(express.json())

  // Use API v1
  app.use('/v1', APIs_V1)
  // Middleware xu li loi tap trung
  app.use(errorHandlingMiddleware)
  
  // Mtrg production (cu the la dang support Render.com)
  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`3. Production: Hello ${env.AUTHOR}, Back-end Server is running successfull at Port: ${process.env.PORT}`)
    })
  } else { 
    // Mtrg local dev
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(`3. Local DEV: Hello ${env.AUTHOR}, I am running successfull at Host: ${env.LOCAL_DEV_APP_HOST} and Port: ${env.LOCAL_DEV_APP_PORT}`)
    })
  }

  exitHook(() => {
    console.log('4. Server is shutting down.')
    CLOSE_DB ()
  })
}
// Chi khi connect Database thanh cong thi moi start Server Back-end
// Immediately-invoked / Anonymous Async Functions (IIFE)
(async() => {
  try {
    console.log('1. Connecting to Mongo Cloud Atlas.....')
    await CONNECT_DB()
    console.log('2. Connected to Mongo Cloud Atlas')

    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()


// console.log('1. Connecting to Mongo Cloud Atlas')
// CONNECT_DB()
//   .then(() => console.log('2. Connected to Mongo Cloud Atlas'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.log(error)
//     process.exit(0)
//   })
