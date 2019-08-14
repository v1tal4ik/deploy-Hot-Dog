import uuidv4 from 'uuid/v4';
import HotDog from './indexScema';

const getHotDogList = async ({ typeSort }) => {
  const doc = await HotDog.find({}).sort({ price: (typeSort === 'expensive') ? -1 : 1 });
  if (doc.length) {
    return Promise.resolve(doc);
  }
  return Promise.reject(new Error('Not found data in DB :('));
};


const addNewHotDog = async ({ name, price, img }) => {
  const id = uuidv4();
  const obj = new HotDog({
    id, name, price, img,
  });
  const doc = await obj.save();
  if (doc.id && doc.name === name) {
    return Promise.resolve({
      status: true,
      message: `The ${name} succesfully added :)`,
    });
  }
  return Promise.reject(new Error(`Sorry, the ${name} did not add :(`));
};


// eslint-disable-next-line object-curly-newline
const editHotDogById = async ({ id, name, price, img }) => {
  const doc = await HotDog.findOneAndUpdate({ id }, { name, price, img }, { new: true });
  if (doc.id === id) {
    return Promise.resolve({
      status: true,
      message: `The ${name} succesfully edited :)`,
    });
  }
  return Promise.reject(new Error(`Sorry, the ${name} did not edit :(`));
};


const deleteHotDogById = async ({ id }) => {
  const doc = await HotDog.findOneAndDelete({ id });
  if (doc.id === id) {
    return Promise.resolve(true);
  }
  return Promise.reject(new Error(`Sorry, the ${id} did not delete :(`));
};


export default {
  getHotDogList,
  addNewHotDog,
  editHotDogById,
  deleteHotDogById,
};
