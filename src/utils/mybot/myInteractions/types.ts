import { AnySelectMenuInteraction, ButtonBuilder, ButtonInteraction, ChannelSelectMenuBuilder, ChatInputCommandInteraction, InteractionType, ModalBuilder, ModalSubmitInteraction, PermissionResolvable, RoleSelectMenuBuilder, SlashCommandBuilder, StringSelectMenuBuilder } from "discord.js";

export type MyComponentInteraction = ButtonInteraction | ModalSubmitInteraction | AnySelectMenuInteraction;

export type MyComponentBuilder = ButtonBuilder |
    //ModalBuilder  |
    StringSelectMenuBuilder |
    RoleSelectMenuBuilder |
    ChannelSelectMenuBuilder;

export type MyBuilder = SlashCommandBuilder | MyComponentBuilder;

export type BuilderData<I> = I extends ButtonInteraction ? ButtonBuilder :
                            (I extends ModalSubmitInteraction ? ModalBuilder : MyBuilder);

export type MyInteractionData<I> = {
    data: BuilderData<I>,
    botPermissions: PermissionResolvable[],
    memberPermissions: PermissionResolvable[],
    onlyDevs: boolean
}