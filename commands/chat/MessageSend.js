const superagent = require('superagent').agent();
const dotenv = require('dotenv'); dotenv.config();

module.exports = {
    name: "msend",
    category: 'chat',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'msend [Message]',
    examples: ['msend', 'msend BOUH'],
    description: 'Envoie un message dans le chat du clan (STAFF)',
      run: async(client, message, args) => {
        if (message.member.permissions.has('BAN_MEMBERS') || message.author.id == "277512152087003136") {
        var nom = message.member.displayName;
        if (nom.slice(0,2) == "🥉" || nom.slice(0,2) == "🥈" || nom.slice(0,2) == "🥇" || nom.slice(0,2) == "🍪") {var nom = nom.slice(2)};
        if (nom.slice(-2) == "🥉" || nom.slice(-2) == "🥈" || nom.slice(-2) == "🥇") {var nom = nom.slice(0,-2)}; console.log(nom)
        
        const Messageclan = await superagent.post(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/chat`)
        .send({message: `${nom} :${message.content.substring(6)}`})
        .set( 'Authorization', process.env.WOV_TOKEN)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .catch((err) => {return message.channel.send(err)}); 
        console.log ('Commande MessageSend fait');
        console.log(`${nom} :${message.content.substring(6)}`)
        message.channel.send(`\`${message.content.substring(6)}\` a bien été envoyé.`)} 
        else {message.reply("vous n'avez pas la/les permission(s) requise(s) (\`BAN_MEMBERS\`) pour taper cette commande!")}
        
  },
  options:[
    {
        name: "message",
        description: "taper votre message a envoyer",
        type: "STRING",
        required: true,
    },
],

  runSlash: async(client, interaction) => {
    const nom = interaction.member.displayName
    const MessageContent = interaction.options.getString('message');
    if (interaction.member.permissions.has('BAN_MEMBERS') || interaction.user.id == "277512152087003136") {
    const Messagesend = await superagent.post(`https://api.wolvesville.com/clans/${process.env.CLAN_ID}/chat`)
  .send({message: `${nom} :${MessageContent}`})
  .set( 'Authorization', process.env.WOV_TOKEN)
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .catch((err) => {return interaction.reply({content:err, ephemeral:true})}); 
  console.log ('Commande MessageSend fait');
  console.log(`${nom} :${MessageContent}`)
  interaction.reply({content:`\`${MessageContent}\` a bien été envoyé.`, ephemeral:true})
}else {interaction.reply({content:"vous n'avez pas la/les permission(s) requise(s) (\`BAN_MEMBERS\`) pour taper cette commande!", ephemeral: true})}
}
}