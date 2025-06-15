const { ButtonStyle } = require("discord.js");

module.exports = {
    customId: "toggle-rolestags-stafflist",
    optionsInCustomId: false,
    botPermissions: [],
    memberPermissions: [],
    onlyDevs: false,
    async execute(interaction) {
        try {
            const rows = interaction.message.components;
            const rolesTagsButton = rows[2].components[0].data;
            rolesTagsButton.style = rolesTagsButton.style ^ 7;

            await interaction.message.edit({
                components: rows
            });

            await interaction.deferUpdate();
        } catch (error) {
            console.log(__filename, error);
        }
    }
};