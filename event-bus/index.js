const { default: axios } = require('axios')
const express  = require('express')
const app = express()

const PORT = 4005

app.use(express.json())

const events = []

app.get('/events', (req, res) => {
  res.send(events)
})

app.post('/events', (req, res) => {
  const event = req.body

  events.push(event)

  axios.post('http://posts-clusterip-srv:4000/events', event).catch(err => console.log(err))
  axios.post('http://comments-srv:4001/events', event).catch(err => console.log(err))
  axios.post('http://query-srv:4002/events', event).catch(err => console.log(err))
  axios.post('http://moderation-srv:4003/events', event).catch(err => console.log(err))

  res.status(201).send({
    status: 'OK'
  })
})

app.listen(PORT, () => {
  console.log('Listening on PORT: ' + PORT)
})