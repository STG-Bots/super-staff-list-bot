const { REST, Routes } = require("discord.js");
const { token, clientId } = require("../config.json");

const rest = new REST().setToken(token);

module.exports = async (commands) => {
    try {
        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands.map(cmd => cmd.data.toJSON()) },
        );

        return data;

    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
}