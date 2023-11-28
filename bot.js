const Discord = require('discord.js')
const fs = require("fs");
const config = require('./config.json')

const Client = new Discord.Client({
  intents: 3276799
});

Client.commands = new Discord.Collection();

fs.readdirSync("./slash_commands").forEach((commandFile) => {
  const command = require(`./slash_commands/${commandFile}`);
  Client.commands.set(command.data.name, command);
});

const REST = new Discord.REST().setToken(config.CLIENT_TOKEN);

(async () => {
  try {
    await REST.put(
      Discord.Routes.applicationGuildCommands(config.clientId, config.guildId),
      {
        body: Client.commands.map((cmd) => cmd.data.toJSON()),
      }
    );
  console.log(`Loaded ${Client.commands.size} slash commands {/}`);
  } catch (error) {
  console.log("error loading slash commands", error);
  }
})();

Client.on('ready', async (client) => {
  console.log("Bot VIO");
})
Client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()){
    const command = Client.commands.get(interaction.commandName);
    command.execute(interaction).catch(console.error);
  }
})

console.log("algo");
Client.login("MTE3ODc0OTg1NDI5NDQ5NTI5Mw.GVEgX5.45q7GRhKdVi50dXRslqFa6We4x4FRKq8VttqFM")