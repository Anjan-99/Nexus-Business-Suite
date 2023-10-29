const mangoose = require('mongoose');

const ImageSchema = mangoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    filepath: {
        type: String,
        required: true,
    },
});

module.exports = mangoose.model('Image', ImageSchema);