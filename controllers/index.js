import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import db from '../models/indexDB';


const getHotDogList = async (req, res) => {
  const { typeSort } = req.query;
  try {
    const response = await db.getHotDogList({ typeSort });
    res.status(200).json(response);
  } catch ({ message }) {
    res.status(404).json(message);
  }
};

const saveImage = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), '/build/img/hotDogIcon');
    form.parse(req, (err, fields, files) => {
      if (err) {
        throw new Error('Form parse was failed :(');
      } else {
        const oldPath = files.image.path;
        const newPath = path.join(process.cwd(), '/build/img/hotDogIcon', files.image.name);
        fs.renameSync(oldPath, newPath);
        const nameOfImg = files.image.name;
        res.send({ nameOfImg });
      }
    });
  } catch ({ message }) {
    res.status(501).json(message);
  }
};

const addNewHotDog = async (req, res) => {
  const { name, price, img } = req.body;
  try {
    const response = await db.addNewHotDog({ name, price, img });
    res.status(201).json(response);
  } catch ({ message }) {
    res.status(501).json({ status: false, message });
  }
};

const editHotDogById = async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { id, name, price, img } = req.body;
  try {
    // eslint-disable-next-line object-curly-newline
    const response = await db.editHotDogById({ id, name, price, img });
    res.status(201).json(response);
  } catch ({ message }) {
    res.status(404).json({ status: false, message });
  }
};


const deleteHotDogById = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await db.deleteHotDogById({ id });
    res.status(201).json(response);
  } catch ({ message }) {
    res.status(404).json(false);
  }
};


export default {
  getHotDogList,
  saveImage,
  addNewHotDog,
  editHotDogById,
  deleteHotDogById,
};
