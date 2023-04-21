// We will use the require below to generate a JWT after the new user document is saved.
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = (app) => {
    // SIGN UP FORM
    app.get('/sign-up', (req, res) => res.render('sign-up'));

    // SIGN UP POST
    app.post('/sign-up', async (req, res) => {
        // Create User
        try {
            const user = new User(req.body);
            await user.save()
            // create JWT token
            const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
            // Set cookie
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });

            res.redirect('/');
        }
        catch (err) {
            console.log(err.message);
            return res.status(400).send({ err });
        };
    });
};