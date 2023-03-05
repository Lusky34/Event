const superagent = require('superagent').agent();
const { MessageEmbed, MessageAttachment, Formatters, MessageActionRow, MessageButton } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const {writeFileSync, readFileSync, unlinkSync, readdirSync, existsSync, rmdirSync, mkdirSync} = require ("fs");
const dayjs = require ('dayjs');
const { CanvasRenderService } = require('chartjs-node-canvas')

module.exports = client => {
    client.verifVote = async (client, bureauDcCh, infoQueteCh, voteQueteCh, verifHEURE) => {
           var nameFile = readdirSync(`././Information/Quête-auto`, 'utf-8')
           const ChannelVote = client.channels.cache.get('1082048910123618486')
   
           if (1 <= nameFile.length){
             var InfoA = JSON.parse(readFileSync(`././Information/Quête-auto/${nameFile[0]}`, 'utf-8'));
             const MessA = await ChannelVote.messages.fetch(InfoA.mId)
            var PA = MessA.reactions.cache.get('👍🏽').count; var NA = MessA.reactions.cache.get('👎🏽').count; console.log(PA, NA)}
     
             if (2 <= nameFile.length){
             var InfoB = JSON.parse(readFileSync(`././Information/Quête-auto/${nameFile[1]}`, 'utf-8'))
             const MessB = await ChannelVote.messages.fetch(InfoB.mId)
             var PB = MessB.reactions.cache.get('👍🏽').count; var NB = MessB.reactions.cache.get('👎🏽').count; console.log(PB, NB)}
     
             if (3 <= nameFile.length){
             var InfoC = JSON.parse(readFileSync(`././Information/Quête-auto/${nameFile[2]}`, 'utf-8'))
             const MessC = await ChannelVote.messages.fetch(InfoC.mId)
             var PC = MessC.reactions.cache.get('👍🏽').count; var NC = MessC.reactions.cache.get('👎🏽').count; console.log(PC, NC)}
     
             if (4 <= nameFile.length){
             var InfoD = JSON.parse(readFileSync(`././Information/Quête-auto/${nameFile[3]}`, 'utf-8'))
             const MessD = await ChannelVote.messages.fetch(InfoD.mId)
             var PD = MessD.reactions.cache.get('👍🏽').count; var ND = MessD.reactions.cache.get('👎🏽').count; console.log(PD, ND)}
     
             if (5 <= nameFile.length){
             var InfoE = JSON.parse(readFileSync(`././Information/Quête-auto/${nameFile[4]}`, 'utf-8'))
             const MessE = await ChannelVote.messages.fetch(InfoE.mId)
             var PE = MessE.reactions.cache.get('👍🏽').count; var NE = MessE.reactions.cache.get('👎🏽').count; console.log(PE, NE)}
     
             if (6 <= nameFile.length){
             var InfoF = JSON.parse(readFileSync(`././Information/Quête-auto/${nameFile[5]}`, 'utf-8'))
             const MessF = await ChannelVote.messages.fetch(InfoF.mId)
             var PF = MessF.reactions.cache.get('👍🏽').count; var NF = MessF.reactions.cache.get('👎🏽').count; console.log(PF, NF)}
              
           var msg = ""
           for (let i=1; i <= nameFile.length; i++) {
               if (i == 1) {var quete = 0; var win = PA; var loose = NA};
               if (i == 2) {if (win < PB) {var quete = 1; var win = PB; var loose = NB} else if (win == PB) {if (loose > NB) {var quete = 1; var win = PB; var loose = NB} else if (loose == NB) {var equal = true; var msg = msg + " la quête 2"}}};
               if (i == 3) {if (win < PC) {var quete = 2; var win = PC; var loose = NC; var equal = false} else if (win == PC) {if (loose > NC) {var quete = 2; var win = PC; var loose = NC; var equal = false} else if (loose == NC) {var equal = true; var msg = msg + " la quête 3"}}};
               if (i == 4) {if (win < PD) {var quete = 3; var win = PD; var loose = ND; var equal = false} else if (win == PD) {if (loose > ND) {var quete = 3; var win = PD; var loose = ND; var equal = false} else if (loose == ND) {var equal = true; var msg = msg + " la quête 4"}}};
               if (i == 5) {if (win < PE) {var quete = 4; var win = PE; var loose = NE; var equal = false} else if (win == PE) {if (loose > NE) {var quete = 4; var win = PE; var loose = NE; var equal = false} else if (loose == NE) {var equal = true; var msg = msg + " la quête 5"}}};
               if (i == 6) {if (win < PF) {var quete = 5; var win = PF; var loose = NF; var equal = false} else if (win == PF) {if (loose > NF) {var quete = 5; var win = PF; var loose = NF; var equal = false} else if (loose == NF) {var equal = true; var msg = msg + " la quête 6"}}};
           }
   try {var final = JSON.parse(readFileSync(`././Information/Quête-auto/${nameFile[quete]}`, 'utf-8'))}catch (err) {}
   if (!equal) {var prixG = 0
     var attachement = new MessageAttachment(final.Lien);
     var InfoButon = final
        const buttons = new MessageActionRow()
       .addComponents(
         new MessageButton()
            .setLabel('Lien vers la quête votée')
            .setURL(`https://discord.com/channels/559352487430193180/1082048910123618486/${InfoButon.mId}`)
            .setStyle('LINK'))

     if (final.Type == "or") {var typeQuete = "500 or"} else {
      var MessVote = await voteQueteCh.messages.fetch(final.mId); var NbVote = MessVote.reactions.cache.get('👍🏽').count; 
      var nbParti = NbVote-2+1
      var prixG = Math.ceil((350 + (135 * nbParti))/(nbParti)); var typeQuete = `__${prixG} gemme__`}
      infoQueteCh.send({content:`⚠️ Ce soir on lance le ${final.Nom} à 21h, si vous voulez participer il faut donner \`${typeQuete}\` + mettre la réaction 👍 sur le \`${final.Nom}\` (et non sur ce message), si vous participez vous vous engagez à faire les \`3k xp demandé\` (faites attention des sanctions peuvent tomber si ce n'est pas respecté) ||<@&806912965496143882>||\nVisualisation de la quête votée:`, files: [attachement], components: [buttons]});
      bureauDcCh.send('<@385172057433964556> <@429929784701878282> veuillez autoriser le lancement de la quête avec ?qautorisation')
   const infoLancement = {Lien: final.Lien, qId: final.qId, Type: final.Type, Prix: prixG, Nom: final.Nom, authorisation: false, retraitDon: false, mId: final.mId}; const objectToJsonL = JSON.stringify(infoLancement)
   writeFileSync(`././Information/Quête-lancement/choix-quête.json`, objectToJsonL)} else {bureauDcCh.send(`<@385172057433964556> <@429929784701878282> une équalité est présente avec la quête ${quete -1 +2} ${msg}.`)}
    
      if (!equal) {

        var Dossier = readdirSync(`././Information/Quête-auto`, 'utf-8'); var nb = 0; var i = 0
        while(Dossier[nb] != undefined){
          var name = Dossier[nb]; var nb = nb+1;console.log(nb, quete); console.log(nameFile[quete])
          if (nb == quete+1) {var nb = nb+1}
        try {var InfoA = JSON.parse(readFileSync(`././Information/Quête-auto/${name}`, 'utf-8'))}catch(err) {};
        if (InfoA.Type == "gemme") {var i = i +1
            const info = { Lien: InfoA.Lien, Nom: InfoA.Nom, Type: InfoA.Type, Vote: true, VoteElu: true, Actu: false, qId: InfoA.qId, mId: InfoA.mId }; 
            const objectToJson = JSON.stringify(info)
            try{writeFileSync(`././Information/Quête-auto/Quête-${nb}.json`, objectToJson)}catch(err) {bureauDcCh.send(`Erreur: ${err}`); console.log(err)}}
          else if (InfoA.Type == "or") {
            const info = { Lien: InfoA.Lien, Nom: InfoA.Nom, Type: InfoA.Type, Vote: true, VoteElu: true, qId: InfoA.qId, mId: InfoA.mId }; 
            const objectToJson = JSON.stringify(info)
            try{writeFileSync(`././Information/Quête-auto/Quête-${nb}.json`, objectToJson)}catch(err) {bureauDcCh.send(`Erreur: ${err}`); console.log(err)}}
          }
            bureauDcCh.send(`Blocage effectué sur ${i} quête(s) gemme(s)`)
      }
    };

    client.afficheQuete = async (Merr, voteQueteCh) => {
      const ChannelVote = "1082048910123618486"

        if (voteQueteCh == ChannelVote) {
         try {
            var Lister = readdirSync(`././Information/Quête-auto`, 'utf-8')} catch (err) {return console.log(err);}
            var i = 0
            while(Lister[i] != undefined)  {
              var ListeO = Lister[i]; var i = i+1
              try {
                  unlinkSync(`././Information/Quête-auto/${ListeO}`, 'utf-8')}catch (err) {console.log(err)}}}

        var Questsavailable = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/quests/available`)
      .set( 'Authorization', process.env.WOV_TOKEN)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .catch((err) => {
       if (err == "Error: Too Many Requests") {Merr.edit({content:"Erreur a la 1ère requête\n\`2ème tentatives en cours...\`"})}
       else {return Merr.edit({content:`Erreur: ${err}`})}});
      var objErr= JSON.stringify(Questsavailable);
      
      if (objErr !== undefined) {var Clan = Questsavailable.body;}
      var i = 2
      while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
        var Questsavailable = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/quests/available`)
      .set( 'Authorization', process.env.WOV_TOKEN)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .catch((err) =>  {
        if (err == "Error: Too Many Requests") {Merr.edit({content:`Erreur, tentatives: \`${i}\``})}
      else {return Merr.edit({content:`Erreur: ${err}`})}});
      var objErr= JSON.stringify(Questsavailable);
       try {var Clan = await Questsavailable.body;}catch(err) {}; var i = i+1}
         var orVar = 1; var gemmeVar = 1; var n= 0

        while (Questsavailable.body[n] != undefined) {
            var text = Questsavailable.body[n]; var n =n +1

        if (text.purchasableWithGems == false) { 
        const embed1 = new MessageEmbed()
       .setTitle(`Skin or ${orVar}`)
       .setColor('#FFA500')
       .setDescription("Oui 👍🏽 Non 👎🏽")
       .setImage(text.promoImageUrl)
       .setTimestamp()
    const poll1 = await voteQueteCh.send({ embeds : [embed1], fetchReply: true});
     poll1.react('👍🏽');
     poll1.react('👎🏽');
     const info = {
      Lien: text.promoImageUrl,
      Nom: `Skin or ${orVar}`,
      Type: "or",
      Vote: true,
      VoteElu: false,
      qId: text.id,
      mId: poll1.id
    }; const objectToJson = JSON.stringify(info)

    if (voteQueteCh == ChannelVote) {writeFileSync(`././Information/Quête-auto/Quête-${n}.json`, objectToJson); console.log('oupsi')}
    var orVar = orVar+1}

     if (text.purchasableWithGems == true) { 
      const embed2 = new MessageEmbed()
     .setTitle(`Skin gemme ${gemmeVar}`)
     .setColor('#FF69B4')
     .setDescription("Oui 👍🏽 Non 👎🏽")
     .setImage(text.promoImageUrl)
     .setTimestamp()
  const poll2 = await voteQueteCh.send({ embeds : [embed2], fetchReply: true});
   poll2.react('👍🏽');
   poll2.react('👎🏽');
   const info = {
    Lien: text.promoImageUrl,
    Nom: `Skin gemme ${gemmeVar}`,
    Type: "gemme",
    Vote: true,
    VoteElu: false,
    Actu: true,
    qId: text.id,
    mId: poll2.id
  }; const objectToJson = JSON.stringify(info)

  if (voteQueteCh == ChannelVote) {writeFileSync(`././Information/Quête-auto/Quête-${n}.json`, objectToJson); console.log('oupsi')}
  var gemmeVar = gemmeVar+1
}
       }
       const embed3 = new MessageEmbed()
        .setTitle("Avez-vous déjà payé les 500 or pour la quête ? (Si quête or)")
        .setColor('WHITE')
        .setDescription("Oui ✅ Non ❌")
        .setTimestamp()
     const poll3 = await voteQueteCh.send({ embeds : [embed3], fetchReply: true});
      poll3.react('✅');
      poll3.react('❌');

      var jour = `${dayjs().add(-1, 'hour').format("ddd")}`; var j = 0
      while (jour != "Tue") { var j = j +1
             var jour = `${dayjs().add(-1, 'hour').add(+j, 'day').format("ddd")}`;
      };
      var date = `${dayjs().add(-1, 'hour').add(+j, 'day').format("YYYY-MM-DD")}`
      
         const realativeTempsF = Formatters.time(dayjs(`${date}T14:00`).unix(), Formatters.TimestampStyles.RelativeTime)
         const TempsF = Formatters.time(dayjs(`${date}T14:00`).unix(), Formatters.TimestampStyles.ShortDateTime);
        voteQueteCh.send(`Coucou <@&806912965496143882> voilà pour vous !\nFin des votes le ${TempsF} (${realativeTempsF})`)
    }

    client.queteLancement = async (client, Merr, Idquests, bureauDcCh) => {
      const QuêteChannel =  client.channels.cache.get('1082048930935754922')
      var  QuestsClaim = await superagent.post(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/quests/claim`)
            .send({questId: Idquests})
            .set( 'Authorization', process.env.WOV_TOKEN)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .then(()=> QuêteChannel.send(`Quête lancée ! <:panda_youpi:724242729046900756>`))
            .catch((err) => { if (err == "Error: Too Many Requests") {bureauDcCh.send({content:`Erreur, veuillez lancer la quête manuellement! <@&724503764828160000>`})}
            if (err == "Error: Bad Request") {Merr.edit({content:`Erreur, les fonds du clan sont insuffisant!`})}
            else {return Merr.edit({content:`Erreur: ${err}`})}});

            var Dossier = readdirSync(`././Information/Quête-auto`, 'utf-8'); var nb = 0; var i = 0
            while(Dossier[nb] != undefined){
              var name = Dossier[nb]; var nb = nb+1
            try {var InfoA = JSON.parse(readFileSync(`././Information/Quête-auto/${name}`, 'utf-8'))}catch(err) {};
            if (InfoA.Type == "gemme") {var i = i +1
                const info = { Lien: InfoA.Lien, Nom: InfoA.Nom, Type: InfoA.Type, Vote: false, VoteElu: true, Actu: false, qId: InfoA.qId, mId: InfoA.mId }; 
                const objectToJson = JSON.stringify(info)
                try{writeFileSync(`././Information/Quête-auto/Quête-${nb}.json`, objectToJson)}catch(err) {Merr.edit(`Erreur: ${err}`); console.log(err)}}
              else if (InfoA.Type == "or") {
                const info = { Lien: InfoA.Lien, Nom: InfoA.Nom, Type: InfoA.Type, Vote: false, VoteElu: true, qId: InfoA.qId, mId: InfoA.mId }; 
                const objectToJson = JSON.stringify(info)
                try{writeFileSync(`././Information/Quête-auto/Quête-${nb}.json`, objectToJson)}catch(err) {Merr.edit(`Erreur: ${err}`); console.log(err)}}
              }
    }

    client.queteInfo = async (bureauDcCh, infoQueteCh, Merr) => {
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

        var msg = "Listes des participants:"; var msg2 = "";var k =0; var h = 0

        while(Username.body[k] !== undefined) {
        var User = await Username.body[k]; var nom = User.username;
        if (User.participateInClanQuests == true && User.status == "ACCEPTED") {var h =h+1
           const antiSlash = nom.match('_'); 
            if (antiSlash != null) {var sliceD = nom.slice(0, antiSlash.index); var sliceF = nom.slice(antiSlash.index)
                var nom = sliceD + "\\" +sliceF}
            var msga = `\n-${nom}`
            if (msg.length < 1900) {var msg = msg + msga} else {var msg2 = msg2 + msga}
            var n = n+1;}var k = k+1}; var msg2 = msg2 + `\nNombre de participants: ${h}`
      
      const Idchg = await infoQueteCh.send(msg); const Idchg2 = await infoQueteCh.send(msg2)
      infoQueteCh.send("On va lancer la quête dans 2h00, si il y a un problème ou que vous avez des questions n'hésitez pas à mp <@385172057433964556> ou <@429929784701878282> <:moiavoirpouvoir:724658025536684153> \n|| <@&806912965496143882> ||");
      const infoAffichage = {Id1: Idchg.id, Id2: Idchg2.id, NbPart: h}; const objectToAffichage = JSON.stringify(infoAffichage)
        writeFileSync(`././Information/LancementQuests/info.json`, objectToAffichage)
    }
        
    client.graphAffichage = async (bureauDcCh, type) => {
      if (type == "or")
      {const data = JSON.parse(readFileSync('././Information/graphique/data-or.json'));
const ors = []; const dates = []
for (const item of data) {ors.push(item.or); dates.push(item.date)}
const width = 800; const height = 600; const chartCallback = (chartJS) => {}

       const canvas = new CanvasRenderService(width, height, chartCallback)
        
        const configuration = {type: 'line', data: {labels: dates, datasets: [{label: 'Or clan', data: ors, borderColor: '#FFA500'}]}, options: {legend:{labels:{fontColor:"white"}}, scales: {xAxes: [{display:true, ticks: {fontColor: "white", fontSize:14}, gridLines: {color:"#D3D3D3"}}], yAxes: [{display:true, ticks: {fontColor:"white", fontSize: 14}, gridLines: {color:"#D3D3D3"}}]}}}
        const image = await canvas.renderToBuffer(configuration)

        var attachement = new MessageAttachment(image)}
        else {
          const data = JSON.parse(readFileSync('././Information/graphique/data-gems.json'));
        const gems = []; const dates = []
        for (const item of data) {gems.push(item.gems); dates.push(item.date)}
        const width = 800; const height = 600; const chartCallback = (chartJS) => {}
        
               const canvas = new CanvasRenderService(width, height, chartCallback)
                
                const configuration = {type: 'line', data: {labels: dates, datasets: [{label: 'Gems clan', data: gems, borderColor: '#FF69B4'}]}, options: {legend:{labels:{fontColor:"white"}}, scales: {xAxes: [{display:true, ticks: {fontColor: "white", fontSize:14}, gridLines: {color:"#D3D3D3"}}], yAxes: [{display:true, ticks: {fontColor:"white", fontSize: 14}, gridLines: {color:"#D3D3D3"}}]}}}
                const image = await canvas.renderToBuffer(configuration)
        
                var attachement = new MessageAttachment(image)}
        bureauDcCh.send({files: [attachement]})
        
    }

    client.retraitDonOr = async (Merr, donLogChannel, errChannel) => {
        var Questsactive = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/quests/active`)
        .set( 'Authorization', process.env.WOV_TOKEN)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .catch((err) => {
          if (err == "Error: Too Many Requests") {Merr.edit({content:"Erreur a la 1ère requête\n\`2ème tentatives en cours...\`"})}
          else {return Merr.edit({content:`Erreur: ${err}`})}});
         var objErr= JSON.stringify(Questsactive);
         
         if (objErr !== undefined) {}
         var i = 2
         while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
          var Questsactive = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/quests/active`)
         .set( 'Authorization', process.env.WOV_TOKEN)
         .set('Content-Type', 'application/json')
         .set('Accept', 'application/json')
         .catch((err) =>  {
           if (err == "Error: Too Many Requests") {Merr.edit({content:`Erreur, tentatives: \`${i}\``})}
         else {return Merr.edit({content:`Erreur: ${err}`})}});
         var objErr= JSON.stringify(Questsactive); var i = i+1}; var ku = 0;

        while (Questsactive.body.participants[ku] != undefined){
            var data = Questsactive.body.participants[ku]; var ku = ku +1;
                try {
                  var ListeMembre = JSON.parse(readFileSync(`././Information/Or/Member-Id/${data.playerId}.json`, 'utf-8'))} catch (err) {errChannel.send(`Erreur de lecture dans le fichier ${data.username} n'existe pas`);}         
                      try { var or = 0; if (ListeMembre.Or > 499) {var or = 500} else {errChannel.send(`${ListeMembre.Pseudo} a seulement ${ListeMembre.Or} en banque`)}
                        const info = {
                            Pseudo: ListeMembre.Pseudo,
                            PlayerId: ListeMembre.PlayerId,
                            DonId: ListeMembre.DonId,
                            Or: ListeMembre.Or-or,
                            Création: ListeMembre.Création,
                            Heure: ListeMembre.Heure
                          }
                          const objectToJson = JSON.stringify(info)
                  
                          writeFileSync(`././Information/Or/Member-Id/${ListeMembre.PlayerId}.json`, objectToJson)
                          writeFileSync(`././Information/Or/Member-Pseudo/${ListeMembre.Pseudo}.json`, objectToJson)
                      }catch (err) {}
              }if (ku > 1) {donLogChannel.send(`Retrait de 500 or pour ${ku} membres`)} else {donLogChannel.send(`Retrait de 500 or pour ${ku} membre`)}
    }

    client.retraitDonGems = async (Merr, donLogChannel, errChannel) => {
      try {var dataGems = JSON.parse(readFileSync(`././Information/Quête-lancement/choix-quête.json`, 'utf-8'))} catch (err) {return errChannel.send(`Ouverture du fichier pr le prix des gemmes: ${err}`)}
      var gemsNb = dataGems.Prix; if (gemsNb <= 149) {return errChannel.send(`Erreur prix définis pour la quête gemme: ${gemsNb}`)}
var Questsactive = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/quests/active`)
.set( 'Authorization', process.env.WOV_TOKEN)
.set('Content-Type', 'application/json')
.set('Accept', 'application/json')
.catch((err) => {
  if (err == "Error: Too Many Requests") {Merr.edit({content:"Erreur a la 1ère requête\n\`2ème tentatives en cours...\`"})}
  else {return Merr.edit({content:`Erreur: ${err}`})}});
 var objErr= JSON.stringify(Questsactive);
 
 if (objErr !== undefined) {}
 var i = 2
 while (objErr == undefined) {await new Promise(resolve => setTimeout(resolve, 1000))
  var Questsactive = await superagent.get(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/quests/active`)
 .set( 'Authorization', process.env.WOV_TOKEN)
 .set('Content-Type', 'application/json')
 .set('Accept', 'application/json')
 .catch((err) =>  {
   if (err == "Error: Too Many Requests") {Merr.edit({content:`Erreur, tentatives: \`${i}\``})}
 else {return Merr.edit({content:`Erreur: ${err}`})}});
 var objErr= JSON.stringify(Questsactive); var i = i+1}; var kg = 0;

