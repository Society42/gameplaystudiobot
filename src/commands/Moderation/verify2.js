const { SlashCommandBuilder } = require('@discordjs/builders')
const { PermissionsBitField, ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('verify2')
    .setDescription("This is the verification message"),
    async execute (interaction, client) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You must be an admin to create a verification message", ephermal: true})


        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('button')
            .setEmoji('✔️')
            .setLabel('Verify')
            .setStyle(ButtonStyle.Success),
        )

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("Server Verification")
        .setDescription(`Click the button below to verify yourself within the server.`)



        await interaction.reply({ embeds: [embed], components: [button] });

        const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async i => {

            await i.update({ embeds: [embed], components: [button] });

            const role = interaction.guild.roles.cache.find(r => r.name === 'Verified');

            const member = i.member;

            member.roles.add(role);

            i.user.send(`You are now verified within **${i.guild.name}**`).catch(err => {
                return;
            })
        })
    }
}