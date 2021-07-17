const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios')

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  
  const comments = commentsByPostId[req.params.id] || [];
  
  const createdComment = {
    id: commentId,
    content,
    status: 'pending'
  }

  comments.push(createdComment);

  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      ...createdComment,
      postId: req.params.id
    }
  })

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body

  switch (type) {
    case 'CommentModerated':
      let foundComment = commentsByPostId[data.postId].find(comment => comment.id === data.id)

      if (foundComment) {
        foundComment = {
          id: data.id,
          content: data.content,
          status: data.status,
        }

        await axios.post('http://localhost:4005/events', {
          type: 'CommentUpdated',
          data: {
            ...foundComment,
            postId: data.postId
          }
        })
      }
      break
    default:
      console.log('Unprocessed event')
      break
  }

  console.log(req.body)
  res.send(req.body)
})

app.listen(4001, () => {
  console.log('Listening on 4001');
});
