# Chat Application

This is a real-time chat application built with Node.js for the backend, Redis for message brokering, and MongoDB for data storage. Docker and Docker Compose are used for containerization and orchestration.

## Project Structure

- **backend/**: Contains the Node.js application for the chat server.
  - **Dockerfile**: Dockerfile for building the backend image.
  - **package.json**: Defines the dependencies and scripts for the Node.js application.
  - **server.js**: Main server file for the chat application.
  - **config/**: Configuration files for connecting to Redis and MongoDB.
  - **routes/**: Contains route handlers for chat functionality.

- **docker-compose.yml**: Defines the services, networks, and volumes for the project.

## Getting Started

### Prerequisites

- Docker
- Docker Compose
