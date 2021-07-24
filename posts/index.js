const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios')

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title
  };

  const eventBody = {
    type: 'PostCreated',
    data: {
      ...posts[id]
    }
  }

  await axios.post('http://event-bus-srv:4005/events', eventBody)
    .catch(err => {
      console.log('Requesting to event endpoint failed')
      console.log(eventBody)
      console.error(err)
    })

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  const event = req.body
  console.log(event)
  res.send(event)
})

app.listen(4000, () => {
  console.log('Version 0.0.3')
  console.log('Listening on 4000');
});
