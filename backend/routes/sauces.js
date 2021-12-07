const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const saucesCtrl = require('../controller/sauces');

const Sauce = require('../models/sauces');

// GET /api/sauces
router.get('/', auth, saucesCtrl.getSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);


// POST /api/sauces
router.post('/', auth, saucesCtrl.addSauce);

// PUT
router.put('/:id', auth, saucesCtrl.updateSauce);

// DELETE
router.delete('/:id' , auth, saucesCtrl.deleteSauce);


/*router.post('/api/sauces', (req, res, next) => {
    delete req.body._id;
    const Sauce = new Sauce({
        ...req.body
    });
    Sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});*/

/*router.put('/api/sauces/:id', (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
});*/

/*router.delete('/api/sauces/:id', (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
});*/

/*router.get('/api/sauces/:id', (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
});*/

/*router.get('/api/sauces', (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
});
*/

module.exports = router;