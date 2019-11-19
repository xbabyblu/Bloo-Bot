const { Command } = require('chop-tools');
// cute stuff c;
module.exports = new Command({
  name: 'hold',
  description: 'Tell someone you want to hold their hand :heart:',
  args: ['target'],
  delete: true,
  category: 'interactions',
  run(message, args, call) {
    const target = message.mentions.members.first();
    if (!target) return;
    target.user.send(
      `I was sent by \n${call.callerTag} to ask if you'd like to hold their hand :smiling_face_with_3_hearts:`,
    );
  },
});