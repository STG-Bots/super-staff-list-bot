import { AnySelectMenuInteraction, ButtonBuilder, ButtonInteraction, ChannelSelectMenuBuilder, ChannelSelectMenuInteraction, ChatInputCommandInteraction, Interaction, InteractionType, ModalBuilder, ModalSubmitInteraction, PermissionResolvable, RoleSelectMenuBuilder, RoleSelectMenuInteraction, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction, UserSelectMenuBuilder, UserSelectMenuInteraction } from "discord.js";

/* v Builders v */

export type MyComponentBuilder = ButtonBuilder |
ModalBuilder  |
StringSelectMenuBuilder |
RoleSelectMenuBuilder |
ChannelSelectMenuBuilder |
UserSelectMenuBuilder;

export type MyBuilder = SlashCommandBuilder | MyComponentBuilder;

export type BuilderData<I extends Interaction> = I extends ButtonInteraction ? ButtonBuilder :
                            (I extends ModalSubmitInteraction ? ModalBuilder :
                            (I extends StringSelectMenuInteraction ? StringSelectMenuBuilder : 
                            (I extends RoleSelectMenuInteraction ? RoleSelectMenuBuilder :
                            (I extends UserSelectMenuInteraction ? UserSelectMenuBuilder :
                            (I extends ChannelSelectMenuInteraction ? ChannelSelectMenuBuilder :
                            (I extends ChatInputCommandInteraction ? SlashCommandBuilder : never)
                            )))));

/* ^ Builders ^ */

/* v Interactions v */

export type MyComponentInteractions = ButtonInteraction | ModalSubmitInteraction | AnySelectMenuInteraction;

export type MyInteractionData<I extends Interaction> = {
    builder: BuilderData<I>,
    botPermissions: PermissionResolvable[],
    memberPermissions: PermissionResolvable[],
    onlyDevs: boolean
}

export type MyComponentInteractionData<I extends MyComponentInteractions> = MyInteractionData<I> & {
    optionsInCustomId: boolean
}

/* ^ Interactions ^ */