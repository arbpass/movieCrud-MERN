const mongoose= require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    imgUrl: {
        type: String,
        required: false,
    },
    producer: {
        type: String,
        required: true,
    },
    actors: {
        type: Array,
        required: true,
    },
})


const movies = new mongoose.model('movies', movieSchema);

module.exports = movies;