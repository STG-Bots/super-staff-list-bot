import { ActivityType, ButtonBuilder, ChannelType, Client, ClientOptions, Events, GuildMember, MessageFlags, REST, Routes } from "discord.js";
import { MyCommandInteraction, MyComponentInteraction } from "./myInteractions/MyInteractions";
import { CommandsManager, ComponentsManager } from "./managers/Managers";
import { MyComponentInteractions } from "./myInteractions/types";
import 'dotenv/config';

interface IMyClient {
    commandsManager: CommandsManager;
    commands: MyCommandInteraction[];
    componentsManager: ComponentsManager;
    components: MyComponentInteraction<MyComponentInteractions>[];
}

export default class MyClient extends Client implements IMyClient {
    commandsManager: CommandsManager;
    commands: MyCommandInteraction[];
    componentsManager: ComponentsManager;
    components: MyComponentInteraction<MyComponentInteractions>[];
    constructor(options: ClientOptions, commandsFolderPath: string, componentsFolderPath: string) {
        super(options);
        this.commandsManager = new CommandsManager(commandsFolderPath);
        this.commands = [];
        this.componentsManager = new ComponentsManager(componentsFolderPath);
        this.components = [];
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
                { body: allCommands.map(cmd => cmd.settings.data.toJSON()) },
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
                const cmd = this.commands.find(c => c.settings.data.name === interaction.commandName);
                if (!cmd) return;
                const { onlyDevs, memberPermissions, botPermissions } = cmd.settings;
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
                    cmd.execute(interaction);
                } catch (error) {
                    console.log(error);
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
                const component = this.components.find(c => (c.settings.data) ? interaction.customId.startsWith(c.settings.customId) : c.settings.customId === interaction.customId);
                if (!component) return;
                const { onlyDevs, memberPermissions, botPermissions } = component.settings;
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
                    component.execute(interaction);
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }
    async init() {
        // Bot login
        this.login(process.env.TOKEN);
        // Commands
        await this.loadCommands();
        await this.uploadCommands();
        await this.manageCommands();
        // Components
        await this.loadComponents();
        await this.manageComponents();
        this.on("ready", (bot) => {
            bot.user.setActivity({ name: "test", type: ActivityType.Watching });
        });
    }

}