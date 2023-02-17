const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { EmbedBuilder, PermissionsBitField, ChannelType, Options, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription('This locks a given channel')
    .addChannelOption(option => option.setName('channel').setDescription('The channel you want to lock').addChannelTypes(ChannelType.GuildText).setRequired(true)),
    async execute (interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({ content: "You don't have permissions to execute this command!", ephermal: true})

        let channel = interaction.options.getChannel('channel');

        channel.permissionOverwrites.create(interaction.guild.id, { SendMessages: false })

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`:white_check_mark: ${channel} has been **locked**`)

        await interaction.reply({ embeds: [embed] })
    }
}