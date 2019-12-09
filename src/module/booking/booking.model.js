import moment from 'moment';
import mongoose, { Schema } from 'mongoose';

const bookingSchema = new Schema({
  bike: {
    type: Schema.Types.ObjectId,
    ref: 'bike',    
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  bookingDate: {
    type: Date,
    default: new Date(),
  },
  pickUpDate: {
    type: Date,
    default: new Date(),
  },
  returnDate: {
    type: Date,
    required: true,  
  },
  receiveAddress: {
    type: String,
    required: true,
  },
  returnAddress: {
    type: String,
  },
  receiveLatitude: {
    type: String,
  },
  receiveLongtitude: {
    type: String,
  },
  returnLatitude: {
    type: String,
  },
  returnLongtitude: {
    type: String,
  },
  bookingStatus: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  receiveType: {
    type: Number,
    required: true,
  },
});
bookingSchema.methods = {
  toJSON() {
    return {
      _id: this.id,
      bike: this.bike,
      user: this.user,
      bookingDate: moment(this.bookingDate).format('YYYY-MM-DD'),
      receiveAddress: this.receiveAddress,
      returnAddress: this.returnAddress,
      pickUpDate: moment(this.pickUpDate).format('YYYY-MM-DD'),
      returnDate: moment(this.returnDate).format('YYYY-MM-DD'),
      receiveLongtitude: this.receiveLongtitude,
      receiveLatitude: this.receiveLatitude,
      returnLongtitude: this.returnLongtitude,
      returnLatitude: this.returnLatitude,
      bookingStatus: this.bookingStatus,
      phone: this.phone,
      fullname: this.fullname,
      receiveType: this.receiveType,
    };
  },
};
export default mongoose.model('booking', bookingSchema);
