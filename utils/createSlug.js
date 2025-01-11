const Room = require("../models/roomModel");

const createSlug = async (name, id=null) => {
    let slugExists;
    let slug = name.toString().toLowerCase().replace(/\s+/g, '-');
    if(id){
        slugExists = await Room.find({slug, _id: {$ne: id}}).countDocuments();
    }else slugExists = await Room.find({slug}).countDocuments();
    if(slugExists > 0) slug += `-${slugExists + 1}`;
    return slug;
}

module.exports = {createSlug};