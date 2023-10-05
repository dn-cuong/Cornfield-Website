const { mongoose } = require('mongoose')

const podcastSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    trust: {
        type: Boolean,
        default: false,
    },
    image: {
        type: Buffer,
        require: true
    },
    imageMimetype: {
        type: String,
        require: true
    },
    audio: {
        type: Buffer,
        require: true
    },
    audioMimetype: {
        type: String,
        require: true
    },
    allow: {
        type: [String],
        require: true,
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true,
        ref: 'User',
    },
});
podcastSchema.query.trust = function () {
    return this.where({trust: true})
}

podcastSchema.statics.findByFileName = function (name) {
    if(name)
        return this.where({fileName: new RegExp(name, "i")}).trust().select('fileName');
    else
        return this.where().trust().select('name ownerId').populate("ownerId");
}

module.exports = mongoose.model('Podcast', podcastSchema);