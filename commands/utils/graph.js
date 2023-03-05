module.exports = {
    name: "grapht",
    category: 'utils',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'graph', 
    examples: ['graph'],
    description: 'Montre la courbe de l\'or du clan (STAFF)',
       async run (client, message, args) {
        if (!args[0] || !args[0].match(/^(or|gemme|Gemme|Or)$/)) return message.reply('merci d\'entrer un évenement valide (`\or`/`\gemme\`)');
        const MessA = await message.reply("Recherche en cours...")
        if (args[0] == "or" || args[0] == "Or") {var type = "or"}
        else {var type = "gems"}
        const bureauDcCh = client.channels.cache.get(message.channel.id)
        await client.graphAffichage(bureauDcCh, type).then(() => {MessA.delete()}).catch((err) => {MessA.edit(`Erreur: ${err}`)})
       },
       async runSlash (client, interaction) {
        interaction.reply({content:"Recherche en cours...", ephemeral: true})
        const bureauDcCh = client.channels.cache.get(interaction.channel.id)
        await client.graphAffichage(bureauDcCh)
       }
}
