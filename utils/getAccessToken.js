const Access = require('../models/accessModel');
const axios = require('axios');

const getAccessToken = async () => {
    const accessExist = await Access.findOne().sort({createdAt: -1});
    if(accessExist) return accessExist.token;
    const response = await axios.post('https://accounts.spotify.com/api/token', {
        grant_type: 'client_credentials',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
    });
    const token = response.data.access_token;
    await Access.create({token});
    return token;
}

module.exports = {
    getAccessToken
};