const server = require('./api/server');

const port = 9000;

server.listen(port, () => {
  console.log(`Server functioning on port ${port}`);
});
