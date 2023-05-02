// In order to handle this cookie we can use chai's request agent functionality to track the cookie in our tests.
// test/auth.js
const chai = require('chai');
// to make HTTP requests and perform assertions on the server's responses.
const chaiHttp = require('chai-http');
// describe is used to group related tests together and "it" is used to define individula tests cases.
const { describe, it } = require('mocha');

const app = require('../server');

// should is part of chai assertion library
const should = chai.should();

chai.use(chaiHttp);

// Agent that will keep track of our cookies: testing routes that require authentication or session management.
const agent = chai.request.agent(app);

const User = require('../models/user');

describe('User', function () {
    this.timeout();

    it('should not be able to login if they have not registered', function (done) {
        agent.post('/login', { email: 'wrong@example.com', password: 'nope' }).end(function (err, res) {
          res.should.have.status(401);
          done();
        });
      });

    // Signup
    it('should be able to signup', function (done) {
        User.findOneAndDelete({ username: 'testone' })
            .then(function () {
                agent
                    .post('/sign-up')
                    .send({ username: 'testone', password: 'password' })
                    .end(function (err, res) {
                        res.should.have.status(200);
                        agent.should.have.cookie('nToken');
                        done();
                    });
            })
            .catch(function (err) {
                done(err);
            });
    });
    
    after(function () {
        agent.close();
    });
});

