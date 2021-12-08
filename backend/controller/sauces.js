const Sauce = require("../models/Sauce");
const fs = require('fs');

exports.addSauce = (req, res, next) => {
    console.log(req.body)
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            // 1. Find the filename
            const filename = sauce.imageUrl.split('/images/')[1];
            // 2. Delete the image from the server
            fs.unlink(`images/${filename}`, () => {
                // 3. Delete the sauce from the database
                Sauce.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: "Sauce supprimée"}))
                    .catch((error) => res.status(400).json({error}));
            });
        })
        .catch(error => res.status(400).json({error}));
};

exports.updateSauce = (req, res, next) => {
    // 1. Create the new "sauce" object
    let sauceObject;
    if (req.file) {
        sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        };
    } else {
        sauceObject = { ...req.body };
    }
    // 2. Find the Sauce in database and update it with the new "sauceObject"
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};
