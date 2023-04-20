const Post = require('../models/post');

module.exports = (app) => {

  // Index
  // Strecth challenge
  app.get('/', async (req, res) => {
    try {
      const posts = await Post.find({}).lean()
      return res.render('posts-index', { posts });
    } 
    catch (err) {
      console.log(err.message);
    }
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