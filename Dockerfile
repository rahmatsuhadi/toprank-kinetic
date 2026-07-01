FROM node:22-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies (including devDependencies for build/push/seed)
RUN pnpm install --frozen-lockfile

# Copy application source code
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
# Set dummy secrets/URL during build so next build doesn't crash on env validation if there's any
ENV DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy
ENV BETTER_AUTH_SECRET=dummy-secret-value-during-docker-build
ENV BETTER_AUTH_URL=http://localhost:3000

# Build Next.js application
RUN pnpm run build

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start Next.js application in production mode
CMD ["pnpm", "run", "start"]
