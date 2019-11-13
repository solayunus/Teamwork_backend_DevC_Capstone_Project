const express = require('express');
const router = express.Router();
const feedCtrl = require('../controllers/feeds');

router.get('/feed', feedCtrl.getFeed);