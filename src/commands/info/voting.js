const { Command } = require('chop-tools');

module.exports = new Command({
  name: 'vote',
  description: 'Vote for bloo!',
  category: 'info',
  aliases: ['voting'],
  run(message, args, call) {
    const votesThisMonth = call.profile.getVoteCountThisMonth();
    const votesAllTime = call.profile.votes.count;

    const timeDifference = Date.now() - call.profile.votes.time.getTime();
    const time12hours = 12 * 60 * 60 * 1000;

    this.send(
      "I'm so **happy** you want to vote for me! I promise I'll remember this~ 💙",
      '- You can vote for me every __12 hours__. c:',
      '- During weekends voting gives you __double rewards__!',
      '- This month you have' +
        (votesThisMonth
          ? ` voted **${votesThisMonth}** time${votesThisMonth === 1 ? '' : 's'}.`
          : "n't voted yet this month."),
      '- You have' +
        (votesAllTime
          ? ` voted **${votesAllTime}** time${votesAllTime === 1 ? '' : 's'} overall :D`
          : ' never voted for me :c.'),
      timeDifference > time12hours ? ':green_heart: Please vote for me again using the link bellow.' : ':white_heart: Please vote for me again when the 12 hours are up.',
      'https://top.gg/bot/643338599281983501/vote',
    );
  },
});
