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

  // SHOW
  // LOOK UP THE POST
  // When we do a reference association, we only save the id's into the parent's document. 
  // In order to replace these id's with the actual child document, we use the mongoose function .populate() 
  // when we fetch the parent from the database.

  // Stretch challenge - async await
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean().populate('comments')
      return res.render('posts-show', { post });
    }
    catch (err) {
      console.log(err.message);
    }
  });

// SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    try {
      const posts = await Post.find({ subreddit: req.params.subreddit }).lean()
      return res.render('posts-index', { posts });
    } catch (err) {
      console.log(req.params.subreddit);
    }
  });
};