

const express = require('express');
const router = express.Router();
const { Post, User } = require('../../models/');
const withAuth = require('../../utils/auth');


// check to see if this is the right place to add it .?// 





// const bodyParser = require('body-parser');

// router.use(bodyParser.json());

// router.post('/api/chatbot', withAuth, async (req, res) => {
//   const { message, apiKey } = req.body;

//   try {
//     // Use dynamic import for node-fetch as an ESM module
//     const fetch = await import('node-fetch');

//     const response = await fetch.default('https://api.openai.com/v1/engines/davinci-codex/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${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}`,
//       },
//       body: JSON.stringify({
//         prompt: message,
//         max_tokens: 100,
//       }),
//     });

//     const data = await response.json();
//     const reply = data.choices[0]?.text || "Sorry, I couldn't understand that.";

//     res.json({ reply });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ reply: "Oops! Something went wrong." });
//   }
// });






router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    const userData = await User.findByPk(req.session.user_id);

    const user = userData.get({ plain: true });
    console.log(user);
    const newPost = await Post.create({
      ...body,
      user_id: req.session.user_id,
      user,
    });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const PostData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!PostData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
