const ownerId = '385172057433964556';

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(client, interaction) {

      if (interaction.isCommand()) {
        const cmd = client.commands.get(interaction.commandName);
        if (!cmd) return interaction.reply('cette commande n\'existe pas ! ou elle n\'est pas chargée.');

        if (cmd.ownerOnly) {
          if (interaction.user.id != ownerId) return interaction.reply({content:"La seule personne pouvant taper cette commande est l'owner du bot!", ephemeral: true})
      }
        
        if (!interaction.member.permissions.has([cmd.permissions])) return interaction.reply({ content: `vous n'avez pas la/les permission(s) requise(s) (\`${cmd.permissions.join(', ')}\`) pour taper cette commande!`, ephemeral: true}) 

        cmd.runSlash(client, interaction);
      }
    },
  };