import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import constants from '../../config/constants';

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
  fullname: {
    type: String,
    required: true,
  },     
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,    
  },
  avatar: {
    trim: true,
    type: String,
  }, 
  email: {
    type: String,
    required: true,
  },
  isRemoved: {
    type: Boolean,
    default: false,
  }, 
});

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this.hashPassword(this.password);
  }
  return next();
});

userSchema.methods = {
  hashPassword(password) {
    return hashSync(password);
  },
  validatePassword(password) {
    return compareSync(password, this.password);
  },
  generateJWT(lifespan) {
    const expirationDate = new Date();
    expirationDate.setDate(new Date().getDate() + lifespan);

    return jwt.sign({
      _id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, constants.JWT_SECRET);
  },
  toJSON() { 
    return {
      _id: this._id,
      username: this.username,
      fullname: this.fullname,
      phone: this.phone,
      role: this.role,
      avatar: this.avatar,
      isRemoved: this.isRemoved,
    };
  },

  toAuthJSON() {
    return {
      ...this.toJSON(),
      token: this.generateJWT(constants.TOKEN_LIFESPAN),
    };
  },
  
};
userSchema.index({ fullname: 'text' });
userSchema.statics = {
  list({ search, queries } = {}) {
    return search ?
      this.find(queries, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }) :
      this.find(queries).sort({ fullname: 1 });
  },
};
export default mongoose.model('user', userSchema);
