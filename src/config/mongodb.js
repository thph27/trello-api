import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'


// Khoi tao doi tuong trelloDatabaseInstance ban dau la null vi chua connect
let trelloDatabaseInstance = null
// Khoi tao 1 doi tuong MongoClientInstance de connect toi MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
export const CONNECT_DB = async () => {
  // goi ket noi toi MongoDB Atlas voi URI da khai bao
  await mongoClientInstance.connect()
  // Ket noi thanh cong thi lay Database ra theo ten va gan nguoc lai vao bien trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}
// cai nay co nhiem vu export trelloDatabaseInstance sau khi da connect thanh cong toi MongoDB de co the su dung o nhieu noi
// chi goi cai GET_DB nay sau khi da ket noi thanh cong toi MongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}
