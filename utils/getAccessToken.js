const Access = require('../models/accessModel');
const axios = require('axios');

const getAccessToken = async () => {
    const accessExist = await Access.findOne().sort({createdAt: -1});
    if(accessExist) return accessExist;
    const response = await axios.post('https://accounts.spotify.com/api/token', {
        grant_type: 'client_credentials',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
    });
    const token = response.data.access_token;
    await Access.create({token});
    await Access.deleteMany({createdAt: {$lt: new Date(Date.now() - 3600000)}}); // Deleting the token after 1 hour
    return token;
}

module.exports = {
    getAccessToken
};