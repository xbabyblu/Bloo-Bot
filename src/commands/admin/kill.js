const { Command } = require('chop-tools');
const Prompter = require('discordjs-prompter');

module.exports = new Command({
  name: 'kill',
  description: 'Kills Bloo.',
  hidden: true,
  // delete is not needed here since the prompter will delete the message
  // delete: true,
  run(message, args, call) {
    Prompter.reaction(message.channel, {
      question: 'Are you sure you want to kill Bloo?',
      userId: call.caller,
    }).then(res => {
      if (res && res === 'yes') {
        this.client.destroy();
        process.exit(0);
      }
    }).catch(err => this.client.emit('error', err));
  },
});
