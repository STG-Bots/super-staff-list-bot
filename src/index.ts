import { Client, GatewayIntentBits, Events, ChannelType, MessageFlags, Partials, GuildMember, ButtonInteraction, ComponentType } from 'discord.js';
import 'dotenv/config';
import { CommandsManager, ComponentsManager } from './utils/mybot/managers/Managers';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message]
});

client.login(process.env.TOKEN);

/* Slash commands */

const commandsManager = new CommandsManager("./commands");
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.channel?.type != ChannelType.DM) {
        const cmd = (await Promise.all(await commandsManager.loadFiles())).find(c => c.settings.data.name === interaction.commandName);
        if (!cmd) return;
        const { onlyDevs, memberPermissions, botPermissions } = cmd.settings;
        if (!process.env.DEVS?.split(",").includes(interaction.member?.user.id)) {
            if (onlyDevs) {
                return interaction.reply({
                    content: "Comando riservato ai devs",
                    flags: MessageFlags.Ephemeral
                });
            } else if (memberPermissions.some(p => !(interaction.member as GuildMember)?.permissions.has(p))) {
                return interaction.reply({
                    content: "Non hai i permessi per eseguire questo comando",
                    flags: MessageFlags.Ephemeral
                });
            }
        } else if (botPermissions.some(p => !interaction.guild?.members.me?.permissions.has(p))) {
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

/* Autocomplete 

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

*/

/* ContextMenu commands 

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
*/

// Commands loading...
/*
(async () => {
    await loadCommands(commands.concat(contextMenuCommands));
    console.log(`Caricato(i) ${commands.length} slash command(s).`);
    console.log(`Caricato(i) ${contextMenuCommands.length} context menu command(s).`);
})();
*/

/* Components */
const componentsManager = new ComponentsManager("./components");
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isMessageComponent() && !interaction.isButton() && !interaction.isAnySelectMenu()) return;
    if (interaction.channel?.type != ChannelType.DM) {
        const component = (await Promise.all(await componentsManager.loadFiles())).find(c => c.settings.optionsInCustomId ? interaction.customId.startsWith(c.settings.customId) : c.settings.customId === interaction.customId);
        if (!component) return;
        const { onlyDevs, memberPermissions, botPermissions } = component.settings;
        if (!process.env.DEVS?.split(",").includes(interaction.member?.user.id)) {
            if (onlyDevs) {
                return interaction.reply({
                    content: "Comando riservato ai devs",
                    flags: MessageFlags.Ephemeral
                });
            } else if (memberPermissions.some(p => !(interaction.member as GuildMember)?.permissions.has(p))) {
                return interaction.reply({
                    content: "Non hai i permessi per eseguire questo comando",
                    flags: MessageFlags.Ephemeral
                });
            }
        } else if (botPermissions.some(p => !interaction.guild?.members.me?.permissions.has(p))) {
            return interaction.reply({
                content: "Non ho i permessi per eseguire questo comando",
                flags: MessageFlags.Ephemeral
            });
        }

        // Check component type
        try {
            component.execute(interaction);
        } catch (error) {
            console.log(error);
        }
    }
});

/* Eventi 

const events = readFiles("./events");
events.forEach(event => client.on(event.name, event.execute));

*/