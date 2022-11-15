import router from 'src/router';

import express from 'express';
import next from 'next';
import path from 'path';
import favicon from 'serve-favicon';
import pino from 'pino-http';
import compression from 'compression';
import { createHttpTerminator, HttpTerminator } from 'http-terminator';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const port = process.env.PORT || 3000;

if (!dev) {
  Error.prepareStackTrace = (err, stack) =>
    JSON.stringify({
      error: {
        message: err.message,
        stack: stack
          .map(
            (frame) =>
              `${frame.getFunctionName()} (${frame.getFileName()}:${frame.getLineNumber()}:${frame.getColumnNumber()})`
          )
          .join('\n'),
      },
    });
}

let terminator: HttpTerminator;
const stop = () => {
  if (!terminator) {
    process.exit(0);
  }
  console.log(`> Graceful shutdown`);
  process.env.TERMINATE = 'SIGNAL';
  setTimeout(() => {
    terminator.terminate().then(() => {
      process.exit(0);
    });
  }, 5000);
};

process.on('SIGINT', stop);
process.on('SIGTERM', stop);

(async () => {
  try {
    const server = express();
    // This helps with correctly determining client IP and client Protocol.
    server.enable('trust proxy');
    server.use(favicon(path.resolve('public/images/favicon.ico')));
    server.use(express.static('public'));

    if (process.env.DISABLE_PINO !== 'true') {
      server.use(pino());
    }

    server.use(compression());

    server.all('*', router(app));

    await app.prepare();

    const runtime = server.listen(port, (err?: never) => {
      if (err) throw err;
      console.log([`> Ready on localhost: ${port}`, `NODE_ENV ${process.env.NODE_ENV}`].join(', '));
    });
    terminator = createHttpTerminator({
      server: runtime,
      // Keep in sync with Helm (ambassador and deployment)
      // Also take into account pre-terminate max time (see signal catch code)
      gracefulTerminationTimeout: 55000,
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
