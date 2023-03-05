

module.exports = {
    name: "reload",
    category: 'admin',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'reload',
    examples: ['reload'],
    description: 'Relancer le bot (STAFF)',
      async run (client, message, args) {
        message.channel.send("Le bot se relance dans 3 secondes");
        //const devGuild = await client.guilds.cache.get('559352487430193180');
        //devGuild.commands.set([]);
        //const devGuild2 = await client.guilds.cache.get('724207157419180062',);
        //devGuild2.commands.set([]);
        await new Promise(resolve => setTimeout(resolve, 1000))
        message.channel.send("2")
        await new Promise(resolve => setTimeout(resolve, 1000))
        message.channel.send("1")
        await new Promise(resolve => setTimeout(resolve, 1000))
        message.channel.send("`POUF` bot relancé")
        console.log("Le bot s'est relancé.");
        await new Promise(resolve => setTimeout(resolve, 100))
        return process.exit()
      },
      async runSlash (client, interaction) {
        await interaction.reply(`Exécution en cours...`)
        interaction.channel.send("Le bot se relance dans 3 secondes");
        //const devGuild = await client.guilds.cache.get('559352487430193180');
        //devGuild.commands.set([]);
        //const devGuild2 = await client.guilds.cache.get('724207157419180062',);
        //devGuild2.commands.set([]);
        setTimeout(() => {interaction.channel.send("2");}, 1000);setTimeout(() => {interaction.channel.send("1");}, 2000);setTimeout(() => {interaction.channel.send("`POUF` bot relance");}, 3000);
        console.log("Le bot s'est relancé.");
        setTimeout(() => {return process.exit();}, 3100);
      }
    }