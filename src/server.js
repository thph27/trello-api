/* eslint-disable no-console */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    process.exit(0)
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    console.log(`3. Hello Thph27, I am running successfull at Host: ${hostname} and Port: ${port}`)
  })

  exitHook(() => {
    console.log('4. Disconnecting to Mongo Cloud Atlas.....')
    CLOSE_DB ()
    console.log('5. Disconnected to Mongo Cloud Atlas')
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
