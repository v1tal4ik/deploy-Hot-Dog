import mongoose from 'mongoose';

const { Schema } = mongoose;

const hotDogScema = new Schema({
  id: {
    type: String,
    required: [true, 'Id is undefined'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Name is undefined'],
  },
  price: {
    type: Number,
    required: [true, 'Price is undefined'],
  },
  img: {
    type: String,
    required: [true, 'Img is undefined'],
  },
}, {
  versionKey: false,
});

const HotDog = mongoose.model('hotdogs', hotDogScema);

export default HotDog;
