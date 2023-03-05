const Logger = require ('../../utils/Logger')
const logClan = require ('../../utils/log')

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        const logChannel = client.channels.cache.get('1044258472121860126');
        let guildsCount = await client.guilds.fetch();
        let usersCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

        Logger.client(`- prêt à être utilisé par ${usersCount} utilisateurs sur ${guildsCount.size} serveur`);

        client.user.setPresence({ activities: [{ name: 'les bêtises de magmelqi', type: 'WATCHING'}], status: 'online'}) //dnd, invisible, online, idle
    // WATCHING PLAYING
        const devGuild = await client.guilds.cache.get('559352487430193180');
        devGuild.commands.set(client.commands.map(cmd => cmd));
        const devGuild2 = await client.guilds.cache.get('724207157419180062',);
        devGuild2.commands.set(client.commands.map(cmd => cmd));
        
        logClan.log(client)
    },
  };