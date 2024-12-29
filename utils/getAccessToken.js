const Access = require('../models/accessModel');
const axios = require('axios');

const getAccessToken = async () => {
    const oneHourAgo = new Date(Date.now() - 3600000);
    const accessExist = await Access.findOne({createdAt: { $gt: oneHourAgo }}).sort({createdAt: -1});
    if(accessExist) return accessExist;
    const response = await axios.post('https://accounts.spotify.com/api/token', {
        grant_type: 'client_credentials',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    const token = response.data.access_token;
    const newToken = await Access.create({token});
    await Access.deleteMany({createdAt: {$lt: new Date(Date.now() - 3600000)}}); // Deleting the token after 1 hour
    return newToken;
}

module.exports = {
    getAccessToken
};