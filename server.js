const express = require('express'),
      app     = express()

app.use(express.static(__dirname + '/dist'))

const forceSSL = () => {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://',req.get('Host'), req.url].join('')
      )
    }
    next()
  }
}

app.use(forceSSL())

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/prod/index.html')
})

app.listen(process.env.PORT || 8080, () => {
  console.log('Server running')
})