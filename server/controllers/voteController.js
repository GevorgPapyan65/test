const { Vote, UserVote } = require('../models/Vote');

const getUserVotes = async (user_id) => {
  let userVote = await UserVote.findOne({ user_id });
  if (!userVote) {
    userVote = new UserVote({ user_id });
    await userVote.save();
  } else {
    // Check if a month has passed since the last vote
    const oneMonth = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    if (Date.now() - new Date(userVote.last_voted_at).getTime() > oneMonth) {
      userVote.remaining_votes = 3;
      userVote.last_voted_at = Date.now();
      await userVote.save();
    }
  }
  return userVote;
};

const vote = async (voter_id, voted_id, is_company, vote_amount) => {
  const userVote = await getUserVotes(voter_id);

  if (userVote.remaining_votes <= 0) {
    throw new Error('No remaining votes');
  }

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const existingVote = await Vote.findOne({
    voter_id,
    voted_id,
    created_at: { $gte: oneMonthAgo },
  });

  if (existingVote) {
    throw new Error('Already voted for this user/company in the last month');
  }

  const newVote = new Vote({ voter_id, voted_id, is_company, vote_amount });
  await newVote.save();

  userVote.remaining_votes -= 1;
  userVote.last_voted_at = Date.now();
  await userVote.save();
};

module.exports = {
  vote,
};
