
module.exports = {
  name: "quest",
  category: 'quête',
  permissions: ['BAN_MEMBERS'],
  ownerOnly: false,
  usage: 'quests',
  examples: ['quests'],
  description: 'Voir les quêtes achetable + sondage (STAFF)',
    run: async(client, message, args) => {
      var Merr = await message.channel.send('Exécution en cours...')
      const voteQueteCh = client.channels.cache.get(message.channel.id) 
      await client.afficheQuete(Merr, voteQueteCh).then(() => {Merr.delete()}).catch((err)=> {message.channel.send(`Erreur: ${err}`)})
   
     },

     async runSlash(client, interaction) {
      interaction.reply({content:"Exécution en cours...", ephemeral:true})
      var Merr = await interaction.channel.send('Quête:')
      const voteQueteCh = client.channels.cache.get(interaction.channel.id) 
      await client.afficheQuete(Merr, voteQueteCh).then(() => {Merr.delete()}).catch((err)=> {interaction.editReply(`Erreur: ${err}`)})
    }
    }
