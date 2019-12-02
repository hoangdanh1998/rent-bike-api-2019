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
    type: String,
    required: true,    
  },
  longtitude: {
    type: String,
    required: true,    
  },
  isActive: {
    type: Boolean,
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
      isActive: this.isActive,
    };
  },
};

export default mongoose.model('branch', branchSchema);
