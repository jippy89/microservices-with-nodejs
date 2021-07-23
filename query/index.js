const express = require('express')
const cors = require('cors')
const axios = require('axios')

const PORT = 4002
const app = express()

app.use(express.json())
app.use(cors())

const posts = {}

const handleEvent = (type, data) => {
  switch (type) {
    case 'PostCreated':
      const { id, title } = data

      posts[id] = { id, title, comments: [] }
      break

    case 'CommentCreated': {
      const {id: commentId, content, status, postId} = data
      console.log(posts[postId])
      posts[postId].comments.push({ id: commentId, content, status })
      break
    }
      // I used 'commentId' because if I use 'id' apparently there's an error
    case 'CommentUpdated': {
      const {id , content, status, postId} = data
      let foundCommentIndex = posts[postId].comments.findIndex(comment => comment.id === id)
      if (foundCommentIndex >= 0) {
        posts[postId].comments[foundCommentIndex] = {
          ...posts[postId].comments[foundCommentIndex],
          content,
          status
        }
      }
      break
    }

    default:
      console.log('Error: Unprocessed entity')
      break
  }
}

app.get('/posts', (req, res) => {
  res.send(posts)
})
app.post('/events', (req, res) => {
  const { type, data } = req.body

  handleEvent(type, data)
})

app.listen(PORT, async () => {
  console.log('Listening on PORT: ' + PORT)

  console.log('Requesting to Event Bus')
  const eventBusResponse = await axios.get('http://event-bus-srv:4005/events')

  for (let event of eventBusResponse.data) {
    console.log('Processing ' + event.type)
    handleEvent(event.type, event.data)
  }
})