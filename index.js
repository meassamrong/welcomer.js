const { Client, Collection, } = require("discord.js");
const client = new Client({
    intents: 32767,
});
client.config = require("./config.json");
const { fetch } = require("undici");
const { createCanvas, loadImage, registerFont } = require('canvas')
const Discord = require('discord.js');
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
  })
  registerFont('fonts/ParttyHalloween.ttf', { family: 'ParttyHalloween' })

  client.on("guildMemberAdd", async (member) => {
    const welcomerchannel = member.guild.channels.cache.find(c => c.name === client.config.welcomerchannels);
    const canvas = createCanvas(720, 480);
    const ctx = canvas.getContext('2d')

      // member avatar
    let avatar  =member.user.displayAvatarURL({ dynamic: false, format: "png" });
    let Avatar = await loadImage(avatar);
    ctx.drawImage(Avatar, 260 , 165, 200, 200);

    // backgrounds card 
    let backgrounds = await loadImage('img/background.png');
    ctx.drawImage(backgrounds,0,0, canvas.width, canvas.height);

    // member name
    let memberUsername = member.user.username.toUpperCase();
    ctx.font = '50px ParttyHalloween'
    ctx.fillStyle = 'white'
    ctx.fillText(`${memberUsername}`, 260, 400)

    let attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile.png');
    welcomerchannel.send({ files: [attachment]})
    welcomerchannel.send(`${member.user}`)

  });

client.login(client.config.token);