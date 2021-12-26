const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const saucesCtrl = require('../controller/sauces');
const multer = require('../middleware/multer-config');

// GET /api/sauces
router.get('/', auth, saucesCtrl.getSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);

// POST /api/sauces
router.post('/', auth, multer, saucesCtrl.addSauce);

router.post('/:id/like', auth, saucesCtrl.likeDislikeSauce);


// PUT
router.put('/:id', auth, multer, saucesCtrl.updateSauce);

// DELETE
router.delete('/:id', auth, saucesCtrl.deleteSauce);


module.exports = router;