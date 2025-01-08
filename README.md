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
MAILER_HOST=smtp.gmail.com
MAILER_PORT=465
MAILER_SECURE=true
MAILER_PASS=your_mailer_password
MAILER_USER=your_mailer_email
MAILER_DEV_EMAIL=your_personal_email
FRONTEND_URL=http://localhost:5173
```

The `PORT` variable is the port on which the backend will run.

The `NODE_ENV` variable is the environment in which the backend will run.

The `DATABASE_URI` variable is the URI of your MongoDB database.

The `JWT_SECRET` variable is the secret used to sign the JWT tokens.

The `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` variables are the client ID and client secret of your Spotify application. You can create a Spotify application [here](https://developer.spotify.com/dashboard/applications).

The `MAILER_HOST`, `MAILER_PORT`, `MAILER_SECURE`, `MAILER_PASS`, `MAILER_USER`, and `MAILER_DEV_EMAIL` variables are the configuration for the mailer service used to send emails.

The `MAILER_DEV_EMAIL` variable is the email address to which the emails will be sent in development mode.

The `FRONTEND_URL` variable is the URL of the frontend application.

>[!TIP]
> ### Using Gmail
> If you're using Gmail, you'll need to allow less secure apps to access your account. You'll have to use the 2-step verification and create an app password. You can do that [here](https://myaccount.google.com/apppasswords).
>
> You can also use the OAuth2 method, but it's a bit more complicated.

After you have created the `.env` file, you can start the backend by running the following command:
```bash
npm start
# or if you want to use nodemon for development
npm run dev
```