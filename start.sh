#!/bin/bash

# Stop any Docker containers
sudo docker stop $(sudo docker ps -q) || true

# Stop any processes using port 5432 if there are any
pids=$(sudo lsof -ti :5432)
if [ -n "$pids" ]; then
  echo "Stopping processes using port 5432..."
  echo $pids | xargs sudo kill -9
else
  echo "No processes using port 5432."
fi

# Remove existing PostgreSQL container if it exists
sudo docker rm -f postgres_db || true

# Start PostgreSQL container
sudo docker run -d \
  --name postgres_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=notests \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:15-alpine

echo "PostgreSQL container started successfully"
sleep 5

# Start backend
echo "Starting backend..."
cd backend
npm run start:dev &

# Wait for the backend to start
sleep 10

# Create initial user through the /users/signup endpoint
curl -X POST http://localhost:3000/users/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "jlebot7", "password": "admin12345"}'

echo "Initial user created successfully"

sleep 5

# Start frontend
echo "Starting frontend..."
cd ../frontend
npm run dev
