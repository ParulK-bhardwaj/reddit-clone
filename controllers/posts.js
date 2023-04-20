const Post = require('../models/post');

module.exports = (app) => {

    // New
    app.get('/posts/new', (req, res) => {
        res.render('posts-new');
    });

  // CREATE
  app.post('/posts/new', async (req, res) => {
    try 
    {
      const post = new Post(req.body);
      await post.save();
      res.redirect('/');
    } 
    catch (err) 
    {
      console.log(err);
      res.status(500).send('Server error');
    }
  });
};