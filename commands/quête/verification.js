module.exports = {
  name: "verif",
  category: 'quête',
  permissions: ['BAN_MEMBERS'],
  ownerOnly: true,
  usage: 'verif',
  examples: ['verif'],
  description: "Verifie les votes (STAFF)",
      run: async(client, message, args) => {
        const bureauDcCh = client.channels.cache.get(message.channel.id) 
        const infoQueteCh = bureauDcCh
        const voteQueteCh = client.channels.cache.get('724241714373722163') 
        await client.verifVote(client, bureauDcCh, infoQueteCh, voteQueteCh).then(() => {}).catch((err)=> {message.channel.send(`Erreur: ${err}`)})
    },
        runSlash: async(client, interaction) => {
            interaction.reply({content: "Vérification des votes...", ephemeral: true})
            const bureauDcCh = client.channels.cache.get(message.channel.id) 
            const infoQueteCh = bureauDcCh
            const voteQueteCh = client.channels.cache.get('724241714373722163') 
            await client.verifVote(client, bureauDcCh, infoQueteCh, voteQueteCh).then(() => {}).catch((err)=> {interaction.editReply(`Erreur: ${err}`)})
    }
    }