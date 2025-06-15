const { EmbedBuilder, Colors } = require("discord.js");

module.exports = async (guild, rolesIds, style, embed, tags) => {
    if (!guild)
        throw new Error("Server non esiste");
    else if (!rolesIds || rolesIds?.length === 0) {
        throw new Error("Ruoli non esistono");
    } else if (!style) {
        throw new Error("Nessuno stile");
    } else if (!embed || !Object.keys(embed).includes("title") || !Object.keys(embed).includes("color")) {
        throw new Error("Embed non valido");
    } else if (!tags) {
        throw new Error("Tags non validi");
    }
    // Faccio il fetch dei membri
    await guild.members.fetch().catch(err => console.log(err));
    // Prendo i ruoli ed elimino i ruoli che non esistono con filter
    const roles = rolesIds.map(roleId => guild.roles.cache.get(roleId)).filter(r => r).sort((a, b) => b.rawPosition - a.rawPosition).map(r => ({ name: r.name, id: r.id, users: r.members.map(m => m.user) }));

    const [rolesStyle, usersStyle] = style.split("\n");

    const { role: rolesTags, user: usersTags } = tags;

    const embedDescription = roles.map(
        (r) => `${rolesStyle
                  .replace("{role}", rolesTags ? `<@&${r.id}>` : r.name)
                  .replace("{count}", r.users.length)}\n${r.users.map(u => usersStyle.replace("{user}", usersTags ? u : u.username)).join("\n")
                }`
            ).join("\n\n");

    // Lunghezza della descrizione
    if (embedDescription.length === 0 || embedDescription.length >= 4000) return;

    return {
        embeds: [
            new EmbedBuilder()
                .setTitle(embed?.title || "Staff List")
                .setDescription(embedDescription)
                .setColor(embed?.color || Colors.Default)
                .setFooter({ text: "Super Staff List", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        ]
    };
}