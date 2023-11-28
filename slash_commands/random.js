const Discord = require('discord.js')

module.exports = {
    data: new Discord.SlashCommandBuilder().setName("raja").setDescription("Genera un numero random del 1 al 10"),
    execute: async (interaction) => {
        const randomNum = Math.floor(Math.random() * 10);
        interaction.reply(`Tu número aleatorio es: ${randomNum}`).cath(console.error);
    }
}