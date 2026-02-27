import { AutocompleteInteraction, ChatInputCommandInteraction, CacheType, SlashCommandBuilder, PermissionsBitField, MessageFlags, DiscordAPIError, EmbedBuilder, Colors } from "discord.js";
import { MyCommandInteraction } from "../../utils/mybot/myInteractions/MyInteractions";

class DepexCommand extends MyCommandInteraction {
    constructor() {
        super({
            builder: new SlashCommandBuilder()
                .setName("depex")
                .setDescription("Depexa un utente")
                .addUserOption(option =>
                    option.setName("utente")
                    .setDescription("Utente da depexare")
                    .setRequired(true)
                )
                .addRoleOption(option =>
                    option.setName("ruolo")
                    .setDescription("Ruolo da rimuovere")
                    .setRequired(true)
                ),
            botPermissions: [PermissionsBitField.Flags.ManageRoles],
            memberPermissions: [PermissionsBitField.Flags.ManageRoles],
            onlyDevs: false
        });
    }
    async execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
        const [user, newRole] =
            [interaction.options.getUser("utente"), interaction.options.getRole("ruolo")];
        
        // Check the presence of the user
        if (!user || !interaction.guild?.members.cache.find(m => m.user.id === user.id)) {
            interaction.reply({
                content: `L'utente non esiste o non è presente nel server`,
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        // The executor and the selected user do not be the same
        if (user.id === interaction.user.id) {
            interaction.reply({
                content: `Non puoi usare questo comando su di te`,
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        const member = interaction.guild.members.cache.get(user.id)!;
        // Remove the newRole to the user
        const removeNewRoleRes = newRole && await member.roles.remove(newRole.id).catch((e) => console.log(e));
        if (!removeNewRoleRes) {
            interaction.reply({
                content: `Non è stato possibile assegnare i ruoli: controllare che il ruolo del bot sia al di sopra`,
                flags: MessageFlags.Ephemeral
            });
            return;
        }
        
        // Send the embed
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle("✅ Ruolo Rimosso!")
                .setDescription(`**${newRole.name}** rimosso a ${member}\n\n**👤 Utente**\n${member}\n\n**🎭 Ruolo**\n${newRole.name}\n\n**🛡️ Rimosso da**\n${interaction.member}`)
                .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=64`)
                .setColor(Colors.DarkOrange)
            ]
        });
    }
    autocomplete(interaction: AutocompleteInteraction): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default new DepexCommand();