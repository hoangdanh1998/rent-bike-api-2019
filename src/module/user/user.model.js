import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'Username is already'],
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },      
});
userSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      username: this.username,
      password: this.password,
    };
  },
};
export default mongoose.model('User', userSchema);
