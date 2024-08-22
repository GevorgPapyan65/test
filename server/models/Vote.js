const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  voter_id: { type: String, required: true },
  voted_id: { type: String, required: true },
  is_company: { type: Boolean, default: false },
  vote_amount: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

voteSchema.index({ voter_id: 1, voted_id: 1 }, { unique: true });

const userVoteSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  remaining_votes: { type: Number, default: 3 },
  last_voted_at: { type: Date, default: Date.now },
});

module.exports = {
  Vote: mongoose.model('Vote', voteSchema),
  UserVote: mongoose.model('UserVote', userVoteSchema),
};
