const { MessageEmbed } = require('discord.js')
const {writeFileSync, readFileSync} = require ("fs");

module.exports = {
  name: "prefix",
  category: 'utils',
  permissions: ['BAN_MEMBERS'],
  ownerOnly: false,
  usage: 'prefix [chaine de caractère]',
  examples: ['prefix ? | prefix !'],
  description: "Change le prefix du bot (STAFF)",
    async run (client, message, args) {
      if (args[0] == undefined) return message.reply('merci d\'entrer un \`prefix\` apres le nom de la commande');

      const newPrefix = args[0]
      const oldPrefix = JSON.parse(readFileSync(`././Information/prefix/prefix.json`, 'utf-8'))
      const embed = new MessageEmbed()
      .setTitle("Prefix")
      .setTimestamp()
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({ text: message.author.username, iconeURL: message.author.displayAvatarURL() });

      if (newPrefix == oldPrefix.prefix) {embed.setDescription(`Le nouveau prefix est identique à l'ancien prefix, veuillez en indiquer un autre si vous voulez le changer`)
      return message.channel.send({embeds: [embed]})
    }
      else {embed.setDescription(`Le prefix \`${oldPrefix.prefix}\` à été changé en \`${newPrefix}\`\nRedémarrage du bot `)}
    
      const info = {
        prefix: newPrefix
      }
      const objectToJson = JSON.stringify(info)
      writeFileSync(`././Information/prefix/prefix.json`, objectToJson)
      message.channel.send({embeds: [embed]})
      await new Promise(resolve => setTimeout(resolve, 500))
      return process.exit();
    },
    options:[
      {
          name: "prefix",
          description: "taper le nouveau prefix",
          type: "STRING",
          required: true,
      }],
    async runSlash (client, interaction) {
      const newPrefix = interaction.options.getString('prefix');
      const oldPrefix = JSON.parse(readFileSync(`././Information/prefix/prefix.json`, 'utf-8'))
      const embed = new MessageEmbed()
      .setTitle("Prefix")
      .setTimestamp()
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({ text: message.author.username, iconeURL: message.author.displayAvatarURL() });

      if (newPrefix == oldPrefix.prefix) {embed.setDescription(`Le nouveau prefix est identique à l'ancien prefix, veuillez en indiquer un autre si vous voulez le changer`)
      return message.channel.send({embeds: [embed]})
    }
      else {embed.setDescription(`Le prefix \`${oldPrefix.prefix}\` à été changé en \`${newPrefix}\`\nRedémarrage du bot `)}

      const info = {
        prefix: newPrefix
      }
      const objectToJson = JSON.stringify(info)
      writeFileSync(`././Information/prefix/prefix.json`, objectToJson)
      interaction.channel.send({embeds: [embed]})
      await new Promise(resolve => setTimeout(resolve, 500))
      return process.exit();
  },
};
