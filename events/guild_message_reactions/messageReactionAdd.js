const { MessageEmbed } = require("discord.js");
const superagent = require('superagent').agent();
const dotenv = require('dotenv'); dotenv.config();
const { writeFileSync, readFileSync } = require('fs')

module.exports = {
    name: "messageReactionAdd",
    once: false,
    async execute(client, messageReaction, user) {
        const message = messageReaction.message;
        const emojiName = messageReaction.emoji.name;
        const member = message.guild.members.cache.get(user.id)
        const name = member.displayName; const nameId = member.id;
        if(member.user.bot) return;

        if (messageReaction.partial) {
            try {
            await messageReaction.fetch();
        }catch (err) {console.log ('impossible de récupérer les messages')
        return}
    }
        const logChannel = client.channels.cache.get('1044258472121860126');
        const regleChannel = client.channels.cache.get('817787093182054430');
        const evieChannel = client.channels.cache.get('992016663698473050');
        const quete1Channel = client.channels.cache.get('1054396949844992060');
        const quete2Channel = client.channels.cache.get('1054398219561484348');
        const quete3Channel = client.channels.cache.get('1054398333831106591');
        const quete4Channel = client.channels.cache.get('1054398377858715699');
        const quete5Channel = client.channels.cache.get('1054399284721745950');
        const quete6Channel = client.channels.cache.get('1054745511317483611');

        if (emojiName === '👍🏽' && message.channel.id == '724241714373722163' ) {

            const embedP = new MessageEmbed()
        .setAuthor({ name: `L'utilisateur a reéagis avec 👍🏻 !`, iconURL: member.user.displayAvatarURL()})
        .setDescription(`${name} => ${message.embeds[0].title}`)
        .setColor('#21ff81')
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp();
        var nb = 0; var lien = 0
        while (message.embeds[0].image.url != lien && lien != undefined) { var nb = nb +1
               try {var InfoA = JSON.parse(readFileSync(`././Information/Quête-auto/Quête-${nb}.json`, 'utf-8'))}catch(err) {}; 
               if (InfoA != undefined) {var lien = InfoA.Lien;}
               };
               if (InfoA != undefined && message.id == InfoA.mId) {

                if (InfoA.Type == "gemme" && InfoA.Actu) {
                    var NbP = message.reactions.cache.get('👍🏽').count; var NbP = NbP -1
                    var price = (350+ 135*NbP)/(NbP)
                    var price = Math.ceil(price)
                    const embedInfo = new MessageEmbed()
                    .setTitle(message.embeds[0].title)
                    .setDescription(`Oui 👍🏽 Non 👎🏽\nPrix actuel de la quête __par participant__: \`${price}\` gemmes`)
                    .setColor(message.embeds[0].color)
                    .setImage(message.embeds[0].image.url)
                    message.edit({embeds: [embedInfo]})}

                if (nb == 1) {quete1Channel.send({ embeds: [embedP]})}
                else if (nb == 2) {quete2Channel.send({ embeds: [embedP]})}
                else if (nb == 3) {quete3Channel.send({ embeds: [embedP]})}
                else if (nb == 4) {quete4Channel.send({ embeds: [embedP]})}
                else if (nb == 5) {quete5Channel.send({ embeds: [embedP]})}
                else if (nb == 6) {quete6Channel.send({ embeds: [embedP]})}
               }
        }

        if (emojiName === '👎🏽' && message.channel.id == '724241714373722163' ) {

            const embedN = new MessageEmbed()
            .setAuthor({name: `L'utilisateur a reéagis avec 👎🏻 !`, iconURL: member.user.displayAvatarURL()})
            .setDescription(`${name} => ${message.embeds[0].title}`)
            .setColor('#dc143c')
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp();

            var nb = 0; var lien = 0
        while (message.embeds[0].image.url != lien && lien != undefined) { var nb = nb +1
               try {var InfoA = JSON.parse(readFileSync(`././Information/Quête-auto/Quête-${nb}.json`, 'utf-8'))}catch(err) {}; 
               if (InfoA != undefined) {var lien = InfoA.Lien;}
               };
               if (InfoA != undefined && message.id == InfoA.mId) {
                if (nb == 1) {quete1Channel.send({ embeds: [embedN]})}
                else if (nb == 2) {quete2Channel.send({ embeds: [embedN]})}
                else if (nb == 3) {quete3Channel.send({ embeds: [embedN]})}
                else if (nb == 4) {quete4Channel.send({ embeds: [embedN]})}
                else if (nb == 5) {quete5Channel.send({ embeds: [embedN]})}
                else if (nb == 6) {quete6Channel.send({ embeds: [embedN]})}
               }
        }

        if (emojiName === '✅' && message.channel.id == '1043458397779017768' ) {var nom = name
            if (nom.slice(0,2) == "🥉" || nom.slice(0,2) == "🥈" || nom.slice(0,2) == "🥇" || nom.slice(0,2) == "🍪") {var nom = nom.slice(2)};
            if (nom.slice(-2) == "🥉" || nom.slice(-2) == "🥈" || nom.slice(-2) == "🥇") {var nom = nom.slice(0,-2)};
             const Mdebut = await member.send(`Recherche d'un profil au nom de "${nom}":`)
            await new Promise(resolve => setTimeout(resolve, 1000))
         console.log(nom); const Mname = await member.send(`- - - - - -`)
         var remove = false
         var Username = await superagent.get(`https://api.wolvesville.com/players/search?username=${nom}`)
         .set( 'Authorization', process.env.WOV_TOKEN)
         .set('Content-Type', 'application/json')
         .set('Accept', 'application/json')
         .catch((err) => {
             if (err == "Error: Too Many Requests") {console.log("Erreur a la 1ère requête\n\`2ème tentatives en cours...\`")}
             else if (err == "Error: Not Found") {Mname.edit({content:`Pseudo inexistant, veuillez avoir votre pseudo wov identique à celui de discord\nveuillez avertir: <@385172057433964556>`}); remove = true}
             else {Mname.edit({content:`${err}, \nveuillez avertir: <@385172057433964556>`}); remove = true}});
         var objErr= JSON.stringify(Username);
            if (remove) {return message.reactions.cache.get('✅').remove(user)} 
         if (objErr !== undefined) {var User = Username.body;}
        var i = 2;
        while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
         var Username = await superagent.get(`https://api.wolvesville.com/players/search?username=${nom}`)
         .set( 'Authorization', process.env.WOV_TOKEN)
         .set('Content-Type', 'application/json')
         .set('Accept', 'application/json')
         .catch((err) => {
             if (err == "Error: Too Many Requests") {console.log(`Erreur, tentatives: \`${i}\``)}
             else if (err == "Error: Not Found") {Mname.edit({content:`Pseudo inexistant, veuillez avoir votre pseudo wov identique à celui de discord\nveuillez avertir: <@385172057433964556>`}); return remove = true}
             else {Mname.edit({content:`${err}, \nveuillez avertir: <@385172057433964556>`}); return remove = true}});
        var objErr= JSON.stringify(Username); var i = i+1}
         if (!remove) {
            Mname.edit(`- - - - - -`)
         Mdebut.edit(`Profil de ${nom} trouvé avec succés`)
         await new Promise(resolve => setTimeout(resolve, 1000))
         var idn1 = Username.body.id;
            
         try {var InfoOr = JSON.parse(readFileSync(`././Information/Or/Member-Id/${idn1}.json`, 'utf-8'))}catch(err) {}
         if (InfoOr == undefined) {Mdebut.delete(); Mname.edit(`Vous n'avez pas d'or en banque \n(Si vous avez fait votre don il y a moins d'une minute, veuillez attendre et réagissez à nouveau après 1min,\nsi vous avez fait votre don et qu'il n'a pas été pris en compte, veuillez contacter <@385172057433964556> ou un membre du staff avec le screen de votre don + ce message)`); return remove = true}
        else if (InfoOr.Or < 499) {Mdebut.delete(); Mname.edit(`Vous possédez seulement ${InfoOr.Or} or\n(Si vous avez fait votre don il y a moins d'une minute, veuillez attendre et réagissez à nouveau après 1min,\nsi vous avez fait votre don et qu'il n'a pas été pris en compte, veuillez contacter <@385172057433964556> ou un membre du staff avec le screen de votre don + ce message)`); return remove = true} else {Mdebut.delete(); Mname.edit({content: `Vous avez ${InfoOr.Or} or en banque`})}
    }else {return message.reactions.cache.get('✅').remove(user)}
    if (remove) {return message.reactions.cache.get('✅').remove(user)}
        }
        //1054738041383694397 laîques
        //776035119151841283 rôle
        //724298399376998440 règle
        if (emojiName === '✅' || emojiName === '💘' || emojiName === '💗' || emojiName === '💖') {
            if (nameId == "567787590997114885" && message.channel.id == '817761804041322536' || nameId == "567787590997114885" && message.channel.id == '994618797363306496' || nameId == "567787590997114885" && message.channel.id == '1005050826777182269') {evieChannel.send(`${name} vient de claim un perso 👀`)}}

        if (emojiName === '✅') {
            if (message.channel.id == '724216612206542889'){
                if (message.id == '1054738041383694397') {regleChannel.send(`${name} a accepté les règles concernant la laïcité.`)}
                else if (message.id == '776035119151841283') {regleChannel.send(`${name} a accepté les règles des rôles.`)}
                else if (message.id == '724298399376998440') {regleChannel.send(`${name} a accepté les règles d'usage`)}}};
         
      
         if (emojiName === '🪙' && message.channel.id == '1043458397779017768' || emojiName === '💎' && message.channel.id == '1043458397779017768') {var nom = name
            if (nom.slice(0,2) == "🥉" || nom.slice(0,2) == "🥈" || nom.slice(0,2) == "🥇" || nom.slice(0,2) == "🍪") {var nom = nom.slice(2)};
            if (nom.slice(-2) == "🥉" || nom.slice(-2) == "🥈" || nom.slice(-2) == "🥇") {var nom = nom.slice(0,-2)};
            const voteLogChannel = client.channels.cache.get('1058381353336438865');
           const Mdebut = await member.send(`Recherche d'un profil au nom de "${nom}":`)
            await new Promise(resolve => setTimeout(resolve, 1000))
         console.log(nom); const Mname = await member.send(`- - - - - -`)
                                   
         var Username = await superagent.get(`https://api.wolvesville.com/players/search?username=${nom}`)
         .set( 'Authorization', process.env.WOV_TOKEN)
         .set('Content-Type', 'application/json')
         .set('Accept', 'application/json')
         .catch((err) => {
             if (err == "Error: Too Many Requests") {Mname.edit({content:"Erreur a la 1ère requête\n\`2ème tentatives en cours...\`"})}
             else if (err == "Error: Not Found") {return Mname.edit({content:`Pseudo inexistant, veuillez avoir votre pseudo wov identique à celui de discord`})}
             else {return Mname.edit({content:`${err}, \nveuillez avertir: <@385172057433964556>`})}});
         var objErr= JSON.stringify(Username);
     
         if (objErr !== undefined) {var User = Username.body;}
        var i = 2
        while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
         var Username = await superagent.get(`https://api.wolvesville.com/players/search?username=${nom}`)
         .set( 'Authorization', process.env.WOV_TOKEN)
         .set('Content-Type', 'application/json')
         .set('Accept', 'application/json')
         .catch((err) => {
             if (err == "Error: Too Many Requests") {Mname.edit({content:`Erreur, tentatives: \`${i}\``})}
             else if (err == "Error: Not Found") {return Mname.edit({content:`Pseudo inexistant, veuillez avoir votre pseudo wov identique à celui de discord`})}
             else {return Mname.edit({content:`${err}, \nveuillez avertir: <@385172057433964556>`})}});
        var objErr= JSON.stringify(Username);
         try {var User = await Username.body;}catch(err) {}; var i = i+1} 
         Mname.edit({content:`Profil de ${nom} trouvé avec succés`})
         Mdebut.edit(`Activation de votre partipation:`)
         await new Promise(resolve => setTimeout(resolve, 1000))
         Mname.edit(`- - - - - -`)
         var idn1 = Username.body.id; console.log(idn1); var passRess = true
         if (emojiName === '🪙') {
         try {var InfoOr = JSON.parse(readFileSync(`././Information/Or/Member-Id/${idn1}.json`, 'utf-8'))}catch(err) {}
         if (InfoOr == undefined) {Mdebut.delete(); var passRess = false; return Mname.edit(`Vous n'avez pas d'or en banque \n(Si vous avez fait votre don il y a moins d'une minute, veuillez attendre et réagissez à nouveau après 1min,\nsi vous avez belle et bien fait votre don et qu'il n'a pas été pris en compte, veuillez contacter <@385172057433964556> ou un membre du staff avec le screen de votre don + ce message)`)}
        else if (InfoOr.Or < 499) {Mdebut.delete();var passRess = false; return Mname.edit(`Vous possédez seulement ${InfoOr.Or} or\n(Si vous avez fait votre don il y a moins d'une minute, veuillez attendre et réagissez à nouveau après 1min,\nsi vous avez belle et bien fait votre don et qu'il n'a pas été pris en compte, veuillez contacter <@385172057433964556> ou un membre du staff avec le screen de votre don + ce message)`)} else {var nbRess = `${InfoOr.Or} or en banque`}

    }   else if (emojiName === '💎') {
        try {var InfoGemme = JSON.parse(readFileSync(`././Information/Gemme/Member-Id/${idn1}.json`, 'utf-8'))}catch(err) {}
        if (InfoGemme == undefined) {Mdebut.delete(); var passRess = false; return Mname.edit(`Vous n'avez pas de gemme en banque \n(Si vous avez fait votre don il y a moins d'une minute, veuillez attendre et réagissez à nouveau après 1min.\nSi vous avez belle et bien fait votre don et qu'il n'a pas été pris en compte, veuillez contacter <@385172057433964556> ou un membre du staff avec le screen de votre don + ce message)`)}
       else if (InfoGemme.Gemme < 150) {Mdebut.delete();var passRess = false; return Mname.edit(`Vous possédez seulement ${InfoGemme.Gemme} gemmes\n(Si vous avez fait votre don il y a moins d'une minute, veuillez attendre et réagissez à nouveau après 1min.\nSi vous avez belle et bien fait votre don et qu'il n'a pas été pris en compte, veuillez contacter <@385172057433964556> ou un membre du staff avec le screen de votre don + ce message)`)} else {var nbRess = `${InfoGemme.Gemme} gemme en banque`}
    }
         if (passRess) {
         var Quests = await superagent.put(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/members/${idn1}/participateInQuests`)
         .send({participateInQuests: true})
         .set( 'Authorization', process.env.WOV_TOKEN)
         .set('Content-Type', 'application/json')
         .set('Accept', 'application/json')
         .catch((err) => {
           if (err == "Error: Too Many Requests") {Mname.edit({content:"Erreur a la 2ème requêtes\n\`2ème tentatives en cours...\`"})}
           else if (err == "Error: Not Found") {return Mname.edit({content:`Pseudo: ${name} n'est pas présent dans le clan.`})}
           else {return Mname.edit({content:`${err}, \nveuillez avertir: <@385172057433964556>`})}});
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
               if (err == "Error: Too Many Requests") {Mname.edit({content:`Erreur, tentatives: \`${i}\``})}
               else if (err == "Error: Not Found") {return Mname.edit({content:`Pseudo: ${nom} n'est pas présent dans le clan.`})}
               else {return Mname.edit({content:`${err}, \nveuillez avertir: <@385172057433964556>`})}});
          var objErr= JSON.stringify(Quests);
           try {var Clan =  Quests.body; var obj=JSON.stringify(Clan);}catch(err) {}; var i = i+1}
   
            Mdebut.delete()

         console.log (`Pseudo: ${Quests.body.username}, Participation à la quête: ${Quests.body.participateInClanQuests},${nbRess}`);
            if (Quests.body.participateInClanQuests == true) {var participationStatut = "participation à la quête réussie"; var logParticipation = "-> réussie"} else {var participationStatut = "erreur sur l'autorisation de votre participation à la quête, veuillez contacter <@385172057433964556>"; var logParticipation = "activation échouée\n<@385172057433964556> "}

               Mname.edit({content: `Pseudo: ${nom} ${participationStatut} avec ${nbRess}`});
               voteLogChannel.send({content: `Pseudo: ${nom}, ${logParticipation} avec ${nbRess}`})}

     }
 
     
   }}