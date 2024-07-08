const { Schema, model } = require("mongoose");

const panels = new Schema({
    id: String,
    channelid: String, 
    guildid: String,
    style: String,
    tags: {role: Boolean, user: Boolean},
    roles: [{
        id: String,
    }],
});

module.exports = model("panels", panels);