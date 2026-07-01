#!/bin/sh

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
until nc -z -v -w30 postgres 5432; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 2
done

echo "PostgreSQL is up - running database push & seeding..."
pnpm run db:push
pnpm run db:seed

echo "Starting Next.js application in production mode..."
pnpm run start
