import express from 'express';
import controllers from '../controllers/index';

const router = express.Router();


router.get('/hot-dogs', controllers.getHotDogList);
router.post('/image', controllers.saveImage);
router.post('/hot-dogs', controllers.addNewHotDog);
router.patch('/hot-dogs', controllers.editHotDogById);
router.delete('/hot-dogs', controllers.deleteHotDogById);


export default router;
