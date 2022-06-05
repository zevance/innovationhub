const express = require('express')
const router = express.Router()
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth')


// @Desc login/landing page
// @route GET/
router.get('/', forwardAuthenticated, (req,res) =>{
    res.render('login', {
        layout:'login',
    })
})

// @Desc dashboard
// @route GET/dashboard
router.get('/dashboard', ensureAuthenticated, (req,res) =>{
    res.render('dashboard', {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        username: req.user.username,
    })
})


module.exports = router