const express = require('express');

const Question = require('./schema/question');
const Podcast = require('./schema/podcast');
const Answer = require('./schema/answer')
const { mongoose } = require("mongoose");
const router = express.Router();
let token = require('../../onchain/token');

router.post("/create", async(req, res) => {
    const data = req.body;
    const audio = await Podcast.findById(data.audio);
    if(req.user?._id?.toString() === audio._doc.ownerId.toString()){
        await Question.create({
            question: data.question,
            options: data.options,
            answer: data.answer,
            audio: mongoose.Types.ObjectId(data.audio)
        });
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
    if(req.isAuthenticated()){
        if (await Answer.exists({user: req.user._id}))
            await Answer.deleteOne({user: req.user._id});
        const question = await Question.where({audio: req.params.id}).lean();
        await Answer.create({
            user: req.user._id,
            answer: question.map(q => q.answer),
        });
        res.status(201).send(question.map((value, index) => ({numb:index, question: value.question, options: value.options})));
    } else {
        res.sendStatus(401);
    }
});

router.post("/answer", async (req, res) => {
    token = await token
    if(req.isAuthenticated()){
        let score = 0;
        const {answer} = await Answer.findOne({user: req.user._id.toString()}).lean();
        for(let i=0; i<answer.length; i++){
            if(answer[i] === req.body.answer[i]){
                score++;
            }
        }
        res.send(score.toString());
        await token.transfer(await token.textToPrincipal(req.user.principalId), score);
    } else {
        res.sendStatus(401);
    }
})

module.exports = router;