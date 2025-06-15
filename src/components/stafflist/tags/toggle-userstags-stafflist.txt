module.exports = {
    customId: "toggle-userstags-stafflist",
    optionsInCustomId: false,
    botPermissions: [],
    memberPermissions: [],
    onlyDevs: false,
    async execute(interaction) {
        try {
            const rows = interaction.message.components;
            const usersTagsButton = rows[2].components[1].data;
            usersTagsButton.style = usersTagsButton.style ^ 7;

            await interaction.message.edit({
                components: rows
            });

            await interaction.deferUpdate();
        } catch (error) {
            console.log(__filename, error);
        }
    }
};