import { Collection, Db, MongoClient } from 'mongodb'
import User from '~/models/schemas/User.schema'

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.uyggfqo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Connected')
    } catch (error) {
      console.log('error', error)
      throw error
    }
    //Vừa connect xong thì close :))
    // finally {
    //   await this.client.close()
    // }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.COLLECTION_USER as string)
  }
}

const databaseService = new DatabaseService()

export default databaseService
