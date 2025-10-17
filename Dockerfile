# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1.1.42

COPY . .

RUN bun install

RUN bun run build

# ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "run", "start"]
