const { mongoose } = require('mongoose')

const answerSchema = new mongoose.Schema({
    user : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    answer: {
        type: [String],
        require: true,
    },
});

module.exports = mongoose.model('answer', answerSchema);