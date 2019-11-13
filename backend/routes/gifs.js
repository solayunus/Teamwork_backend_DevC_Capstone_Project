const express = require('express');
const router = express.Router();
const gifCtrl = require('../controllers/gifs');




router.get('/', gifCtrl.getGifs);
router.delete('/:id', gifCtrl.deleteGif);
router.post('/', gifCtrl.createGif);
router.put('/:id', gifCtrl.updateGif);
router.get('/:id/comment', gifCtrl.getComments);
router.post('/:id/comment', gifCtrl.createGifComment);
module.exports = router;