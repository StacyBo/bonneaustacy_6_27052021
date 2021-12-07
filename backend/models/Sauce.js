const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    // Ajouter les autres propriétés (voir le PDF "requirements")
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: false, default: 0 },
    dislikes: { type: Number, required: false, default: 0 },
    userLiked: { type: Array, required: false },
    userDisliked: { type: Array, required: false },
});

module.exports = mongoose.model('Sauce', sauceSchema);