const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const helmet = require('koa-helmet');
const { PORT, mongoUri } = require('../config')
const notesController = require( './controllers/todoController');
var route = require('koa-route');
var serve = require('koa-static');
var path = require('path');
const cors = require('@koa/cors');


try {
  mongoose
  .connect(mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
  })
  .then(() => console.log('MongoDB database Connected...'))
  .catch((err) => console.log(err))
} catch (e) {
console.error(e);
}
mongoose.connection.on('error', console.error);

// Create Koa Application
const app = new Koa();
app.use(cors());
app.use(logger())
app.use(bodyParser({ enableTypes: ['json', 'text'] }));
app.use(helmet());


// ROUTES
app.use(route.put('/api/notes/:id',notesController.put));
app.use(route.delete('/api/notes/:id', notesController.delete));
app.use(route.delete('/api/remove', notesController.remove));
app.use(route.post('/api/notes', notesController.create));
app.use(
  route.get('/api/notes', notesController.fetch)
  );

app.use(serve(path.join(__dirname, 'public')));

// Start the application
app.listen(PORT, () =>
  console.log(`✅  The server is running at http://localhost:${PORT}`)
);


module.exports = app;