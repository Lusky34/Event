const superagent = require('superagent').agent();
const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();

module.exports = {
  name: "listact",
  category: 'quête',
  permissions: ['BAN_MEMBERS'],
  ownerOnly: false,
  usage: 'listact',
  examples: ['listact'],
  description: "Liste des membres qui ont activer leur participation à la quête (STAFF)",
      run: async(client, message, args) => {
        if (!args[0]) {var slash = true} else {var slash = false}
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

        var msg = "Listes des participants:"; var msg2 = ""
        var h =0
        var k =0
        while(Username.body[k] !== undefined) {
        var User = await Username.body[k]; var nom = User.username;

        if (User.participateInClanQuests == true && User.status == "ACCEPTED") { var h =h+1
            if (slash){const antiSlash = nom.match('_'); 
            if (antiSlash != null) {var sliceD = nom.slice(0, antiSlash.index); var sliceF = nom.slice(antiSlash.index)
                var nom = sliceD + "\\" +sliceF}}
            var msga = `\n-${nom}`
            if (msg.length < 1900) {var msg = msg + msga} else {var msg2 = msg2 + msga}
    
              
            var n = n+1;}var k = k+1};if (msg.length < 1900) {var msg = msg + `\nNombre de participants: ${h}`} else {var msg2 = msg2 + `\nNombre de participants: ${h}`}
            message.channel.send(msg); message.channel.send(msg2)
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

       var h =0
       var i = 2
       while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
        var Username = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/members`)
        .set( 'Authorization', process.env.WOV_TOKEN)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .catch((err) => {
            if (err == "Error: Too Many Requests") {interaction.editReply({content:`Erreur, tentatives: \`${i}\``})}
            else {return interaction.editReply({content:`Erreur: ${err}`})}});
       var objErr= JSON.stringify(Username);
        try {var User = await Username.body;}catch(err) {}; var i = i+1} 
      

        var msg = "Listes des participants:"; var msg2 = ""
        var h =0
        var k =0
        while(Username.body[k] !== undefined ) {
        var User = await Username.body[k]; var nom = User.username;

        if (User.participateInClanQuests == true && User.status == "ACCEPTED") { var h =h+1
            const antiSlash = nom.match('_'); 
            if (antiSlash != null) {var sliceD = nom.slice(0, antiSlash.index); var sliceF = nom.slice(antiSlash.index)
                var nom = sliceD + "\\" +sliceF}
            var msga = `\n-${nom}`
            if (msg.length < 1900) {var msg = msg + msga} else {var msg2 = msg2 + msga}
    
              
            var n = n+1;}var k = k+1};if (msg.length < 1900) {var msg = msg + `\nNombre de participants: ${h}`} else {var msg2 = msg2 + `\nNombre de participants: ${h}`}; interaction.editReply("Liste trouvée");
            interaction.channel.send(msg); interaction.channel.send(msg2)
    }
    }