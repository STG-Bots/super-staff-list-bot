import { AutocompleteInteraction, ChatInputCommandInteraction, CacheType, SlashCommandBuilder, PermissionsBitField } from "discord.js";
import { MyCommandInteraction } from "../../utils/mybot/myInteractions/MyInteractions";

class PexCommand extends MyCommandInteraction {
    constructor() {
        super({
            builder: new SlashCommandBuilder()
                .setName("pex")
                .setDescription("Pexa un utente")
                .addUserOption(option =>
                    option.setName("utente")
                    .setDescription("Utente da pexare")
                    .setRequired(true)
                )
                .addRoleOption(option =>
                    option.setName("nuovo-ruolo")
                    .setDescription("Ruolo da aggiungere")
                    .setRequired(true)
                )
                .addRoleOption(option =>
                    option.setName("vecchio-ruolo")
                    .setDescription("Ruolo precedente da rimuovere")
                    .setRequired(false)
                ),
            botPermissions: [PermissionsBitField.Flags.ManageRoles],
            memberPermissions: [PermissionsBitField.Flags.ManageRoles],
            onlyDevs: false
        });
    }
    async execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
        const [utente, nuovoRuolo, vecchioRuolo] =
            [interaction.options.getUser("utente"), interaction.options.getRole("nuovo-ruolo"), interaction.options.getRole("vecchio-ruolo")];
        
        interaction.reply({
            content: `${utente}`
        });
    }
    autocomplete(interaction: AutocompleteInteraction): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default new PexCommand();