const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const { Post, User } = require('../models');  


const router = express.Router(); 

router.get('/profile', isLoggedIn, (req,res) => {
    res.render('profile)', { title : 'My Info - NodeBird'});
});

router.get('/join', isNotLoggedIn, (req,res) => {
    res.render('join', {
        title : 'Register - NodeBird',
        user: req.user,
        joinError: req.flash('joinError')
    });
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

module.exports = router; 