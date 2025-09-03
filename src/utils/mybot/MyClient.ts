import { ActivityType, ButtonBuilder, ChannelType, Client, ClientEvents, ClientOptions, Events, GuildMember, Interaction, MessageFlags, ModalBuilder, ModalComponentBuilder, REST, Routes } from "discord.js";
import { MyCommandInteraction, MyComponentInteraction } from "./myInteractions/MyInteractions";
import { CommandsManager, ComponentsManager, EventsManager } from "./managers/Managers";
import { MyComponentInteractions } from "./myInteractions/types";
import 'dotenv/config';
import MyEvent from "./myevents/MyEvents";
import { MyEventKey, MyEventParams } from "./myevents/types";

interface IMyClient {
    commandsManager: CommandsManager;
    commands: MyCommandInteraction[];
    componentsManager: ComponentsManager;
    components: MyComponentInteraction<MyComponentInteractions>[];
    eventsManager: EventsManager;
    events: MyEvent<MyEventKey>[];
}

export default class MyClient extends Client implements IMyClient {
    commandsManager: CommandsManager;
    commands: MyCommandInteraction[];
    componentsManager: ComponentsManager;
    components: MyComponentInteraction<MyComponentInteractions>[];
    eventsManager: EventsManager;
    events: MyEvent<MyEventKey>[];
    constructor(options: ClientOptions, commandsFolderPath: string, componentsFolderPath: string, eventsFolderPath: string) {
        super(options);
        this.commandsManager = new CommandsManager(commandsFolderPath);
        this.commands = [];
        this.componentsManager = new ComponentsManager(componentsFolderPath);
        this.components = [];
        this.eventsManager = new EventsManager(eventsFolderPath);
        this.events = [];
    }
    async loadCommands() {
        this.commands = await Promise.all(await this.commandsManager.loadFiles());
    }
    async uploadCommands() {
        const rest = new REST().setToken(process.env.TOKEN!);

        const allCommands = this.commands;

        try {
            const data = await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID!),
                { body: allCommands.map(cmd => cmd.builder.toJSON()) },
            );

            return data;

        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    }
    async manageCommands() {
        this.on(Events.InteractionCreate, async (interaction) => {
            if (!interaction.isChatInputCommand()) return;
            if (interaction.channel?.type != ChannelType.DM) {
                const cmd = this.commands.find(c => c.builder.name === interaction.commandName);
                if (!cmd) return;
                const { onlyDevs, memberPermissions, botPermissions } = cmd;
                // Check the dev's permissions
                if (!process.env.DEVS?.split(",").includes(interaction.member?.user.id!)) {
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
                    await cmd.execute(interaction);
                } catch (error) {
                    console.log(`💬 ❌ Command error: ${cmd.builder.name.toLocaleUpperCase()}`);
                    console.log(`\n${error}\n`);
                }
            }
        });
    }
    async manageAutocomples() {
        this.on(Events.InteractionCreate, async (interaction) => {
            if (!interaction.isAutocomplete()) return;
            if (interaction.channel?.type != ChannelType.DM) {
                const cmd = this.commands.find(c => c.builder.name === interaction.commandName);
                if (!cmd) return;
                const { onlyDevs, memberPermissions, botPermissions } = cmd;
                if ((onlyDevs && !process.env.DEVS?.split(",").includes(interaction.member?.user.id!)) ||
                    memberPermissions.some(p => !(interaction.member as GuildMember)?.permissions.has(p)))
                    return;
                try {
                    await cmd.autocomplete(interaction);
                } catch (error) {
                    console.log(`✒️ ❌ Autocomplete error: ${cmd.builder.name.toUpperCase()}`);
                    console.log(`\n${error}\n`);
                }
            }
        });
    }
    async loadComponents() {
        this.components = await Promise.all(await this.componentsManager.loadFiles());
    }
    async manageComponents() {
        this.on(Events.InteractionCreate, async (interaction) => {
            if (!interaction.isMessageComponent() && !interaction.isButton() && !interaction.isAnySelectMenu()) return;
            if (interaction.channel?.type != ChannelType.DM) {
                const component = this.components.find(c => "custom_id" in c.builder.data ? (c.optionsInCustomId ? interaction.customId.startsWith(c.builder.data.custom_id as string) : c.builder.data.custom_id === interaction.customId) : null);
                if (!component) return;
                const { onlyDevs, memberPermissions, botPermissions } = component;

                if (!process.env.DEVS?.split(",").includes(interaction.member?.user.id as string)) {
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
                    await component.execute(interaction);
                } catch (error) {
                    const componentCustomID = "custom_id" in component.builder.data ? component.builder.data.custom_id : null;
                    if (componentCustomID) console.log(`🧩 ❌ Component error: ${componentCustomID.toUpperCase()}`);
                    console.log(`\n${error}\n`);
                }
            }
        });
    }
    async loadEvents() {
        this.events = await Promise.all(await this.eventsManager.loadFiles());
    }
    async manageEvents() {
        this.events.forEach(event => this.on(event.settings.name, async (...params) => {
            try {
                await event.execute(...params);
            } catch (error) {
                console.log(`🔁 ❌ Event error: ${event.settings.name.toUpperCase()}`);
                console.log(`\n${error}\n`);
            }
        }));
    }
    async init() {
        // Bot login
        this.login(process.env.TOKEN);
        // Commands
        await this.loadCommands();
        await this.uploadCommands();
        await this.manageCommands();
        await this.manageAutocomples();
        // Components
        await this.loadComponents();
        await this.manageComponents();
        // Events
        await this.loadEvents();
        await this.manageEvents();
    }

}