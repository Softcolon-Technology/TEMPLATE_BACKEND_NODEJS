import mongoose from 'mongoose'
import constant from '../utilities/constant.js'
const Schema = mongoose.Schema

const symbolSchema = new Schema(
  {
    name: {
      type: String,
      trim: true
    },
    contractSize: {
      type: String,
      trim: true
    },
    currency: {
      type: String,
      enum: constant.CURRENCY
    },
    spread: {
      type: Number
    },
    stopLevel: {
      type: Number
    },
    tickSize: {
      type: Number
    },
    tickValue: {
      type: Number
    },
    inRialMargin: {
      type: Number
    },
    maintenanceMargin: {
      type: Number
    },
    mimVolume: {
      type: Number
    },
    maxVolume: {
      type: Number
    },
    stAndTp: {
      type: Boolean
    }
  },
  { timestamps: true }
)
export const SymbolModel = mongoose.model('symbol', symbolSchema)