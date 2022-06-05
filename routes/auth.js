const express = require('express')
const passport = require('passport')
const router = express.Router()


// @Desc Authenticate with google
// @route GET/auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }) )

// @Desc google auth callback
// @route GET/auth/google/callback
router.get(
        '/google/callback', 
        passport.authenticate('google', { failureRedirect: '/' }), 
        (req, res) =>  { 
            res.redirect('/dashboard')
        }
    )

// @des logout user
// @route /auth/logout
router.get('/logout', function(req, res, next) {
    req.logout((err) => {
      if (err) { return next(err) }
      res.redirect('/')
    })
  })

module.exports = router