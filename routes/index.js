const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/users', require('./users'));
router.use('/books', require('./books'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    })
});

module.exports = router;