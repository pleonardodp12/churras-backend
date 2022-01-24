
import mongoose from 'mongoose'
import { config } from 'dotenv';
import { join } from 'path';

const path = join(__dirname, '.env')
config({ path })

const URI = process.env.DATABASE_URI

mongoose.connect(URI || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})