const app = require('./src/app');

const normalizaPort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizaPort(process.env.PORT || '5000');

app.listen(port, function () {
  console.log(`app listening on port ${port}`)
})