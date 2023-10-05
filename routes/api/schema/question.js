const { mongoose } = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        require: true,
    },
    option: {
        type: [String],
        require: true,
    },
    answer: {
        type: String,
        require: true,
    },
    audio: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Podcast'
    }
})

questionSchema.query.findByAudioId = function (id) {
    return this.where({audio: id});
}

questionSchema.query.trust = function () {
    return this.where({trust: true});
}

module.exports = mongoose.model('Question', questionSchema);
