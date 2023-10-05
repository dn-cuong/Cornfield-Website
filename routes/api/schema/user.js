const { mongoose } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    principalId: {
        type: String,
        require: true
    },
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);