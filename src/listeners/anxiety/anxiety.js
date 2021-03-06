const { Listener } = require('chop-tools');

const wait = require('../../util/wait');

const send = require('../../services/safeSend');

module.exports = new Listener({
  words: ['{me}', '(have|having)', 'anxiety'],
  category: 'anxiety',
  cooldown: 15,
  priority: 0,
  async run(message) {
    message.channel.startTyping().catch(() => {});
    await wait(5000);

    send(message)(
      "I'm hearing that you're having feelings of anxiety, if I'm correct.",
      'I personally hate anxiety and I understand just how bad it can feel.',
      'Never knowing if it is going to leave, unsure of your comfort zones/things.',
      'But like the leaves in the fall, anxiety does wither away.',
      "It's like the seasons, and I promise,",
      '**you will be okay in the end.**',
    )
      .then(() => message.channel.stopTyping())
      .catch(() => {});
    return true;
  },
});
