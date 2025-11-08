// Ticket panel bot using discord.js v14
// 1. Install dependencies: npm install discord.js
// 2. Put your bot token in the DISCORD_TOKEN env var or replace process.env.DISCORD_TOKEN below.
// 3. (Optional) Replace STAFF_ROLE_ID with the role allowed to view new tickets.
// 4. Run: node ticket_panel.js

const {
  Client,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

// Replace with your staff role ID if you want staff to access ticket channels.
const STAFF_ROLE_ID = 'YOUR_STAFF_ROLE_ID';

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'ticket-panel') {
      const embed = new EmbedBuilder()
        .setColor(0x2f3136)
        .setTitle('🎫 Ticket Support | Assistance Personnalisée')
        .setDescription([
          '**🇬🇧 Need a custom bot? Open your ticket here.**',
          '**> Click the 🎫 button below to open your request.**',
          '**> Tell me the bot type, key features, and deadline.**',
          '**> I’ll reply quickly with a tailored quote and next steps.**',
          '',
          '**What to include:**',
          '- Server name & size',
          '- Required features (moderation, economy, games, etc.)',
          '- Hosting preference (self-hosted or managed by me)',
          '- Budget range or deadline',
          '',
          '**🇫🇷 Besoin d’un bot sur mesure ? Ouvre ton ticket ici.**',
          '**> Clique sur le bouton 🎫 ci-dessous pour ouvrir ta demande.**',
          '**> Précise le type de bot, les fonctionnalités clés et la date souhaitée.**',
          '**> Je te réponds rapidement avec un devis adapté et les étapes suivantes.**',
          '',
          '**À indiquer :**',
          '- Nom et taille du serveur',
          '- Fonctionnalités souhaitées (modération, économie, jeux, etc.)',
          '- Préférence d’hébergement (auto-hébergé ou géré par moi)',
          '- Budget estimé ou deadline',
        ].join('\n'))
        .setFooter({ text: 'Ready? Tap the button, share the details, and I’ll take it from there.' });

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('ticket-create')
          .setLabel('🎫 Open Ticket | Ouvrir un ticket')
          .setStyle(ButtonStyle.Primary),
      );

      await interaction.reply({ content: 'Ticket panel sent!', ephemeral: true });
      await interaction.channel.send({ embeds: [embed], components: [row] });
    }
  } else if (interaction.isButton()) {
    if (interaction.customId === 'ticket-create') {
      const guild = interaction.guild;
      if (!guild) {
        return interaction.reply({ content: 'Guild not found.', ephemeral: true });
      }

      const existingChannel = guild.channels.cache.find((channel) =>
        channel.name === `ticket-${interaction.user.id}`,
      );

      if (existingChannel) {
        return interaction.reply({
          content: `You already have an open ticket: ${existingChannel}`,
          ephemeral: true,
        });
      }

      const ticketChannel = await guild.channels.create({
        name: `ticket-${interaction.user.username}`.toLowerCase().replace(/[^a-z0-9-]/g, ''),
        type: 0, // GuildText
        permissionOverwrites: [
          {
            id: guild.roles.everyone,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: interaction.user.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
              PermissionsBitField.Flags.ReadMessageHistory,
            ],
          },
        ].concat(STAFF_ROLE_ID !== 'YOUR_STAFF_ROLE_ID'
          ? [
              {
                id: STAFF_ROLE_ID,
                allow: [
                  PermissionsBitField.Flags.ViewChannel,
                  PermissionsBitField.Flags.SendMessages,
                  PermissionsBitField.Flags.ReadMessageHistory,
                ],
              },
            ]
          : []),
      });

      await ticketChannel.send({
        content: `<@${interaction.user.id}> Thanks for reaching out! Please fill in the details listed in the panel so I can help. A team member will join the conversation shortly.`,
      });

      await interaction.reply({
        content: `Ticket created: ${ticketChannel}`,
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

