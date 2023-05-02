const { Schema, model } = require('mongoose');
const Populate = require('../util/autopopulate');

const commentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

// Always populate the author field
commentSchema
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'))

module.exports = model('Comment', commentSchema);