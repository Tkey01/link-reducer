const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth_routes'))
app.use('/api/link', require('./routes/links_routes'))
app.use('/t', require('./routes/redirect_routes'))

const PORT = config.get('port') | 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log('App server started on port - ', PORT))
  } catch (e) {
    console.log('Server error - ', e.message)
    process.exit(1)
  }
}

start()
