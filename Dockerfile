# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1.1.42

COPY . .

RUN bun install

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

ENV NEXT_PUBLIC_SUPABASE_URL="https://etefwjkvwjrgjcwzfpxy.supabase.co"
ENV NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_csAwGtXZIZ9x93CoJM6LGA_7c7D0SRs"

RUN echo "Building with supabase url: $NEXT_PUBLIC_SUPABASE_URL"

RUN bun run build

# ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "run", "start"]
