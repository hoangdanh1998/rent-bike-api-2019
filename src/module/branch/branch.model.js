import mongoose, { Schema } from 'mongoose';

const branchSchema = new Schema({
  branchName: {
    type: String,
    required: [true, 'Branch name is require'],
  },
  address: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,    
  },
  longtitude: {
    type: Number,
    required: true,    
  },
});
branchSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      branchName: this.branchName,
      address: this.address,
      latitude: this.latitude,
      longtitude: this.longtitude,
    };
  },
};

export default mongoose.model('branch', branchSchema);
