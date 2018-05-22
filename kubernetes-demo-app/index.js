const http = require('http')
const os = require('os')

const port = 8080
const version = process.env.VERSION || '0.0'

let terminating = false

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`)

  const resJson = (js, statusCode = 200) => {
    res.writeHead(statusCode, { 'Content-Type': 'text/plain' })
    res.end(JSON.stringify(js, null, 2))
  }

  switch (req.url) {
    case '/':
      resJson({
        hostname: os.hostname(),
        timestamp: new Date().toISOString(),
        version,
      })
      break

    case '/_liveness':
      resJson({ message: 'OK' })
      break

    case '/_readiness':
      if (!terminating) {
        resJson({ message: 'OK' })
      } else {
        resJson({ message: 'Terminating' }, 500)
      }
      break

    default:
      resJson({ message: 'Not found' }, 404)
      break
  }
})

server.listen(port, (err) => {
  if (err) {
    console.log(err)
    process.exit(1)
  } else {
    console.log(`Listening on ${port}`)
  }
})

process.once('SIGTERM', function (code) {
  console.log('SIGTERM received...');
  terminating = true
  setTimeout(() => process.exit(0), 30000)
})
