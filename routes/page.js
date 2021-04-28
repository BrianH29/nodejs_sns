const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const { Post, User, Hashtag } = require('../models');  


const router = express.Router(); 

router.get('/profile', isLoggedIn, (req,res) => {
    res.render('profile', { title : 'My Info - NodeBird'});
});

router.get('/join', isNotLoggedIn, (req,res) => {
    res.render('join', { title : 'Register - NodeBird'});
});

router.get('/', async (req,res,next) => {
    try{
        const posts = await Post.findAll({
            include : {
                model: User,
                attributes: ['id','nick']
            },
            order : [['createdAt', 'DESC']]
        });
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });
    }catch(err){
        console.error(err); 
        next(err);
    }
});

router.get('/hashtag', async(req,res,next)=>{
    const query = req.query.hashtag;
    if(!qurey){
        return res.redirect('/');
    }

    try{
        const hashtag = await Hashtag.findOne({where:{title:query}});
        let posts = [];
        if(hashtag) {
            posts = await hashtag.getPosts({include:[{model:User}]});
        }
        return res.render('main', {
            title: `${query} | NodeBird`,
            twits: posts,
        })
    } catch(err){
        console.error(err);
        return next(err); 
    }
})

module.exports = router; 