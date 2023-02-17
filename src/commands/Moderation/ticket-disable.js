const { PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const ticketSchema = require('../../Schemas.js/ticketSchema');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket-disable')
    .setDescription(`This disables up the ticket message and system`),
    async execute (interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You must have admin to set up tickets", ephermal: true});
    
        ticketSchema.deleteMany({ Guild: interaction.guild.id }, async (err, data) => {
            await interaction.reply({ content: "You ticket system has been removed", ephermal: true})
        })
    }
}
