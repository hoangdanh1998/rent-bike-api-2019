import mongoose, { Schema } from 'mongoose';

const bikeSchema = new Schema({ 
  bikeName: {
    type: String,
    required: true,
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: 'branch',
    required: true,
  },
  bikeStatus: {
    type: Number,
    required: true,
  },
  engineSize: {
    type: Number,
    required: true,
  },
  transmissionType: {
    type: Number,
    required: true,
  },
  moneyRent: {
    type: Number,
    required: true,
  },
  moneyDeposit: {
    type: Number,
    required: true,
  },
  collaterals: {
    type: Array,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  
});
bikeSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      bikeName: this.bikeName,
      branch: this.branch,
      bikeStatus: this.bikeStatus,
      engineSize: this.engineSize,
      transmissionType: this.transmissionType,
      moneyRent: this.moneyRent,
      moneyDeposit: this.moneyDeposit,
      collaterals: this.collaterals,
      images: this.images,
    };
  },
};
export default mongoose.model('bike', bikeSchema);
