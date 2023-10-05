const express = require('express');
const router = express.Router();
const Podcast = require('./api/schema/podcast');
const News = require('./api/schema/news');
let token = require('../onchain/token');
const {get} = require("mongoose");

async function getPage(req, res, page) {
    token = await token;
    if(req.isAuthenticated()) {
        res.render(page, {
            login: req.user.username,
            money: await token.balanceOf(await token.textToPrincipal(req.user.principalId))
        });
    } else {
        res.render(page, { login: undefined, money: undefined });
    }
}

router.get('/', async (req, res) => {
    await getPage(req, res, 'index');
});

router.get('/charity', async (req, res) => {
    await getPage(req, res, 'charity');
});

router.get('/leaderboard', async (req, res) => {
    await getPage(req, res, 'leaderboard');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/game', async (req, res) => {
    await getPage(req, res, 'game');
})

router.get('/news', async (req, res) => {
    if(req.isAuthenticated()) {
        res.render('news', {
            login: req.user.username,
            money: await token.balanceOf(await token.textToPrincipal(req.user.principalId)),
            news: await News.where(),
        });
    } else {
        res.render('news', { login: undefined, money: undefined, news: await News.where(),});
    }
});

router.get('/podcast', async (req, res) => {
    if(req.isAuthenticated()) {
        res.render('podcast', {
            login: req.user.username,
            money: await token.balanceOf(await token.textToPrincipal(req.user.principalId)),
            podcasts: await Podcast.findByFileName()
        });
    } else {
        res.render('podcast', { login: undefined, money: undefined , podcasts: await Podcast.findByFileName()});
    }
});

router.get('/playing_pod/:id', async (req, res) => {
    const data = await Podcast.findById(req.params.id);
    if(data.get("allow").includes(req.user?._id.toString())){
        try {
            const data = await Podcast.findById(req.params.id).lean();
            res.render('playing_pod', {
                name: data.name,
                id: req.params.id,
                login: req.user.username,
                money: await token.balanceOf(await token.textToPrincipal(req.user.principalId))
            });
        } catch {
            res.redirect('/podcast');
        }
    } else {
        res.redirect('/login');
    }
});

router.get('/buy_pod/:id', async (req, res) => {
    if(req.isAuthenticated()){
        const data = await Podcast.findById(req.params.id);
        if(!data.get("allow").includes(req.user?._id.toString())){
            try {
                res.render('buy_pod', {
                    podcast: await Podcast.findById(req.params.id),
                    login: req.user.username,
                    money: await token.balanceOf(await token.textToPrincipal(req.user.principalId))
                });
            } catch {
                res.redirect('/podcast');
            }
        } else {
            res.redirect('/playing_pod/' + req.params.id);
        }
    } else {
        res.redirect('/login');
    }
});

router.get('/afterpod/:id', async (req, res) => {
    const data = await Podcast.findById(req.params.id);
    if(data.get("allow").includes(req.user?._id.toString())){
        try{
            const data = await Podcast.findById(req.params.id).lean().populate('ownerId');
            res.render('afterpod', {
                id: data._id,
                name: data.name,
                username: data.ownerId.username,
                login: req.user.username,
                money: await token.balanceOf(await token.textToPrincipal(req.user.principalId)),
            });
        } catch (e) {
            res.redirect('/podcast');
        }
    } else {
        res.redirect('/login');
    }
});

router.get('/quizz/:id', async (req, res) => {
    const data = await Podcast.findById(req.params.id);
    if(data.get("allow").includes(req.user?._id.toString())){
        res.render('quizz', {
            login: req.user.username,
            money: await token.balanceOf(await token.textToPrincipal(req.user.principalId))
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/blog/:id', async (req, res) => {
    if(req.isAuthenticated()) {
        res.render('blog', {
            login: req.user.username,
            money: await token.balanceOf(await token.textToPrincipal(req.user.principalId)),
            news: await News.findById(req.params.id)
        });
    } else {
        res.render('blog', { login: undefined, money: undefined, news: await News.findById(req.params.id)});
    }
})

router.get('/up_podcast', async (req, res) => {
    if(req.isAuthenticated()) {
        res.render('up_podcast', {
            login: req.user.username,
            money: await token.balanceOf(await token.textToPrincipal(req.user.principalId))
        });
    } else {
        res.redirect('/login')
    }
})

module.exports = router;
