const { Command } = require('chop-tools');

const createInteractionCommand = require('../../util/createInteractionCommand');

module.exports = new Command({
  name: 'PatPat',
  description: 'a gentle way of saying.. there-there.',
  aliases: ['pat'],
  args: ['target'],
  delete: true,
  category: 'interactions',
  usage: '{target}',
  examples: ['@Lar#9547', '@Xlilblu#5239'],
  async run(message, args, call) {
    const pat = createInteractionCommand(`*pat-pat* \n${call.callerTag} has pat you c:`, 'pat', message);

    pat().catch(err => this.client.emit('error', err));
  },
});
