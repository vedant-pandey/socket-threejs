const express = require('express')
      app     = express()

app.use(express.static(__dirname, '/dist'))

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/prod/index.html')
})

app.listen(process.env.PORT || 8080)