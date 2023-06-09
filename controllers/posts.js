const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = (app) => {

  // Index
  // Strecth challenge
  app.get('/', async (req, res) => {
    const currentUser = req.user;
    try {
      const posts = await Post.find({}).lean().populate('author')
      return res.render('posts-index', { posts, currentUser });
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
    if (req.user) {
      try 
      {
        const userId = req.user._id;
        const post = new Post(req.body);
        post.author = req.user._id;
        post.upVotes = [];
        post.downVotes = [];
        post.voteScore = 0;
        await post.save();
        const user = await User.findById(userId);
        user.posts.unshift(post);
        await user.save();
        // REDIRECT TO THE NEW POST
        return res.redirect(`/posts/${post._id}`);
      }
      catch (err) 
      {
        console.log(err);
        res.status(500).send('Server error');
      }
    } else {
      return res.status(401); // UNAUTHORIZED
    } 
  });

  // SHOW
  // LOOK UP THE POST
  // When we do a reference association, we only save the id's into the parent's document. 
  // In order to replace these id's with the actual child document, we use the mongoose function .populate() 
  // when we fetch the parent from the database.
  
  // Stretch challenge - async await
  app.get('/posts/:id', async (req, res) => {
    const currentUser = req.user;
    try {
      const post = await Post.findById(req.params.id).populate('comments').lean();
      return res.render('posts-show', { post, currentUser });
    } catch (err) {
      console.log(err.message);
    }
  });

  // SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    const { user } = req;
    try {
      const posts = await Post.find({ subreddit: req.params.subreddit }).lean();
      res.render('posts-index', { posts, user });
    } 
    catch (err) {
      console.log(err.message);
    }
  });

  // we're using PUT because we are editing an existing resource.
  app.put('/posts/:id/vote-up', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      post.upVotes.push(req.user._id);
      post.voteScore = (post.voteScore || 0) + 1; // Check if voteScore is null or undefined, and set to 0 if it is
      await post.save();
      return res.status(200);
    } 
    catch(err) {
      console.log(err);
    }
  });

  app.put('/posts/:id/vote-down', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      post.downVotes.push(req.user._id);
      post.voteScore = (post.voteScore || 0) - 1; // Check if voteScore is null or undefined, and set to 0 if it is
      await post.save();
      return res.status(200);
    }
    catch(err) {
      console.log(err);
    };
  });
};