FROM node:16-alpine AS base
WORKDIR /base
COPY package*.json ./
COPY next.config.js ./
COPY patches/ ./patches
RUN npm install
COPY . .

FROM base AS build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /build
COPY --from=base /base ./
RUN npm run build
ARG BUILD_ID
ARG DATADOG_API_KEY
ARG DATADOG_SITE
RUN DATADOG_SITE=$DATADOG_SITE \
  DATADOG_API_KEY=$DATADOG_API_KEY \
  ./node_modules/.bin/datadog-ci \
  sourcemaps upload ./.next/static/chunks/ \
  --disable-git \
  --service=shop-next \
  --release-version="$(cat ./.next/BUILD_ID)" \
  --minified-path-prefix="/_next/static/chunks/"

FROM node:16-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

COPY --from=base /base/node_modules ./node_modules
COPY --from=build /build/next.config.js ./
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
COPY --from=build /build/dist ./dist

VOLUME /app/config

EXPOSE 3000
CMD NODE_PATH=./dist node dist/src/server.js
