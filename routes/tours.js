import express from 'express';
import {
    createTour,
    getAllTour,
    getFeaturedTour,
    getDetailTour,
    getTourBySearch,
    updateTour,
} from '../controllers/tourController.js';

import { verifyAdmin, verifyToken } from '../utils/authenticate.js';
import { checkExistTour } from '../utils/checkExist.js';

const router = express.Router();

//Create new tour
router.post('/', verifyToken, verifyAdmin, createTour);

//Update tour
router.put('/:id', verifyToken, verifyAdmin, checkExistTour, updateTour);

//Get single tour
router.get('/:id', checkExistTour, getDetailTour);

//Get all tour
router.get('/', getAllTour);

router.get('/search/getTourBySearch', getTourBySearch);
router.get('/search/getFeaturedTour', getFeaturedTour);

export default router;
