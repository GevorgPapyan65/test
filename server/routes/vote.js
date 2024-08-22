const express = require('express');
const { vote } = require('../controllers/voteController');
const auth = require('../middleware/auth');
const router = express.Router();
const checkCompanyVerification = require('../middleware/isVerified')
const authenticateJWT = require('../middleware/companyAuth');
const { Vote, UserVote } = require('../models/Vote');


router.post('/user',auth, async (req, res) => {
  const { voter_id, voted_id, vote_amount } = req.body;
    if(req.user.id !== voter_id)
        return res.status(301).json({message:"id missmatch"});
  try {
    await vote(voter_id, voted_id,false, vote_amount);
    res.status(200).send({ message: 'Vote recorded' });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post('/company',[authenticateJWT,checkCompanyVerification], async (req, res) => {
  const { voter_id, voted_id, vote_amount } = req.body;

  try {
    await vote(voter_id, voted_id, true, vote_amount);
    res.status(200).send({ message: 'Vote recorded' });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/voting-logs', async (req, res) => {
    try {
      const votes = await Vote.find({});
      const userVotes = await UserVote.find({});
  
      res.status(200).send({
        votes,
        userVotes,
      });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

module.exports = router;
