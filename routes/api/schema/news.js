const { mongoose } = require('mongoose')

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    thumbnail: {
        type: Buffer,
        ref: 'User',
        require: true
    },
    mimetype: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model('News', newsSchema);