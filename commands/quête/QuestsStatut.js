const { MessageAttachment } = require('discord.js');
const {readFileSync, writeFileSync} = require ("fs");

module.exports = {
  name: "qautorisation",
  category: 'quête',
  permissions: ['BAN_MEMBERS'],
  ownerOnly: false,
  usage: 'qautorisation',
  examples: ['qautorisation'],
  description: "Donne la permission de lancer la quête (STAFF)",
      run: async(client, message, args) => {
       try{ var final = JSON.parse(readFileSync(`././Information/Quête-lancement/choix-quête.json`, 'utf-8')); var A = false}catch(err) {return message.reply(`La quête n'a pas encore été sélectionnée.`)}

        const filter3 = msg =>  msg.author.id === message.author.id && msg.content.includes("O") || msg.content.includes("N") || msg.content.includes("o") || msg.content.includes("n");

        var attachement = new MessageAttachment(final.Lien)
        await message.channel.send({content:`${message.author.username}, voulez-vous autoriser le lancement du ${final.Nom} ? (o/n)`, files: [attachement]})
        .then(async() => {
           await message.channel.awaitMessages({ filter3, max: 1, time: 10000, errors: ['time'] })
                .then(collected => {
                    if (collected.first().content == "O" || collected.first().content == "o"){
                        message.channel.send(`${collected.first().author.username} vient de confirmer le lancement de la quête à 21h00`); return A = true}
                        if (collected.first().content == "N" || collected.first().content == "n"){
                            message.channel.send(`${collected.first().author.username} - Annulation du ${final.Nom}...`); return A = false}
                    
                })
                .catch(collected => {
                    message.channel.send("Le temps est écoulé.");
                });
        })

        if (A){
        const infoLancement = {Lien: final.Lien, qId: final.qId, Type: final.Type, Nom: final.Nom, authorisation: true, retraitDon: true}; const objectToJsonL = JSON.stringify(infoLancement)
        writeFileSync(`././Information/Quête-lancement/choix-quête.json`, objectToJsonL);}

        const verif = JSON.parse(readFileSync(`././Information/Quête-lancement/choix-quête.json`, 'utf-8'))
        message.channel.send(`Lancement du ${verif.Nom}, sur ${verif.authorisation}`)
    },
        runSlash: async(client, interaction) => {
            try{ var final = JSON.parse(readFileSync(`././Information/Quête-lancement/choix-quête.json`, 'utf-8')); var A = false}catch(err) {return interaction.reply(`La quête n'a pas encore été sélectionnée.`)}

            const filter3 = msg =>  msg.author.id === interaction.user.id && msg.content.includes("O") || msg.content.includes("N") || msg.content.includes("o") || msg.content.includes("n");
    
            var attachement = new MessageAttachment(final.Lien)
            await interaction.reply({content:`${interaction.user.username}, voulez-vous autoriser le lancement du ${final.Nom} ? (o/n)`, files: [attachement]})
            .then(async() => {
               await interaction.channel.awaitMessages({ filter3, max: 1, time: 10000, errors: ['time'] })
                    .then(collected => {
                        if (collected.first().content == "O" || collected.first().content == "o"){
                            interaction.followUp(`${collected.first().author.username} vient de confirmer le lancement de la quête à 21h00`); return A = true}
                            if (collected.first().content == "N" || collected.first().content == "n"){
                                interaction.followUp(`${collected.first().author.username} - Annulation du ${final.Nom}...`); return A = false}
                        
                    })
                    .catch(collected => {
                        interaction.channel.send("Le temps est écoulé.");
                    });
            })
    
            if (A){
            const infoLancement = {Lien: final.Lien, qId: final.qId, Type: final.Type, Nom: final.Nom, authorisation: true, retraitDon: true}; const objectToJsonL = JSON.stringify(infoLancement)
            writeFileSync(`././Information/Quête-lancement/choix-quête.json`, objectToJsonL);}
            
            const verif = JSON.parse(readFileSync(`././Information/Quête-lancement/choix-quête.json`, 'utf-8'))
            interaction.channel.send(`Lancement du ${verif.Nom}, sur ${verif.authorisation}`)
    }
    }