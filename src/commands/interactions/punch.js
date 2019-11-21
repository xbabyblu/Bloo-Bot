const { Command } = require('chop-tools');

const makeEmbed = require('../../util/makeEmbed');
const random = require('../../util/random');
const findPerson = require('../../util/findPerson');

const images = [
  'https://imgur.com/a/Woxs1Wo',
  'https://imgur.com/a/WZIxdUv',
  'https://imgur.com/a/2Zp4p1P',
  'https://imgur.com/a/VWKbzHO',
  'https://imgur.com/a/f8ycCfj',
  'https://imgur.com/a/4IouI3S',
  'https://imgur.com/a/bop8h3O',
  'https://imgur.com/a/slb6XRM',
  'https://imgur.com/a/grf8Xby',
];

module.exports = new Command({
  name: 'punch',
  description: 'when a slap is not enough',
  args: ['target'],
  delete: true,
  category: 'interactions',
  async run(message, args, call) {
    const target = await findPerson(message.mentions.members.first());

    if (!target) {
      message.channel.send("I couldn't find that person.");
      return;
    }

    const embed = makeEmbed(
      `\n${call.callerTag} has punched you, and may I suggest... stop doing whatever caused them to do so? :grin:`,
      random(images),
      message,
    );

    target.user.send({ embed });
  },
});
