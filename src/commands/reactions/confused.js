const { Command } = require('chop-tools');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');
const Gifs = require('../../services/gifs');

module.exports = new Command({
  name: 'confused',
  description: 'ever feel like you don\'t understand what\'s going on?',
  aliases: ['confuse', 'huh', 'confusion'],
  category: 'reactions',
  examples: [' ', '@Lar#9547', '@Xlilblu#5239'],
  async run(message, args, call) {
    const target = await findPerson(message.mentions.members.first());

    let msg;
    if (target) {
      msg = `<@${call.caller}> is confused by what you said, ${target} Maybe try clarifying a little more?`;
    } else {
      msg = `<@${call.caller}> is **confused** :thinking:`;
    }

    const embed = makeEmbed(
      msg,
      await Gifs.random(['confused']),
      message,
    );

    this.send({ embed });
  },
});
