const createApp = require('./server/app')
const config = require('./config')

const app = createApp()
app.listen(config.server.port, () =>
  console.log(`server is running on port: ${config.server.port}`)
)
