const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const hostname = 'localhost';
const port = 3000;

const app = next({ dev: true, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer(async (req, res) => {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    }).listen(port, (err) => {
      if (err) throw err;
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
