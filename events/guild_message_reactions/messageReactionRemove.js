const { MessageEmbed } = require("discord.js");
const superagent = require('superagent').agent();
const dotenv = require('dotenv'); dotenv.config();
const { writeFileSync, readFileSync } = require('fs')

module.exports = {
    name: "messageReactionRemove",
    once: false,
    async execute(client, messageReaction, user) {
        const message = messageReaction.message;
        const emojiName = messageReaction.emoji.name;
        const member = message.guild.members.cache.get(user.id)
        if (member !== undefined) {var name = member.displayName; const nameId = member.id;}
        else if (member == undefined) {var name = user.id}

        if(member.user.bot) return;

        if (messageReaction.partial) {
            try {
            await messageReaction.fetch();
        }catch (err) {console.log ('impossible de récupérer les messages')
        return}
    }

    if (emojiName === '👍🏽' && message.channel.id == '724241714373722163' ) {
        var nb = 0; var lien = 0;
        while (message.embeds[0].image.url != lien && lien != undefined) { var nb = nb +1
               try {var InfoA = JSON.parse(readFileSync(`././Information/Quête-auto/Quête-${nb}.json`, 'utf-8'))}catch(err) {}; 
               if (InfoA != undefined) {var lien = InfoA.Lien;}
               };
               if (InfoA != undefined && message.id == InfoA.mId) {console.log(nb)
                if (InfoA.Type == "gemme" && InfoA.Actu) {
                    var NbP = message.reactions.cache.get('👍🏽').count; var NbP = NbP -1
                    if (NbP > 0) {
                    var price = (350+ 135*NbP)/(NbP); console.log(price)
                    var price = Math.ceil(price); console.log(price); var price = `Oui 👍🏽 Non 👎🏽\nPrix actuel de la quête __par participant__: \`${price}\` gemmes`} else {var price = "Oui 👍🏽 Non 👎🏽"}
                    const embedInfo = new MessageEmbed()
                    .setTitle(message.embeds[0].title)
                    .setDescription(price)
                    .setColor(message.embeds[0].color)
                    .setImage(message.embeds[0].image.url)
                    message.edit({embeds: [embedInfo]})}
               }
        }

        const regleChannel = client.channels.cache.get('817787093182054430');
        //1054738041383694397 laîques
        //776035119151841283 rôle
        //724298399376998440 règle
        if (emojiName === '✅') {
            if (message.channel.id == '724216612206542889'){
                if (message.id == '1054738041383694397') {regleChannel.send(`${name} a enlevé son accord pour les règles concernant la laïcité.`)}
                else if (message.id == '776035119151841283') {regleChannel.send(`${name} a enlevé son accord pour les règles des rôles.`)}
                else if (message.id == '724298399376998440') {regleChannel.send(`${name} a enlevé son accord pour les règles d'usage`)}}};
    
   }}