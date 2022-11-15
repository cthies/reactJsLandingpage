## Getting Started

First, make sure you're running node version => 15.

```bash
node -v
```

It's considered a best practice to use [nvm (node version manager)](https://github.com/nvm-sh/nvm) to manage your node versions.

Then, install the dependencies:

```bash
npm install
```

Then, ensure you are prepared:

```bash
npm run prepare
```

Then, run the development server:

```bash
npm run dev
```

## Docker container (optional)

```bash
# Build
docker build -t shop-next .
# Run
docker run -ti -v `pwd`/config:/app/config shop-next
```

## Logging

At any given time you should use one of the two:

- console.log - in case you are in client side (TODO: https://github.com/Logflare/next-pino-logflare-logging-example, we should push client logs to DD_RUM)
- req.log - in case you are in server side (https://github.com/pinojs/pino-http)
