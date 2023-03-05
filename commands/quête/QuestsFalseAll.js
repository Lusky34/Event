const superagent = require('superagent').agent();
const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();

module.exports = {
  name: "qfalseall",
  category: 'quête',
  permissions: ['BAN_MEMBERS'],
  ownerOnly: false,
  usage: 'qfalseall',
  examples: ['qfalseall'],
  description: "Désactive la partcipation aux quêtes de tout les membres (STAFF)",
      run: async(client, message, args) => {
        var Minfo = await message.channel.send(`Recherche de la liste des membres..`)
        var Merr = await message.channel.send(`- - - - - -`)
        var Username = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/members`)
        .set( 'Authorization', process.env.WOV_TOKEN)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .catch((err) => {
            if (err == "Error: Too Many Requests") {Merr.edit({content:"Erreur a la 1ère requête\n\`2ème tentatives en cours...\`"})}
            else {return Merr.edit({content:`Erreur: ${err}`})}});
        var objErr= JSON.stringify(Username);
    
        if (objErr !== undefined) {var User = Username.body}

       var i = 2
       while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
        var Username = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/members`)
        .set( 'Authorization', process.env.WOV_TOKEN)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .catch((err) => {
            if (err == "Error: Too Many Requests") {Merr.edit({content:`Erreur, tentatives: \`${i}\``})}
            else if (err == "Error: Not Found") {return Merr.edit({content:`Pseudo inexistant`})}
            else {return Merr.edit({content:`Erreur: ${err}`})}});
       var objErr= JSON.stringify(Username);
        try {var User = await Username.body;}catch(err) {}; var i = i+1} 
            
        Merr.delete(); Minfo.delete()
        var k =0
        var msg = ""
        while(Username.body[k] !== undefined) {
        var User = await Username.body[k]; var nom = User.username;

        if (User.participateInClanQuests == true && User.status == "ACCEPTED") {
        var idn1 = User.playerId;

        var Quests = await superagent.put(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/members/${idn1}/participateInQuests`)
        .send({participateInQuests: false})
        .set( 'Authorization', process.env.WOV_TOKEN)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .catch(async(err) => {
          const Minfo = await message.channel.send({content:`- - - - -`})
          if (err == "Error: Too Many Requests") {Minfo.edit({content:"Erreur a la 2ème requêtes\n\`2ème tentatives en cours...\`"})}
          else if (err == "Error: Not Found") {return Minfo.edit({content:`Pseudo: ${nom} n'est pas présent dans le clan.`})}
          else {return Minfo.edit({content:`Erreur: ${err}`})};Minfo.delete()});
          var objErr= JSON.stringify(Quests);

         var i = 2
         while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
            var Quests = await superagent.put(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/members/${idn1}/participateInQuests`)
          .send({participateInQuests: false})
          .set( 'Authorization', process.env.WOV_TOKEN)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .catch(async(err) => {
            const Minfo = await message.channel.send({content:`- - - - -`})
              if (err == "Error: Too Many Requests") {Minfo.edit({content:`Erreur, tentatives: \`${i}\` pour ${nom}`})}
              else if (err == "Error: Not Found") {return Minfo.edit({content:`Pseudo: ${nom} n'est pas présent dans le clan.`})}
              else {return Minfo.edit({content:`Erreur: ${err}`})};Minfo.delete()});
         var objErr= JSON.stringify(Quests); var i = i+1}
        console.log (`Pseudo: ${User.username}`);
            var msgi = `\n${User.username}, désactivation réussie`
        var msg = `\n${msg + msgi}\n- - - - - -`
    
            var n = n+1;}var k = k+1}
            if (msg != "") {message.channel.send(msg)}
            message.channel.send("Tout les membres ont leur participation désactivitée")
    },
        runSlash: async(client, interaction) => {
          interaction.reply({content:`Recherche de la liste des membres..`, ephemeral:true})
        var Username = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/members`)
        .set( 'Authorization', process.env.WOV_TOKEN)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .catch((err) => {
            if (err == "Error: Too Many Requests") {interaction.editReply({content:"Erreur a la 1ère requête\n\`2ème tentatives en cours...\`"})}
            else {return interaction.editReply({content:`Erreur: ${err}`})}});
        var objErr= JSON.stringify(Username);
    
        if (objErr !== undefined) {var User = Username.body}

       var i = 2
       while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
        var Username = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/members`)
        .set( 'Authorization', process.env.WOV_TOKEN)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .catch((err) => {
            if (err == "Error: Too Many Requests") {interaction.editReply({content:`Erreur, tentatives: \`${i}\``})}
            else if (err == "Error: Not Found") {return interaction.editReply({content:`Pseudo inexistant`})}
            else {return interaction.editReply({content:`Erreur: ${err}`})}});
       var objErr= JSON.stringify(Username);
        try {var User = await Username.body;}catch(err) {}; var i = i+1} 
        var k =0
        var msg = ""
        while(Username.body[k] !== undefined) {
        var User = await Username.body[k]; var nom = User.username;

        if (User.participateInClanQuests == true && User.status == "ACCEPTED") {
        var idn1 = User.playerId;

        var Quests = await superagent.put(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/members/${idn1}/participateInQuests`)
        .send({participateInQuests: false})
        .set( 'Authorization', process.env.WOV_TOKEN)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .catch(async(err) => {
          const Minfo = await interaction.channel.send({content:`- - - - -`})
          if (err == "Error: Too Many Requests") {Minfo.edit({content:"Erreur a la 2ème requêtes\n\`2ème tentatives en cours...\`"})}
          else if (err == "Error: Not Found") {return Minfo.edit({content:`Pseudo: ${nom} n'est pas présent dans le clan.`})}
          else {return Minfo.edit({content:`Erreur: ${err}`})};Minfo.delete()});
          var objErr= JSON.stringify(Quests);

         var i = 2
         while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
            var Quests = await superagent.put(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/members/${idn1}/participateInQuests`)
          .send({participateInQuests: false})
          .set( 'Authorization', process.env.WOV_TOKEN)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .catch(async(err) => {
            const Minfo = await interaction.channel.send({content:`- - - - -`})
              if (err == "Error: Too Many Requests") {Minfo.edit({content:`Erreur, tentatives: \`${i}\` pour ${nom}`})}
              else if (err == "Error: Not Found") {return Minfo.edit({content:`Pseudo: ${nom} n'est pas présent dans le clan.`})}
              else {return Minfo.edit({content:`Erreur: ${err}`})};Minfo.delete()});
         var objErr= JSON.stringify(Quests); var i = i+1}
        console.log (`Pseudo: ${User.username}`);
            var msgi = `\n${User.username}, désactivation réussie`
        var msg = `\n${msg + msgi}\n- - - - - -`
    
            var n = n+1;}var k = k+1}
            if (msg != "") {interaction.channel.send(msg)}
            interaction.channel.send("Tout les membres ont leur participation désactivitée")
    }
    }