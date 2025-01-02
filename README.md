# SpotiFriend Backend
This is the backend for the SpotiFriend project.

## Installation
### Prerequisites
Before you can install the backend, you need to have the following installed on your machine:
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Spotify Developer Account](https://developer.spotify.com/)

### Cloning the Repository
To install the backend, you need to clone the repository and install the dependencies. You can do this by running the following commands in your terminal:
```bash
git clone https://github.com/NamelessProj/SpotiFriend-backend.git
cd SpotiFriend-Backend
npm install
```

## Usage
To start the backend, you need to create a `.env` file in the root directory of the project. This file should contain the following variables:
```env
PORT=3000
NODE_ENV=dev
DATABASE_URI=your_database_uri
JWT_SECRET=your_jwt_secret
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

After you have created the `.env` file, you can start the backend by running the following command:
```bash
npm start
# or if you want to use nodemon for development
npm run dev
```