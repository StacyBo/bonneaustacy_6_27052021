const Sauce = require("../models/Sauce");
const fs = require('fs');

exports.addSauce = (req, res, next) => {
    console.log(req.body)
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [' '],
        usersdisLiked: [' '],
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

exports.likeDislikeSauce = (req, res, next) => {
    // 1. Trouver la sauce dans la DB
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            // 2. Réinitialiser ses like et dislike
            resetUserLikeAndDislike(sauce);

            // 3. Mettre à jour ses like et dislike
            switch (req.body.like) {
                case 1:
                    // Like
                    sauce.usersLiked.push(req.body.userId);
                    sauce.likes++;
                    break;
                case -1:
                    // Dislike
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.dislikes++;
                    break;
            }
            sauce.save()
                .then(() => res.status(200).json({message: 'Sauce modifiée'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(400).json({error}));

    function resetUserLikeAndDislike(sauce) {
        // chercher le "UserLiked" ou "UserDisliked" index de l'utilisateur actuel
        const indexUserLiked = sauce.usersLiked.indexOf(req.body.userId);
        const indexUserDisliked = sauce.usersDisliked.indexOf(req.body.userId);

        if (indexUserLiked > -1) {
            // L'utilisateur à été trouvé dans la list des like
            sauce.usersLiked.splice(indexUserLiked, 1);
            sauce.likes--;
        }
        if (indexUserDisliked > -1) {
            // L'utilisateur à été trouvé dans la liste des dislike
            sauce.usersDisliked.splice(indexUserDisliked, 1);
            sauce.dislikes--;
        }
    }
}