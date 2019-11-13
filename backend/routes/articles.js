const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');



router.get('/', auth, articleCtrl.getArticles);
router.get('/:id', auth, articleCtrl.getOneArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);
router.post('/', auth, articleCtrl.createArticle);
router.put('/:id', auth, articleCtrl.updateArticle);
router.post('/:id/comment', auth, articleCtrl.createArticleComment);
router.get('/:id/comment', auth, articleCtrl.getComments);
module.exports = router;