const express = require('express')
const axios = require('axios')

const PORT = 4003
const app = express()

app.use(express.json())

app.post('/events', async (req, res) => {
  const { type, data } = req.body

  switch (type) {
    case 'CommentCreated':
      const status = data.content.includes('orange') ? 'rejected' : 'approved'
      data.status = status

      await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentModerated',
        data
      })
      break
    default:
      console.log('Unprocessed type: ', type)
      break
  }

  console.log(req.body)
  res.send(req.body)
})

app.listen(PORT, () => {
  console.log('App listening on port: ' + PORT)
})