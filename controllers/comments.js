const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = (app) => {

    // CREATE Comment
    app.post('/posts/:postId/comments', async (req, res) => {
        // INSTANTIATE INSTANCE OF MODEL
        try 
        {
            // Creates a new comment object using the data from req.body
            const comment = new Comment(req.body);
            // sets the author property of the comment object to the _id property of the req.user object.
            comment.author = req.user._id;
            // SAVE INSTANCE OF Comment MODEL TO DB
            await comment.save()

            // Reference Association Comments to Post
            // Find Parent Post
            const post = await Post.findById(req.params.postId)
            // unshift adds an element to the front of an array.
            // Reddit puts its newest comments at the top, so we want the default order to be reverse chronological order.
            post.comments.unshift(comment);
            await post.save();

            // REDIRECT TO THE ROOT
            res.redirect('/');
        }
        catch(err) {
            console.log(err);
        };
    });
};