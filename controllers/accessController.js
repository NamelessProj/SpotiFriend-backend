const asyncHandler = require('express-async-handler');
const {getAccessToken} = require('../utils/getAccessToken');

// @desc   Getting the access token
// @route  GET /api/access/
// @access Public
const getTheAccessToken = asyncHandler(async (req, res) => {
    const token = await getAccessToken();
    res.status(200).json({token});
});

module.exports = {
    getTheAccessToken
}