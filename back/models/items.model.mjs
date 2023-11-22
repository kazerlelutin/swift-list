import mongoose from "mongoose"
const { Schema, model, models } = mongoose

export const ItemsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  realName: {
    type: String,
    required: false,
  },
  section: {
    type: String,
    required: false,
  },
})

export const Items = models.items || model("items", ItemsSchema)
