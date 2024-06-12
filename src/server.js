/* eslint-disable no-console */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'

const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Hello ${env.AUTHOR}, I am running successfull at Host: ${env.APP_HOST} and Port: ${env.APP_PORT}`)
  })

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
