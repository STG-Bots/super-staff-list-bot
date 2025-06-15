const { Events } = require("discord.js");
const { CronJob } = require("cron");
const panels = require("../schemas/panels");
const createStaffList = require("../functions/stafflist/createStaffList");

module.exports = {
    name: Events.MessageDelete,
    async execute(message) {
        try {
            const deletedPanel = await panels.findOneAndDelete({ id: message.id });
        } catch (error) {
            console.log(__filename, error);
        }
    }
};