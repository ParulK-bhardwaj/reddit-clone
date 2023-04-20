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

  // NEW - form
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

  // LOOK UP THE POST
  // Stretch challenge - async await
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean()
      return res.render('posts-show', { post });
    }
    catch (err) {
      console.log(err.message);
    }
  });
};