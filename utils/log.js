const superagent = require('superagent').agent();
const { MessageEmbed, MessageAttachment } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const {writeFileSync, readFileSync, unlinkSync } = require ("fs");
const dayjs = require ('dayjs');

    async function log (client) {
    
        const logChannel = client.channels.cache.get('1061297491712163920'); const mautoChannel = client.channels.cache.get('1046792811065913366'); const queteLogChannel = client.channels.cache.get('1058381353336438865'); const donLogChannel = client.channels.cache.get('1082047888068190258'); const bureauDcCh = client.channels.cache.get('1043458397779017768'); const infoQueteCh = client.channels.cache.get('1082048930935754922');
        
      const errChannel = client.channels.cache.get('1044258472121860126'); const voteQueteCh = client.channels.cache.get('1082048910123618486')
        

      console.log('Log on');
    var Merr = await errChannel.send("Log On");
    var verifStatut = true; var queteStatut = true; var queteLancement = true; var queteInfo = true; var xpAddAuto = true; const antiSpam = true
    var noStop = 50
    while (noStop == 50) {
      //LOGS - - - - - - - - - - - - - - - - - - - - - - -
      var logs = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/logs`)
      .set( 'Authorization', process.env.WOV_TOKEN)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .catch((err) => { if (err == "Error: Too Many Requests") {Merr.edit({content:`Erreur, tentatives: \`${i}\``})}
      if (err == "Error: Bad Gateway") {errChannel.send(`Erreur-log: Bad Gateway`)}
      else {console.log(err); return Merr.edit({content:`Erreur-log: ${err}`})}}); 
      var objErr= JSON.stringify(logs);

      var i = 2
      while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
        var logs = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/logs`)
      .set( 'Authorization', process.env.WOV_TOKEN)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .catch((err) => { if (err == "Error: Too Many Requests") {Merr.edit({content:`Erreur, tentatives: \`${i}\``})}
      else {return Merr.edit({content:`Erreur-log: ${err}`})}});
      var objErr= JSON.stringify(logs)} 
      
      var InfoLastest = JSON.parse(readFileSync(`././Information/Date/Log.json`, 'utf-8'))
      var AncienMessage = InfoLastest.date;
        var n = 0; 
      
        while (logs.body[n].creationTime !== AncienMessage && n !== 199){var n = n+1};
        var n =n-1

      while( n !== -1 ){
        var objbody = logs.body[n];var n = n-1

        var  HlastOnline = objbody.creationTime.slice(11, 13)-1+2

            var annéeLO =  objbody.creationTime.slice(0, 4); var moisLO = objbody.creationTime.slice(5, 7); var jourLO= objbody.creationTime.slice(8, 10);

            if (HlastOnline == 24) {var HlastOnline = "00"; var jourLO = jourLO-1+2
            if (moisLO == 1 && jourLO == 32) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 2 && jourLO == 29) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 3 && jourLO == 32) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 4 && jourLO == 31) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 5 && jourLO == 32) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 6 && jourLO == 31) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 7 && jourLO == 32) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 8 && jourLO == 32) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 9 && jourLO == 31) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 10 && jourLO == 32) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 11 && jourLO == 31) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 12 && jourLO == 32) {moisLO = "01"; jourLO = "01"; var annéeLO = annéeLO-1+2};
           };
          
            var DlastOnline = `${jourLO}/${moisLO}/${annéeLO}`
           const embed = new MessageEmbed();

           if (objbody.action == "PLAYER_JOINED") { 
            embed.setTitle(`${objbody.playerUsername} a rejoins le clan`)
            embed.setColor('GREEN')
            embed.setDescription(`± Id: ${objbody.playerId}\n± Rejoins le: \`${DlastOnline} à ${HlastOnline}h${objbody.creationTime.slice(14,16)}\``)
            embed.setTimestamp();

            logChannel.send({embeds: [embed]})
           }
           else if (objbody.action == "PLAYER_LEFT") {
            embed.setTitle(`${objbody.playerUsername} a quitté le clan`)
            embed.setColor('RED')
            embed.setDescription(`± Id: ${objbody.playerId}\n± Quitté le: \`${DlastOnline} à ${HlastOnline}h${objbody.creationTime.slice(14,16)}\``)
            embed.setTimestamp();

            logChannel.send({embeds: [embed]})
           }
           else if (objbody.action == "PLAYER_KICKED") {
            embed.setTitle(`${objbody.targetPlayerUsername} a été exclu.`)
            embed.setColor('DARK_GREY')
            embed.setDescription(`± Id: ${objbody.targetPlayerId}\n± Par: \`${objbody.playerUsername}\`\n± Exclu le: \`${DlastOnline} à ${HlastOnline}h${objbody.creationTime.slice(14,16)}\`\n± Raison: \`${objbody.comment}\``)
            embed.setTimestamp();

            logChannel.send({embeds: [embed]})
           }
           else if (objbody.action == "PLAYER_QUEST_PARTICIPATION_ENABLED") {
            try {var BOT = objbody.playerBotOwnerUsername}catch(err) {}
            if (BOT != undefined) {var send = 0} else {var send = 1}
            if (BOT == undefined) {var Player = objbody.playerUsername}
            if (objbody.targetPlayerUsername != undefined) {var targetP = objbody.targetPlayerUsername; var couleur = 'GREEN'} else {var targetP = objbody.playerUsername; var couleur = 'ORANGE'}
            
            embed.setTitle(`Participation activée pour ${targetP}`)
            embed.setColor(couleur)
            embed.setDescription(`± Par: \`${Player}\`\n± Fais le: \`${DlastOnline} à ${HlastOnline}h${objbody.creationTime.slice(14,16)}\``)
            embed.setTimestamp();

            if (send ==1) {queteLogChannel.send({embeds: [embed]})}
           }
           else if (objbody.action == "PLAYER_QUEST_PARTICIPATION_DISABLED") {
            try {var BOT = objbody.playerBotOwnerUsername}catch(err) {}
            if (BOT != undefined) {var send = 0} else {var send = 1}
            if (BOT == undefined) {var Player = objbody.playerUsername}
            if (objbody.targetPlayerUsername != undefined) {var targetP = objbody.targetPlayerUsername} else {var targetP = objbody.playerUsername;}

            embed.setTitle(`Participation désactivée pour ${targetP}`)
            embed.setColor('RED')
            embed.setDescription(`± Par: \`${Player}\`\n± Fais le: \`${DlastOnline} à ${HlastOnline}h${objbody.creationTime.slice(14,16)}\``)
            embed.setTimestamp();

            if (send ==1) {queteLogChannel.send({embeds: [embed]})}
           }
           else if (objbody.action == "BLACKLIST_ADDED") {
            embed.setTitle(`${objbody.targetPlayerUsername} a été ajouté sur la BLACKLIST \`⚫\``)
            embed.setColor('#0e0d0d')
            embed.setDescription(`± Id: ${objbody.targetPlayerId}\n± Par: \`${objbody.playerUsername}\`\n± Fais le: \`${DlastOnline} à ${HlastOnline}h${objbody.creationTime.slice(14,16)}\``)
            embed.setTimestamp();

            logChannel.send({embeds: [embed]})
           }
           else if (objbody.action == "BLACKLIST_REMOVED") {
            embed.setTitle(`${objbody.targetPlayerUsername} a été retiré de la BLACKLIST \`⚫\``)
            embed.setColor('#0e0d0d')
            embed.setDescription(`± Id: ${objbody.targetPlayerId}\n± Par: \`${objbody.playerUsername}\`\n± Fais le: \`${DlastOnline} à ${HlastOnline}h${objbody.creationTime.slice(14,16)}\``)
            embed.setTimestamp();

            logChannel.send({embeds: [embed]})
           }
           else if (objbody.action == "JOIN_REQUEST_SENT_BY_CLAN") {
            embed.setTitle(`${objbody.targetPlayerUsername} a été invité`)
            embed.setColor('0be7ac')
            embed.setDescription(`± Id: ${objbody.targetPlayerId}\n± Par: \`${objbody.playerUsername}\`\n± Commentaire: \`${objbody.comment ?? "Vide"}\`\n± Fais le: \`${DlastOnline} à ${HlastOnline}h${objbody.creationTime.slice(14,16)}\``)
            embed.setTimestamp();

            logChannel.send({embeds: [embed]})
           }
           else if (objbody.action == "JOIN_REQUEST_SENT_BY_EXTERNAL_PLAYER") {
            embed.setTitle(`${objbody.playerUsername} demande à rejoindre le clan`)
            embed.setColor('0be7ac')
            embed.setDescription(`± Id: ${objbody.playerId}\n± Commentaire: \`${objbody.comment ?? "Vide"}\`\n± Fais le: \`${DlastOnline} à ${HlastOnline}h${objbody.creationTime.slice(14,16)}\``)
            embed.setTimestamp();

            logChannel.send({embeds: [embed]})
           }
           else if (objbody.action == "JOIN_REQUEST_ACCEPTED") {
            embed.setTitle(`L'invitation de ${objbody.targetPlayerUsername} a été acceptée`)
            embed.setColor('GREEN')
            embed.setDescription(`± Id: ${objbody.targetPlayerId}\n± Par: \`${objbody.playerUsername}\`\n± Fais le: \`${DlastOnline} à ${HlastOnline}h${objbody.creationTime.slice(14,16)}\``)
            embed.setTimestamp();

            logChannel.send({embeds: [embed]})
           }
           else if (objbody.action == "JOIN_REQUEST_DECLINED_BY_EXTERNAL_PLAYER") {
            embed.setTitle(`${objbody.playerUsername} a refusée l'invitation`)
            embed.setColor('RED')
            embed.setDescription(`± Id: ${objbody.playerId}\n± Fais le: \`${DlastOnline} à ${HlastOnline}h${objbody.creationTime.slice(14,16)}\``)
            embed.setTimestamp();

            logChannel.send({embeds: [embed]})
           }
           else if (objbody.action == "JOIN_REQUEST_WITHDRAWN") {
            embed.setTitle(`L'invitation de ${objbody.targetPlayerUsername} a été annulée`)
            embed.setColor('ORANGE')
            embed.setDescription(`± Id: ${objbody.targetPlayerId}\n± Par: \`${objbody.playerUsername}\`\n± Fais le: \`${DlastOnline} à ${HlastOnline}h${objbody.creationTime.slice(14,16)}\``)
            embed.setTimestamp();

            logChannel.send({embeds: [embed]})
           }
           else if (objbody.action == "CO_LEADER_PROMOTED") {
            embed.setTitle(`${objbody.targetPlayerUsername} a été promus`)
            embed.setColor('GREEN')
            embed.setDescription(`± Id: ${objbody.targetPlayerId}\n± Par: \`${objbody.playerUsername}\`\n± Fais le: \`${DlastOnline} à ${HlastOnline}h${objbody.creationTime.slice(14,16)}\``)
            embed.setTimestamp();

            logChannel.send({embeds: [embed]})
           }
           else if (objbody.action == "CO_LEADER_DEMOTED") {
            embed.setTitle(`${objbody.targetPlayerUsername} a été rétrogradé`)
            embed.setColor('RED')
            embed.setDescription(`± Id: ${objbody.targetPlayerId}\n± Par: \`${objbody.playerUsername}\`\n± Fais le: \`${DlastOnline} à ${HlastOnline}h${objbody.creationTime.slice(14,16)}\``)
            embed.setTimestamp();

            logChannel.send({embeds: [embed]})
           }
           else {console.log(objbody.action); logChannel.send(`LOG_ERR, nouvelle action pas pris en charge: ${objbody.action}`)}
      }

        const infoL = {
          date: logs.body[0].creationTime
        }
        const objectToJsonL = JSON.stringify(infoL)
        writeFileSync(`././Information/Date/Log.json`, objectToJsonL)
        //MAUTO   - - - - - - - - - - - - - - - - - - - - - - -
        await new Promise(resolve => setTimeout(resolve, 1000))

      var Messageclan = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/chat`)
      .set( 'Authorization', process.env.WOV_TOKEN)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .catch((err) => { if (err == "Error: Too Many Requests") {Merr.edit({content:`Erreur, tentatives: \`${i}\``})}
      if (err == "Error: Bad Gateway") {errChannel.send(`Erreur-chat: Bad Gateway`)}
      else {return Merr.edit({content:`Erreur-chat: ${err}`})}}); 
      var objErr= JSON.stringify(Messageclan);
      var i = 2
      while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
        var Messageclan = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/chat`)
      .set( 'Authorization', process.env.WOV_TOKEN)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .catch((err) => { if (err == "Error: Too Many Requests") {Merr.edit({content:`Erreur, tentatives: \`${i}\``})}
      else {return Merr.edit({content:`Erreur-chat: ${err}`})}});
      var objErr= JSON.stringify(Messageclan)} 
      
      var InfoLastest = JSON.parse(readFileSync(`././Information/Date/Mauto.json`, 'utf-8'))
      var AncienMessage = InfoLastest.date
        var n = 0; 

        while (Messageclan.body[n].date !== AncienMessage && n !== 29){var n = n+1;};
        var n =n-1
      while(n !== -1 ){ 
        var objbodyM = Messageclan.body[n];var n = n-1

        var  HlastOnline = objbodyM.date.slice(11, 13)-1+2

            var annéeLO =  objbodyM.date.slice(0, 4); var moisLO = objbodyM.date.slice(5, 7); var jourLO= objbodyM.date.slice(8, 10);

            if (HlastOnline == 24) {var HlastOnline = "00"; var jourLO = jourLO-1+2
            if (moisLO == 1 && jourLO == 32) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 2 && jourLO == 29) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 3 && jourLO == 32) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 4 && jourLO == 31) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 5 && jourLO == 32) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 6 && jourLO == 31) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 7 && jourLO == 32) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 8 && jourLO == 32) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 9 && jourLO == 31) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 10 && jourLO == 32) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 11 && jourLO == 31) {moisLO = moisLO-1+2; jourLO = "01"};
            if (moisLO == 12 && jourLO == 32) {moisLO = "01"; jourLO = "01"; var annéeLO = annéeLO-1+2};
           };

            var DlastOnline = `${jourLO}/${moisLO}/${annéeLO}`; 
            try {var PlayerId = objbodyM.playerId}catch(err) {}

            if (PlayerId != undefined) {
            var  usernameb  = await superagent.get(`https://api.wolvesville.com/players/${PlayerId}`)
            .set( 'Authorization', process.env.WOV_TOKEN)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .catch((err) => { if (err == "Error: Too Many Requests") {Merr.edit({content:`Erreur, tentatives: \`${i}\``})}
            else {return Merr.edit({content:`Erreur: ${err}`})}}); 
            var pseudoErr = JSON.stringify(usernameb);
    
            if (pseudoErr !== undefined) {var pseudobody = usernameb.body}
            var i = 2
            while (pseudoErr == undefined) { await new Promise(resolve => setTimeout(resolve, 1000))
                var  usernameb  = await superagent.get(`https://api.wolvesville.com/players/${PlayerId}`)
            .set( 'Authorization', process.env.WOV_TOKEN)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .catch((err) => { if (err == "Error: Too Many Requests") {Merr.edit({content:`Erreur, tentatives: \`${i}\``})}
            else {return Merr.edit({content:`Erreur: ${err}`})}});
            var pseudoErr = JSON.stringify(usernameb);
            var pseudo = usernameb.text; var pseudobody = usernameb.body}
          } try {var BOT = objbodyM.playerBotOwnerUsername}catch(err) {}

            const embed = new MessageEmbed();
          
            if (objbodyM.isSystem == true) {
              if (objbodyM.msg == `join&username=${pseudobody.username}`) {mautoChannel.send(`${pseudobody.username} vient de rejoindre le clan`)
              await superagent.post(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/chat`)
        .send({message: `${pseudobody.username} se joint à la fête 🥳, mais à oublié de ramener le gâteau !`})
        .set( 'Authorization', process.env.WOV_TOKEN)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .catch((err) => {return errChannel.send(err)}); 
              }else { mautoChannel.send(`${pseudobody.username} vient de quitter le clan`)}
            }
            else if (BOT != undefined) {
              embed.setAuthor({name: 'Chat WOV'})
              embed.setColor('WHITE')
              embed.setFields({name: `\`BOT\``, value: `-${objbodyM.msg}`}, {name: "fais le", value: `${DlastOnline} à ${HlastOnline}h${objbodyM.date.slice(14,16)}`})
              embed.setThumbnail(client.user.displayAvatarURL())
              embed.setTimestamp();
            }
            else if (objbodyM.msg != undefined) {
              if (objbodyM.msg == "Happy birthday Wolvesville" || objbodyM.msg == "Joyeux anniversaire Wolvesville") {
                await superagent.post(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/chat`)
              .send({message: `Wolvesville fête ses 8 ans 💖`})
              .set( 'Authorization', process.env.WOV_TOKEN)
              .set('Content-Type', 'application/json')
              .set('Accept', 'application/json')
              .catch((err) => {return errChannel.send(`Erreur-send: ${err}`)}); 
              }
              embed.setAuthor({name: 'Chat WOV'})
              embed.setColor('#77b5fe')
              embed.addFields({name: `Pseudo: \`${pseudobody.username}\``, value: objbodyM.msg}, {name: "fais le", value: `${DlastOnline} à ${HlastOnline}h${objbodyM.date.slice(14,16)}`})
              embed.setThumbnail(pseudobody.equippedAvatar.url)
              embed.setTimestamp();
            }
            else if (objbodyM.emojiId != undefined) {
              const Minfo = await errChannel.send(`Requête en cours`)
              const Merr = await errChannel.send(`- - - - -`)
              const  emojis  = await superagent.get(`https://api.wolvesville.com/items/emojis`)
              .set( 'Authorization', process.env.WOV_TOKEN)
              .set('Content-Type', 'application/json')
              .set('Accept', 'application/json')
              .catch((err) => { if (err == "Error: Too Many Requests") {Merr.edit({content:`Erreur, tentatives: \`${i}\``})}
              else {return Merr.edit({content:`Erreur: ${err}`})}}); 
              var emojisErr = JSON.stringify(emojis);
              var i = 2
              while (emojisErr == undefined) {
                  const  emojis  = await superagent.get(`https://api.wolvesville.com/items/emojis`)
              .set( 'Authorization', process.env.WOV_TOKEN)
              .set('Content-Type', 'application/json')
              .set('Accept', 'application/json')
              .catch((err) => { if (err == "Error: Too Many Requests") {Merr.edit({content:`Erreur, tentatives: \`${i}\``})}
              else {return Merr.edit({content:`Erreur: ${err}`})}});
              var emojisErr = JSON.stringify(emojis)} 
                Merr.delete(); Minfo.delete();
    
                var emojisC = 0;
                while (emojis.body[emojisC].id !== objbodyM.emojiId) {var emojisC = emojisC +1}
                var msg = emojis.body[emojisC].urlPreview

                embed.setAuthor({name: 'Chat WOV'})
                embed.setColor('#FFFF00')
                embed.addFields({name: `Pseudo: \`${pseudobody.username}\``, value: emojis.body[emojisC].name}, {name: "fais le", value: `${DlastOnline} à ${HlastOnline}h${objbodyM.date.slice(14,16)}`})
                embed.setImage(msg)
                embed.setThumbnail(pseudobody.equippedAvatar.url)
                embed.setTimestamp();
            }
            else {console.log(objbodyM); logChannel.send(`Log: nouvelle action pas pris en charge: ${objbodyM}`)}

            mautoChannel.send({ embeds: [embed]})
          }
          const infoM = {
            date: Messageclan.body[0].date
          }
          const objectToJsonM = JSON.stringify(infoM)
          writeFileSync(`././Information/Date/Mauto.json`, objectToJsonM)
          // DON - - - - - - - - - - - - - - - - - - 
          await new Promise(resolve => setTimeout(resolve, 1000));

          var Dons = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/ledger`)
          .set( 'Authorization', process.env.WOV_TOKEN)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .catch((err) => {
            if (err == "Error: Too Many Requests") {Merr.edit({content:"Erreur a la 1ère requête\n\`2ème tentatives en cours...\`"})}
            if (err == "Error: Bad Gateway") {errChannel.send(`Erreur-don: Bad Gateway`)}
            else {return Merr.edit({content:`Erreur-don: ${err}`})}});
           var objErr= JSON.stringify(Dons);
           var i = 2
           while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
             var Dons = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/ledger`)
           .set( 'Authorization', process.env.WOV_TOKEN)
           .set('Content-Type', 'application/json')
           .set('Accept', 'application/json')
           .catch((err) =>  {
             if (err == "Error: Too Many Requests") {Merr.edit({content:`Erreur, tentatives: \`${i}\``})}
           else {return Merr.edit({content:`Erreur-don: ${err}`})}});
           var objErr= JSON.stringify(Dons); var i = i+1} 
  
            const heure = dayjs().format("HH:mm")
  
          const embed = new MessageEmbed()
          .setTitle(`Liste des dons reçu:`)
          .setTimestamp();
  
          var InfoLastest = JSON.parse(readFileSync(`././Information/Date/Don.json`, 'utf-8'))
          var AncienMessage = InfoLastest.date;
            var n = 0; var nb = 0
    
            while (Dons.body[n].creationTime !== AncienMessage && n !== 99){var n = n+1;};
            var n =n-1
            var i = 0
          while( n !== -1 ){var i = i +1
            var objbody = Dons.body[n];var n = n-1
  
            if (objbody.type == "DONATE") {
            if (objbody.gold > 0) {
              embed.addFields({name:'- - - - - - - - - - - - - - - - - - - - - - - - - -', value:`Don de ${objbody.playerUsername} de ${objbody.gold} or.`})
              donLogChannel.send(`${objbody.playerUsername} vient de payer ${objbody.gold} feux d'artifices ! 🎆`)
              var orErg = 0
             try{ var orErg = JSON.parse(readFileSync(`././Information/Or/Member-Id/${objbody.playerId}.json`, 'utf-8'))}catch(err) {}
             if (orErg != 0) { var or =orErg.Or -1 +1; var gold = objbody.gold -1 +1
              const info = {
                Pseudo: objbody.playerUsername,
                PlayerId: objbody.playerId,
                DonId: objbody.id,
                Or: or + gold,
                Création: objbody.creationTime,
                Heure: heure
              }; const objectToJson = JSON.stringify(info)
  
              writeFileSync(`././Information/Or/Member-Id/${objbody.playerId}.json`, objectToJson)
              if (orErg.Pseudo != objbody.playerUsername) {
                unlinkSync(`././Information/Or/Member-Pseudo/${orErg.Pseudo}.json`, 'utf-8')
              };
              writeFileSync(`././Information/Or/Member-Pseudo/${objbody.playerUsername}.json`, objectToJson)
            }
            else if (orErg == 0) {
              const info = {
                Pseudo: objbody.playerUsername,
                PlayerId: objbody.playerId,
                DonId: objbody.id,
                Or: objbody.gold,
                Création: objbody.creationTime,
                Heure: heure
              }; const objectToJson = JSON.stringify(info)
    
              writeFileSync(`././Information/Or/Member-Id/${objbody.playerId}.json`, objectToJson)
              writeFileSync(`././Information/Or/Member-Pseudo/${objbody.playerUsername}.json`, objectToJson)
             }
            }
            else if (objbody.gems > 0) {
              embed.addFields({name:'- - - - - - - - - - - - - - - - - - - - - - - - - -', value:`Don de ${objbody.playerUsername} de ${objbody.gems} gemmes.`})
              donLogChannel.send(`${objbody.playerUsername} a fait exploser sa carte bleue 🤑🥳`)
              var gemmeErg = 0
              try{ var gemmeErg = JSON.parse(readFileSync(`././Information/Gemme/Member-Id/${objbody.playerId}.json`, 'utf-8'))}catch(err) {}
             if (gemmeErg != 0) { var gemme =gemmeErg.Gemme -1 +1; var gems = objbody.gems -1 +1
              const info = {
                Pseudo: objbody.playerUsername,
                PlayerId: objbody.playerId,
                DonId: objbody.id,
                Gemme: gemme + gems,
                Création: objbody.creationTime,
                Heure: heure
              }; const objectToJson = JSON.stringify(info)
    
              writeFileSync(`././Information/Gemme/Member-Id/${objbody.playerId}.json`, objectToJson)
              if (gemmeErg.Pseudo != objbody.playerUsername) {
                unlinkSync(`././Information/Gemme/Member-Pseudo/${gemmeErg.Pseudo}.json`, 'utf-8')
              };
              writeFileSync(`././Information/Gemme/Member-Pseudo/${objbody.playerUsername}.json`, objectToJson)
             } 
             else if (gemmeErg == 0) {
              const info = {
                Pseudo: objbody.playerUsername,
                PlayerId: objbody.playerId,
                DonId: objbody.id,
                Gemme: objbody.gems,
                Création: objbody.creationTime,
                Heure: heure
              }; const objectToJson = JSON.stringify(info)
  
              writeFileSync(`././Information/Gemme/Member-Id/${objbody.playerId}.json`, objectToJson)
              writeFileSync(`././Information/Gemme/Member-Pseudo/${objbody.playerUsername}.json`, objectToJson)
             }
              
            }
            else {embed.addFields({name:'- - - - - - - - - - - - - - - - - - - - - - - - - -', value:`Erreur, type de don de contenant aucun don pour: ${objbody.playerUsername}`})}
  
          
       var nb = i+1
      } else if (objbody.type == "CLAN_QUEST") {
        if (objbody.gold != 0) {
        var Infos = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/info`)
          .set( 'Authorization', process.env.WOV_TOKEN)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .catch((err) => {
            if (err == "Error: Too Many Requests") {Merr.edit({content:"Erreur a la 1ère requête\n\`2ème tentatives en cours...\`"})}
            else {return Merr.edit({content:`Erreur: ${err}`})}});
           var objErr= JSON.stringify(Infos);
           var i = 2
           while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
             var Infos = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/info`)
           .set( 'Authorization', process.env.WOV_TOKEN)
           .set('Content-Type', 'application/json')
           .set('Accept', 'application/json')
           .catch((err) =>  {
             if (err == "Error: Too Many Requests") {Merr.edit({content:`Erreur, tentatives: \`${i}\``})}
           else {return Merr.edit({content:`Erreur: ${err}`})}});
           var objErr= JSON.stringify(Infos); var i = i+1}

            var InfoA = JSON.parse(readFileSync('././Information/graphique/data-or.json', 'utf-8'));
            var InfoaT = JSON.stringify(InfoA); var InfoAF = InfoaT.slice(1, -1);
            
      const dateVrai = `${dayjs().add(-1, 'hour').format("DD/MM/YYYY")}`
      errChannel.send(`La valeur ${Infos.body.gold} à été enregistrée pour la semaine du: ${dateVrai}`)
const info = `[${InfoAF},{"or":${Infos.body.gold},"date":"${dateVrai}"}]`;

writeFileSync('././Information/graphique/data-or.json', info)
    let type = "or"; await client.graphAffichage(bureauDcCh, type);
    try {var verifDonL = JSON.parse(readFileSync(`././Information/Quête-lancement/choix-quête.json`, 'utf-8'))}catch(err) {}
    var retraitDonAccepted = verifDonL.retraitDon
    if (retraitDonAccepted) {await client.retraitDonOr(Merr, donLogChannel, errChannel);
      const infoDonLancement = {Lien: verifDonL.Lien, qId: verifDonL.qId, Type: verifDonL.Type, Prix: verifDonL.PrixG, Nom: verifDonL.Nom, authorisation: false, retraitDon: false}; const objectToJsonL = JSON.stringify(infoDonLancement)
      writeFileSync(`././Information/Quête-lancement/choix-quête.json`, objectToJsonL)}
    } else if (objbody.gems != 0) {
      var Infos = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/info`)
       .set( 'Authorization', process.env.WOV_TOKEN)
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .catch((err) => {
         if (err == "Error: Too Many Requests") {Merr.edit({content:"Erreur a la 1ère requête\n\`2ème tentatives en cours...\`"})}
         else {return Merr.edit({content:`Erreur: ${err}`})}});
        var objErr= JSON.stringify(Infos);
        var i = 2
        while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
          var Infos = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/info`)
        .set( 'Authorization', process.env.WOV_TOKEN)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .catch((err) =>  {
          if (err == "Error: Too Many Requests") {Merr.edit({content:`Erreur, tentatives: \`${i}\``})}
        else {return Merr.edit({content:`Erreur: ${err}`})}});
        var objErr= JSON.stringify(Infos); var i = i+1}

         var InfoA = JSON.parse(readFileSync('././Information/graphique/data-gems.json', 'utf-8'));
         var InfoaT = JSON.stringify(InfoA); var InfoAF = InfoaT.slice(1, -1);

      const dateVrai = `${dayjs().add(-1, 'hour').format("DD/MM/YYYY")}`
   errChannel.send(`La valeur ${Infos.body.gems} à été enregistrée pour la semaine du: ${dateVrai}`)
