#!/bin/bash
echo "Database migrations..."
npx prisma migrate deploy

echo "Starting server..."
npm start