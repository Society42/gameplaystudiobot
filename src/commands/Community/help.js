const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription(`This is the help command!`),
    async execute (interaction, client ) {

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("Help Center")
        .setDescription(`Help Command Guide:`)
        .addFields({ name: "Page 1", value: "Help & Resources (button1)"})
        .addFields({ name: "Page 2", value: "Community Commands (button2)"})
        .addFields({ name: "Page 3", value: "Moderation Commands (button3)"})

        const embed2 = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("Community Commands")
        .addFields({ name: "/help", value: "Do /help for the commands list & support"})
        .addFields({ name: "/8ball", value: "Do /8ball to tell you nothing but the truth"})
        .addFields({ name: "/invites", value: "Do /invites to see a users invites"})
        .addFields({ name: "/serverinfo", value: "Gives basic info about the discord server"})
        .setFooter({ text: "Community Commands"})
        .setTimestamp()

        const embed3 = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("Moderation Commands")
        .addFields({ name: "/whois", value: "do /whois to look up some info about a user"})
        .addFields({ name: "/purge", value: "do /purge to delete a bunch of messages at once"})
        .addFields({ name: "/lock", value: "do /lock to lock a channel"})
        .addFields({ name: "/unlock", value: "do /unlock to unlock a channel"})
        .addFields({ name: "/steal", value: "do /steal to steal a emoji from another server"})
        .addFields({ name: "/verify2", value: "do /verify2 to send a verify message"})
        .addFields({ name: "/ticket", value: "do /ticket to send a ticket message"})
        .setFooter({ text: "Moderation Commands"})
        .setTimestamp()

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`page1`)
            .setLabel(`Page 1`)
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`page2`)
            .setLabel(`Page 2`)
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`page3`)
            .setLabel(`Page 3`)
            .setStyle(ButtonStyle.Success),
        )

        const message = await interaction.reply({ embeds: [embed], components: [button]});
        const collector = await message.createMessageComponentCollector();

        collector.on('collect', async i => {

            if (i.customId === 'page1') {

                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({ embeds: [embed], components: [button] })
            }

            if (i.customId === 'page2') {

                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({ embeds: [embed2], components: [button]})
            }

            if (i.customId === 'page3') {

                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({ embeds: [embed3], components: [button] })
            }
        })
    }
}