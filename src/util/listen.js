const COMMON_WORDS = {
  me: "i('m|'ve|'ll|ll|mma)*",
  action: '(want|wanna|gonna|going to|will)',
};

function listen(message, words) {
  // replace placeholder with command word
  function commonWord(placeholder) {
    if (Array.isArray(placeholder)) return placeholder;
    const w = placeholder
      ? '' + placeholder.replace(/(\{|\})/g, '').trim()
      : '';
    // console.log('W:', w, typeof w, 'Placeholder:', placeholder);
    if (COMMON_WORDS[w]) return COMMON_WORDS[w];
    return placeholder;
  }
  // get the content of the message and put it all to lower case
  const content = message.content.toLowerCase();

  // regular expression to check if string contains a word
  const makeRegex = w => new RegExp(`(\\s+${w}\\s+|\\s+${w}$|^${w}\\s+|^${w}$)`);
  const wordRegex = makeRegex(commonWord(words));

  // if the words variable is an array check if all of its words are in content
  if (Array.isArray(words)) {
    return words.map(commonWord).every(w => content.match(makeRegex(w)));
  }

  // if words is not an array check if it is in content
  return content.match(wordRegex);
}

exports.COMMON_WORDS = COMMON_WORDS;
module.exports = listen;
