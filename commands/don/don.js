const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const {readFileSync, readdirSync} = require ("fs");

module.exports = {
    name: "don",
    category: 'don',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'don <Pseudo> | don <mention> | don <*>', 
    examples: ['don | STAFF: don Datchik | don @Damien#4353 | don *'],
    description: `Donne votre montant en banque (1 min de délais maximun pour l'actualisation des dons)`,
       async run (client, message, args) { 
        var member = message.mentions.members.first();
        if (!message.member.permissions.has('BAN_MEMBERS') || !args[0] && !member) {var nom = message.member.displayName;
          if (nom.slice(0,2) == "🥉" || nom.slice(0,2) == "🥈" || nom.slice(0,2) == "🥇" || nom.slice(0,2) == "🍪") {var nom = nom.slice(2)};
        if (nom.slice(-2) == "🥉" || nom.slice(-2) == "🥈" || nom.slice(-2) == "🥇") {var nom = nom.slice(0,-2)}; console.log(nom)
          var Or = 0
          try {
            var Or = JSON.parse(readFileSync(`././Information/Or/Member-Pseudo/${nom}.json`, 'utf-8'))} catch (err) {}
            var Gemme= 0
            try {
              var Gemme = JSON.parse(readFileSync(`././Information/Gemme/Member-Pseudo/${nom}.json`, 'utf-8'))} catch (err) {}
              
              if (Or == 0 && Gemme == 0) {return message.reply(`${nom} ne possède pas de don dans la base de donnée (assurez-vous d'avoir le même pseudo sur discord ET sur wov (Wolvesville) au carctère près.)`)}
               try {
              if (Or.Or != undefined && Gemme.Gemme != undefined) {var msg = `\n\`${nom}\` possède: \`${Or.Or}\` or et \`${Gemme.Gemme}\` gemme`;}
              else if (Gemme.Gemme != undefined) {var msg = `\n\`${nom}\` possède: \`${Gemme.Gemme}\` gemme`;}
              else if (Or.Or != undefined) {var msg = `\n\`${nom}\` possède: \`${Or.Or}\` or`;}}catch(err) {}
              message.channel.send(msg)
        }else {
        if (args[0] == "*") {
        try {
          var DOr = readdirSync(`././Information/Or/Member-Id`, 'utf-8')} catch (err) {return console.log(err);}
          var Ort = JSON.stringify(DOr); 
      
          const embed = new MessageEmbed()
          .setTitle(`Liste des dons présent`)
          .setTimestamp();
          var n = 0; var msg = `- - - - - - - - - - - - - - - - - - - - - - - - - -`; var msga = 0; var msg2 = " ";
          for(let i=0; i < DOr.length; i++)  {
      
            var Orf = /.json"/g; var OrS = Ort.search(Orf)
            var Ors = Ort.slice(1, OrS+6); var Ort = Ort.slice(OrS+6); 
            var OrO = JSON.parse(Ors); 
            
      
            try {
            var Or = JSON.parse(readFileSync(`././Information/Or/Member-Id/${OrO}`, 'utf-8'))} catch (err) {}
              
            
            try {
              var Gemme = JSON.parse(readFileSync(`././Information/Gemme/Member-Id/${OrO}`, 'utf-8'))} catch (err) {}
      
              
                  try {
              if (Or.Or > 499 && Gemme.Gemme > 0) {var msga = `\n\`${Or.Pseudo}\` possède: \`${Or.Or}\` or et \`${Gemme.Gemme}\` gemme\n- - - - - - - - - - - - - - - - - - - - - - - - - -`; var n = n + 1}
              else if (Gemme.Gemme > 0) {var msga = `\n\`${Gemme.Pseudo}\` possède: \`${Gemme.Gemme}\` gemme\n- - - - - - - - - - - - - - - - - - - - - - - - - -`;var n = n + 1}
              else if (Or.Or > 499 ) {var msga = `\n\`${Or.Pseudo}\` possède: \`${Or.Or}\` or\n- - - - - - - - - - - - - - - - - - - - - - - - - -`;var n = n + 1}
                  }catch (err) {}
            var Or = 0; var Gemme = 0;if (msg.length < 1900) {if (msga !=0) {var msg = msg + msga}} else {if (msga !=0) {var msg2 = msg2 + msga}}; var msga = 0
          }; var msgf = `\n${n} ayant 500 or ou 1 diamant en banque`; var msg2 = msg2 + msgf
          message.channel.send(msg); message.channel.send(msg2)
        }else if (args[0]!= undefined || member != undefined) { 
          if (member != undefined) {var nom = member.displayName} else {var nom = args[0]}
          var Or = 0
          try {
            var Or = JSON.parse(readFileSync(`././Information/Or/Member-Pseudo/${nom}.json`, 'utf-8'))} catch (err) {}
            var Gemme= 0
            try {
              var Gemme = JSON.parse(readFileSync(`././Information/Gemme/Member-Pseudo/${nom}.json`, 'utf-8'))} catch (err) {}
              
              if (Or == 0 && Gemme == 0) {return message.reply(`${nom} ne possède pas de don dans la base de donnée`)}
               try {
              if (Or.Or != undefined && Gemme.Gemme != undefined) {var msg = `\n\`${nom}\` possède: \`${Or.Or}\` or et \`${Gemme.Gemme}\` gemme`;}
              else if (Gemme.Gemme != undefined) {var msg = `\n\`${nom}\` possède: \`${Gemme.Gemme}\` gemme`;}
              else if (Or.Or != undefined) {var msg = `\n\`${nom}\` possède: \`${Or.Or}\` or`;}}catch(err) {}
              message.channel.send(msg)}
        }
        },
        options:[
          {
              name: "pseudo",
              description: "Voir l'or en banque de la personne (utile qu'au staff",
              type: "STRING",
              required: false,
          }
      ],
          async runSlash(client, interaction) { 
            const member = interaction.options.getString('pseudo');
            if (!interaction.member.permissions.has('BAN_MEMBERS')) {var nom = interaction.member.displayName
              var Or = 0
              try {
                var Or = JSON.parse(readFileSync(`././Information/Or/Member-Pseudo/${nom}.json`, 'utf-8'))} catch (err) {}
                var Gemme= 0
                try {
                  var Gemme = JSON.parse(readFileSync(`././Information/Gemme/Member-Pseudo/${nom}.json`, 'utf-8'))} catch (err) {}
                  
                  if (Or == 0 && Gemme == 0) {return interaction.reply(`${nom} ne possède pas de don dans la base de donnée (assurez-vous d'avoir le même pseudo sur discord ET sur wov (Wolvesville) au carctère près.)`)}
                   try {
                  if (Or.Or != undefined && Gemme.Gemme != undefined) {var msg = `\n\`${nom}\` possède: \`${Or.Or}\` or et \`${Gemme.Gemme}\` gemme`;}
                  else if (Gemme.Gemme != undefined) {var msg = `\n\`${nom}\` possède: \`${Gemme.Gemme}\` gemme`;}
                  else if (Or.Or != undefined) {var msg = `\n\`${nom}\` possède: \`${Or.Or}\` or`;}}catch(err) {}
                  interaction.channel.send(msg)
            }else {
            if ( member != undefined) {var nom = member
              var Or = 0
              try {
                var Or = JSON.parse(readFileSync(`././Information/Or/Member-Pseudo/${nom}.json`, 'utf-8'))} catch (err) {}
                var Gemme= 0
                try {
                  var Gemme = JSON.parse(readFileSync(`././Information/Gemme/Member-Pseudo/${nom}.json`, 'utf-8'))} catch (err) {}
                  
                  if (Or == 0 && Gemme == 0) {return interaction.reply(`${nom} ne possède pas de don dans la base de donnée`)}
                   try {
                  if (Or.Or != undefined && Gemme.Gemme != undefined) {var msg = `\n\`${nom}\` possède: \`${Or.Or}\` or et \`${Gemme.Gemme}\` gemme`;}
                  else if (Gemme.Gemme != undefined) {var msg = `\n\`${nom}\` possède: \`${Gemme.Gemme}\` gemme`;}
                  else if (Or.Or != undefined) {var msg = `\n\`${nom}\` possède: \`${Or.Or}\` or`;}}catch(err) {}
                  interaction.reply(msg)
            } else {
            try {
              var DOr = readdirSync(`././Information/Or/Member-Id`, 'utf-8')} catch (err) {return console.log(err);}
              var Ort = JSON.stringify(DOr); 
          
              const embed = new MessageEmbed()
              .setTitle(`Liste des dons présent`)
              .setTimestamp();
              var n = 0; var msg = `- - - - - - - - - - - - - - - - - - - - - - - - - -`; var msga = 0; var msg2 = " ";
              for(let i=0; i < DOr.length; i++)  {
          
                var Orf = /.json"/g; var OrS = Ort.search(Orf)
                var Ors = Ort.slice(1, OrS+6); var Ort = Ort.slice(OrS+6); 
                var OrO = JSON.parse(Ors); 
                
          
                try {
                var Or = JSON.parse(readFileSync(`././Information/Or/Member-Id/${OrO}`, 'utf-8'))} catch (err) {}
                  
                
                try {
                  var Gemme = JSON.parse(readFileSync(`././Information/Gemme/Member-Id/${OrO}`, 'utf-8'))} catch (err) {}
          
                  
                      try {
                  if (Or.Or > 499 && Gemme.Gemme > 0) {var msga = `\n\`${Or.Pseudo}\` possède: \`${Or.Or}\` or et \`${Gemme.Gemme}\` gemme\n- - - - - - - - - - - - - - - - - - - - - - - - - -`; var n = n + 1}
                  else if (Gemme.Gemme > 0) {var msga = `\n\`${Gemme.Pseudo}\` possède: \`${Gemme.Gemme}\` gemme\n- - - - - - - - - - - - - - - - - - - - - - - - - -`;var n = n + 1}
                  else if (Or.Or > 499 ) {var msga = `\n\`${Or.Pseudo}\` possède: \`${Or.Or}\` or\n- - - - - - - - - - - - - - - - - - - - - - - - - -`;var n = n + 1}
                      }catch (err) {}
                var Or = 0; var Gemme = 0;if (msg.length < 1900) {if (msga !=0) {var msg = msg + msga}} else {if (msga !=0) {var msg2 = msg2 + msga}}; var msga = 0
              }; var msgf = `\n${n} ayant 500 or ou 1 diamant en banque`; if (msg.length < 1900) {var msg = msg + msgf} else {var msg2 = msg2 + msgf}
              interaction.reply(msg); interaction.channel.send(msg2)}
            }
        }
      }