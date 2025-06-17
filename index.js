const { Client, GatewayIntentBits, Events, ChannelType, MessageFlags, Partials } = require("discord.js");
const { token, clientId, devs } = require("./config.json");
const fs = require("fs");
const loadCommands = require("./utils/loadCommands");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message]
});

module.exports = client;

client.login(token);

/* Lettura file in una cartella */

function readFiles(folderPath) {
    return fs.readdirSync(folderPath, { recursive: true }).filter(path => path.endsWith(".js")).map(filePath => require(`${folderPath}/${filePath}`));
}

/* Slash commands */

const commands = readFiles("./commands");
client.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.channel.type != ChannelType.DM) {
        const cmd = commands.find(c => c.data.name === interaction.commandName);
        if (!cmd) return;
        if (!devs.includes(interaction.member.user.id)) {
            if (cmd.onlyDevs) {
                return interaction.reply({
                    content: "Comando riservato ai devs",
                    flags: MessageFlags.Ephemeral
                });
            } else if (cmd.memberPermissions.some(p => !interaction.member.permissions.has(p))) {
                return interaction.reply({
                    content: "Non hai i permessi per eseguire questo comando",
                    flags: MessageFlags.Ephemeral
                });
            }
        } else if (cmd.botPermissions.some(p => !interaction.guild.members.me.permissions.has(p))) {
            return interaction.reply({
                content: "Non ho i permessi per eseguire questo comando",
                flags: MessageFlags.Ephemeral
            });
        }

        try {
            cmd.execute(interaction);
        } catch (error) {
            console.log(error);
        }
    }
});

/* Autocomplete */

client.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isAutocomplete()) return;
    if (interaction.channel.type != ChannelType.DM) {
        const cmd = commands.find(c => c.data.name === interaction.commandName);
        if (!cmd) return;
        if (!devs.includes(interaction.member.user.id)) {
            if (cmd.onlyDevs) {
                
            } else if (cmd.memberPermissions.some(p => !interaction.member.permissions.has(p))) {
                
            }
        } else if (cmd.botPermissions.some(p => !interaction.guild.members.me.permissions.has(p))) {
            
        }

        try {
            cmd.autocomplete(interaction);
        } catch (error) {
            console.log(error);
        }
    }
});

/* Comandi context menu */

const contextMenuCommands = readFiles("./ctxmenucommands");
client.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isContextMenuCommand()) return;
    if (interaction.channel.type != ChannelType.DM) {
        const cmd = contextMenuCommands.find(c => c.data.name === interaction.commandName);
        if (!cmd) return;
        if (!devs.includes(interaction.member.user.id)) {
            if (cmd.onlyDevs) {
                return interaction.reply({
                    content: "Comando riservato ai devs",
                    flags: MessageFlags.Ephemeral
                });
            } else if (cmd.memberPermissions.some(p => !interaction.member.permissions.has(p))) {
                return interaction.reply({
                    content: "Non hai i permessi per eseguire questo comando",
                    flags: MessageFlags.Ephemeral
                });
            }
        } else if (cmd.botPermissions.some(p => !interaction.guild.members.me.permissions.has(p))) {
            return interaction.reply({
                content: "Non ho i permessi per eseguire questo comando",
                flags: MessageFlags.Ephemeral
            });
        }

        try {
            cmd.execute(interaction);
        } catch (error) {
            console.log(error);
        }
    }
});

// Carico i comandi ed i comandi context menu

(async () => {
    await loadCommands(commands.concat(contextMenuCommands));
    console.log(`Caricato(i) ${commands.length} slash command(s).`);
    console.log(`Caricato(i) ${contextMenuCommands.length} context menu command(s).`);
})();

/* Componenti */
const components = readFiles("./components");
client.on("interactionCreate", (interaction) => {
    if (!interaction.isModalSubmit() && !interaction.isButton() && !interaction.isAnySelectMenu()) return;
    if (interaction.channel.type != ChannelType.DM) {
        const component = components.find(c => c.optionsInCustomId ? interaction.customId.startsWith(c.customId) : c.customId === interaction.customId);
        if (!component) return;
        if (!devs.includes(interaction.member.user.id)) {
            if (component.onlyDevs) {
                return interaction.reply({
                    content: "Comando riservato ai devs",
                    flags: MessageFlags.Ephemeral
                });
            } else if (component.memberPermissions.some(p => !interaction.member.permissions.has(p))) {
                return interaction.reply({
                    content: "Non hai i permessi per eseguire questo comando",
                    flags: MessageFlags.Ephemeral
                });
            }
        } else if (component.botPermissions.some(p => !interaction.guild.members.me.permissions.has(p))) {
            return interaction.reply({
                content: "Non ho i permessi per eseguire questo comando",
                flags: MessageFlags.Ephemeral
            });
        }

        try {
            component.execute(interaction);
        } catch (error) {
            console.log(error);
        }
    }
});

/* Eventi */

const events = readFiles("./events");
events.forEach(event => client.on(event.name, event.execute));