const info = `[${InfoAF},{"gems":${Infos.body.gems},"date":"${dateVrai}"}]`;

writeFileSync('././Information/graphique/data-gems.json', info)
      let type = "gemme"; await client.graphAffichage(bureauDcCh, type);
      try {var verifDonL = JSON.parse(readFileSync(`././Information/Quête-lancement/choix-quête.json`, 'utf-8'))}catch(err) {}
    var retraitDonAccepted = verifDonL.retraitDon
    if (retraitDonAccepted) {await client.retraitDonGems(Merr, donLogChannel, errChannel)
      const infoDonLancement = {Lien: verifDonL.Lien, qId: verifDonL.qId, Type: verifDonL.Type, Prix: verifDonL.PrixG, Nom: verifDonL.Nom, authorisation: false, retraitDon: false}; const objectToJsonL = JSON.stringify(infoDonLancement)
      writeFileSync(`././Information/Quête-lancement/choix-quête.json`, objectToJsonL)}
    }
    const infoD = {date: Dons.body[0].creationTime}; const objectToJsonD = JSON.stringify(infoD)
    writeFileSync(`././Information/Date/Don.json`, objectToJsonD)
  }
      }
  if (nb != 0) { var nb = nb -2 +1;
    const infoD = {date: Dons.body[0].creationTime}; const objectToJsonD = JSON.stringify(infoD)
      writeFileSync(`././Information/Date/Don.json`, objectToJsonD)
       
      var  HlastOnline = Dons.body[0].creationTime.slice(11, 13)-1+2
  
              var annéeLO =  Dons.body[0].creationTime.slice(0, 4); var moisLO = Dons.body[0].creationTime.slice(5, 7); var jourLO= Dons.body[0].creationTime.slice(8, 10);
  
              if (HlastOnline == 24) {var HlastOnline = "00"; var jourLO = jourLO-1+2
              if (moisLO == 1 && jourLO == 32) {moisLO = moisLO-1+2; jourLO = "01"};
              if (moisLO == 2 && jourLO == 29) {moisLO = moisLO-1+2; jourLO = "01"};
              if (moisLO == 3 && jourLO == 32) {moisLO = moisLO-1+2; jourLO = "01"};
              if (moisLO == 4 && jourLO == 31) {moisLO = moisLO-1+2; jourLO = "01"};
              if (moisLO == 5 && jourLO == 32) {moisLO = moisLO-1+2; jourLO = "01"};
              if (moisLO == 6 && jourLO == 31) {moisLO = moisLO-1+2; jourLO = "01"};
              if (moisLO == 7 && jourLO == 32) {moisLO = moisLO-1+2; jourLO = "01"};
              if (moisLO == 8 && jourLO == 32) {moisLO = moisLO-1+2; jourLO = "01"};
              if (moisLO == 9 && jourLO == 31) {moisLO = moisLO-1+2; jourLO = "01"};
              if (moisLO == 10 && jourLO == 32) {moisLO = moisLO-1+2; jourLO = "01"};
              if (moisLO == 11 && jourLO == 31) {moisLO = moisLO-1+2; jourLO = "01"};
              if (moisLO == 12 && jourLO == 32) {moisLO = "01"; jourLO = "01"; var annéeLO = annéeLO-1+2};
             };
            
              var DlastOnline = `${jourLO}/${moisLO}/${annéeLO}`
  
     if (nb > 1) {embed.addFields({name: '- - - - - - - - - - - - - - - - - - - - - - - - - -', value:`Update des dons de ${nb} membres`})}
     else {embed.addFields({name: '- - - - - - - - - - - - - - - - - - - - - - - - - -', value:`Update du don de ${nb} membre`})}
     donLogChannel.send({embeds: [embed]})};  
     await new Promise(resolve => setTimeout(resolve, 1000));
     
            const verifHEURE = dayjs().format("HH:mm")
     // VERIF VOTE - - - - - - - - - - - - - - - - - -
     if (verifHEURE == "14:01") {var verifStatut = true}
      if (verifHEURE == "22:54" && verifStatut) {await client.verifVote(client, bureauDcCh, infoQueteCh, voteQueteCh, verifHEURE); var verifStatut = false}

    // QUETE AFFICHAGE - - - - - - - - - - - - - - - - - -
    if (verifHEURE == "05:02") {var queteStatut = true}
     if (queteStatut) {
     if (verifHEURE == "22:53") {
      await client.afficheQuete(Merr, voteQueteCh)
        var queteStatut = false}}
     
     // QUETE LANCEMENT - - - - - - - - - - - - - - - - - -
     if (verifHEURE == "20:51" || verifHEURE == "20:01" || verifHEURE == "22:56") {var queteLancement = true}
      if (queteLancement) {
     try {var verifLancement = JSON.parse(readFileSync(`././Information/Quête-lancement/choix-quête.json`, 'utf-8')); var verifLautho = verifLancement.authorisation}catch(err) {}
     if (verifLautho == true) { var attachement = new MessageAttachment(verifLancement.Lien);
     if (verifHEURE == "20:00") {
      bureauDcCh.send({content: `Lancement de la quête dans 1 heure`, files: [attachement]}); var queteLancement = false}
     else if (verifHEURE == "20:50") {
      bureauDcCh.send({content: `Lancement de la quête dans 10 min`, files: [attachement]}); var queteLancement = false}
     else if (verifHEURE == "22:56") {const Idquests = verifLancement.qId; console.log("lq")
      await client.queteLancement(client, Merr, Idquests, bureauDcCh); var queteLancement = false}}}
     
    // QUETE INFO - - - - - - - - - - - - - - - - - -
    if (verifHEURE == "19:01") {var queteInfo = true}
     if (queteInfo && verifHEURE == "22:55") {await client.queteInfo(bureauDcCh, infoQueteCh, Merr).then(()=> {}).catch(()=> {}); var queteInfo = false}
    

    }
  }

  module.exports = { log }
