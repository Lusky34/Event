const superagent = require('superagent').agent();
const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();

module.exports = {
  name: "qfalse",
  category: 'quête',
  permissions: ['BAN_MEMBERS'],
  ownerOnly: false,
  usage: 'qfalse [Pseudo]',
  examples: ['qfalse ewwen'],
  description: "Désactive la partcipation aux quêtes du pseudo (STAFF)",
      run: async(client, message, args) => {
        var n =0
        while (args[n] !== undefined) {
        var nom = args[n]
        console.log(nom)
        const Mname = await message.channel.send(`Recherche du profil pour: ${nom}`)
        const Merr = await message.channel.send(`- - - - - -`)

        var Username = await superagent.get(`https://api.wolvesville.com/players/search?username=${nom}`)
        .set( 'Authorization', process.env.WOV_TOKEN)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .catch((err) => {
            if (err == "Error: Too Many Requests") {Merr.edit({content:"Erreur a la 1ère requête\n\`2ème tentatives en cours...\`"})}
            else if (err == "Error: Not Found") {return Merr.edit({content:`Pseudo inexistant`})}
            else {return Merr.edit({content:`Erreur: ${err}`})}});
        var objErr= JSON.stringify(Username);
    
        if (objErr !== undefined) {var User = Username.body}

       var i = 2
       while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
        var Username = await superagent.get(`https://api.wolvesville.com/players/search?username=${nom}`)
        .set( 'Authorization', process.env.WOV_TOKEN)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .catch((err) => {
            if (err == "Error: Too Many Requests") {Merr.edit({content:`Erreur, tentatives: \`${i}\``})}
            else if (err == "Error: Not Found") {return Merr.edit({content:`Pseudo inexistant`})}
            else {return Merr.edit({content:`Erreur: ${err}`})}});
       var objErr= JSON.stringify(Username);
        try {var User = await Username.body;}catch(err) {}; var i = i+1} 

        Mname.edit({content:`Profil de ${nom} trouvé avec succés.\nDéactivation de la quête pour ${nom}:`})

        var idn1 = User.id

        var Quests = await superagent.put(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/members/${idn1}/participateInQuests`)
        .send({participateInQuests: false})
        .set( 'Authorization', process.env.WOV_TOKEN)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .catch((err) => {
          if (err == "Error: Too Many Requests") {Merr.edit({content:"Erreur a la 2ème requêtes\n\`2ème tentatives en cours...\`"})}
          else if (err == "Error: Not Found") {return Merr.edit({content:`Pseudo: ${nom} n'est pas présent dans le clan.`})}
          else {return Merr.edit({content:`Erreur: ${err}`})}});
          var objErr= JSON.stringify(Quests);
    
          if (objErr !== undefined) {var Clan =  Quests.body;}
         var i = 2
         while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
            var Quests = await superagent.put(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/members/${idn1}/participateInQuests`)
          .send({participateInQuests: false})
          .set( 'Authorization', process.env.WOV_TOKEN)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .catch((err) => {
              if (err == "Error: Too Many Requests") {Merr.edit({content:`Erreur, tentatives: \`${i}\``})}
              else if (err == "Error: Not Found") {return Merr.edit({content:`Pseudo: ${nom} n'est pas présent dans le clan.`})}
              else {return Merr.edit({content:`Erreur: ${err}`})}});
         var objErr= JSON.stringify(Quests);
          try {var Clan =  Quests.body;}catch(err) {}; var i = i+1}
       
        console.log (`Pseudo: ${User.username}`);
        console.log (`Participation à la quête: ${Clan.participateInClanQuests}`);

        const embed = new MessageEmbed()
              .setAuthor({name : `Statut de participation`})
              .setColor('WHITE')
              .addFields({ name: 'Pseudo', value: `${User.username}`, inline: false}, { name: 'Participation à la quête:', value: `${Clan.participateInClanQuests}`, inline: false})
              .setThumbnail(User.equippedAvatar.url)
              .setTimestamp();
    
              Merr.edit({content: ' ', embeds : [embed]}); Mname.delete()
            var n = n+1;}

    },
    options:[
      {
          name: "pseudo",
          description: "taper le pseudo pour déactiver sa participation à la quête",
          type: "STRING",
          required: true,
      }],
        runSlash: async(client, interaction) => {
          const nom = interaction.options.getString('pseudo');
          console.log(nom)
        interaction.reply({content:`Recherche du profil pour: ${nom}`, ephemeral: true})
        await new Promise(resolve => setTimeout(resolve, 1000))

        var Username = await superagent.get(`https://api.wolvesville.com/players/search?username=${nom}`)
        .set( 'Authorization', process.env.WOV_TOKEN)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .catch((err) => {
            if (err == "Error: Too Many Requests") {interaction.editReply({content:"Erreur a la 1ère requête\n\`2ème tentatives en cours...\`", ephemeral: true})}
            else if (err == "Error: Not Found") {return interaction.editReply({content:`Pseudo inexistant`, ephemeral: true})}
            else {return interaction.editReply({content:`Erreur: ${err}`, ephemeral: true})}});
        var objErr= JSON.stringify(Username);
    
        if (objErr !== undefined) {var User = Username.body; var UserId=JSON.stringify(User);}

       var i = 2
       while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
        var Username = await superagent.get(`https://api.wolvesville.com/players/search?username=${nom}`)
        .set( 'Authorization', process.env.WOV_TOKEN)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .catch((err) => {
            if (err == "Error: Too Many Requests") {interaction.editReply({content:`Erreur, tentatives: \`${i}\``, ephemeral: true})}
            else if (err == "Error: Not Found") {return interaction.editReply({content:`Pseudo inexistant`, ephemeral: true})}
            else {return interaction.editReply({content:`Erreur: ${err}`, ephemeral: true})}});
       var objErr= JSON.stringify(Username);
        try {var User = await Username.body; var UserId=JSON.stringify(User);;}catch(err) {}; var i = i+1} 

        interaction.editReply({content:`Profil de ${nom} trouvé avec succés, activation de la quête pour ${nom}:`, ephemeral: true})
        await new Promise(resolve => setTimeout(resolve, 2000))

        var idn = UserId.slice(7, 43); var idn1 = idn.trim(); console.log(idn)

        var Quests = await superagent.put(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/members/${idn1}/participateInQuests`)
        .send({participateInQuests: false})
        .set( 'Authorization', process.env.WOV_TOKEN)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .catch((err) => {
          if (err == "Error: Too Many Requests") {interaction.editReply({content:"Erreur a la 2ème requêtes\n\`2ème tentatives en cours...\`", ephemeral: true})}
          else if (err == "Error: Not Found") {return interaction.editReply({content:`Pseudo: ${nom} n'est pas présent dans le clan.`, ephemeral: true})}
          else {return interaction.editReply({content:`Erreur: ${err}`, ephemeral: true})}});
          var objErr= JSON.stringify(Quests);
    
          if (objErr !== undefined) {var Clan =  Quests.body;}
         var i = 2
         while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
            var Quests = await superagent.put(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/members/${idn1}/participateInQuests`)
          .send({participateInQuests: false})
          .set( 'Authorization', process.env.WOV_TOKEN)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .catch((err) => {
              if (err == "Error: Too Many Requests") {interaction.editReply({content:`Erreur, tentatives: \`${i}\``, ephemeral: true})}
              else if (err == "Error: Not Found") {return interaction.editReply({content:`Pseudo: ${nom} n'est pas présent dans le clan.`, ephemeral: true})}
              else {return interaction.editReply({content:`Erreur: ${err}`, ephemeral: true})}});
         var objErr= JSON.stringify(Quests);
          try {var Clan =  Quests.body;}catch(err) {}; var i = i+1}
       
        console.log (`Pseudo: ${User.username}`);
        console.log (`Participation à la quête: ${Clan.participateInClanQuests}`);

        const embed = new MessageEmbed()
              .setAuthor({name : `Statut de participation`})
              .setColor('WHITE')
              .addFields({ name: 'Pseudo', value: `${User.username}`, inline: false}, { name: 'Participation à la quête:', value: `${Clan.participateInClanQuests}`, inline: false})
              .setThumbnail(User.equippedAvatar.url)
              .setTimestamp();
    
              interaction.editReply({content: ' ', embeds : [embed]})
    }
    }