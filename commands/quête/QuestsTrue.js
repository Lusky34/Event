const superagent = require('superagent').agent();
const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const {readFileSync, readdirSync} = require ("fs");

module.exports = {
  name: "qtrue",
  category: 'quête',
  permissions: ['BAN_MEMBERS'],
  ownerOnly: false,
  usage: 'qtrue [Pseudo]',
  examples: ['qtrue magmelqi'],
  description: "Active la partcipation aux quêtes du pseudo (STAFF)",
      run: async(client, message, args) => {
        if (!args[0] || !args[0].match(/^(or|Or|gemme|Gemme)$/)) return message.reply('merci d\'entrer au 1er argument du type de quête qu\'il s\'agit (`\or`/`\gemme\`)');

        var n =1
        var msg = null
        while (args[n] !== undefined) {
        var nom = args[n]
        console.log(nom)

          if (args[0] == "gemme" || args[0] == "Gemme") {var g = 0
        try {
          var gemme = JSON.parse(readFileSync(`././Information/Gemme/Member-Pseudo/${nom}.json`, 'utf-8'))} catch (err) {var g = 2}}

          if (args[0] == "or" || args[0] == "Or") {var g =1
        try {
          var or = JSON.parse(readFileSync(`././Information/Or/Member-Pseudo/${nom}.json`, 'utf-8'))} catch (err) {var g =2}}

         

        if (g == 1) {var idn1 = or.PlayerId; var ressource = or.Or}
        else if (g == 0) {var idn1 = gemme.PlayerId; var ressource = gemme.Gemme}
        else if (g == 2) {var msgi =`\n${nom} n'a pas de don dans la base de donné`}
          if (g != 2 ) {
        var Quests = await superagent.put(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/members/${idn1}/participateInQuests`)
        .send({participateInQuests: true})
        .set( 'Authorization', process.env.WOV_TOKEN)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .catch(async(err) => {var Merr = await message.channel.send(`- - - - - - -`)
          if (err == "Error: Too Many Requests") {Merr.edit({content:"Erreur a la 2ème requêtes\n\`2ème tentatives en cours...\`"})}
          else if (err == "Error: Not Found") {return Merr.edit({content:`Pseudo: ${nom} n'est pas présent dans le clan.`})}
          else {return Merr.edit({content:`Erreur: ${err}`})};Merr.delete()});
          var objErr= JSON.stringify(Quests);
    
          if (objErr !== undefined) {var Clan =  Quests.body;}
         var i = 2
         while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
            var Quests = await superagent.put(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/members/${idn1}/participateInQuests`)
          .send({participateInQuests: true})
          .set( 'Authorization', process.env.WOV_TOKEN)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .catch(async(err) => { const Merr = await message.channel.send(`- - - - - - -`)
              if (err == "Error: Too Many Requests") {Merr.edit({content:`Erreur, tentatives: \`${i}\` pour ${nom}`})}
              else if (err == "Error: Not Found") {return Merr.edit({content:`Pseudo: ${nom} n'est pas présent dans le clan.`})}
              else {return Merr.edit({content:`Erreur: ${err}`})};Merr.delete()});
         var objErr= JSON.stringify(Quests);
          try {var Clan =  Quests.body;}catch(err) {}; var i = i+1}
       
        console.log (`Pseudo: ${nom} Participation à la quête: true`);

        var msgi = `\nPseudo: ${nom}, banque: ${ressource}, activation réussie`}
        var msg = `${msg + msgi}\n- - - - - -`

            var n = n+1;}
            if (msg.slice(-11) == "- - - - - -") {var msg = msg.slice(0, -12)} 
            if (msg.slice(0,4) == "null") {var msgf = msg.slice(4)} else {var msgf = msg}
            message.channel.send(msgf)
            message.channel.send(`Activation de la quête de ${n-1} joueurs`)

    },
    options:[
      {
          name: "pseudo",
          description: "taper le pseudo pour activer sa participation à la quête",
          type: "STRING",
          required: true,
      }
    ],
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

        var idn1 = User.id

        var Quests = await superagent.put(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/members/${idn1}/participateInQuests`)
        .send({participateInQuests: true})
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
          .send({participateInQuests: true})
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