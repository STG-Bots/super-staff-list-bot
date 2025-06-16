import { AnySelectMenuInteraction, ButtonBuilder, ButtonInteraction, ChannelSelectMenuBuilder, ChannelSelectMenuInteraction, ChatInputCommandInteraction, Interaction, InteractionType, ModalBuilder, ModalSubmitInteraction, PermissionResolvable, RoleSelectMenuBuilder, RoleSelectMenuInteraction, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction, UserSelectMenuBuilder, UserSelectMenuInteraction } from "discord.js";

/* v Builders v */

export type MyComponentBuilder = ButtonBuilder |
ModalBuilder  |
StringSelectMenuBuilder |
RoleSelectMenuBuilder |
ChannelSelectMenuBuilder;

export type MyBuilder = SlashCommandBuilder | MyComponentBuilder;

export type BuilderData<I extends Interaction> = I extends ButtonInteraction ? ButtonBuilder :
                            (I extends ModalSubmitInteraction ? ModalBuilder :
                            (I extends StringSelectMenuInteraction ? StringSelectMenuInteraction : 
                            (I extends RoleSelectMenuInteraction ? RoleSelectMenuBuilder :
                            (I extends UserSelectMenuInteraction ? UserSelectMenuBuilder :
                            (I extends ChannelSelectMenuInteraction ? ChannelSelectMenuBuilder: MyBuilder)
                            ))));

/* ^ Builders ^ */

/* v Interactions v */

export type MyComponentInteraction = ButtonInteraction | ModalSubmitInteraction | AnySelectMenuInteraction;

export type MyInteractionData<I extends Interaction> = {
    data: BuilderData<I>,
    botPermissions: PermissionResolvable[],
    memberPermissions: PermissionResolvable[],
    onlyDevs: boolean
}

/* ^ Interactions ^ */