while (Questsactive.body.participants[kg] != undefined){
    var data = Questsactive.body.participants[kg]; var kg = kg +1;
        try {
          var ListeMembre = JSON.parse(readFileSync(`././Information/Gemme/Member-Id/${data.playerId}.json`, 'utf-8'))} catch (err) {errChannel.send(`Erreur de lecture dans le fichier ${data.username} n'existe pas`);}
              try { var gemme = 0; if (ListeMembre.Gemme > gemsNb) {var gemme = gemsNb} else {errChannel.send(`${ListeMembre.Pseudo} a seulement ${ListeMembre.Gemme} en banque`)}
                const info = {
                    Pseudo: ListeMembre.Pseudo,
                    PlayerId: ListeMembre.PlayerId,
                    DonId: ListeMembre.DonId,
                    Gemme: ListeMembre.Gemme-gemme,
                    Création: ListeMembre.Création,
                    Heure: ListeMembre.Heure
                  }; const objectToJson = JSON.stringify(info)
                  writeFileSync(`././Information/Gemme/Member-Id/${ListeMembre.PlayerId}.json`, objectToJson)
                  writeFileSync(`././Information/Gemme/Member-Pseudo/${ListeMembre.Pseudo}.json`, objectToJson)
              }catch (err) {}
      }if (kg > 1) {donLogChannel.send(`Retrait de ${gemme} gemme pour ${kg} membres`)} else {donLogChannel.send(`Retrait de ${gemme} gemme pour ${kg} membre`)}
  }
}