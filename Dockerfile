# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1.1.42

COPY . .

RUN bun install

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

RUN echo "Building with supabase url: $NEXT_PUBLIC_SUPABASE_URL"

RUN bun run build

# ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "run", "start"]
