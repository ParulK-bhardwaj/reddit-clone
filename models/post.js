const { Schema, model } = require('mongoose');

// Stretch challenege for timestamp
// As of Mongoose 4.0 you can now set timestamps options on the Schema and have Mongoose handle the created at and updated at attributes for you. 
const postSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subreddit: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

module.exports = model('Post', postSchema);