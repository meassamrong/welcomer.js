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
  registerFont('fonts/CREDC___.otf', { family: 'creatditnumber' })
  registerFont('fonts/DejaVuSans-BoldOblique.ttf', { family: 'dejavusans' })

  client.on("guildMemberAdd", async (member) => {
    const welcomerchannel = member.guild.channels.cache.find(c => c.name === client.config.welcomerchannels);
    const canvas = createCanvas(720, 480);
    const ctx = canvas.getContext('2d')

      // member avatar
    let avatar  = member.user.displayAvatarURL({ dynamic: false, format: "png" });
    let Avatar = await loadImage(avatar);
    ctx.drawImage(Avatar, 480 , 160, 170, 170);

    // backgrounds card 
    let backgrounds = await loadImage('img/membercard.png');
    ctx.drawImage(backgrounds,0,0, canvas.width, canvas.height);

    // member name
    let memberUsername = member.user.username.toUpperCase();
    ctx.font = '40px dejavusans'
    ctx.fillStyle = 'white'
    ctx.textAlign = "center"; 
    ctx.fillText(`${memberUsername}`, 260, 300)
    
    // member ID
    let memberID = member.user.id.toUpperCase();
    ctx.font = '30px creatditnumber'
    ctx.fillStyle = 'black'
    ctx.textAlign = "center"; 
    ctx.fillText(`${memberID}`, 345, 407)

    let attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile.png');
    welcomerchannel.send(`Welcome ${msg.author} appreciate your comings!`)
    welcomerchannel.send({ files: [attachment]})

  });


  client.on("message", async (msg) => {
      if(msg.content == "membercard"){
          const canvas = createCanvas(720, 480);
          const ctx = canvas.getContext('2d')
          
          // member avatar
          let avatar  = msg.author.displayAvatarURL({ dynamic: false, format: "png" });
          let Avatar = await loadImage(avatar);
          ctx.drawImage(Avatar, 480 , 160, 170, 170);
          
        // backgrounds card 
          let backgrounds = await loadImage('img/membercard.png');
          ctx.drawImage(backgrounds,0,0, canvas.width, canvas.height);

          // member name
          let memberUsername =  msg.author.username.toUpperCase();
          ctx.font = '40px dejavusans'
          ctx.fillStyle = 'white'
          ctx.textAlign = "center"; 
          ctx.fillText(`${memberUsername}`, 260, 300)

          // member ID
          let memberID = msg.author.id.toUpperCase();
          ctx.font = '30px creatditnumber'
          ctx.fillStyle = 'black'
          ctx.textAlign = "center"; 
          ctx.fillText(`${memberID}`, 345, 407)

          let attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile.png');
          msg.channel.send(`${msg.author} here is your Member Card !`)
          msg.channel.send({ files: [attachment]})
      }
  })

client.login(client.config.token);