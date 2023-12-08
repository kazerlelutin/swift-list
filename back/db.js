// getting-started.js
import mongoose from "mongoose"

export async function mongoDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
  } catch (e) {
    console.error(e)
  }
}
