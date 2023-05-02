const { Schema, model } = require('mongoose');
const Populate = require('../util/autopopulate');

// Stretch challenege for timestamp
// As of Mongoose 4.0 you can now set timestamps options on the Schema and have Mongoose handle the created at and updated at attributes for you. 
const postSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subreddit: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  upVotes : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downVotes : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  voteScore : { type: Number },
}, { timestamps: true });

// Always populate the author field
postSchema
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'));

module.exports = model('Post', postSchema);